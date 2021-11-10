import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  StepEdge
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

import './styles.css';
import Unifier from './Unifier';
import P6 from './P6';
import SQL from './SQL';
import FTP from './Ftp';
import CSV from './CSV';
import Email from './Email';
import Sidebar from './Sidebar';
import ArrowEdge from './ArrowEdge';

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
const getId = () => `${id++}`;

export default function App() {
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
          animated: false,
          sourceX: 10,
          sourceY: 10,
          style: { stroke: 'red', strokeWidth: '2px' },
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
    const newNode = {
      id: getId(),
      type,
      className: className,
      data: { label: name },
      position,
      parent,
      child
    };
    setElements(es => es.concat(newNode));
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [thisElement, setThisElement] = useState([]);
  const onElementClick = (event, element) => {
    setOpen(true);
    setThisElement(element);
  };
  const onSave = () => {
    console.log(elements);
  };
  return (
    <>
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
                  <DialogContentText>{thisElement.type}</DialogContentText>
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
