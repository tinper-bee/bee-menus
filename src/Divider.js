import React, { PropTypes, Component } from 'react';

const propTypes = {
    className: PropTypes.string,
    rootPrefixCls: PropTypes.string
};
class Divider extends Component{

  render() {
    const { className, rootPrefixCls } = this.props;
    return <li className={`${className} ${rootPrefixCls}-item-divider`}/>;
  }
};

Divider.propTypes = propTypes;

export default Divider;
