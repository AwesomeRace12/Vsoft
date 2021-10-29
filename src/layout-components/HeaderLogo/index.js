import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import projectLogo from '../../assets/images/vsoft-final-01.png';

const HeaderLogo = props => {
  return (
    <Fragment>
      <Box className="header-logo-wrapper" title="VSoft" alignment="center">
        <Link to="/RegularTables1" className="header-logo-wrapper-link">
          <IconButton
            color="primary"
            size="large"
            className="header-logo-wrapper-btn">
            <img
              className="app-header-logo-img"
              alt="Vsoft Workflow"
              src={projectLogo}
            />
          </IconButton>
        </Link>
        <Box className="header-logo-text">
          <span style={{ color: '#ff0000', fontSize: '175%' }}>iProcess</span>
        </Box>
      </Box>
    </Fragment>
  );
};

export default HeaderLogo;
