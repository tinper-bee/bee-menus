'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeAnimate = require('bee-animate');

var _beeAnimate2 = _interopRequireDefault(_beeAnimate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createChainedFunction = require('tinper-bee-core/lib/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _util = require('./util');

var _DOMWrap = require('./DOMWrap');

var _DOMWrap2 = _interopRequireDefault(_DOMWrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }
  return arr.every(function (c) {
    return !!c.props.disabled;
  });
}

function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found = void 0;
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (c && !c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, eventKey, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (props.defaultActiveFirst) {
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, eventKey, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

function saveRef(index, subIndex, c) {
  if (c) {
    if (subIndex !== undefined) {
      this.instanceArray[index] = this.instanceArray[index] || [];
      this.instanceArray[index][subIndex] = c;
    } else {
      this.instanceArray[index] = c;
    }
  }
}

var propTypes = {
  onSelect: _propTypes2["default"].func,
  onClick: _propTypes2["default"].func,
  onDeselect: _propTypes2["default"].func,
  onOpenChange: _propTypes2["default"].func,
  onDestroy: _propTypes2["default"].func,
  openTransitionName: _propTypes2["default"].string,
  openAnimation: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].object]),
  openKeys: _propTypes2["default"].array,
  closeSubMenuOnMouseLeave: _propTypes2["default"].bool,
  visible: _propTypes2["default"].bool,
  children: _propTypes2["default"].any
};

var SubPopupMenu = function (_Component) {
  _inherits(SubPopupMenu, _Component);

  function SubPopupMenu(props) {
    _classCallCheck(this, SubPopupMenu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      activeKey: getActiveKey(_this.props, _this.props.activeKey)
    };
    _this.getOpenChangesOnItemHover = _this.getOpenChangesOnItemHover.bind(_this);
    _this.onDeselect = _this.onDeselect.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onOpenChange = _this.onOpenChange.bind(_this);
    _this.onDestroy = _this.onDestroy.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);

    _this.onItemHover = _this.onItemHover.bind(_this);
    _this.getOpenTransitionName = _this.getOpenTransitionName.bind(_this);
    _this.renderMenuItem = _this.renderMenuItem.bind(_this);

    _this.getFlatInstanceArray = _this.getFlatInstanceArray.bind(_this);
    _this.renderCommonMenuItem = _this.renderCommonMenuItem.bind(_this);
    _this.renderRoot = _this.renderRoot.bind(_this);

    return _this;
  }

  SubPopupMenu.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var props = void 0;
    if ('activeKey' in nextProps) {
      props = {
        activeKey: getActiveKey(nextProps, nextProps.activeKey)
      };
    } else {
      var originalActiveKey = this.state.activeKey;
      var activeKey = getActiveKey(nextProps, originalActiveKey);
      // fix: this.setState(), parent.render(),
      if (activeKey !== originalActiveKey) {
        props = {
          activeKey: activeKey
        };
      }
    }
    if (props) {
      this.setState(props);
    }
  };

  SubPopupMenu.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  };

  SubPopupMenu.prototype.onDeselect = function onDeselect(selectInfo) {
    this.props.onDeselect(selectInfo);
  };

  SubPopupMenu.prototype.onSelect = function onSelect(selectInfo) {
    this.props.onSelect(selectInfo);
  };

  SubPopupMenu.prototype.onClick = function onClick(e) {
    this.props.onClick(e);
  };

  SubPopupMenu.prototype.onOpenChange = function onOpenChange(e) {
    this.props.onOpenChange(e);
  };

  SubPopupMenu.prototype.onDestroy = function onDestroy(key) {
    this.props.onDestroy(key);
  };

  SubPopupMenu.prototype.onItemHover = function onItemHover(e) {
    var _e$openChanges = e.openChanges,
        openChanges = _e$openChanges === undefined ? [] : _e$openChanges;

    openChanges = openChanges.concat(this.getOpenChangesOnItemHover(e));
    if (openChanges.length) {
      this.onOpenChange(openChanges);
    }
  };

  SubPopupMenu.prototype.getOpenTransitionName = function getOpenTransitionName() {
    return this.props.openTransitionName;
  };

  SubPopupMenu.prototype.renderMenuItem = function renderMenuItem(c, i, subIndex) {
    var props = this.props;
    var extraProps = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
      openSubMenuOnMouseEnter: true
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
  };

  SubPopupMenu.prototype.getOpenChangesOnItemHover = function getOpenChangesOnItemHover(e) {
    var mode = this.props.mode;
    var key = e.key,
        hover = e.hover,
        trigger = e.trigger;

    var activeKey = this.state.activeKey;
    if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
      this.setState({
        activeKey: hover ? key : null
      });
    } else {}
    // keep active for sub menu for click active
    // empty

    // clear last open status
    if (hover && mode !== 'inline') {
      var activeItem = this.getFlatInstanceArray().filter(function (c) {
        return c && c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
        return {
          item: activeItem,
          originalEvent: e,
          key: activeItem.props.eventKey,
          open: false
        };
      }
    }
    return [];
  };

  SubPopupMenu.prototype.renderCommonMenuItem = function renderCommonMenuItem(child, i, subIndex, extraProps) {
    var state = this.state;
    var props = this.props;
    var key = (0, _util.getKeyFromChildrenIndex)(child, props.eventKey, i);
    var childProps = child.props;
    var isActive = key === state.activeKey;
    var newChildProps = _extends({
      mode: props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: this.renderMenuItem,
      rootPrefixCls: props.prefixCls,
      index: i,
      parentMenu: this,
      ref: childProps.disabled ? undefined : (0, _createChainedFunction2["default"])(child.ref, saveRef.bind(this, i, subIndex)),
      eventKey: key,
      closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
      onItemHover: this.onItemHover,
      active: !childProps.disabled && isActive,
      multiple: props.multiple,
      onClick: this.onClick,
      openTransitionName: this.getOpenTransitionName(),
      openAnimation: props.openAnimation,
      onOpenChange: this.onOpenChange,
      onDeselect: this.onDeselect,
      onDestroy: this.onDestroy,
      onSelect: this.onSelect
    }, extraProps);
    if (props.mode === 'inline') {
      newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
    }
    return _react2["default"].cloneElement(child, newChildProps);
  };

  SubPopupMenu.prototype.getFlatInstanceArray = function getFlatInstanceArray() {
    var instanceArray = this.instanceArray;
    var hasInnerArray = instanceArray.some(function (a) {
      return Array.isArray(a);
    });
    if (hasInnerArray) {
      instanceArray = [];
      this.instanceArray.forEach(function (a) {
        if (Array.isArray(a)) {
          instanceArray.push.apply(instanceArray, a);
        } else {
          instanceArray.push(a);
        }
      });
      this.instanceArray = instanceArray;
    }
    return instanceArray;
  };

  SubPopupMenu.prototype.renderRoot = function renderRoot(props) {
    var _classes;

    this.instanceArray = [];
    var classes = (_classes = {}, _defineProperty(_classes, props.prefixCls, 1), _defineProperty(_classes, props.prefixCls + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
    var domProps = {
      className: (0, _classnames2["default"])(classes),
      role: 'menu',
      'aria-activedescendant': ''
    };
    if (props.id) {
      domProps.id = props.id;
    }
    if (props.focusable) {
      domProps.tabIndex = '0';
      domProps.onKeyDown = this.onKeyDown;
    }
    return (
      // ESLint is not smart enough to know that the type of `children` was checked.
      /* eslint-disable */
      _react2["default"].createElement(
        _DOMWrap2["default"],
        _extends({
          style: props.style,
          tag: 'ul',
          hiddenClassName: props.prefixCls + '-hidden',
          visible: props.visible
        }, domProps),
        _react2["default"].Children.map(props.children, this.renderMenuItem.bind(this))
      )
      /*eslint-enable */

    );
  };

  SubPopupMenu.prototype.render = function render() {
    var renderFirst = this.renderFirst;
    this.renderFirst = 1;
    this.haveOpened = this.haveOpened || this.props.visible;
    if (!this.haveOpened) {
      return null;
    }
    var transitionAppear = true;
    if (!renderFirst && this.props.visible) {
      transitionAppear = false;
    }
    var props = _extends({}, this.props);
    props.className += ' ' + props.prefixCls + '-sub';
    var animProps = {};
    if (props.openTransitionName) {
      animProps.transitionName = props.openTransitionName;
    } else if (_typeof(props.openAnimation) === 'object') {
      animProps.animation = _extends({}, props.openAnimation);
      if (!transitionAppear) {
        delete animProps.animation.appear;
      }
    }
    return _react2["default"].createElement(
      _beeAnimate2["default"],
      _extends({}, animProps, {
        showProp: 'visible',
        component: '',
        transitionAppear: transitionAppear
      }),
      this.renderRoot(props)
    );
  };

  return SubPopupMenu;
}(_react.Component);

;
SubPopupMenu.propTypes = propTypes;
exports["default"] = SubPopupMenu;
module.exports = exports['default'];