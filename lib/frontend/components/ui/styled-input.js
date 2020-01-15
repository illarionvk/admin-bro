"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledInput = _styledComponents.default.input.attrs(props => ({
  className: props.className || 'input'
})).withConfig({
  displayName: "styled-input__StyledInput",
  componentId: "sc-18q3bd3-0"
})(["background:", ";color:", ";height:auto;border-radius:0px;border-color:", ";box-shadow:none;&:hover{border-color:", ";}"], ({
  theme
}) => theme.colors.inputBck, ({
  theme
}) => theme.colors.defaultText, ({
  theme
}) => theme.colors.border, ({
  theme
}) => theme.colors.borderHover);

var _default = StyledInput;
exports.default = _default;