import React, { Fragment, useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls
} from 'react-flow-renderer';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, CardContent } from '@material-ui/core';
import Sidebar from './Sidebar';

import './dnd.css';

//import Chart from 'react-apexcharts';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 }
  }
];

let id = 0;
const getId = () => `dndnode_${id++}`;
export default function LivePreviewExample() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
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
  };
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <Card className="card-box mb-4">
            <CardContent className="p-0">
              <div className="dndflow">
                <ReactFlowProvider>
                  <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                      elements={elements}
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
