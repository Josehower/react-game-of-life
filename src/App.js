/** @jsxImportSource @emotion/core */
import { css, Global } from "@emotion/core";
import { useEffect, useState } from "react";
import { create2DArray, runTurn } from "./utils/createGame";

const globalStyles = css`
body{background-color: #333} 
`

const columnStyles = css`
  height: 10px;
  padding: 0;
  margin: 2px;
  cursor: pointer;

  span {
    display: inline-block;
    border: solid 1px #58d8ff;
    width: 10px;
    height: 10px;
    padding: 0;
    margin: 0;
  }
`;

const live = css`
  display: inline-block;
  border: solid 1px transparent;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #eed966;
  padding: 0;
  margin: 0;
`;

function App() {
  const gameGridCopy = create2DArray(20, 20).map((xArr) => xArr.map(() => 0));

  const [gameGrid, setGameGrid] = useState(gameGridCopy);
  const [isActive, setIsActive] = useState(false);

  function handleClick(x, y) {
    if (isActive) return;
    const gameGridCopy = gameGrid.map((column) => [...column]);
    gameGridCopy[x][y] = gameGridCopy[x][y] ? 0 : 1;
    setGameGrid(gameGridCopy);
  }

  useEffect(() => {
    const run = setInterval(() => {
      if (isActive) {
        setGameGrid(runTurn(gameGrid));
      }
    }, 500);
    return () => clearInterval(run);
  }, [gameGrid, isActive]);

  return (
    <div className="App">
      <Global styles={globalStyles} />
      {gameGrid.map((column, xIndex) => {
        return (
          <div css={columnStyles}>
            {column.map((cell, yIndex) =>
              cell === 0 ? (
                <span onClick={() => handleClick(xIndex, yIndex)}> </span>
              ) : (
                <span css={live} onClick={() => handleClick(xIndex, yIndex)}>
                  {" "}
                </span>
              )
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
        {isActive ? "turn off" : "turn on"}
      </button>
    {/* </Global> */}
    </div>
  );
}

export default App;
