"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propertyType = _interopRequireDefault(require("../property-type"));

var _wrapperBox = _interopRequireDefault(require("../ui/wrapper-box"));

var _styledButton = _interopRequireDefault(require("../ui/styled-button"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

var _propertyJson = require("../../../backend/decorators/property-json.interface");

var _recordToFormData = _interopRequireDefault(require("./record-to-form-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name EditAction
 * @category Actions
 * @description Shows form for updating a given record.
 * @private
 * @component
 */
class Edit extends _react.default.Component {
  constructor(props) {
    super(props);
    const {
      record
    } = props;
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      record,
      loading: false
    };
    this.api = new _apiClient.default();
  }

  handleChange(propertyOrRecord, value) {
    if (typeof value === 'undefined' && propertyOrRecord.params) {
      this.setState({
        record: propertyOrRecord
      });
    } else {
      this.setState(state => ({
        record: { ...state.record,
          params: { ...state.record.params,
            [propertyOrRecord]: value
          }
        }
      }));
    }
  }

  handleSubmit(event) {
    const {
      resource,
      history,
      addNotice
    } = this.props;
    const {
      record
    } = this.state;
    const formData = (0, _recordToFormData.default)(record);
    this.setState({
      loading: true
    });
    this.api.recordAction({
      resourceId: resource.id,
      actionName: 'edit',
      recordId: record.id,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.data.notice) {
        addNotice(response.data.notice);
      }

      if (response.data.redirectUrl) {
        history.push(response.data.redirectUrl);
      } else {
        this.setState(state => ({
          record: { ...state.record,
            errors: response.data.record.errors
          },
          loading: false
        }));
      }
    }).catch(() => {
      this.setState({
        loading: false
      });
      addNotice({
        message: 'There was an error updating record, Check out console to see more information.',
        type: 'error'
      });
    });
    event.preventDefault();
    return false;
  }

  render() {
    const {
      resource
    } = this.props;
    const properties = resource.editProperties;
    const {
      record,
      loading
    } = this.state;
    return _react.default.createElement(_wrapperBox.default, {
      border: true
    }, _react.default.createElement("form", {
      onSubmit: this.handleSubmit.bind(this)
    }, properties.map(property => _react.default.createElement(_propertyType.default, {
      key: property.name,
      where: _propertyJson.PropertyPlace.edit,
      onChange: this.handleChange,
      property: property,
      resource: resource,
      record: record
    })), _react.default.createElement(_styledButton.default, {
      type: "submit",
      className: `is-primary${loading ? ' is-loading' : ''}`
    }, _react.default.createElement("i", {
      className: "icomoon-save"
    }), _react.default.createElement("span", {
      className: "btn-text"
    }, "Save"))));
  }

}
/**
 * @memberof Edit
 */


var _default = (0, _withNotice.default)((0, _reactRouterDom.withRouter)(Edit));

exports.default = _default;