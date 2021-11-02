import React, { memo } from "react";

import { Handle, Position } from "react-flow-renderer";
import "./styles.css";
const onConnect = (params) => console.log("handle onConnect", params);

const BoundingBox = ({ data }) => {
  return (
    <div className="boundingBox">
      <div>SQL</div>

      <Handle
        onConnect={onConnect}
        type="source"
        position={Position.Top}
        id="a"
        className="sourceHandleStyleA"
      />
      <Handle
        onConnect={onConnect}
        type="source"
        position={Position.Bottom}
        id="b"
        className="sourceHandleStyleB"
      />
    </div>
  );
};

export default memo(BoundingBox);