import styled from 'styled-components';

export const StyledCell = styled.div`
  width: auto; 
  background: rgba(${props => props.color}, 1);
  border:2px solid;
  border-bottom-color: rgba(${props => (props.type === 0 ? props.color : '131, 147, 99')}, 0.1);
  border-right-color: rgba(${props => (props.type === 0 ? props.color : '131, 147, 99')}, 1);
  border-top-color: rgba(${props => (props.type === 0 ? props.color : '131, 147, 99')}, 1);
  border-left-color: rgba(${props => (props.type === 0 ? props.color : '131, 147, 99')}, 0.3);
`;

