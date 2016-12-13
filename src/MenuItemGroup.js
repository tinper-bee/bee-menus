import React, { PropTypes , Component} from 'react';

const propTypes = {
    renderMenuItem: PropTypes.func,
    index: PropTypes.number,
    className: PropTypes.string,
    rootPrefixCls: PropTypes.string
};

const defaultProps = {
    disabled: true
}
class MenuItemGroup extends Component{

  renderInnerMenuItem(item, subIndex) {
    const { renderMenuItem, index } = this.props;
    return renderMenuItem(item, index, subIndex);
  }

  render() {
    const { className = '',title,children, rootPrefixCls } = this.props;
    const titleClassName = `${rootPrefixCls}-item-group-title`;
    const listClassName = `${rootPrefixCls}-item-group-list`;

    return (
        <li className={`${className} ${rootPrefixCls}-item-group`}>
          <div className={titleClassName}>{title}</div>
          <ul className={listClassName}>
            {React.Children.map(children, this.renderInnerMenuItem.bind(this))}
          </ul>
        </li>
    );
  }
};

MenuItemGroup.isMenuItemGroup = true;
MenuItemGroup.propTypes = propTypes;
MenuItemGroup.defaultProps = defaultProps;

export default MenuItemGroup;