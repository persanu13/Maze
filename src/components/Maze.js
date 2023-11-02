import React from "react";
import { Square } from "./Square";

export const Maze = ({ maze, setMaze, size }) => {
  const mazeStyle = {
    width: (600 / Math.max(size.line, size.column)) * size.column + "px",
    height: (600 / Math.max(size.line, size.column)) * size.line + "px",
  };
  const renderMaze = maze.map((value, id) => {
    return (
      <Square
        key={id + 1}
        id={id}
        type={value}
        size={Math.max(size.line, size.column)}
        maze={maze}
        setMaze={setMaze}
      />
    );
  });
  return (
    <div  className='Border'>
      <div className='Maze' style={mazeStyle}>
        {renderMaze}
      </div>
    </div>
  );
};
