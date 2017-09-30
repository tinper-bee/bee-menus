import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop,getKeyFromChildrenIndex, loopMenuItem  } from './util';
import classnames from 'classnames';
import DOMWrap from './DOMWrap';
import { createChainedFunction, KeyCode } from 'tinper-bee-core';

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
  return arr.every(c => !!c.props.disabled);
}

function getActiveKey(props, originalActiveKey) {
  let activeKey = originalActiveKey;
  const { children, eventKey } = props;
  if (activeKey) {
    let found;
    loopMenuItem(children, (c, i) => {
      if (c && !c.props.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (props.defaultActiveFirst) {
    loopMenuItem(children, (c, i) => {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = getKeyFromChildrenIndex(c, eventKey, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

const propTypes = {

    openSubMenuOnMouseEnter: PropTypes.bool,
    closeSubMenuOnMouseLeave: PropTypes.bool,
    selectedKeys: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    openKeys: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.string,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onDestroy: PropTypes.func,
    openTransitionName: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    level: PropTypes.number,
    eventKey: PropTypes.string,
    selectable: PropTypes.bool,
    children: PropTypes.any,

    focusable: PropTypes.bool,
    multiple: PropTypes.bool,
    style: PropTypes.object,
    defaultActiveFirst: PropTypes.bool,
    visible: PropTypes.bool,
    activeKey: PropTypes.string,

}
const defaultProps = {
    openSubMenuOnMouseEnter: true,
    closeSubMenuOnMouseLeave: true,
    selectable: true,
    onClick: noop,
    onSelect: noop,
    onOpenChange: noop,
    onDeselect: noop,
    defaultSelectedKeys: [],
    defaultOpenKeys: [],

    clsPrefix: 'u-menu',
    className: '',
    mode: 'vertical',
    level: 1,
    inlineIndent: 24,
    visible: true,
    focusable: true,
    style: {},
}

class Menu extends Component{
  constructor(props) {
    super(props);
    let selectedKeys = this.props.defaultSelectedKeys;
    let openKeys = this.props.defaultOpenKeys;
    if ('selectedKeys' in this.props) {
      selectedKeys = this.props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = this.props.openKeys || [];
    }
    
    this.state = {
        selectedKeys:selectedKeys,
        openKeys:openKeys,
        activeKey: getActiveKey(this.props, this.props.activeKey)
        //activeKey: getActiveKey(this.props, this.props.activeKey),
    }
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    this.onItemHover = this.onItemHover.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.getOpenTransitionName = this.getOpenTransitionName.bind(this);
    this.isInlineMode = this.isInlineMode.bind(this);
    this.lastOpenSubMenu = this.lastOpenSubMenu.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);

    this.renderCommonMenuItem = this.renderCommonMenuItem.bind(this);
    this.renderRoot = this.renderRoot.bind(this);
    this.getOpenChangesOnItemHover = this.getOpenChangesOnItemHover.bind(this);
    this.getFlatInstanceArray = this.getFlatInstanceArray.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.step = this.step.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    const props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys;
    }
    if ('openKeys' in nextProps) {
      props.openKeys = nextProps.openKeys;
    }

    if ('activeKey' in nextProps) {
      props.activeKey = getActiveKey(nextProps, nextProps.activeKey);
    } else {
      const originalActiveKey = this.state.activeKey;
      const activeKey = getActiveKey(nextProps, originalActiveKey);
      // fix: this.setState(), parent.render(),
      if (activeKey !== originalActiveKey) {
        props.activeKey = activeKey
      }
    }

    this.setState(props);
  }
  componentWillMount() {
    this.instanceArray = [];
  }

  onDestroy(key) {
    const state = this.state;
    const props = this.props;
    const selectedKeys = state.selectedKeys;
    const openKeys = state.openKeys;
    let index = selectedKeys.indexOf(key);
    if (!('selectedKeys' in props) && index !== -1) {
      selectedKeys.splice(index, 1);
    }
    index = openKeys.indexOf(key);
    if (!('openKeys' in props) && index !== -1) {
      openKeys.splice(index, 1);
    }
  }

  onItemHover(e) {
    const { item } = e;
    const { mode, closeSubMenuOnMouseLeave } = this.props;
    let { openChanges = [] } = e;
    // special for top sub menu
    if (mode !== 'inline' && !closeSubMenuOnMouseLeave && item.isSubMenu) {
      const activeKey = this.state.activeKey;
      const activeItem = this.getFlatInstanceArray().filter((c) => {
        return c && c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.props.open) {
        openChanges = openChanges.concat({
          key: item.props.eventKey,
          item,
          originalEvent: e,
          open: true,
        });
      }
    }
    openChanges = openChanges.concat(this.getOpenChangesOnItemHover(e));
    if (openChanges.length) {
      this.onOpenChange(openChanges);
    }
  }

  onSelect(selectInfo) {
    const props = this.props;
    if (props.selectable) {
      // root menu
      let selectedKeys = this.state.selectedKeys;
      const selectedKey = selectInfo.key;
      if (props.multiple) {
        selectedKeys = selectedKeys.concat([selectedKey]);
      } else {
        selectedKeys = [selectedKey];
      }
      if (!('selectedKeys' in props)) {
        this.setState({
          selectedKeys,
        });
      }
      props.onSelect({
        ...selectInfo,
        selectedKeys,
      });
    }
  }

  onClick(e) {
    this.props.onClick(e);
  }

  onOpenChange(e_) {
    const props = this.props;
    const openKeys = this.state.openKeys.concat();
    let changed = false;
    const processSingle = (e) => {
      let oneChanged = false;
      if (e.open) {
        oneChanged = openKeys.indexOf(e.key) === -1;
        if (oneChanged) {
          openKeys.push(e.key);
        }
      } else {
        const index = openKeys.indexOf(e.key);
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
        this.setState({ openKeys });
      }
      props.onOpenChange(openKeys);
    }
  }

  onDeselect(selectInfo) {
    const props = this.props;
    if (props.selectable) {
      const selectedKeys = this.state.selectedKeys.concat();
      const selectedKey = selectInfo.key;
      const index = selectedKeys.indexOf(selectedKey);
      if (index !== -1) {
        selectedKeys.splice(index, 1);
      }
      if (!('selectedKeys' in props)) {
        this.setState({
          selectedKeys,
        });
      }
      props.onDeselect({
        ...selectInfo,
        selectedKeys,
      });
    }
  }

  getOpenTransitionName() {
    const props = this.props;
    let transitionName = props.openTransitionName;
    const animationName = props.openAnimation;
    if (!transitionName && typeof animationName === 'string') {
      transitionName = `${props.clsPrefix}-open-${animationName}`;
    }
    return transitionName;
  }

  isInlineMode() {
    return this.props.mode === 'inline';
  }

  lastOpenSubMenu() {
    let lastOpen = [];
    const { openKeys } = this.state;
    if (openKeys.length) {
      lastOpen = this.getFlatInstanceArray().filter((c) => {
        return c && openKeys.indexOf(c.props.eventKey) !== -1;
      });
    }
    return lastOpen[0];
  }

  renderMenuItem(c, i, subIndex) {
    if (!c) {
      return null;
    }
    const state = this.state;
    const extraProps = {
      openKeys: state.openKeys,
      selectedKeys: state.selectedKeys,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter,
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
  }
  renderCommonMenuItem(child, i, subIndex, extraProps) {
    const state = this.state;
    const props = this.props;
    const key = getKeyFromChildrenIndex(child, props.eventKey, i);
    const childProps = child.props;
    const isActive = key === state.activeKey;
    const newChildProps = {
      mode: props.mode,
      level: props.level,
      inlineIndent: props.inlineIndent,
      renderMenuItem: this.renderMenuItem,
      rootPrefixCls: props.clsPrefix,
      index: i,
      parentMenu: this,
      ref: childProps.disabled ? undefined :
        createChainedFunction(child.ref, saveRef.bind(this, i, subIndex)),
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
      onSelect: this.onSelect,
      ...extraProps,
    };
    if (props.mode === 'inline') {
      newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
    }
    return React.cloneElement(child, newChildProps);
  }
  getOpenChangesOnItemHover(e) {
    const { mode } = this.props;
    const { key, hover, trigger } = e;
    const activeKey = this.state.activeKey;
    if (!trigger || hover ||
      this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
      this.setState({
        activeKey: hover ? key : null,
      });
    } else {
      // keep active for sub menu for click active
      // empty
    }
    // clear last open status
    if (hover && mode !== 'inline') {
      const activeItem = this.getFlatInstanceArray().filter((c) => {
        return c && c.props.eventKey === activeKey;
      })[0];
      if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
        return ({
          item: activeItem,
          originalEvent: e,
          key: activeItem.props.eventKey,
          open: false,
        });
      }
    }
    return [];
  }
  getFlatInstanceArray() {
    let instanceArray = this.instanceArray;
    const hasInnerArray = instanceArray.some((a) => {
      return Array.isArray(a);
    });
    if (hasInnerArray) {
      instanceArray = [];
      this.instanceArray.forEach((a) => {
        if (Array.isArray(a)) {
          instanceArray.push.apply(instanceArray, a);
        } else {
          instanceArray.push(a);
        }
      });
      this.instanceArray = instanceArray;
    }
    return instanceArray;
  }
  step(direction) {
    let children = this.getFlatInstanceArray();
    const activeKey = this.state.activeKey;
    const len = children.length;
    if (!len) {
      return null;
    }
    if (direction < 0) {
      children = children.concat().reverse();
    }
    // find current activeIndex
    let activeIndex = -1;
    children.every((c, ci) => {
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
    const start = (activeIndex + 1) % len;
    let i = start;
    for (; ;) {
      const child = children[i];
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
  }
  onKeyDown(e) {
    const keyCode = e.keyCode;
    let handled;
    this.getFlatInstanceArray().forEach((obj) => {
      if (obj && obj.props.active) {
        handled = obj.onKeyDown(e);
      }
    });
    if (handled) {
      return 1;
    }
    let activeItem = null;
    if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      activeItem = this.step(keyCode === KeyCode.UP ? -1 : 1);
    }
    if (activeItem) {
      e.preventDefault();
      this.setState({
        activeKey: activeItem.props.eventKey,
      }, () => {
        scrollIntoView(ReactDOM.findDOMNode(activeItem), ReactDOM.findDOMNode(this), {
          onlyScrollIfNeeded: true,
        });
      });
      return 1;
    } else if (activeItem === undefined) {
      e.preventDefault();
      this.setState({
        activeKey: null,
      });
      return 1;
    }
  }
    renderRoot(props) {
    this.instanceArray = [];
    const classes = {
      [props.clsPrefix]: 1,
      [`${props.clsPrefix}-${props.mode}`]: 1,
      [props.className]: !!props.className,
    };
    const domProps = {
      className: classnames(classes),
      role: 'menu',
      'aria-activedescendant': '',
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
      <DOMWrap
        style={props.style}
        tag="ul"
        hiddenClassName={`${props.clsPrefix}-hidden`}
        visible={props.visible}
        {...domProps}
      >
        {React.Children.map(props.children, this.renderMenuItem.bind(this))}
      </DOMWrap>
      /*eslint-enable */
    );
  }
  render() {
    const props = { ...this.props };
    props.className += ` ${props.clsPrefix}-root`;
    return this.renderRoot(props);
  }
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
