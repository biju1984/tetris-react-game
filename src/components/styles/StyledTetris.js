import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #839363;

  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .retro-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    justify-content: center;

  }
  .game-play-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 120px;
  }
  .game-control-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
  }
  .game-controls-1 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    min-width: 180px;
    width: 200px;
  }
  .game-controls-2 {
    padding: 0 30px;
  }
  .left-button {
    flex: 1 50%;
  }
  .right-button {
    flex: 1 50%;
  }
  .speed-button {
    flex: 2 100%;
  }
  .drop-button {
    flex: 2 100%;
  }
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  margin: 0 auto;
  justify-content: center;
  max-width: 400px;

  aside {
    width: 100px;
    display: block;
    padding: 0 5px;
  }
`;
