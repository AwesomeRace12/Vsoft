import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import { Hidden, IconButton, AppBar, Box, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import nextId, { setPrefix } from 'react-id-generator';
import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/react.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
//import HeaderUserbox from '../../layout-components/HeaderUserbox';

//import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
//import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
setPrefix('');
const contentStyle = {
  width: '100%',
  height: '70%'
};
const Header = props => {
  const { headerShadow, headerFixed } = props;
  const history = useHistory();


  const doSave = () => {
    
    history.push('/RegularTables1', {
      from: 'LivePreviewExample'
    });
  };
  const doCancel = () => {
    
    history.push('/RegularTables1', {
      from: 'LivePreviewExample'
    });
  };
  const location = useLocation();

  return (
    <Fragment>
      <AppBar
        color="secondary"
        className={clsx('app-header', {})}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box className="app-logo-wrapper">
              <Link to="/RegularTables1" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img
                    className="app-logo-img"
                    alt="iProcess"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">Vsoft</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center"></Box>
          </Hidden>
          <Box className="d-flex align-items-center">
            <div>
              {location.pathname === '/DashboardDefault' ? (
                <>
                  <Button
                    onClick={doSave}
                    type="default"
                    size="small"
                    style={{
                      float: 'right',
                      color: 'white',
                      background: 'purple'
                    }}
                    variant="contained">
                    Save
                  </Button>
                  <Button
                    onClick={doCancel}
                    type="default"
                    size="small"
                    style={{
                      float: 'right',
                      color: 'white',
                      background: 'purple'
                    }}
                    variant="contained">
                    Cancel
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
