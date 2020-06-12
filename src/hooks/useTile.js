import { useState, useCallback } from 'react';

import { TETRIS, randomTetris } from '../tetris';
import { STAGE_WIDTH, detectCollision } from '../helpers';

export const useTile = () => {
  const [tile, setTile] = useState({
    pos: { x: 0, y: 0 },
    tetris: TETRIS[0].shape,
    collided: false,
  });

  function rotate(matrix, dir) {
    // Make the rows to become cols (transpose)
    const rotatedMatrix = matrix.map((_, index) => matrix.map(column => column[index]));
    // Reverse each row to get a rotaded matrix
    if (dir > 0) return rotatedMatrix.map(row => row.reverse());
    return rotatedMatrix.reverse();
  }

  function tileRotate(stage, dir) {
    const clonedTile = JSON.parse(JSON.stringify(tile));
    clonedTile.tetris = rotate(clonedTile.tetris, dir);

    const pos = clonedTile.pos.x;
    let offset = 1;
    while (detectCollision(clonedTile, stage, { x: 0, y: 0 })) {
      clonedTile.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedTile.tetris[0].length) {
        rotate(clonedTile.tetris, -dir);
        clonedTile.pos.x = pos;
        return;
      }
    }
    setTile(clonedTile);
  }

  const updateTilePos = ({ x, y, collided }) => {
    setTile(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetTile = useCallback(() => {
    setTile({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetris: randomTetris().shape,
      collided: false,
    });
  }, []);

  return [tile, updateTilePos, resetTile, tileRotate];
};
