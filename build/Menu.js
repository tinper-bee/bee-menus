'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('./util');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DOMWrap = require('./DOMWrap');

var _DOMWrap2 = _interopRequireDefault(_DOMWrap);

var _tinperBeeCore = require('tinper-bee-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

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

var propTypes = {

  openSubMenuOnMouseEnter: _propTypes2["default"].bool,
  closeSubMenuOnMouseLeave: _propTypes2["default"].bool,
  selectedKeys: _propTypes2["default"].oneOfType([_propTypes2["default"].array, _propTypes2["default"].string]),
  defaultSelectedKeys: _propTypes2["default"].arrayOf(_propTypes2["default"].string),
  defaultOpenKeys: _propTypes2["default"].arrayOf(_propTypes2["default"].string),
  openKeys: _propTypes2["default"].arrayOf(_propTypes2["default"].string),
  mode: _propTypes2["default"].string,
  onClick: _propTypes2["default"].func,
  onSelect: _propTypes2["default"].func,
  onDeselect: _propTypes2["default"].func,
  onDestroy: _propTypes2["default"].func,
  openTransitionName: _propTypes2["default"].string,
  openAnimation: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].object]),
  level: _propTypes2["default"].number,
  eventKey: _propTypes2["default"].string,
  selectable: _propTypes2["default"].bool,
  children: _propTypes2["default"].any,

  focusable: _propTypes2["default"].bool,
  multiple: _propTypes2["default"].bool,
  style: _propTypes2["default"].object,
  defaultActiveFirst: _propTypes2["default"].bool,
  visible: _propTypes2["default"].bool,
  activeKey: _propTypes2["default"].string

};
var defaultProps = {
  openSubMenuOnMouseEnter: true,
  closeSubMenuOnMouseLeave: true,
  selectable: true,
  onClick: _util.noop,
  onSelect: _util.noop,
  onOpenChange: _util.noop,
  onDeselect: _util.noop,
  defaultSelectedKeys: [],
  defaultOpenKeys: [],

  clsPrefix: 'u-menu',
  className: '',
  mode: 'vertical',
  level: 1,
  inlineIndent: 24,
  visible: true,
  focusable: true,
  style: {}
};

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var selectedKeys = _this.props.defaultSelectedKeys;
    var openKeys = _this.props.defaultOpenKeys;
    if ('selectedKeys' in _this.props) {
      selectedKeys = _this.props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = _this.props.openKeys || [];
    }

    _this.state = {
      selectedKeys: selectedKeys,
      openKeys: openKeys,
      activeKey: getActiveKey(_this.props, _this.props.activeKey)
      //activeKey: getActiveKey(this.props, this.props.activeKey),
    };
    _this.renderMenuItem = _this.renderMenuItem.bind(_this);
    _this.onDestroy = _this.onDestroy.bind(_this);
    _this.onItemHover = _this.onItemHover.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);
    _this.onOpenChange = _this.onOpenChange.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onDeselect = _this.onDeselect.bind(_this);
    _this.getOpenTransitionName = _this.getOpenTransitionName.bind(_this);
    _this.isInlineMode = _this.isInlineMode.bind(_this);
    _this.lastOpenSubMenu = _this.lastOpenSubMenu.bind(_this);
    _this.renderMenuItem = _this.renderMenuItem.bind(_this);

    _this.renderCommonMenuItem = _this.renderCommonMenuItem.bind(_this);
    _this.renderRoot = _this.renderRoot.bind(_this);
    _this.getOpenChangesOnItemHover = _this.getOpenChangesOnItemHover.bind(_this);
    _this.getFlatInstanceArray = _this.getFlatInstanceArray.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.step = _this.step.bind(_this);

    return _this;
  }

  Menu.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys;
    }
    if ('openKeys' in nextProps) {
      props.openKeys = nextProps.openKeys;
    }

    if ('activeKey' in nextProps) {
      props.activeKey = getActiveKey(nextProps, nextProps.activeKey);
    } else {
      var originalActiveKey = this.state.activeKey;
      var activeKey = getActiveKey(nextProps, originalActiveKey);
      // fix: this.setState(), parent.render(),
      if (activeKey !== originalActiveKey) {
        props.activeKey = activeKey;
      }
    }

    this.setState(props);
  };

  Menu.prototype.componentWillMount = function componentWillMount() {
    this.instanceArray = [];
  };

  Menu.prototype.onDestroy = function onDestroy(key) {
    var state = this.state;
    var props = this.props;
    var selectedKeys = state.selectedKeys;
    var openKeys = state.openKeys;
    var index = selectedKeys.indexOf(key);
    if (!('selectedKeys' in props) && index !== -1) {
      selectedKeys.splice(index, 1);
    }
    index = openKeys.indexOf(key);
    if (!('openKeys' in props) && index !== -1) {
      openKeys.splice(index, 1);
    }
  };

  Menu.prototype.onItemHover = function onItemHover(e) {
    var item = e.item;
    var _props = this.props,
        mode = _props.mode,
        closeSubMenuOnMouseLeave = _props.closeSubMenuOnMouseLeave;
    var _e$openChanges = e.openChanges,
        openChanges = _e$openChanges === undefined ? [] : _e$openChanges;
    // special for top sub menu

    if (mode !== 'inline' && !closeSubMenuOnMouseLeave && item.isSubMenu) {
      var activeKey = this.state.activeKey;
      var activeItem = this.getFlatInstanceArray().filter(function (c) {
        return c && c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.props.open) {
        openChanges = openChanges.concat({
          key: item.props.eventKey,
          item: item,
          originalEvent: e,
          open: true
        });
      }
    }
    openChanges = openChanges.concat(this.getOpenChangesOnItemHover(e));
    if (openChanges.length) {
      this.onOpenChange(openChanges);
    }
  };

  Menu.prototype.onSelect = function onSelect(selectInfo) {
    var props = this.props;
    if (props.selectable) {
      // root menu
      var selectedKeys = this.state.selectedKeys;
      var selectedKey = selectInfo.key;
      if (props.multiple) {
        selectedKeys = selectedKeys.concat([selectedKey]);
      } else {
        selectedKeys = [selectedKey];
      }
      if (!('selectedKeys' in props)) {
        this.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onSelect(_extends({}, selectInfo, {
        selectedKeys: selectedKeys
      }));
    }
  };

  Menu.prototype.onClick = function onClick(e) {
    this.props.onClick(e);
  };

  Menu.prototype.onOpenChange = function onOpenChange(e_) {
    var props = this.props;
    var openKeys = this.state.openKeys.concat();
    var changed = false;
    var processSingle = function processSingle(e) {
      var oneChanged = false;
      if (e.open) {
        oneChanged = openKeys.indexOf(e.key) === -1;
        if (oneChanged) {
          openKeys.push(e.key);
        }
      } else {
        var index = openKeys.indexOf(e.key);
        oneChanged = index !== -1;
        if (oneChanged) {
          openKeys.splice(index, 1);
        }
      }
      changed = changed || oneChanged;
    };
    if (Array.isArray(e_)) {
      // batch change call
      e_.forEach(processSingle);
    } else {
      processSingle(e_);
    }
    if (changed) {
      if (!('openKeys' in this.props)) {
        this.setState({ openKeys: openKeys });
      }
      props.onOpenChange(openKeys);
    }
  };

  Menu.prototype.onDeselect = function onDeselect(selectInfo) {
    var props = this.props;
    if (props.selectable) {
      var selectedKeys = this.state.selectedKeys.concat();
      var selectedKey = selectInfo.key;
      var index = selectedKeys.indexOf(selectedKey);
      if (index !== -1) {
        selectedKeys.splice(index, 1);
      }
      if (!('selectedKeys' in props)) {
        this.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onDeselect(_extends({}, selectInfo, {
        selectedKeys: selectedKeys
      }));
    }
  };

  Menu.prototype.getOpenTransitionName = function getOpenTransitionName() {
    var props = this.props;
    var transitionName = props.openTransitionName;
    var animationName = props.openAnimation;
    if (!transitionName && typeof animationName === 'string') {
      transitionName = props.clsPrefix + '-open-' + animationName;
    }
    return transitionName;
  };

  Menu.prototype.isInlineMode = function isInlineMode() {
    return this.props.mode === 'inline';
  };

  Menu.prototype.lastOpenSubMenu = function lastOpenSubMenu() {
    var lastOpen = [];
    var openKeys = this.state.openKeys;

    if (openKeys.length) {
      lastOpen = this.getFlatInstanceArray().filter(function (c) {
        return c && openKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  };

  Menu.prototype.renderMenuItem = function renderMenuItem(c, i, subIndex) {
    if (!c) {
      return null;
    }
    var state = this.state;
    var extraProps = {
      openKeys: state.openKeys,
      selectedKeys: state.selectedKeys,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
  };

  Menu.prototype.renderCommonMenuItem = function renderCommonMenuItem(child, i, subIndex, extraProps) {
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
      rootPrefixCls: props.clsPrefix,
      index: i,
      parentMenu: this,
      ref: childProps.disabled ? undefined : (0, _tinperBeeCore.createChainedFunction)(child.ref, saveRef.bind(this, i, subIndex)),
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

  Menu.prototype.getOpenChangesOnItemHover = function getOpenChangesOnItemHover(e) {
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

  Menu.prototype.getFlatInstanceArray = function getFlatInstanceArray() {
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

  Menu.prototype.step = function step(direction) {
    var children = this.getFlatInstanceArray();
    var activeKey = this.state.activeKey;
    var len = children.length;
    if (!len) {
      return null;
    }
    if (direction < 0) {
      children = children.concat().reverse();
    }
    // find current activeIndex
    var activeIndex = -1;
    children.every(function (c, ci) {
      if (c && c.props.eventKey === activeKey) {
        activeIndex = ci;
        return false;
      }
      return true;
    });
    if (!this.props.defaultActiveFirst && activeIndex !== -1) {
      if (allDisabled(children.slice(activeIndex, len - 1))) {
        return undefined;
      }
    }
    var start = (activeIndex + 1) % len;
    var i = start;
    for (;;) {
      var child = children[i];
      if (!child || child.props.disabled) {
        i = (i + 1 + len) % len;
        // complete a loop
        if (i === start) {
          return null;
        }
      } else {
        return child;
      }
    }
  };

  Menu.prototype.onKeyDown = function onKeyDown(e) {
    var _this2 = this;

    var keyCode = e.keyCode;
    var handled = void 0;
    this.getFlatInstanceArray().forEach(function (obj) {
      if (obj && obj.props.active) {
        handled = obj.onKeyDown(e);
      }
    });
    if (handled) {
      return 1;
    }
    var activeItem = null;
    if (keyCode === _tinperBeeCore.KeyCode.UP || keyCode === _tinperBeeCore.KeyCode.DOWN) {
      activeItem = this.step(keyCode === _tinperBeeCore.KeyCode.UP ? -1 : 1);
    }
    if (activeItem) {
      e.preventDefault();
      this.setState({
        activeKey: activeItem.props.eventKey
      }, function () {
        scrollIntoView(ReactDOM.findDOMNode(activeItem), ReactDOM.findDOMNode(_this2), {
          onlyScrollIfNeeded: true
        });
      });
      return 1;
    } else if (activeItem === undefined) {
      e.preventDefault();
      this.setState({
        activeKey: null
      });
      return 1;
    }
  };

  Menu.prototype.renderRoot = function renderRoot(props) {
    var _classes;

    this.instanceArray = [];
    var classes = (_classes = {}, _defineProperty(_classes, props.clsPrefix, 1), _defineProperty(_classes, props.clsPrefix + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
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
          hiddenClassName: props.clsPrefix + '-hidden',
          visible: props.visible
        }, domProps),
        _react2["default"].Children.map(props.children, this.renderMenuItem.bind(this))
      )
      /*eslint-enable */

    );
  };

  Menu.prototype.render = function render() {
    var props = _extends({}, this.props);
    props.className += ' ' + props.clsPrefix + '-root';
    return this.renderRoot(props);
  };

  return Menu;
}(_react.Component);

;

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

exports["default"] = Menu;
module.exports = exports['default'];