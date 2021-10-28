import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData("nodeName", event.target.firstChild.nodeValue);
    event.dataTransfer.setData("className", event.target.className);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right. Delete nodes using
        'Backspace'.
      </div>
      <div className="dndnode FTP"
        onDragStart={(event) => onDragStart(event, "FTP")}
        draggable
      >
        FTP
      </div>

      
    </aside>
  );
};