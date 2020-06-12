import styled from "styled-components";

export const StyledStage = styled.div`


  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(${props => props.width *15 }px / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  min-width: ${props => props.width *15 }px;
  width: ${props => props.width *15 }px;
  border: 1px solid #000000;

  background: #7e876b;
`;
