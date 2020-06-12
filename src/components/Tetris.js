import React, { useState } from "react";

import { createStage, detectCollision } from "../helpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { useTile } from "../hooks/useTile";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Stage from "./Stage";
import ActionButton from "./ActionButton";
import DisplayText from "./DisplayText";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunningStatus, setGameRunningStatus] = useState("stopped");
  const [tile, updateTilePos, resetTile, tileRotate] = useTile();
  const [stage, setStage, rowsCleared] = useStage(tile, resetTile);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const moveTile = (dir) => {
    if (!detectCollision(tile, stage, { x: dir, y: 0 })) {
      updateTilePos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const toggleGameStatus = () => {
    if (gameRunningStatus === "stopped") {
      setStage(createStage());
      setDropTime(1000);
      resetTile();
      setScore(0);
      setLevel(0);
      setRows(0);
      setGameRunningStatus("started");
      setGameOver(false);
    } else {
      setStage(createStage());
      setDropTime(null);
      setScore(0);
      setLevel(0);
      setRows(0);
      setGameRunningStatus("stopped");
      setGameOver(false);
    }
  };

  const toggleGameRunningStatus = () => {
    if (gameRunningStatus === "started") {
      setDropTime(null);
      setGameRunningStatus("paused");
    } else if (gameRunningStatus === "paused") {
      drop();
      if (rows > (level + 1) * 10) {
        setDropTime(1000 / (level + 1) + 200);
      } else{
        setDropTime(1000);
      }
      setGameRunningStatus("started");
    }
  };
  const speedUp = () => {
    setDropTime(prev => prev > 200 ? prev -100 : prev);
  };
  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!detectCollision(tile, stage, { x: 0, y: 1 })) {
      updateTilePos({ x: 0, y: 1, collided: false });
    } else {
      if (tile.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setGameRunningStatus("stopped");
        setDropTime(null);
      }
      updateTilePos({ x: 0, y: 0, collided: true });
    }
  };

  const dropTile = () => {
    setDropTime(null);
    drop();
  };
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        moveTile(-1);
      } else if (keyCode === 39) {
        moveTile(1);
      } else if (keyCode === 40) {
        dropTile();
      } else if (keyCode === 38) {
        tileRotate(stage, 1);
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          <DisplayText text={`Score ${score}`} />
          <DisplayText text={`Lines ${rows}`} />
          <DisplayText text={`Level ${level}`} />
          {gameOver ? (
            <DisplayText
              gameOver={gameOver}
              text="Game Over"
              blink={gameRunningStatus === "stopped"}
            />
          ) : null}
          {gameRunningStatus === "stopped" ? null : (
            <DisplayText
              text={gameRunningStatus === "paused" ? "Game Paused" : null}
              blink={gameRunningStatus === "paused"}
            />
          )}
        </aside>
      </StyledTetris>
      <div className="retro-buttons">
     
        <div className="game-control-buttons">
          <div className="game-controls-1">
            <ActionButton
              callback={() => speedUp()}
              name="SPEED"
              radius="35" classes="speed-button"
            ></ActionButton>
            <ActionButton
              callback={() => moveTile(-1)}
              name="LEFT"
              radius="35" classes="left-button"
            ></ActionButton>
            <ActionButton
              callback={() => moveTile(1)}
              name="RIGHT"
              radius="35" classes="right-button"
            ></ActionButton>
            <ActionButton
              callback={() => drop()}
              name="DOWN"
              radius="35" classes="drop-button"
            ></ActionButton>
          </div>
          <div className="game-play-buttons">
          <ActionButton
            callback={toggleGameStatus}
            name= "Start/Stop"
            radius="15"
          ></ActionButton>
         
            <ActionButton
              callback={toggleGameRunningStatus}
              name={gameRunningStatus === "paused" ? "Resume" : "Pause"}
              radius="15"
            ></ActionButton>
         
        </div>
          <div className="game-controls-2">
            <ActionButton
              callback={() => tileRotate(stage, 1)}
              name="ROTATE"
              radius="60"
            ></ActionButton>
          </div>
        </div>
      </div>
      <DisplayText text="&#169; bijujoseph.in" textSize=".8" />
    </StyledTetrisWrapper>
  );
};

export default Tetris;
