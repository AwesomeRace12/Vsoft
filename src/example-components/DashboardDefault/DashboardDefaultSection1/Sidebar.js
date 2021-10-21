import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right. Delete nodes using
        'Backspace'.
      </div>
      <div className="diamond" onDragStart={(event) => onDragStart(event, 'diamond')} draggable>
      </div>
      <div className="dndnode one" onDragStart={(event) => onDragStart(event, 'Unifier')} draggable>
        Unifier
      </div>
      <div className="dndnode two" onDragStart={(event) => onDragStart(event, 'P6')} draggable>
        P6
      </div>
      <div className="dndnode three" onDragStart={(event) => onDragStart(event, 'SQL')} draggable>
        SQL
      </div>
      <div className="dndnode four" onDragStart={(event) => onDragStart(event, 'FTP')} draggable>
        FTP
      </div>
      <div className="dndnode five" onDragStart={(event) => onDragStart(event, 'CSV')} draggable>
        CSV
      </div>
      <div className="dndnode six" onDragStart={(event) => onDragStart(event, 'Email')} draggable>
        Email
      </div>
    </aside>
  );
};
