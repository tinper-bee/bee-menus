import classnames from 'classnames';
import React, { PropTypes } from 'react';




const defaultProps = {
   clsPrefix : "u-navbar-side-container",
   sideActive: false
}

class NavSideContainer extends React.Component {
  render() {
    const { className, children,clsPrefix,sideActive,expanded, ...props } = this.props;

    //const navbarProps = this.context.u_navbar;

    

    return (
      <div in={expanded}  className={classnames(className, clsPrefix,expanded && 'expanded')}>
        {children}
      </div>
    );
  }
}

NavSideContainer.defaultProps = defaultProps;

export default NavSideContainer;
