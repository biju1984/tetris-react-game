import { useState, useEffect } from 'react';
import { createStage } from '../helpers';

export const useStage = (tile, resetTile) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = prevStage => {
      // First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetris
      tile.tetris.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + tile.pos.y][x + tile.pos.x] = [
              value,
              `${tile.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      // Then check if we got some score if collided
      if (tile.collided) {
        resetTile();
        return sweepRows(newStage);
      }
      return newStage;
    };

    // Here are the updates
    setStage(prev => updateStage(prev));
  }, [
    tile.collided,
    tile.pos.x,
    tile.pos.y,
    tile.tetris,
    resetTile,
  ]);

  return [stage, setStage, rowsCleared];
};
