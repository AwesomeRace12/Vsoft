import React, { Fragment, useState } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import { Hidden, IconButton, AppBar, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/react.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
//import HeaderUserbox from '../../layout-components/HeaderUserbox';

//import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
//import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
const contentStyle = {
  width: "100%",
  height: "75%"
};
const Header = props => {
  const { headerShadow, headerFixed } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
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
            <div>
              <Button
                size="small"
                className="m-2 btn"
                style={{ float: 'right', background: 'white' , color: 'red'}}
                onClick={() => setOpen(o => !o)}>
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </span>
                New
              </Button>
              <Popup
                modal
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
                contentStyle={contentStyle}>
                <form>
                  <input type="text" name="name" placeholder="Enter a name" />
                  <br />
                  <textarea
                    rows="10"
                    cols="100"
                    name="description"
                    placeholder="Enter a description"
                  />
                  <br />
                  <Button
                    onClick={() =>
                      history.push('/DashboardDefault', {
                        from: 'LivePreviewExample'
                      })
                    }
                    type="submit"
                    size="small"
                    color="primary"
                    variant="contained">
                    Create
                  </Button>
                  <Button
                    type="button"
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={closeModal}>
                    Cancel
                  </Button>
                </form>
              </Popup>
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
