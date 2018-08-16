'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keyCode = require('tinper-bee-core/lib/keyCode');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/* eslint react/no-is-mounted:0 */
var propTypes = {
  rootPrefixCls: _propTypes2["default"].string,
  eventKey: _propTypes2["default"].string,
  active: _propTypes2["default"].bool,
  children: _propTypes2["default"].any,
  selectedKeys: _propTypes2["default"].array,
  disabled: _propTypes2["default"].bool,
  title: _propTypes2["default"].string,
  onSelect: _propTypes2["default"].func,
  onClick: _propTypes2["default"].func,
  onDeselect: _propTypes2["default"].func,
  parentMenu: _propTypes2["default"].object,
  onItemHover: _propTypes2["default"].func,
  onDestroy: _propTypes2["default"].func,
  onMouseEnter: _propTypes2["default"].func,
  onMouseLeave: _propTypes2["default"].func
};

var defaultProps = {
  onSelect: _util.noop,
  onMouseEnter: _util.noop,
  onMouseLeave: _util.noop
};

var MenuItem = function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.getPrefixCls = _this.getPrefixCls.bind(_this);
    _this.getActiveClassName = _this.getActiveClassName.bind(_this);
    _this.getDisabledClassName = _this.getDisabledClassName.bind(_this);
    _this.getSelectedClassName = _this.getSelectedClassName.bind(_this);
    _this.clearMenuItemMouseLeaveTimer = _this.clearMenuItemMouseLeaveTimer.bind(_this);
    _this.isSelected = _this.isSelected.bind(_this);
    return _this;
  }

  MenuItem.prototype.componentWillUnmount = function componentWillUnmount() {
    var props = this.props;
    this.mounted = false;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
    if (props.parentMenu.menuItemInstance === this) {
      this.clearMenuItemMouseLeaveTimer();
    }
  };

  MenuItem.prototype.componentDidMount = function componentDidMount() {
    this.mounted = true;
  };

  MenuItem.prototype.onKeyDown = function onKeyDown(e) {
    var keyCode = e.keyCode;
    if (keyCode === _keyCode2["default"].ENTER) {
      this.onClick(e);
      return true;
    }
  };

  MenuItem.prototype.onMouseLeave = function onMouseLeave(e) {
    var _this2 = this;

    var props = this.props;
    var eventKey = props.eventKey,
        parentMenu = props.parentMenu;

    parentMenu.menuItemInstance = this;
    parentMenu.menuItemMouseLeaveFn = function () {
      if (_this2.mounted && props.active) {
        props.onItemHover({
          key: eventKey,
          item: _this2,
          hover: false,
          domEvent: e,
          trigger: 'mouseleave'
        });
      }
    };
    parentMenu.menuItemMouseLeaveTimer = setTimeout(parentMenu.menuItemMouseLeaveFn, 30);
    props.onMouseLeave({
      key: eventKey,
      domEvent: e
    });
  };

  MenuItem.prototype.onMouseEnter = function onMouseEnter(e) {
    var props = this.props;
    var eventKey = props.eventKey,
        parentMenu = props.parentMenu;

    this.clearMenuItemMouseLeaveTimer(parentMenu.menuItemInstance !== this);
    if (parentMenu.subMenuInstance) {
      parentMenu.subMenuInstance.clearSubMenuTimers();
    }
    props.onItemHover({
      key: eventKey,
      item: this,
      hover: true,
      domEvent: e,
      trigger: 'mouseenter'
    });
    props.onMouseEnter({
      key: eventKey,
      domEvent: e
    });
  };

  MenuItem.prototype.onClick = function onClick(e) {
    var props = this.props;
    var selected = this.isSelected();
    var eventKey = props.eventKey;
    var info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e
    };
    props.onClick(info);
    if (props.multiple) {
      if (selected) {
        props.onDeselect(info);
      } else {
        props.onSelect(info);
      }
    } else if (!selected) {
      props.onSelect(info);
    }
  };

  MenuItem.prototype.getPrefixCls = function getPrefixCls() {
    return this.props.rootPrefixCls + '-item';
  };

  MenuItem.prototype.getActiveClassName = function getActiveClassName() {
    return this.getPrefixCls() + '-active';
  };

  MenuItem.prototype.getSelectedClassName = function getSelectedClassName() {
    return this.getPrefixCls() + '-selected';
  };

  MenuItem.prototype.getDisabledClassName = function getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  };

  MenuItem.prototype.clearMenuItemMouseLeaveTimer = function clearMenuItemMouseLeaveTimer() {
    var props = this.props;
    var callFn = void 0;
    var parentMenu = props.parentMenu;
    if (parentMenu.menuItemMouseLeaveTimer) {
      clearTimeout(parentMenu.menuItemMouseLeaveTimer);
      parentMenu.menuItemMouseLeaveTimer = null;
      if (callFn && parentMenu.menuItemMouseLeaveFn) {
        parentMenu.menuItemMouseLeaveFn();
      }
      parentMenu.menuItemMouseLeaveFn = null;
    }
  };

  MenuItem.prototype.isSelected = function isSelected() {
    return this.props.selectedKeys.indexOf(this.props.eventKey) !== -1;
  };

  MenuItem.prototype.render = function render() {
    var props = this.props;
    var selected = this.isSelected();
    var classes = {};
    classes[this.getActiveClassName()] = !props.disabled && props.active;
    classes[this.getSelectedClassName()] = selected;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getPrefixCls()] = true;
    classes[props.className] = !!props.className;
    var attrs = _extends({}, props.attribute, {
      title: props.title ? props.title : typeof props.children === 'string' ? props.children : "",
      className: (0, _classnames2["default"])(classes),
      role: 'menuitem',
      'aria-selected': selected,
      'aria-disabled': props.disabled
    });
    var mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter
      };
    }
    var style = _extends({}, props.style);
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return _react2["default"].createElement(
      'li',
      _extends({
        style: style
      }, attrs, mouseEvent),
      props.children
    );
  };

  return MenuItem;
}(_react.Component);

;

MenuItem.isMenuItem = 1;

MenuItem.defaultProps = defaultProps;
MenuItem.propTypes = propTypes;

exports["default"] = MenuItem;
module.exports = exports['default'];