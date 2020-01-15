"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _flat = require("flat");

var _propertyInEdit = _interopRequireDefault(require("../../ui/property-in-edit"));

var _column = _interopRequireDefault(require("../../ui/column"));

var _columns = _interopRequireDefault(require("../../ui/columns"));

var _convertParamsToArrayItems = _interopRequireDefault(require("./convert-params-to-array-items"));

var _styledSection = _interopRequireDefault(require("../../ui/styled-section"));

var _ui = require("../../ui");

var _updateParamsArray = _interopRequireDefault(require("./update-params-array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const normalizeParams = params => (0, _flat.flatten)((0, _flat.unflatten)(params, {
  overwrite: true
}));

class Edit extends _react.default.Component {
  constructor(props) {
    super(props);
    this.addNew = this.addNew.bind(this);
  }

  addNew(event) {
    const {
      property,
      record,
      onChange
    } = this.props;
    const items = (0, _convertParamsToArrayItems.default)(property, record);
    const newRecord = { ...record
    };
    newRecord.params = normalizeParams({ ...newRecord.params,
      // otherwise yarn types is not working
      [property.name]: [...items, property.subProperties.length ? {} : '']
    });
    onChange(newRecord);
    event.preventDefault();
    return false;
  }

  removeItem(i, event) {
    const {
      property,
      record,
      onChange
    } = this.props;
    const items = (0, _convertParamsToArrayItems.default)(property, record);
    const newItems = [...items];
    newItems.splice(i, 1);
    const newRecord = { ...record
    };
    newRecord.params = (0, _updateParamsArray.default)(newRecord.params, property.name, newItems);
    onChange(newRecord);
    event.preventDefault();
    return false;
  }

  renderItem(item, i) {
    const {
      ItemComponent,
      property
    } = this.props;
    return _react.default.createElement(_columns.default, {
      key: i
    }, _react.default.createElement(_column.default, {
      width: 10
    }, _react.default.createElement(ItemComponent, _extends({}, this.props, {
      property: { ...property,
        name: `${property.name}.${i}`,
        label: `[${i + 1}]`,
        isArray: false
      }
    }))), _react.default.createElement(_column.default, {
      width: 2
    }, _react.default.createElement(_ui.StyledButton, {
      style: {
        marginTop: 25
      },
      onClick: event => this.removeItem(i, event)
    }, "Remove")));
  }

  renderInput() {
    const {
      property,
      record
    } = this.props;
    const items = (0, _convertParamsToArrayItems.default)(property, record);
    return _react.default.createElement(_styledSection.default, {
      style: {
        marginTop: 20
      }
    }, items.map((item, i) => this.renderItem(item, i)), _react.default.createElement("p", null, _react.default.createElement(_ui.StyledButton, {
      onClick: this.addNew
    }, "Add new item")));
  }

  render() {
    const {
      property,
      record
    } = this.props;
    const error = record.errors && record.errors[property.name];
    return _react.default.createElement(_propertyInEdit.default, {
      property: property,
      error: error
    }, this.renderInput());
  }

}

exports.default = Edit;