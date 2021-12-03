/* eslint-disable no-empty */
import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Handle,
  Position,
  getOutgoers,
  getIncomers,
  ArrowHeadType,
  isNode
} from 'react-flow-renderer';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import './styles.css';

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
    parent: [],
    child: []
  },
  {
    id: '2',
    type: 'End',
    className: 'dndflow dndnode output',
    data: { label: 'End' },
    position: { x: 800, y: 300 },
    parent: [],
    child: []
  }
];
let id = 3;
let sid = 1;
const getId = () => `${id++}`;
const getSId = () => `e${sid++}`;
const schema = {
  properties: {
    description: { type: 'string', title: 'description' }
  }
};

const CustomEndComponent = ({ data }) => {
  return (
    <div className="dndflow dndnode output">
      End
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="target" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="target" position={Position.Bottom} id="d" />
    </div>
  );
};
const CustomDiamondComponent = ({ data }) => {
  return (
    <>
      <div className="dndflow dndnode diamond">
        <Handle
          type="source"
          position="bottom"
          style={{ left: '0%', borderRadius: 20 }}
          id="a"
        />
        <div style={{ transform: 'rotate(315deg)' }}>Diamond</div>
        <Handle
          type="source"
          position="right"
          style={{ top: '0%', borderRadius: 20 }}
          id="b"
        />
        <Handle
          type="source"
          position="right"
          style={{ top: '100%', borderRadius: 20 }}
          id="c"
        />
        <Handle
          type="target"
          position="left"
          style={{ top: '0%', borderRadius: 20 }}
          id="d"
        />
      </div>
    </>
  );
};

const customFTPComponent = ({ data }) => {
  return (
    <div className="dndflow dndnode FTP">
      FTP
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="source" position={Position.Bottom} id="d" />
    </div>
  );
};

const CustomUnifierComponent = ({ data }) => {
  return (
    <div className="dndflow dndnode UNI">
      Unifier
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="source" position={Position.Bottom} id="d" />
    </div>
  );
};

const CustomP6Component = ({ data }) => {
  return (
    <div className="dndnode P6">
      P6
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="source" position={Position.Bottom} id="d" />
    </div>
  );
};

const CustomSQLComponent = ({ data }) => {
  return (
    <div className="dndnode SQL">
      SQL
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="source" position={Position.Bottom} id="d" />
    </div>
  );
};

const CustomCSVComponent = ({ data }) => {
  return (
    <div className="dndnode CSV">
      CSV
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="source" position={Position.Bottom} id="d" />
    </div>
  );
};
const CustomEmailCompnent = ({ data }) => {
  return (
    <div className="dndnode Email">
      Email
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Top} id="c" />
      <Handle type="source" position={Position.Bottom} id="d" />
    </div>
  );
};

export default function App() {
  const history = useHistory();
  const nodeTypes = {
    Diamond: CustomDiamondComponent,
    FTP: customFTPComponent,
    Unifier: CustomUnifierComponent,
    P6: CustomP6Component,
    SQL: CustomSQLComponent,
    CSV: CustomCSVComponent,
    Email: CustomEmailCompnent,
    End: CustomEndComponent
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
          style: { stroke: 'red', strokeWidth: '2px' },
          arrowHeadType: ArrowHeadType.ArrowClosed
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
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const parent = [];
    const child = [];
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
    if (type === 'Diamond') {
      const newNode = {
        id: getId(),
        type,
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
  const [saveValid, setSaveValid] = useState(false);
  const [openError, setOpenError] = useState(false);
  const closeErrorModal = () => {
    setOpenError(false);
  };
  const doSave = () => {
    for (var i = 0; i < elements.length; i++) {
      if (isNode(elements[i])) {
        console.log(elements[i].id);
        var out = getOutgoers(elements[i], elements);
        var outMap = out.map(n => n.id);
        elements[i].child = outMap;
        console.log(elements[i].child);
        var parentIn = getIncomers(elements[i], elements);
        var inMap = parentIn.map(n => n.id);
        elements[i].parent = inMap;
        console.log(elements[i].parent);
        if (
          i !== 0 &&
          elements[i].parent.length > 0 &&
          i !== 1 &&
          elements[i].child.length > 0
        ) {
          setSaveValid(true);
        }
      }
    }
    if (saveValid) {
      downloadFile();
    } else {
      setOpenError(true);
    }
  };

  const downloadFile = async () => {
    const output = elements;
    const filename = 'output';
    const json = JSON.stringify(output);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const doCancel = () => {
    history.push('/RegularTables1', {
      from: 'App'
    });
  };
  const formData = {
    description: thisElement.type
  };
  const doUpload = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setElements([]);
      const targetResult = JSON.parse(e.target.result);
      setElements(targetResult);
    };
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
          background: 'purple',
          marginTop: '1px',
          marginLeft: '2px',
          marginRight: '2px'
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
          background: 'purple',
          marginTop: '1px',
          marginLeft: '1px'
        }}
        variant="contained">
        Cancel
      </Button>
      <input
        type="file"
        style={{ display: 'none'}}
        id="contained-button-file"
        onChange={doUpload}
      />
      <label htmlFor="contained-button-file" style={{float:'right'}}>
        <Button
          type="default"
          size="small"
          style={{
            float: 'right',
            color: 'white',
            background: 'purple',
            marginTop: '1px',
            marginLeft: '1px'
          }}
          variant="contained"
          component="span">
          Upload
        </Button>
      </label>
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
              <Dialog open={openError} close={closeErrorModal}>
                <DialogTitle>NOT VALID WORKFLOW</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please complete the workflow, ensure Start is connected to
                    End. Closed system (no gaps). Download will be available
                    when valid.
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      type="button"
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={closeErrorModal}>
                      Close
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      <div className="arrow"></div>
    </>
  );
}
