"use strict";

var _chai = require("chai");

var _layoutTemplate = _interopRequireDefault(require("./layout-template"));

var _adminBro = _interopRequireDefault(require("../admin-bro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('layoutTemplate', function () {
  context('AdminBro with default options and not logged in user', function () {
    beforeEach(function () {
      this.adminBro = new _adminBro.default({});
    });
    it('renders default company name', function () {
      (0, _chai.expect)((0, _layoutTemplate.default)(this.adminBro, undefined, '/')).to.contain(this.adminBro.options.branding.companyName);
    });
    it('links to global bundle', function () {
      (0, _chai.expect)((0, _layoutTemplate.default)(this.adminBro, undefined, '/')).to.contain('global.bundle.js');
    });
  });
  describe('AdminBro with branding options given', function () {
    beforeEach(function () {
      this.branding = {
        softwareBrothers: false,
        companyName: 'Other name',
        favicon: '/someImage.png'
      };
      this.adminBro = new _adminBro.default({
        branding: this.branding
      });
      this.renderedContent = (0, _layoutTemplate.default)(this.adminBro, undefined, '/');
    });
    it('renders company name', function () {
      (0, _chai.expect)(this.renderedContent).to.contain(this.branding.companyName);
    });
    it('renders favicon', function () {
      (0, _chai.expect)(this.renderedContent).to.contain(`<link rel="shortcut icon" type="image/png" href="${this.branding.favicon}" />`);
    });
  });
  describe('user defines that externals should be taken from CDN', function () {
    context('user overrode defaults', function () {
      it('takes React and other libraries from CDN', function () {
        this.adminBro = new _adminBro.default({
          assets: {
            globalsFromCDN: true
          }
        });
        const template = (0, _layoutTemplate.default)(this.adminBro, undefined, '/');
        (0, _chai.expect)(template).not.to.contain('global.bundle.js');
        (0, _chai.expect)(template).to.contain('https://unpkg.com/react@16/umd/react.development.js');
        (0, _chai.expect)(template).to.contain('https://unpkg.com/react-dom@16/umd/react-dom.development.js');
      });
    });
  });
  context('custom styles and scripts were defined in AdminBro options', function () {
    beforeEach(function () {
      this.scriptUrl = 'http://somescript.com';
      this.styleUrl = 'http://somestyle.com';
      this.adminBro = new _adminBro.default({
        assets: {
          styles: [this.styleUrl],
          scripts: [this.scriptUrl]
        }
      });
    });
    it('adds styles to the head section', function () {
      (0, _chai.expect)((0, _layoutTemplate.default)(this.adminBro, undefined, '/')).to.contain(this.styleUrl);
    });
    it('adds scripts to the body', function () {
      (0, _chai.expect)((0, _layoutTemplate.default)(this.adminBro, undefined, '/')).to.contain(this.scriptUrl);
    });
  });
});