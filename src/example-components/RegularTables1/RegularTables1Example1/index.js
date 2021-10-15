import React, { Fragment, useState } from 'react';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//import history from './../../../history';
//import { Router, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import nextId, { setPrefix } from 'react-id-generator';
import { useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';

//import { nanoid } from 'nanoid';

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Table
} from '@material-ui/core';
const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid white;
    tr:nth-child(odd) {
      background-color: #abb4c7;

      color: #fff;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      padding: 0.5rem;
      border-bottom: 1px solid white;
      border-right: 1px solid white;

      :last-child {
        border-right: 0;
      }
    }

    th {
      background: #0b9e86;
      border-bottom: 3px solid white;
      color: white;
      fontweight: bold;
    }
  }
`;
function Table1({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });
  return (
    <TableContainer className="mb-4" component={Paper}>
      <Table striped {...getTableProps()} aria-label="simple table">
        <TableHead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//setPrefix('');
export default function LivePreviewExample() {
  const data = React.useMemo(
    () => [
      {
        ID: '1',
        name: 'E-1',
        description: 'SAP'
      },
      {
        ID: '2',
        name: 'E-2',
        description: 'SAP'
      },
      {
        ID: '3',
        name: 'E-3',
        description: 'SAP'
      }
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      }
    ],
    []
  );
  /*const history = useHistory();
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
  };*/
  return (
    <Fragment>
      <Styles>
        <Table1 columns={columns} data={data} />
      </Styles>
    </Fragment>
  );
}
