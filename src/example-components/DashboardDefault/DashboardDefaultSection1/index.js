import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls
} from "react-flow-renderer";

import "./styles.css";
import FTP from "./Ftp";
import Sidebar from "./Sidebar";


const initialElements = [
  {
    id: '1',
    type: 'input',
    className: "dndnode input",
    data: { label: 'Start' },
    
    position: { x: 250, y: 5 },

  },
  {
    id: '2',
    className: "dndnode output",
    type: 'output',
    data: { label: 'End' },
    position: { x: 500, y: 10 }
  }


];
let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const nodeTypes = {

    mirror: FTP,

  };
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const name = event.dataTransfer.getData("nodeName");
    const className = event.dataTransfer.getData("className");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });
    const newNode = {
      id: getId(),
      type,
      position,
      className: className,
      data: { label: name }
    };
    setElements((es) => es.concat(newNode));
  };
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          style={{ height: "500px", width: "500px" }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onElementsRemove={onElementsRemove}
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
}