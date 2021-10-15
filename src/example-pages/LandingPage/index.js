import React, { Fragment } from 'react';

import { Grid, Container, Button, Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './landing.css';
import hero9 from '../../assets/images/hero-bg/hero-1.jpg';

const LandingPage = () => {
  return (
    <Fragment>
<div class="topnav">
 </div>


                  <div className="text-center">
                      <form
                        className="modal-content animate"
                        action="/action_page.php"
                        method="post">
                        <div className="container">
                        <div className = "innerContainer">
                        <div class="row">
                        <div class="col-25">

                          <label htmlFor="uname">
                            <b>Username</b> 
                          </label>
                          </div>
                          <div class="col-75">
                          <input
                            type="text"
                            placeholder="Enter Username"
                            name="uname"
                            required
                          /> 
                          </div>
                          </div>
                          <div class="row">
                          <div class="col-25">

                          <label htmlFor="psw">
                            <b>Password</b>
                          </label>
                          </div>
                          <div class="col-75">

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
