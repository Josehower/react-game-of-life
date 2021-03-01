/** @jsxImportSource @emotion/core */
import { css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { create2DArray, runTurn } from './utils/createGame';

const columnStyles = css`
  height: 10px;
  padding: 0;
  margin: 0;
`;
const live = css`
  display: inline-block;
  border: solid 1px transparent;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: blue;
  padding: 0;
  margin: 0;
`;
const dead = css`
  display: inline-block;
  border: solid 1px;
  width: 10px;
  height: 10px;
  background-color: transparent;
  padding: 0;
  margin: 0;
`;

function App() {
  const gameGridCopy = create2DArray(15, 15).map((xArr) => xArr.map(() => 0));

  gameGridCopy[5][10 - 9] = 1;
  gameGridCopy[5][11 - 9] = 1;
  gameGridCopy[5][12 - 9] = 1;
  gameGridCopy[4][12 - 9] = 1;
  gameGridCopy[3][11 - 9] = 1;

  gameGridCopy[10][10 - 9] = 1;
  gameGridCopy[10][11 - 9] = 1;
  gameGridCopy[10][12 - 9] = 1;
  gameGridCopy[9][12 - 9] = 1;
  gameGridCopy[8][11 - 9] = 1;

  const [gameGrid, setGameGrid] = useState(gameGridCopy);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const run = setInterval(() => {
      if (isActive) {
        setGameGrid(runTurn(gameGrid));
      }
    }, 0);
    return () => clearInterval(run);
  }, [gameGrid, isActive]);

  return (
    <div className="App">
      {gameGrid.map((column) => {
        return (
          <div css={columnStyles}>
            {column.map((cell) =>
              cell === 0 ? (
                <span css={dead}> </span>
              ) : (
                <span css={live}> </span>
              ),
            )}
          </div>
        );
      })}
      <button
        css={css`
          margin: 30px;
        `}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'turn off' : 'turn on'}
      </button>
    </div>
  );
}

export default App;
