import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Button,
  Tooltip
} from '@material-ui/core';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/react.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
//import HeaderUserbox from '../../layout-components/HeaderUserbox';

//import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
//import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Header = props => {
  const { headerShadow, headerFixed } = props;

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
            <Box
              className="app-logo-wrapper"
              title="Carolina React Admin Dashboard with Material-UI Free">
              <Link to="/DashboardDefault" className="app-logo-link">
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
            <Box className="d-flex align-items-center">
              <Button
                href="https://vsoft-usa.com"
                target="_blank"
                size="small"
                variant="contained"
                color="default"
                className="mr-3">
                Vsoft USA
              </Button>
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
            <Button
              size="small"
              className="m-2 btn text-success"
              style={{ float: 'right' }}>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'plus']} />
              </span>
              New
            </Button>
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
