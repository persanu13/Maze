import React from "react";
import { clearAllTimeout } from "../App";

export const Square = ({ id, type, size, maze, setMaze }) => {
  const squareStyle = {
    backgroundColor: "var(--" + type + ")",
    width: 600 / size + "px",
    height: 600 / size + "px",
  };
  const leftClick = () => {
    clearAllTimeout();
    const newMaze = maze.map((value, index) => {
      if (value === "green" || value === "red") return "white";
      if (id === index) return value === "black" ? "white" : "black";
      return value;
    });
    setMaze(newMaze);
  };
  const rightClick = () => {
    clearAllTimeout();
    const newMaze = maze.map((value, index) => {
      if (value === "green" || value === "red" || value === "blue")
        return "white";
      if (id === index) return "blue";
      return value;
    });
    setMaze(newMaze);
  };

  return (
    <div
      onAuxClick={rightClick}
      onClick={leftClick}
      style={squareStyle}
      className='Square'
    ></div>
  );
};
