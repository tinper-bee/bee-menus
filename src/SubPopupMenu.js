import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animate from 'bee-animate';
import classnames from 'classnames';
import createChainedFunction from 'tinper-bee-core/lib/createChainedFunction';
import { getKeyFromChildrenIndex, loopMenuItem } from './util';
import DOMWrap from './DOMWrap';

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

const propTypes = {
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    onDeselect: PropTypes.func,
    onOpenChange: PropTypes.func,
    onDestroy: PropTypes.func,
    openTransitionName: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    openKeys: PropTypes.array,
    closeSubMenuOnMouseLeave: PropTypes.bool,
    visible: PropTypes.bool,
    children: PropTypes.any
}

class SubPopupMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
        activeKey: getActiveKey(this.props, this.props.activeKey),
    }
    this.getOpenChangesOnItemHover = this.getOpenChangesOnItemHover.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.onItemHover = this.onItemHover.bind(this);
    this.getOpenTransitionName = this.getOpenTransitionName.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);

    this.getFlatInstanceArray = this.getFlatInstanceArray.bind(this);
    this.renderCommonMenuItem = this.renderCommonMenuItem.bind(this);
    this.renderRoot = this.renderRoot.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    let props;
    if ('activeKey' in nextProps) {
      props = {
        activeKey: getActiveKey(nextProps, nextProps.activeKey),
      };
    } else {
      const originalActiveKey = this.state.activeKey;
      const activeKey = getActiveKey(nextProps, originalActiveKey);
      // fix: this.setState(), parent.render(),
      if (activeKey !== originalActiveKey) {
        props = {
          activeKey,
        };
      }
    }
    if (props) {
      this.setState(props);
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  }

  onDeselect(selectInfo) {
    this.props.onDeselect(selectInfo);
  }

  onSelect(selectInfo) {
    this.props.onSelect(selectInfo);
  }

  onClick(e) {
    this.props.onClick(e);
  }

  onOpenChange(e) {
    this.props.onOpenChange(e);
  }

  onDestroy(key) {
    this.props.onDestroy(key);
  }

  onItemHover(e) {
    let { openChanges = [] } = e;
    openChanges = openChanges.concat(this.getOpenChangesOnItemHover(e));
    if (openChanges.length) {
      this.onOpenChange(openChanges);
    }
  }

  getOpenTransitionName() {
    return this.props.openTransitionName;
  }

  renderMenuItem(c, i, subIndex) {
    const props = this.props;
    const extraProps = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
      openSubMenuOnMouseEnter: true,
    };
    return this.renderCommonMenuItem(c, i, subIndex, extraProps);
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
      rootPrefixCls: props.prefixCls,
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
  renderRoot(props) {
    this.instanceArray = [];
    const classes = {
      [props.prefixCls]: 1,
      [`${props.prefixCls}-${props.mode}`]: 1,
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
        hiddenClassName={`${props.prefixCls}-hidden`}
        visible={props.visible}
        {...domProps}
      >
        {React.Children.map(props.children, this.renderMenuItem.bind(this))}
      </DOMWrap>
      /*eslint-enable */
    );
  }
  render() {
    const renderFirst = this.renderFirst;
    this.renderFirst = 1;
    this.haveOpened = this.haveOpened || this.props.visible;
    if (!this.haveOpened) {
      return null;
    }
    let transitionAppear = true;
    if (!renderFirst && this.props.visible) {
      transitionAppear = false;
    }
    const props = { ...this.props };
    props.className += ` ${props.prefixCls}-sub`;
    const animProps = {};
    if (props.openTransitionName) {
      animProps.transitionName = props.openTransitionName;
    } else if (typeof props.openAnimation === 'object') {
      animProps.animation = { ...props.openAnimation };
      if (!transitionAppear) {
        delete animProps.animation.appear;
      }
    }
    return (
      <Animate
        {...animProps}
        showProp="visible"
        component=""
        transitionAppear={transitionAppear}
      >
        {this.renderRoot(props)}
      </Animate>);
  }
};
SubPopupMenu.propTypes = propTypes;
export default SubPopupMenu;
