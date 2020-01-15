"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _breadcrumbs = _interopRequireDefault(require("../app/breadcrumbs"));

var _actionHeader = _interopRequireDefault(require("../app/action-header"));

var _wrapperBox = _interopRequireDefault(require("../ui/wrapper-box"));

var _loader = _interopRequireDefault(require("../ui/loader"));

var _notice = _interopRequireDefault(require("../app/notice"));

var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _errorMessage = require("../ui/error-message");

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

var _noticeWrapper = _interopRequireDefault(require("./styled/notice-wrapper.styled"));

var _shouldActionReFetchData = _interopRequireDefault(require("./utils/should-action-re-fetch-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ContainerRecord = _styledComponents.default.div.withConfig({
  displayName: "record-action__ContainerRecord",
  componentId: "aqlm90-0"
})(["display:flex;flex-direction:column;"]);

class RecordAction extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: undefined,
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      match
    } = this.props;
    this.fetchRecord(match.params);
  }

  shouldComponentUpdate(newProps) {
    const {
      match
    } = this.props;

    if ((0, _shouldActionReFetchData.default)(match.params, newProps.match.params)) {
      this.fetchRecord(newProps.match.params);
      return false;
    }

    return true;
  }

  getResourceAndAction(name = null) {
    const {
      match,
      resources
    } = this.props;
    const {
      resourceId,
      actionName
    } = match.params;
    const {
      record
    } = this.state;
    const nameToCheck = name || actionName;
    const resource = resources.find(r => r.id === resourceId);
    const action = record && record.recordActions.find(r => r.name === nameToCheck);
    return {
      resource: resource || undefined,
      action: action || undefined
    };
  }

  fetchRecord({
    actionName,
    recordId,
    resourceId
  }) {
    const {
      addNotice
    } = this.props;
    const api = new _apiClient.default();
    this.setState({
      isLoading: true,
      record: undefined
    });
    api.recordAction({
      resourceId,
      recordId,
      actionName
    }).then(response => {
      this.setState({
        isLoading: false,
        record: response.data.record
      });
    }).catch(error => {
      addNotice({
        message: ['There was an error fetching the record, ', 'Check out console to see more information.'].join('\n'),
        type: 'error'
      });
      throw error;
    });
  }

  render() {
    const {
      match
    } = this.props;
    const {
      actionName,
      recordId,
      resourceId
    } = match.params;
    const {
      record,
      isLoading
    } = this.state;
    const {
      resource,
      action
    } = this.getResourceAndAction();

    if (!resource) {
      return _react.default.createElement(_errorMessage.NoResourceError, {
        resourceId: resourceId
      });
    }

    if (!action && !isLoading) {
      return _react.default.createElement(_errorMessage.NoActionError, {
        resourceId: resourceId,
        actionName: actionName
      });
    }

    if (!record && !isLoading) {
      return _react.default.createElement(_errorMessage.NoRecordError, {
        resourceId: resourceId,
        recordId: recordId
      });
    }

    return _react.default.createElement(ContainerRecord, null, _react.default.createElement(_noticeWrapper.default, null, _react.default.createElement(_notice.default, null)), _react.default.createElement(_wrapperBox.default, null, _react.default.createElement(_breadcrumbs.default, {
      resource: resource,
      actionName: actionName,
      record: record
    }), _react.default.createElement(_actionHeader.default, {
      resource: resource,
      recordId: recordId,
      action: action,
      record: record
    }), isLoading ? _react.default.createElement(_loader.default, null) : _react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource,
      record: record
    })));
  }

}

const mapStateToProps = state => ({
  resources: state.resources
});

var _default = (0, _withNotice.default)((0, _reactRedux.connect)(mapStateToProps)(RecordAction));

exports.default = _default;