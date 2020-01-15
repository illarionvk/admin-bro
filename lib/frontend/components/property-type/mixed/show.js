"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propertyInShow = _interopRequireDefault(require("../../ui/property-in-show"));

var _styledSection = _interopRequireDefault(require("../../ui/styled-section"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Show = props => {
  const {
    property,
    ItemComponent
  } = props;
  return _react.default.createElement(_propertyInShow.default, {
    property: property
  }, _react.default.createElement(_styledSection.default, null, property.subProperties.map(subProperty => _react.default.createElement(ItemComponent, _extends({}, props, {
    key: subProperty.name,
    property: { ...subProperty,
      name: `${property.name}.${subProperty.name}`
    }
  })))));
};

var _default = Show;
exports.default = _default;