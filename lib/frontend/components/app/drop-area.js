"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _label = _interopRequireDefault(require("../ui/label"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UploadInput = _styledComponents.default.input.withConfig({
  displayName: "drop-area__UploadInput",
  componentId: "sc-19uar0s-0"
})(["font-size:100px;position:absolute;left:0;top:0;opacity:0;bottom:0;cursor:pointer;width:100%;"]);

const ValidationInformation = _styledComponents.default.p.withConfig({
  displayName: "drop-area__ValidationInformation",
  componentId: "sc-19uar0s-1"
})(["&&&{font-size:", ";label{display:inline;}}"], ({
  theme
}) => theme.fonts.min);

const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "drop-area__Wrapper",
  componentId: "sc-19uar0s-2"
})(["position:relative;border:dashed ", " 1px;text-align:center;padding:", ";&:hover{border-color:", ";}i{color:", ";margin-bottom:20px;}.innerWrapper{position:relative;}"], ({
  theme
}) => theme.colors.border, ({
  theme
}) => theme.sizes.paddingLayout, ({
  theme
}) => theme.colors.borderHover, ({
  theme
}) => theme.colors.superLightBack);

const DropMessage = _styledComponents.default.div.withConfig({
  displayName: "drop-area__DropMessage",
  componentId: "sc-19uar0s-3"
})(["position:absolute;border:5px solid ", ";top:0;left:0;right:0;bottom:0;opacity:0;& > h1{color:", ";font-size:", ";margin-top:", ";transition:transform 0.5s;}&.active{background:", ";opacity:1;transition:opacity 1s;& > h1{transform:rotate(2deg) scale(1.2);transition:transform 0.5s;}}"], ({
  theme
}) => theme.colors.primaryHover, ({
  theme
}) => theme.colors.filterDefaultText, ({
  theme
}) => theme.fonts.header, ({
  theme
}) => theme.sizes.paddingLayout, ({
  theme
}) => theme.colors.primary);

const validateContentType = (mimeTypes, mimeType) => {
  if (!mimeTypes || !mimeTypes.length) {
    return true;
  }

  return mimeTypes.includes(mimeType);
};

const validateSize = (maxSize, size) => {
  if (!maxSize) {
    return true;
  }

  if (!size) {
    return true;
  }

  return +maxSize >= +size;
};

const inKb = size => {
  if (!size) {
    return '';
  }

  return `${Math.round(+size / 1024)} KB`;
};
/**
 * @returns {void}
 * @memberof DropArea
 * @alias OnUpload
 */


/**
 * Drop Area which can be used for uploading files.
 *
 * how to use it in your custom component.tsx:
 * ```
 * import React, { useState } from 'react'
 * import { DropArea, PropertyInEdit, BasePropertyProps } from 'admin-bro'
 * import { unflatten } from 'flat'
 *
 * const UploadPhoto: React.FC<BasePropertyProps> = (props) => {
 *   const { property, record, onChange } = props
 *
 *   const fileObject = unflatten(record.params)[property.name]
 *
 *   const onUpload = (files: FileList) => {
 *     const newRecord = {...record}
 *     const [file] = files
 *
 *     onChange({
 *       ...newRecord,
 *       params: {
 *         ...newRecord.params,
 *         [`${property.name}.file`]: file,
 *         [`${property.name}.name`]: file.name,
 *         [`${property.name}.size`]: file.size,
 *         [`${property.name}.type`]: file.type,
 *       }
 *     })
 *     event.preventDefault()
 *   }
 *
 *   return (
 *     <PropertyInEdit property={property}>
 *       <DropArea
 *         fileObject={fileObject}
 *         onUpload={onUpload}
 *         propertyName={property.name}
 *       />
 *     </PropertyInEdit>
 *   )
 * }
 * ```
 *
 * @component
 *
 * @example
 * const fileObject = null
 * const maxSize = 1024
 * const mimeTypes = ['application/pdf']
 * const onUpload = (files) => { alert(files[0].name) }
 * const property = {name: 'fileUpload', label: 'File Upload'}
 * return (
 * <PropertyInEdit property={property}>
 *   <DropArea
 *     fileObject={fileObject}
 *     onUpload={onUpload}
 *     propertyName={property.name}
 *     validate= { { maxSize, mimeTypes } }
 *   />
 * </PropertyInEdit>
 * )
 */
const DropArea = props => {
  const {
    fileObject,
    onUpload,
    propertyName,
    validate = {},
    addNotice
  } = props;
  const [isDragging, setIsDragging] = (0, _react.useState)(false);

  const onDragEnter = () => setIsDragging(true);

  const onDragLeave = () => setIsDragging(false);

  const onDragOver = () => setIsDragging(true);

  const onDrop = event => {
    event.preventDefault();
    setIsDragging(false);
    const {
      files
    } = event.dataTransfer || event.target;

    for (let i = 0; i < files.length; i += 1) {
      const file = files.item(i);

      if (!file) {
        return;
      }

      if (!validateSize(validate.maxSize, file && file.size)) {
        addNotice({
          message: `File: ${file.name} size is too big`,
          type: 'error'
        });
        return;
      }

      if (!validateContentType(validate.mimeTypes, file.type)) {
        addNotice({
          message: `File: ${file.name} has unsupported type: ${file.type}`,
          type: 'error'
        });
        return;
      }
    }

    onUpload(files);
  };

  return _react.default.createElement(Wrapper, {
    onDragEnter: onDragEnter,
    onDragOver: onDragOver,
    onDragLeave: onDragLeave,
    onDrop: onDrop
  }, _react.default.createElement(DropMessage, {
    className: isDragging ? 'active' : 'inactive',
    onDragEnter: onDragEnter
  }, _react.default.createElement("h1", null, "Drop Here")), _react.default.createElement(UploadInput, {
    type: "file",
    id: propertyName,
    onChange: event => onDrop(event)
  }), fileObject ? _react.default.createElement("div", null, _react.default.createElement(_label.default, null, "File name"), _react.default.createElement("p", null, fileObject.name), _react.default.createElement("p", null, `(${Math.round(+fileObject.size / 1024)}) KB`)) : _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement("i", {
    className: "fa fa-4x fa-upload"
  })), _react.default.createElement("p", null, "Pick or Drop File here to upload it."), _react.default.createElement(ValidationInformation, null, validate.maxSize ? _react.default.createElement("p", null, _react.default.createElement(_label.default, null, "Max size:"), inKb(validate.maxSize)) : '', validate.mimeTypes && validate.mimeTypes.length ? _react.default.createElement("p", null, _react.default.createElement(_label.default, null, "Available types:"), validate.mimeTypes.join(', ')) : '')));
}; // TODO remove this hack


var _default = (0, _withNotice.default)(DropArea);

exports.default = _default;