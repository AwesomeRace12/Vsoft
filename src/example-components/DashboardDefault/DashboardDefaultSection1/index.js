import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  StepEdge,
  getOutgoers,
  getIncomers,
  isEdge
} from 'react-flow-renderer';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import Popup from 'reactjs-popup';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.css';
import Unifier from './Unifier';
import P6 from './P6';
import SQL from './SQL';
import FTP from './Ftp';
import CSV from './CSV';
import Email from './Email';
import Sidebar from './Sidebar';
import ArrowEdge from './ArrowEdge';
import Form from 'react-jsonschema-form';

const initialElements = [
  {
    id: '1',
    type: 'input',
    className: 'dndnode input',
    data: { label: 'Start' },
    sourcePosition: 'right',
    position: { x: 50, y: 20 },
    parent: null,
    child: null
  },
  {
    id: '2',
    type: 'output',
    className: 'dndnode output',
    data: { label: 'End' },
    targetPosition: 'left',
    position: { x: 800, y: 300 },
    parent: null,
    child: null
  }
];
let id = 3;
let sid = 1;
const getId = () => `${id++}`;
const getSId = () => `e${sid++}`;
const schema = {
  properties: {
    description: {type: "string", title: "description"},
  }
};

export default function App() {
  const history = useHistory();
  
  const nodeTypes = {
    mirror: FTP
  };
  const edgeTypes = {
    custom: ArrowEdge
  };
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = params =>
    setElements(els =>
      addEdge(
        {
          ...params,
          id: getSId(),
          animated: false,
          sourceX: 10,
          sourceY: 10,
          style: { stroke: 'red', strokeWidth: '2px', arrowHeadColor: 'red'},
          arrowHeadType: 'arrowclosed',
          type: 'step'
        },
        els
      )
    );
  
  const onElementsRemove = elementsToRemove =>
    setElements(els => removeElements(elementsToRemove, els));
  const onLoad = _reactFlowInstance => setReactFlowInstance(_reactFlowInstance);
  const onDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const onDrop = event => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const name = event.dataTransfer.getData('nodeName');
    const className = event.dataTransfer.getData('className');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const parent = null;
    const child = null;
    const description = '';
    const server = '';
    const action = '';
    const directoryIn = '';
    const directoryOut = '';
    const fileName = '';
    const sqlType = '';
    const sqlText = '';
    const tableName = '';
    const primaryKey = '';
    if (type === 'FTP') {
      const newNode = {
        id: getId(),
        type,
        sourcePosition: 'right',
        targetPosition: 'left',
        className: className,
        data: {
          label: name,
          description,
          server: server,
          action: action,
          directoryIn: directoryIn,
          directoryOut: directoryOut,
          fileName: fileName
        },
        position,
        parent,
        child
      };
      setElements(es => es.concat(newNode));
    }
    if (type === 'diamond') {
      const newNode = {
        id: getId(),
        type,
        className: className,
        data: { label: name },
        position,
        parent,
        child,
        description,
        server,
        sqlType,
        sqlText
      };
      setElements(es => es.concat(newNode));
    }
    if (type === 'SQL') {
      const newNode = {
        id: getId(),
        type,
        className: className,
        data: { label: name },
        position,
        sourcePosition: 'right',
        targetPosition: 'left',
        parent,
        child,
        description,
        server,
        sqlType,
        sqlText
      };
      setElements(es => es.concat(newNode));
    }
    if (type === 'CSV') {
      const newNode = {
        id: getId(),
        type,
        className: className,
        data: { label: name },
        position,
        parent,
        sourcePosition: 'right',
        targetPosition: 'left',
        child,
        description,
        server,
        action,
        fileName,
        tableName,
        primaryKey
      };
      setElements(es => es.concat(newNode));
    }
    if (type === 'Unifier') {
      const newNode = {
        id: getId(),
        type,
        className: className,
        data: { label: name },
        position,
        parent,
        sourcePosition: 'right',
        targetPosition: 'left',
        child,
        description
      };
      setElements(es => es.concat(newNode));
    }
    if (type === 'P6') {
      const newNode = {
        id: getId(),
        type,
        className: className,
        data: { label: name },
        position,
        sourcePosition: 'right',
        targetPosition: 'left',
        parent,
        child,
        description
      };
      setElements(es => es.concat(newNode));
    }
    if (type === 'Email') {
      const newNode = {
        id: getId(),
        type,
        className: className,
        data: { label: name },
        position,
        parent,
        sourcePosition: 'right',
        targetPosition: 'left',
        child,
        description
      };
      setElements(es => es.concat(newNode));
    }
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [thisElement, setThisElement] = useState([]);
  const onElementClick = (event, element) => {
    setOpen(true);
    setThisElement(element);
    console.log(elements);
  };
  const onSave = () => {
    console.log(elements);
  };
  const doSave = () => {
    console.log(elements);
  };
  const doCancel = () => {
    history.push('/RegularTables1', {
      from: 'App'
    });
  };
  const formData = {
    description: thisElement.type
  };

  return (
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
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar />
          <div
            className="reactflow-wrapper"
            style={{ height: '500px', width: '500px' }}
            ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onElementsRemove={onElementsRemove}
              onElementClick={onElementClick}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              edgeTypes={edgeTypes}>
              <Controls />
              <Dialog open={open} onClose={closeModal}>
                <DialogTitle>
                  Type: {thisElement.type} <br /> ID: {thisElement.id}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Form schema={schema} formData={formData} />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={onSave}>
                    Save
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
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      <div className="arrow"></div>
    </>
  );
}
