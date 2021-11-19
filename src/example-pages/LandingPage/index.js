import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Button, IconButton, AppBar, Box, Hidden } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './landing.css';

import projectLogo from '../../assets/images/vsoft-final-01.png';
import HeaderLandingPage from './HeaderLandingPage';

const LandingPage = () => {
  return (
    <Fragment>
      <AppBar color="secondary" className={clsx('app-header', {})}>
        <HeaderLandingPage />
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box className="app-logo-wrapper">
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
              <Hidden smDown>
                <Box className="app-logo-text">Vsoft</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center"></Box>
          </Hidden>
        </Box>
      </AppBar>
      <div className="topnav"></div>
      <div className="text-center">
        <form
          className="modal-content animate"
          action="/action_page.php"
          method="post">
          <div className="container">
            <div className="innerContainer">
              <div className="row">
                <div className="col-25">
                  <label htmlFor="uname">
                    <b>Username</b>
                  </label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="uname"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="psw">
                    <b>Password</b>
                  </label>
                </div>
                <div className="col-75">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    required
                  />
                </div>
              </div>
            </div>
            <Button
              to="/RegularTables1"
              component={Link}
              size="large"
              color="primary"
              variant="contained"
              className="m-2 py-3 px-5"
              title="View iProcess Workflow Creator">
              <span className="btn-wrapper--label">Log in</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LandingPage;
