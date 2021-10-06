import React, { Fragment, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import data from './data.json';
//import { nanoid } from 'nanoid';

import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

export default function LivePreviewExample() {
  const [processes, setProcesses] = useState(data);
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
      ID: addFormData.ID,
      name: addFormData.name,
      description: addFormData.description
    };

    const newProcesses = [...processes, newProcess];
    setProcesses(newProcesses);
  };

  return (
    <Fragment>
      <Popup trigger={<button>New</button>} position="right center">
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="ID"
            placeholder="Enter an ID"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
            onChange={handleAddFormChange}
          />
          <textarea
            rows="5"
            cols="23"
            name="description"
            placeholder="Enter a description"
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </Popup>
      <TableContainer className="mb-4" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
