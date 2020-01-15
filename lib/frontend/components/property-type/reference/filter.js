"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Async = _interopRequireDefault(require("react-select/lib/Async"));

var _styledComponents = require("styled-components");

var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));

var _propertyInFilter = _interopRequireDefault(require("../../ui/property-in-filter"));

var _selectStyles = require("../../../styles/select-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Filter extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.api = new _apiClient.default();
    this.options = [];
    this.loadOptions = this.loadOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    const {
      onChange,
      property
    } = this.props;
    onChange(property.name, selected ? selected.value : '');
  }

  async loadOptions(inputValue) {
    const {
      property: {
        reference
      }
    } = this.props;

    if (!reference) {
      throw new Error("Reference is invalid [1e38f186378b11ea87ee10ddb1eacae1]");
    }

    const resourceId = typeof reference === "string" ? reference : reference.tableName != null ? reference.tableName : reference.table != null ? reference.table : null;

    if (!resourceId) {
      throw new Error("Resource ID is invalid [5204da2a378b11ea87ee10ddb1eacae1]");
    }

    const records = await this.api.searchRecords({
      resourceId,
      query: inputValue
    });
    this.options = records.map(r => ({
      value: r.id,
      label: r.title
    }));
    return this.options;
  }

  render() {
    const {
      property,
      filter,
      theme
    } = this.props;
    const value = typeof filter[property.name] === 'undefined' ? '' : filter[property.name];
    const selected = (this.options || []).find(o => o.value === value);
    return _react.default.createElement(_propertyInFilter.default, {
      property: property
    }, _react.default.createElement(_Async.default, {
      value: typeof selected === 'undefined' ? '' : selected,
      isClearable: true,
      cacheOptions: true,
      styles: (0, _selectStyles.filterStyles)(theme),
      loadOptions: this.loadOptions,
      onChange: this.handleChange,
      defaultOptions: true
    }));
  }

}

var _default = (0, _styledComponents.withTheme)(Filter);

exports.default = _default;