import React, { Fragment, useEffect, useState } from 'react';

import 'reactjs-popup/dist/index.css';
//import history from './../../../history';
//import { Router, Route, Link } from 'react-router-dom';
import { useTable, usePagination, useRowSelect } from 'react-table';
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import nextId, { setPrefix } from 'react-id-generator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import { nanoid } from 'nanoid';

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Box,
  Table,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';


const Styles = styled.div`
  .table-container {
    height: 350px;
  }
  table {
    width: 100%;
    overflow-y: scroll;
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
      :hover {
        background-color: #abb478;
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
      font-weight: bold;
      position: sticky;
      top: 0;
    }
  }
  .pagination {
    position: sticky;
    padding: 0.5rem;
    color: white;
    background: #384275;
    bottom: 0;
  }
`;
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);
setPrefix('');
export default function LivePreviewExample() {
  const history = useHistory();
  //data from axios get
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      axios
        .get('http://localhost:8080/processData/processList')
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }, []);
  //hard coded data
  /*const data = React.useMemo(
    () => [
      {
        id: '1',
        name: 'E-1',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '2',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '3',
        name: 'E-3',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '4',
        name: 'E-1',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '5',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '6',
        name: 'E-5',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '7',
        name: 'E-1',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '8',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '9',
        name: 'E-3',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '10',
        name: 'E-1',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '11',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '12',
        name: 'E-5',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '13',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '14',
        name: 'E-5',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '15',
        name: 'E-1',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '16',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '9',
        name: 'E-3',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '10',
        name: 'E-1',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '11',
        name: 'E-2',
        description: 'SAP',
        status: 'active'
      },
      {
        id: '12',
        name: 'E-5',
        description: 'SAP',
        status: 'active'
      }
    ],
    []
  );*/
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 50
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 50
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    gotoPage,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds}
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 }
    },
    usePagination,
    useRowSelect
  );

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

  const [edit, setEdit] = useState(false);
  const closeEdit = () => setEdit(false);

  const [toDelete, setDelete] = useState(false);
  const closeDelete = () => setDelete(false);
  const [deleteFormID, setDeleteFormID] = useState({ id: '' });

  const handleDeleteFormChange = event => {
    event.preventDefault();
    const fieldID = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldID] = fieldValue;
    setDeleteFormID(newFormData);
  };

  const handleDeleteFormSubmit = event => {
    event.preventDefault();
    (async () => {
      axios
        .delete('http://localhost:8080/processData/delete', deleteFormID)
        .then(console.log(deleteFormID))
        .catch(err => {
          console.log(err);
        });
    })();
    closeDelete();
    history.go(0);
  };

  return (
    <Fragment>
      <Box className="d-flex align-items-center">
        <Button
          size="medium"
          className="m-2 btn"
          style={{ color: 'red', fontWeight: 'bold', float: 'left' }}
          onClick={() => setOpen(o => !o)}>
          <span
            className="btn-wrapper--icon"
            style={{
              padding: '0%',
              float: 'right',
              background: 'white',
              color: 'red',
              borderRadius: '0%'
            }}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
          New
        </Button>
        <Button
          size="medium"
          className="m-2 btn"
          style={{ color: 'grey', fontWeight: 'bold', float: 'right' }}
          onClick={() => setEdit(o => !o)}>
          <span
            className="btn-wrapper--icon"
            style={{
              padding: '0%',
              float: 'right',
              background: 'white',
              color: 'grey',
              borderRadius: '0%'
            }}>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </span>
          Edit
        </Button>
        <Button
          size="medium"
          style={{ color: 'red', fontWeight: 'bold', float: 'left' }}
          onClick={() => setDelete(o => !o)}>
          <span
            style={{
              float: 'right',
              color: 'red'
            }}>
            <FontAwesomeIcon icon={['fas', 'trash']} />
          </span>
          Delete
        </Button>
        <Dialog open={open} onClose={closeModal}>
          <DialogTitle>New</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form onSubmit={handleAddFormSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter a name"
                  onChange={handleAddFormChange}
                />
                <br />
                <br />
                <textarea
                  rows="10"
                  cols="60"
                  name="description"
                  placeholder="Enter a description"
                  onChange={handleAddFormChange}
                />
                <br />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              size="small"
              color="primary"
              variant="contained"
              onClick={handleAddFormSubmit}>
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
          </DialogActions>
        </Dialog>
        <Dialog open={edit} onClose={closeEdit}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="id" placeholder="Enter an id" />
                <br />
                <br />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter a name"
                  onChange={handleAddFormChange}
                />
                <br />
                <br />
                <textarea
                  rows="10"
                  cols="60"
                  name="description"
                  placeholder="Enter a description"
                  onChange={handleAddFormChange}
                />
                <br />
                <label htmlFor="status">Status:</label>
                <select name="status" id="status">
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              size="small"
              color="primary"
              variant="contained"
              onClick={handleAddFormSubmit}>
              Save
            </Button>
            <Button
              type="button"
              size="small"
              color="primary"
              variant="contained"
              onClick={closeEdit}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={toDelete} onClose={closeDelete}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form onSubmit={handleDeleteFormSubmit}>
                <input
                  type="text"
                  name="id"
                  placeholder="Enter an id to delete"
                  onChange={handleDeleteFormChange}
                />
              </form>
              <br />
              <span>Are you sure you want to delete?</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              size="small"
              color="primary"
              variant="contained"
              onClick={handleDeleteFormSubmit}>
              Yes
            </Button>
            <Button
              type="button"
              size="small"
              color="primary"
              variant="contained"
              onClick={closeDelete}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Styles>
        <TableContainer className="table-container" component={Paper}>
          <Table striped="true" {...getTableProps()} aria-label="simple table">
            <TableHead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps({
                        style: { width: column.width }
                      })}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => console.log(data[row.id])}>
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
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span>
              Page <strong>{pageIndex + 1}</strong>{' '}
            </span>{' '}
            <span> Showing {pageSize} records each page</span>
          </div>
        </TableContainer>
      </Styles>
    </Fragment>
  );
}
