import styled from "styled-components";

export const StyledDisplayText = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 10px;
  min-height: 30px;
  width: 100%;
  font-family: LCD2, Arial, Helvetica, sans-serif;
  font-size:${props => props.textSize ?? 1.2 }rem;
  text-align:center;
  .blink {
    animation: blinker .8s linear infinite;
  }

  @keyframes blinker {

   50% {
      opacity: .3;
    }
  }
`;
