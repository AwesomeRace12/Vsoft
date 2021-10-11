import React, { Fragment } from 'react';

import { Grid, Container, Button, Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './landing.css';
import hero9 from '../../assets/images/hero-bg/hero-1.jpg';

const LandingPage = () => {
  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-premium-dark min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero9 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-3" />
          <div className="bg-composed-wrapper--bg bg-red-lights opacity-1" />
          <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
            <Container maxWidth="md" className="pb-5">
              <Grid container spacing={4}>
                <Grid
                  item
                  lg={10}
                  className="px-0 mx-auto d-flex align-items-center">
                  <div className="text-center">
                    <Tooltip arrow placement="top" title="Version: 1.0.0">
                      <span className="badge badge-success px-4 text-uppercase h-auto py-1">
                        iProcess
                      </span>
                    </Tooltip>
                    <div className="px-4 px-sm-0 text-white mt-4">
                      <h1 className="display-2 mb-5 font-weight-bold">
                        Vsoft Workflow Creator
                      </h1>
                      <p className="font-size-xl text-white-50 mb-3">
                        This is a tool built to allow users to define end-to-end
                        processes for data extraction, transformation,
                        validation, and processing.
                      </p>
                      <form
                        className="modal-content animate"
                        action="/action_page.php"
                        method="post">
                        <div className="container">
                          <label htmlFor="uname">
                            <b>Username</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Username"
                            name="uname"
                            required
                          />
                          <label htmlFor="psw">
                            <b>Password</b>
                          </label>
                          <input
                            type="password"
                            placeholder="Enter Password"
                            name="psw"
                            required
                          />
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
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
