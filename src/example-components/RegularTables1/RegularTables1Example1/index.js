import React, { Fragment, useState } from 'react';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//import history from './../../../history';
//import { Router, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import nextId, { setPrefix } from 'react-id-generator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Link } from 'react-router-dom';

//import { nanoid } from 'nanoid';

import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';

const data = [];
setPrefix('');
export default function LivePreviewExample() {
  const history = useHistory();
  const [processes, setProcesses] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    ID: '',
    name: '',
    description: ''
  });

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
      ID: nextId(),
      name: addFormData.name,
      description: addFormData.description
    };

    const newProcesses = [...processes, newProcess];
    setProcesses(newProcesses);
  };

  const showForm1 = () => {
    setShowForm(!showForm);
  };
  const doCancel = () => {
    setShowForm(!showForm);
  };
  return (
    <Fragment>
      <div>
        <Button
          size="small"
          className="m-2 btn text-success"
          style={{ float: 'right' }}
          onClick={showForm1}>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
          New
        </Button>
        {showForm ? (
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
              cols="50"
              name="description"
              placeholder="Enter a description"
              onChange={handleAddFormChange}
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
              onClick={doCancel}
              type="submit"
              size="small"
              color="primary"
              variant="contained">
              Cancel
            </Button>
          </form>
        ) : (
          <TableContainer className="mb-4" component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {processes.map(process => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {process.ID}
                    </TableCell>
                    <TableCell align="right">{process.name}</TableCell>
                    <TableCell align="right">{process.description}</TableCell>
                    <TableCell align="right">
                      <div>
                        <Button
                          onClick={() =>
                            history.push('/DashboardDefault', {
                              from: 'LivePreviewExample'
                            })
                          }
                          size="small"
                          color="primary"
                          variant="contained"
                          title="Edit Process">
                          <span className="btn-wrapper--label">
                            Edit Process
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Fragment>
  );
}
