import React, { Fragment } from 'react';

import { IconButton, Box } from '@material-ui/core';

import projectLogo from '../../assets/images/vsoft-final-01.png';

const HeaderLogo = props => {
  return (
    <Fragment>
      <Box className="header-logo-wrapper" title="VSoft">
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
      </Box>
    </Fragment>
  );
};

export default HeaderLogo;
