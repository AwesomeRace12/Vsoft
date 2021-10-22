import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import { Hidden, IconButton, AppBar, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [addFormData, setAddFormData] = useState({
    id: '',
    name: '',
    description: '',
    status: ''
  });
  const [toggle, setToggle] = useState(true);
  const changeButton = () => {
    setToggle(!toggle);
  };
  const doSave = () => {
    setToggle(!toggle);
    history.push('/RegularTables1', {
      from: 'LivePreviewExample'
    });
  };
  const doCancel = () => {
    setToggle(!toggle);
    history.push('/RegularTables1', {
      from: 'LivePreviewExample'
    });
  };

  const handleAddFormChange = event => {
    event.preventDefault();
    const fieldID = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldID] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = event => {
    event.preventDefault();

    const newProcess = {
      id: nextId(),
      name: addFormData.name,
      description: addFormData.description,
      status: 'active'
    };
    (async () => {
      axios
        .post('http://localhost:8080/processData/insertProcess', newProcess)
        .then(res => {
          setData(res.data);
          console.log(newProcess);
        })
        .catch(err => {
          console.log(err);
        });
    })();
    closeModal();
    changeButton();
    history.push('/DashboardDefault', {
      from: 'LivePreviewExample'
    });
  };

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
              {toggle ? (
                <>
                  <Button
                    size="x-large"
                    className="m-2 btn"
                    style={{ color: 'red', fontWeight: 'bold' }}
                    onClick={() => setOpen(o => !o)}>
                    <span
                      className="btn-wrapper--icon"
                      style={{
                        padding: '20%',
                        float: 'right',
                        background: 'white',
                        color: 'red',
                        borderRadius: '50%'
                      }}>
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
                    <form onSubmit={handleAddFormSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter a name"
                        onChange={handleAddFormChange}
                      />
                      <br />
                      <textarea
                        rows="10"
                        cols="100"
                        name="description"
                        placeholder="Enter a description"
                        onChange={handleAddFormChange}
                      />
                      <br />
                      <Button
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
                </>
              ) : (
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
