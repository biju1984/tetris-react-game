import styled from "styled-components";

export const StyledActionButton = styled.div`
  box-sizing: border-box;
  color: #000000;
  background: #839363;
  font-family: sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
  text-align: center;
  min-width: 50px;
  .retro-button {
    width: ${(props) => props.size ?? 40}px;
    height: ${(props) => props.size ?? 40}px;

    margin: 3px auto;

    background: #e3e354;
    border-radius: 50px;
    box-shadow: 1px 2px ${(props) => (props.size <= 15 ? 2 : 6)}px #32322c;
  }
`;
