"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakpoints = exports.fonts = exports.sizes = exports.colors = void 0;

require("styled-components");

/**
 * @file Default AdminBro theme
 * @private
 */
// sorted alphabetically
const colors = {
  bck: '#fff',
  defaultText: '#111114',
  lightText: '#70728F',
  lightBck: '#F8F8FA',
  superLightBack: '#FCFCFC',
  border: '#eeeeef',
  borderHover: '#b5b5b5',
  borderOnDark: '#4E5779',
  innerBck: '#f7f7Fa',
  darkBck: '#303b62',
  superDarkBck: '#192035',
  inputBck: '#fff',
  filterDefaultText: '#fff',
  filterLightText: '#b5b5b5',
  love: '#e6282b',
  primary: '#4A69F2',
  primaryHover: '#545B8C',
  success: '#21C197',
  successBorder: '#8CDAD9',
  lightSuccess: '#DBF0F1',
  error: '#F0616F',
  lightError: '#F6E1E6',
  warning: '#FF9F89'
};
exports.colors = colors;
const sizes = {
  navbarHeight: '64px',
  sidebarWidth: '300px',
  sidebarMobileWidth: '98px',
  paddingLayout: '30px',
  padding: '15px',
  paddingMin: '5px'
};
exports.sizes = sizes;
const fonts = {
  base: '14px',
  medium: '12px',
  min: '11px',
  header: '32px'
};
exports.fonts = fonts;
const breakpoints = {
  minMobileWidth: '320px',
  minTabletWidth: '769px',
  minDesktopWidth: '1024px',
  minWidescreenWidth: '1216px',
  minFullHDWidth: '1408px'
};
exports.breakpoints = breakpoints;