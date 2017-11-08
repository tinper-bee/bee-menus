'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _SubPopupMenu = require('./SubPopupMenu');

var _SubPopupMenu2 = _interopRequireDefault(_SubPopupMenu);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var guid = 0;

var propTypes = {
  parentMenu: _propTypes2["default"].object,
  title: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].node]),
  children: _propTypes2["default"].any,
  selectedKeys: _propTypes2["default"].array,
  openKeys: _propTypes2["default"].array,
  onClick: _propTypes2["default"].func,
  onOpenChange: _propTypes2["default"].func,
  rootPrefixCls: _propTypes2["default"].string,
  eventKey: _propTypes2["default"].string,
  multiple: _propTypes2["default"].bool,
  active: _propTypes2["default"].bool,
  onSelect: _propTypes2["default"].func,
  closeSubMenuOnMouseLeave: _propTypes2["default"].bool,
  openSubMenuOnMouseEnter: _propTypes2["default"].bool,
  onDeselect: _propTypes2["default"].func,
  onDestroy: _propTypes2["default"].func,
  onItemHover: _propTypes2["default"].func,
  onMouseEnter: _propTypes2["default"].func,
  onMouseLeave: _propTypes2["default"].func,
  onTitleMouseEnter: _propTypes2["default"].func,
  onTitleMouseLeave: _propTypes2["default"].func,
  onTitleClick: _propTypes2["default"].func
};
var defaultProps = {
  onMouseEnter: _util.noop,
  onMouseLeave: _util.noop,
  onTitleMouseEnter: _util.noop,
  onTitleMouseLeave: _util.noop,
  onTitleClick: _util.noop,
  title: ''
};

var SubMenu = function (_Component) {
  _inherits(SubMenu, _Component);

  function SubMenu(props) {
    _classCallCheck(this, SubMenu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.isSubMenu = 1;
    _this.state = {
      defaultActiveFirst: false
    };

    _this.onDestroy = _this.onDestroy.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onOpenChange = _this.onOpenChange.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onTitleMouseEnter = _this.onTitleMouseEnter.bind(_this);

    _this.onTitleMouseLeave = _this.onTitleMouseLeave.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    _this.onTitleClick = _this.onTitleClick.bind(_this);
    _this.onSubMenuClick = _this.onSubMenuClick.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);
    _this.onDeselect = _this.onDeselect.bind(_this);

    _this.getPrefixCls = _this.getPrefixCls.bind(_this);
    _this.getActiveClassName = _this.getActiveClassName.bind(_this);
    _this.getSelectedClassName = _this.getSelectedClassName.bind(_this);

    _this.getDisabledClassName = _this.getDisabledClassName.bind(_this);
    _this.getOpenClassName = _this.getOpenClassName.bind(_this);
    _this.saveMenuInstance = _this.saveMenuInstance.bind(_this);
    _this.addKeyPath = _this.addKeyPath.bind(_this);
    _this.triggerOpenChange = _this.triggerOpenChange.bind(_this);
    _this.clearSubMenuTimers = _this.clearSubMenuTimers.bind(_this);

    _this.clearSubMenuLeaveTimer = _this.clearSubMenuLeaveTimer.bind(_this);
    _this.clearSubMenuTitleLeaveTimer = _this.clearSubMenuTitleLeaveTimer.bind(_this);
    _this.isChildrenSelected = _this.isChildrenSelected.bind(_this);
    _this.isOpen = _this.isOpen.bind(_this);
    _this.renderChildren = _this.renderChildren.bind(_this);
    return _this;
  }

  SubMenu.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props = this.props,
        onDestroy = _props.onDestroy,
        eventKey = _props.eventKey,
        parentMenu = _props.parentMenu;

    this.mounted = true;
    if (onDestroy) {
      onDestroy(eventKey);
    }
    if (parentMenu.subMenuInstance === this) {
      this.clearSubMenuTimers();
    }
  };

  SubMenu.prototype.componentDidMount = function componentDidMount() {
    this.mounted = true;
  };

  SubMenu.prototype.onDestroy = function onDestroy(key) {
    this.props.onDestroy(key);
  };

  SubMenu.prototype.onKeyDown = function onKeyDown(e) {
    var keyCode = e.keyCode;
    var menu = this.menuInstance;
    var isOpen = this.isOpen();

    if (keyCode === _keyCode2["default"].ENTER) {
      this.onTitleClick(e);
      this.setState({
        defaultActiveFirst: true
      });
      return true;
    }

    if (keyCode === _keyCode2["default"].RIGHT) {
      if (isOpen) {
        menu.onKeyDown(e);
      } else {
        this.triggerOpenChange(true);
        this.setState({
          defaultActiveFirst: true
        });
      }
      return true;
    }
    if (keyCode === _keyCode2["default"].LEFT) {
      var handled = void 0;
      if (isOpen) {
        handled = menu.onKeyDown(e);
      } else {
        return undefined;
      }
      if (!handled) {
        this.triggerOpenChange(false);
        handled = true;
      }
      return handled;
    }

    if (isOpen && (keyCode === _keyCode2["default"].UP || keyCode === _keyCode2["default"].DOWN)) {
      return menu.onKeyDown(e);
    }
  };

  SubMenu.prototype.onOpenChange = function onOpenChange(e) {
    this.props.onOpenChange(e);
  };

  SubMenu.prototype.onMouseEnter = function onMouseEnter(e) {
    var props = this.props;
    this.clearSubMenuLeaveTimer(props.parentMenu.subMenuInstance !== this);
    props.onMouseEnter({
      key: props.eventKey,
      domEvent: e
    });
  };

  SubMenu.prototype.onTitleMouseEnter = function onTitleMouseEnter(domEvent) {
    var props = this.props;
    var parentMenu = props.parentMenu,
        key = props.eventKey;

    var item = this;
    this.clearSubMenuTitleLeaveTimer(parentMenu.subMenuInstance !== item);
    if (parentMenu.menuItemInstance) {
      parentMenu.menuItemInstance.clearMenuItemMouseLeaveTimer(true);
    }
    var openChanges = [];
    if (props.openSubMenuOnMouseEnter) {
      openChanges.push({
        key: key,
        item: item,
        trigger: 'mouseenter',
        open: true
      });
    }
    props.onItemHover({
      key: key,
      item: item,
      hover: true,
      trigger: 'mouseenter',
      openChanges: openChanges
    });
    this.setState({
      defaultActiveFirst: false
    });
    props.onTitleMouseEnter({
      key: key,
      domEvent: domEvent
    });
  };

  SubMenu.prototype.onTitleMouseLeave = function onTitleMouseLeave(e) {
    var _this2 = this;

    var props = this.props;
    var parentMenu = props.parentMenu,
        eventKey = props.eventKey;

    parentMenu.subMenuInstance = this;
    parentMenu.subMenuTitleLeaveFn = function () {
      if (_this2.mounted) {
        // leave whole sub tree
        // still active
        if (props.mode === 'inline' && props.active) {
          props.onItemHover({
            key: eventKey,
            item: _this2,
            hover: false,
            trigger: 'mouseleave'
          });
        }
        props.onTitleMouseLeave({
          key: props.eventKey,
          domEvent: e
        });
      }
    };
    parentMenu.subMenuTitleLeaveTimer = setTimeout(parentMenu.subMenuTitleLeaveFn, 100);
  };

  SubMenu.prototype.onMouseLeave = function onMouseLeave(e) {
    var _this3 = this;

    var props = this.props;
    var parentMenu = props.parentMenu,
        eventKey = props.eventKey;

    parentMenu.subMenuInstance = this;
    parentMenu.subMenuLeaveFn = function () {
      if (_this3.mounted) {
        // leave whole sub tree
        // still active
        if (props.mode !== 'inline') {
          var isOpen = _this3.isOpen();
          if (isOpen && props.closeSubMenuOnMouseLeave && props.active) {
            props.onItemHover({
              key: eventKey,
              item: _this3,
              hover: false,
              trigger: 'mouseleave',
              openChanges: [{
                key: eventKey,
                item: _this3,
                trigger: 'mouseleave',
                open: false
              }]
            });
          } else {
            if (props.active) {
              props.onItemHover({
                key: eventKey,
                item: _this3,
                hover: false,
                trigger: 'mouseleave'
              });
            }
            if (isOpen && props.closeSubMenuOnMouseLeave) {
              _this3.triggerOpenChange(false);
            }
          }
        }
        // trigger mouseleave
        props.onMouseLeave({
          key: eventKey,
          domEvent: e
        });
      }
    };
    // prevent popup menu and submenu gap
    parentMenu.subMenuLeaveTimer = setTimeout(parentMenu.subMenuLeaveFn, 100);
  };

  SubMenu.prototype.onTitleClick = function onTitleClick(e) {
    var props = this.props;

    props.onTitleClick({
      key: props.eventKey,
      domEvent: e
    });
    if (props.openSubMenuOnMouseEnter) {
      return;
    }
    this.triggerOpenChange(!this.isOpen(), 'click');
    this.setState({
      defaultActiveFirst: false
    });
  };

  SubMenu.prototype.onSubMenuClick = function onSubMenuClick(info) {
    this.props.onClick(this.addKeyPath(info));
  };

  SubMenu.prototype.onSelect = function onSelect(info) {
    this.props.onSelect(info);
  };

  SubMenu.prototype.onDeselect = function onDeselect(info) {
    this.props.onDeselect(info);
  };

  SubMenu.prototype.getPrefixCls = function getPrefixCls() {
    return this.props.rootPrefixCls + '-submenu';
  };

  SubMenu.prototype.getActiveClassName = function getActiveClassName() {
    return this.getPrefixCls() + '-active';
  };

  SubMenu.prototype.getDisabledClassName = function getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  };

  SubMenu.prototype.getSelectedClassName = function getSelectedClassName() {
    return this.getPrefixCls() + '-selected';
  };

  SubMenu.prototype.getOpenClassName = function getOpenClassName() {
    return this.props.rootPrefixCls + '-submenu-open';
  };

  SubMenu.prototype.saveMenuInstance = function saveMenuInstance(c) {
    this.menuInstance = c;
  };

  SubMenu.prototype.addKeyPath = function addKeyPath(info) {
    return _extends({}, info, {
      keyPath: (info.keyPath || []).concat(this.props.eventKey)
    });
  };

  SubMenu.prototype.triggerOpenChange = function triggerOpenChange(open, type) {
    var key = this.props.eventKey;
    this.onOpenChange({
      key: key,
      item: this,
      trigger: type,
      open: open
    });
  };

  SubMenu.prototype.clearSubMenuTimers = function clearSubMenuTimers() {
    var callFn = void 0;
    this.clearSubMenuLeaveTimer(callFn);
    this.clearSubMenuTitleLeaveTimer(callFn);
  };

  SubMenu.prototype.clearSubMenuTitleLeaveTimer = function clearSubMenuTitleLeaveTimer() {
    var callFn = void 0;
    var parentMenu = this.props.parentMenu;
    if (parentMenu.subMenuTitleLeaveTimer) {
      clearTimeout(parentMenu.subMenuTitleLeaveTimer);
      parentMenu.subMenuTitleLeaveTimer = null;
      if (callFn && parentMenu.subMenuTitleLeaveFn) {
        parentMenu.subMenuTitleLeaveFn();
      }
      parentMenu.subMenuTitleLeaveFn = null;
    }
  };

  SubMenu.prototype.clearSubMenuLeaveTimer = function clearSubMenuLeaveTimer() {
    var callFn = void 0;
    var parentMenu = this.props.parentMenu;
    if (parentMenu.subMenuLeaveTimer) {
      clearTimeout(parentMenu.subMenuLeaveTimer);
      parentMenu.subMenuLeaveTimer = null;
      if (callFn && parentMenu.subMenuLeaveFn) {
        parentMenu.subMenuLeaveFn();
      }
      parentMenu.subMenuLeaveFn = null;
    }
  };

  SubMenu.prototype.isChildrenSelected = function isChildrenSelected() {
    var ret = { find: false };
    (0, _util.loopMenuItemRecusively)(this.props.children, this.props.selectedKeys, ret);
    return ret.find;
  };

  SubMenu.prototype.isOpen = function isOpen() {
    return this.props.openKeys.indexOf(this.props.eventKey) !== -1;
  };

  SubMenu.prototype.renderChildren = function renderChildren(children) {
    var props = this.props;
    var baseProps = {
      mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
      visible: this.isOpen(),
      level: props.level + 1,
      inlineIndent: props.inlineIndent,
      focusable: false,
      onClick: this.onSubMenuClick,
      onSelect: this.onSelect,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      selectedKeys: props.selectedKeys,
      eventKey: props.eventKey + '-menu-',
      openKeys: props.openKeys,
      openTransitionName: props.openTransitionName,
      openAnimation: props.openAnimation,
      onOpenChange: this.onOpenChange,
      closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
      defaultActiveFirst: this.state.defaultActiveFirst,
      multiple: props.multiple,
      prefixCls: props.rootPrefixCls,
      id: this._menuId,
      ref: this.saveMenuInstance
    };
    return _react2["default"].createElement(
      _SubPopupMenu2["default"],
      baseProps,
      children
    );
  };

  SubMenu.prototype.render = function render() {
    var _classes;

    var isOpen = this.isOpen();
    this.haveOpen = this.haveOpen || isOpen;
    var props = this.props;
    var prefixCls = this.getPrefixCls();
    var classes = (_classes = {}, _defineProperty(_classes, props.className, !!props.className), _defineProperty(_classes, prefixCls + '-' + props.mode, 1), _classes);

    classes[this.getOpenClassName()] = isOpen;
    classes[this.getActiveClassName()] = props.active;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getSelectedClassName()] = this.isChildrenSelected();

    if (!this._menuId) {
      if (props.eventKey) {
        this._menuId = props.eventKey + '$Menu';
      } else {
        this._menuId = '$__$' + ++guid + '$Menu';
      }
    }

    classes[prefixCls] = true;
    classes[prefixCls + '-' + props.mode] = 1;
    var titleClickEvents = {};
    var mouseEvents = {};
    var titleMouseEvents = {};
    if (!props.disabled) {
      titleClickEvents = {
        onClick: this.onTitleClick
      };
      mouseEvents = {
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter
      };
      // only works in title, not outer li
      titleMouseEvents = {
        onMouseEnter: this.onTitleMouseEnter,
        onMouseLeave: this.onTitleMouseLeave
      };
    }
    var style = {};
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return _react2["default"].createElement(
      'li',
      _extends({ className: (0, _classnames2["default"])(classes) }, mouseEvents),
      _react2["default"].createElement(
        'div',
        _extends({
          style: style,
          className: prefixCls + '-title'
        }, titleMouseEvents, titleClickEvents, {
          'aria-expanded': isOpen,
          'aria-owns': this._menuId,
          'aria-haspopup': 'true'
        }),
        props.title
      ),
      this.renderChildren(props.children)
    );
  };

  return SubMenu;
}(_react.Component);

;

SubMenu.propTypes = propTypes;
SubMenu.defaultProps = defaultProps;
SubMenu.isSubMenu = 1;

exports["default"] = SubMenu;
module.exports = exports['default'];