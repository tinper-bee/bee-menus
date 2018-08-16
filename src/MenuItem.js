import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  KeyCode from 'tinper-bee-core/lib/keyCode';
import classnames from 'classnames';
import { noop } from './util';

/* eslint react/no-is-mounted:0 */
const propTypes = {
    rootPrefixCls: PropTypes.string,
    eventKey: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.any,
    selectedKeys: PropTypes.array,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    onDeselect: PropTypes.func,
    parentMenu: PropTypes.object,
    onItemHover: PropTypes.func,
    onDestroy: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

const defaultProps = {
    onSelect: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
}
class MenuItem extends Component{
  constructor(props) {
    super(props);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getPrefixCls = this.getPrefixCls.bind(this);
    this.getActiveClassName = this.getActiveClassName.bind(this);
    this.getDisabledClassName = this.getDisabledClassName.bind(this);
    this.getSelectedClassName  = this.getSelectedClassName.bind(this);
    this.clearMenuItemMouseLeaveTimer= this.clearMenuItemMouseLeaveTimer.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }
  componentWillUnmount() {
    const props = this.props;
    this.mounted = false;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
    if (props.parentMenu.menuItemInstance === this) {
      this.clearMenuItemMouseLeaveTimer();
    }
  }
  componentDidMount() {
    this.mounted = true;
  }

  onKeyDown(e) {
    const keyCode = e.keyCode;
    if (keyCode === KeyCode.ENTER) {
      this.onClick(e);
      return true;
    }
  }

  onMouseLeave(e) {
    const props = this.props;
    const { eventKey, parentMenu } = props;
    parentMenu.menuItemInstance = this;
    parentMenu.menuItemMouseLeaveFn = () => {
      if (this.mounted && props.active) {
        props.onItemHover({
          key: eventKey,
          item: this,
          hover: false,
          domEvent: e,
          trigger: 'mouseleave',
        });
      }
    };
    parentMenu.menuItemMouseLeaveTimer = setTimeout(parentMenu.menuItemMouseLeaveFn, 30);
    props.onMouseLeave({
      key: eventKey,
      domEvent: e,
    });
  }

  onMouseEnter(e) {
    const props = this.props;
    const { eventKey, parentMenu } = props;
    this.clearMenuItemMouseLeaveTimer(parentMenu.menuItemInstance !== this);
    if (parentMenu.subMenuInstance) {
      parentMenu.subMenuInstance.clearSubMenuTimers();
    }
    props.onItemHover({
      key: eventKey,
      item: this,
      hover: true,
      domEvent: e,
      trigger: 'mouseenter',
    });
    props.onMouseEnter({
      key: eventKey,
      domEvent: e,
    });
  }

  onClick(e) {
    const props = this.props;
    const selected = this.isSelected();
    const eventKey = props.eventKey;
    const info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e,
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
  }

  getPrefixCls() {
    return `${this.props.rootPrefixCls}-item`;
  }

  getActiveClassName() {
    return `${this.getPrefixCls()}-active`;
  }

  getSelectedClassName() {
    return `${this.getPrefixCls()}-selected`;
  }

  getDisabledClassName() {
    return `${this.getPrefixCls()}-disabled`;
  }

  clearMenuItemMouseLeaveTimer() {
    const props = this.props;
    let callFn;
    const parentMenu = props.parentMenu;
    if (parentMenu.menuItemMouseLeaveTimer) {
      clearTimeout(parentMenu.menuItemMouseLeaveTimer);
      parentMenu.menuItemMouseLeaveTimer = null;
      if (callFn && parentMenu.menuItemMouseLeaveFn) {
        parentMenu.menuItemMouseLeaveFn();
      }
      parentMenu.menuItemMouseLeaveFn = null;
    }
  }

  isSelected() {
    return this.props.selectedKeys.indexOf(this.props.eventKey) !== -1;
  }

  render() {
    const props = this.props;
    const selected = this.isSelected();
    const classes = {};
    classes[this.getActiveClassName()] = !props.disabled && props.active;
    classes[this.getSelectedClassName()] = selected;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getPrefixCls()] = true;
    classes[props.className] = !!props.className;
    const attrs = {
      ...props.attribute,
      title: props.title?props.title:(typeof props.children === 'string'?props.children:""),
      className: classnames(classes),
      role: 'menuitem',
      'aria-selected': selected,
      'aria-disabled': props.disabled,
    };
    let mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter,
      };
    }
    const style = {
      ...props.style,
    };
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return (
      <li
        style={style}
        {...attrs}
        {...mouseEvent}
        
      >
        {props.children}
      </li>
    );
  }
};

MenuItem.isMenuItem = 1;

MenuItem.defaultProps = defaultProps;
MenuItem.propTypes = propTypes;

export default MenuItem;
