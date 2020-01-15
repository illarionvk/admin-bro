FROM node:10.18.1-buster

ENV TINI_VERSION=0.18.0 \
    TINI_KILL_PROCESS_GROUP=enabled \
    TINI_SUBREAPER=enabled

RUN curl -L -o /tini https://github.com/krallin/tini/releases/download/v${TINI_VERSION}/tini-static \
    && curl -L -o /tini.asc https://github.com/krallin/tini/releases/download/v${TINI_VERSION}/tini-static.asc \
    && (gpg --no-tty --keyserver ha.pool.sks-keyservers.net --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7 \
       ||  gpg --no-tty --keyserver keyserver.ubuntu.com --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7) \
    && gpg --no-tty --verify /tini.asc \
    && chmod +x /tini

RUN echo 'Installing dependencies' \
    && apt-get update \
    && apt-get --assume-yes --no-install-recommends install \
       parallel \
    && echo 'Cleaning up' \
    && rm -rf /var/lib/apt/lists/*

ENV SHELL=/bin/bash \
    TMP_DIR=/mnt/tmp \
    WORKDIR=/app

ENV PATH="${WORKDIR}/bin:${WORKDIR}/node_modules/.bin:${PATH}"

WORKDIR ${WORKDIR}

RUN echo 'Setting up node modules folder' \
    && mkdir ${TMP_DIR} \
    && chown -R node:node ${TMP_DIR} ${WORKDIR} \
    && echo 'Set up Tini' \
    && chmod +x /tini

USER node

ENTRYPOINT ["/tini", "-sg", "--"]

# Set custom shell prompt
RUN echo 'export PS1="[TASKS]:\u@\h:\w\\$ "' >> ~/.bashrc
