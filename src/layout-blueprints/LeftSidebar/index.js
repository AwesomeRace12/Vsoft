import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Header, Footer } from '../../layout-components';
import './boxes.css';

const LeftSidebar = props => {
  const { children, footerFixed, contentBackground } = props;

  return (
    <Fragment>
      <div className={clsx('app-wrapper', contentBackground)}>
        <Header />
        <div className={clsx('app-main', {})}>
          <div
            className={clsx('app-content', {
              'app-content-footer-fixed': footerFixed
            })}>
              <div className="app-content--inner__wrapper">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LeftSidebar.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarFixed: state.ThemeOptions.sidebarFixed,

  headerFixed: state.ThemeOptions.headerFixed,
  headerSearchHover: state.ThemeOptions.headerSearchHover,
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,

  footerFixed: state.ThemeOptions.footerFixed,

  contentBackground: state.ThemeOptions.contentBackground
});

export default connect(mapStateToProps)(LeftSidebar);