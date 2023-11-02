import "./App.css";
import React, { useState } from "react";
import { Maze } from "./components/Maze";
import { Start } from "./components/Start";
import { Resize } from "./components/Resize";
import { Random } from "./components/Random";

export const clearAllTimeout = () => {
  var id = window.setTimeout(function () {}, 0);
  while (id--) window.clearTimeout(id);
};

export const isExits = (id, size, maze) => {
  if (id >= 0 && id <= size.column - 1) return true;
  if (id >= maze.length - size.column - 1 && id <= maze.length - 1) return true;
  if ((id + 1) % size.column === 0) return true;
  if (id % size.column === 0) return true;
  return false;
};

const size = { line: 9, column: 9 };

function App() {
  const [maze, setMaze] = useState(
    new Array(size.line * size.column).fill("white")
  );

  return (
    <div className='App'>
      <Maze maze={maze} setMaze={setMaze} size={size} />
      <div className='menu'>
        <Start maze={maze} setMaze={setMaze} size={size} />
        <Resize size={size} setMaze={setMaze} />
        <Random size={size} setMaze={setMaze} />
      </div>
    </div>
  );
}

export default App;
