import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);

    event.dataTransfer.setData('nodeName', event.target.firstChild.nodeValue);
    event.dataTransfer.setData('className', event.target.className);

    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <br /><br />
      <div
        className="dndnode diamond"
        onDragStart={event => onDragStart(event, 'Diamond')}
        draggable>
        <p
          style={{
            transform: 'rotate(315deg)'
          }}>
          d
        </p>
      </div>

      <br></br>
      <div
        className="dndnode UNI"
        onDragStart={event => onDragStart(event, 'Unifier')}
        draggable>
        Unifier
      </div>

      <br></br>

      <div
        className="dndnode P6"
        onDragStart={event => onDragStart(event, 'P6')}
        draggable>
        P6
      </div>

      <br></br>

      <div
        className="dndnode SQL"
        onDragStart={event => onDragStart(event, 'SQL')}
        draggable>
        SQL
      </div>

      <br></br>

      <div
        className="dndnode FTP"
        onDragStart={event => onDragStart(event, 'FTP')}
        draggable>
        FTP
      </div>
      <br></br>

      <div
        className="dndnode CSV"
        onDragStart={event => onDragStart(event, 'CSV')}
        draggable>
        CSV
      </div>
      <br></br>

      <div
        className="dndnode Email"
        onDragStart={event => onDragStart(event, 'Email')}
        draggable>
        Email
      </div>
    </aside>
  );
};
