import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETRIS } from "../tetris";

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type, monoChrome  }) => {
  let color;  
  if(type === 0){
    color = '128, 142, 100';
  } else{
    color = !monoChrome ?  '0,0,0' : TETRIS[type].color;  
  }
  console.log(color)
  return <StyledCell type={type} color={color} />;
};

export default React.memo(Cell);
