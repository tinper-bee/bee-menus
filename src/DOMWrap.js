import React, { Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    tag: PropTypes.string,
    hiddenClassName: PropTypes.string,
    visible: PropTypes.bool
};
const defaultProps = {
    tag: 'div'
}

class DOMWrap extends Component{


  render() {
    const props = { ...this.props };
    if (!props.visible) {
      props.className = props.className || '';
      props.className += ` ${props.hiddenClassName}`;
    }
    const Tag = props.tag;
    delete props.tag;
    delete props.hiddenClassName;
    delete props.visible;
    return <Tag {...props} />;
  }
};

DOMWrap.propTypes = propTypes;
DOMWrap.defaultProps = defaultProps;

export default DOMWrap;
