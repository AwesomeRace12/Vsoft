import React, { Fragment, useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
  updateEdge
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './App.css';

const Elements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 }
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'End' },
    position: { x: 500, y: 10 }
  }
]
  

let id = 0;
const getId = () => `dndnode_${id++}`;

const style = {
  background: '#ffff',
  width: '100%',
  height: 700,
}

const DndFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(Elements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onEdgeUpdate = (oldEdge, newConnection) =>
  setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  const CustomEdgeComponent = {
    type: 'arrow' | 'arrowclosed'
  }
 

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            style={style}
            edgeTypes={{ special: CustomEdgeComponent }}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onEdgeUpdate={onEdgeUpdate}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DndFlow;

  /*
   const history = useHistory();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(Element1);
  const [element2, setElement2] = useState(Element2);
  const onConnect = params => setElements(els => addEdge(params, els));
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
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` }
    };

    setElements(es => es.concat(newNode));
    setElement2(es => es.concat(newNode));
  };

  const doCancel = () => {
    history.push('/RegularTables1', {
      from: 'LivePreviewExample'
    });
  };

  return (
    <Fragment>
      <Button
        onClick={doCancel}
        type="default"
        size="small"
        color="primary"
        style={{ float: 'right' }}
        variant="contained">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </span>
        Cancel
      </Button>
      <Button>

      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <Card className="card-box mb-4">
            <CardContent className="p-0">
              <div className="dndflow">
                <ReactFlowProvider>
                  <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                      elements={elements}
                      element2={element2}
                      onConnect={onConnect}
                      onElementsRemove={onElementsRemove}
                      onLoad={onLoad}
                      onDrop={onDrop}
                      onDragOver={onDragOver}>
                      <Controls />
                    </ReactFlow>
                  </div>
                  <Sidebar />
                </ReactFlowProvider>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
*/