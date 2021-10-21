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
      <div className="dndnode Unifier" onDragStart={(event) => onDragStart(event, 'Unifier')} draggable>
        Unifier
      </div>
      <div className="dndnode2" onDragStart={(event) => onDragStart(event, 'P6')} draggable>
        P6
      </div>
      <div className="dndnode3" onDragStart={(event) => onDragStart(event, 'SQL')} draggable>
        SQL
      </div>
      <div className="dndnode4" onDragStart={(event) => onDragStart(event, 'FTP')} draggable>
        FTP
      </div>
      <div className="dndnode5" onDragStart={(event) => onDragStart(event, 'CSV')} draggable>
        CSV
      </div>
      <div className="dndnode6" onDragStart={(event) => onDragStart(event, 'Email')} draggable>
        Email
      </div>
    </aside>
  );
};
