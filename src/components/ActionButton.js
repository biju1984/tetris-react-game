import React from "react";
import { StyledActionButton } from "./styles/StyledActionButton";

const ActionButton = ({ callback, name, radius, classes }) => (
  <StyledActionButton onClick={callback} size={radius} className={classes}>
    <div className="retro-button"></div>
    {name}
  </StyledActionButton>
);

export default ActionButton;
