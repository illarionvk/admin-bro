"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _propertyType = _interopRequireDefault(require("../property-type"));

var _wrapperBox = _interopRequireDefault(require("../ui/wrapper-box"));

var _propertyJson = require("../../../backend/decorators/property-json.interface");

var _table = _interopRequireDefault(require("../ui/table"));

var _ui = require("../ui");

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BulkDelete = props => {
  const {
    resource,
    records,
    action,
    addNotice,
    history
  } = props;
  const [loading, setLoading] = (0, _react.useState)(false);

  if (!records) {
    return _react.default.createElement(_ui.ErrorMessageBox, {
      title: "No records selected"
    }, "In order to remove records, you have to pick them first.");
  }

  const handleClick = () => {
    const api = new _apiClient.default();
    setLoading(true);
    const recordIds = records.map(r => r.id);
    api.bulkAction({
      resourceId: resource.id,
      actionName: action.name,
      recordIds,
      method: 'post'
    }).then(response => {
      setLoading(false);

      if (response.data.notice) {
        addNotice(response.data.notice);
      }

      if (response.data.redirectUrl) {
        history.push(response.data.redirectUrl);
      }
    }).catch(error => {
      setLoading(false);
      addNotice({
        message: 'There was an error deleting records, Check out console to see more information.',
        type: 'error'
      });
      throw error;
    });
  };

  return _react.default.createElement(_wrapperBox.default, {
    border: true
  }, _react.default.createElement("h1", null, "Following records will be removed:"), _react.default.createElement(_table.default, null, records.map(record => _react.default.createElement("tr", null, resource.listProperties.map(property => _react.default.createElement("td", {
    key: property.name,
    className: resource.titleProperty.name === property.name ? 'main' : undefined
  }, _react.default.createElement(_propertyType.default, {
    where: _propertyJson.PropertyPlace.list,
    property: property,
    resource: resource,
    record: record
  })))))), _react.default.createElement("p", null, _react.default.createElement(_ui.StyledButton, {
    onClick: handleClick,
    className: `is-primary${loading ? ' is-loading' : ''}`
  }, `Confirm the removal of ${records.length} records`)));
};

var _default = (0, _withNotice.default)((0, _reactRouter.withRouter)(BulkDelete));

exports.default = _default;