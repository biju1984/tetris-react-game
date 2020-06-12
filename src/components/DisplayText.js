import React from "react";
import { StyledDisplayText } from "./styles/StyledDisplayText";

const DisplayText = ({ gameOver, text, blink, textSize }) => (
  <StyledDisplayText gameOver={gameOver} textSize={textSize} >
    <div className={ blink ? 'blink' : null}>{text}</div>
  </StyledDisplayText>
);

export default DisplayText;
