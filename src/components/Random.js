import React from "react";
import { clearAllTimeout, isExits } from "../App";

function generateMaze(rows, cols) {
  const maze = [];

  // Initialize the maze with walls
  for (let i = 0; i < 2 * rows + 1; i++) {
    const row = [];
    for (let j = 0; j < 2 * cols + 1; j++) {
      row.push(1);
    }
    maze.push(row);
  }

  // Set every second cell to create corridors
  for (let i = 1; i < 2 * rows + 1; i += 2) {
    for (let j = 1; j < 2 * cols + 1; j += 2) {
      maze[i][j] = 0;
    }
  }

  // Randomly remove walls to create the maze
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.5) {
        maze[2 * r][2 * c + 1] = 0;
      } else {
        maze[2 * r + 2][2 * c + 1] = 0;
      }

      if (Math.random() < 0.5) {
        maze[2 * r + 1][2 * c] = 0;
      } else {
        maze[2 * r + 1][2 * c + 2] = 0;
      }
    }
  }

  return maze;
}

const rows = 5;
const cols = 5;

const maze = generateMaze(rows, cols);

export const Random = ({ size, setMaze }) => {
  const random = () => {
    clearAllTimeout();
    const newMaze = new Array(size.line * size.column).fill("black");
    const exits = new Array();
    const matMaze = [];
    const rows = Math.floor(size.line / 2);
    const cols = Math.floor(size.column / 2);
    
    // Initialize the maze with walls
    for (let i = 0; i < 2 * rows + 1; i++) {
      const row = [];
      for (let j = 0; j < 2 * cols + 1; j++) {
        row.push(1);
      }
      matMaze.push(row);
    }

    // Set every second cell to create corridors
    for (let i = 1; i < 2 * rows + 1; i += 2) {
      for (let j = 1; j < 2 * cols + 1; j += 2) {
        matMaze[i][j] = 0;
        newMaze[i * size.column + j] = "white";
        
      }
    }

    // Randomly remove walls to create the maze
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.5) {
          matMaze[2 * r][2 * c + 1] = 0;
          newMaze[2 * r * size.column + 2 * c + 1] = "white";
        } else {
          matMaze[2 * r + 2][2 * c + 1] = 0;
          newMaze[(2 * r + 2) * size.column + 2 * c + 1] = "white";
        }

        if (Math.random() < 0.5) {
          matMaze[2 * r + 1][2 * c] = 0;
          newMaze[(2 * r + 1) * size.column + 2 * c] = "white";
        } else {
          matMaze[2 * r + 1][2 * c + 2] = 0;
          newMaze[(2 * r + 1) * size.column + 2 * c + 2] = "white";
        }
      }
    }

    //Set Start Point
    newMaze.forEach((element, id) => {
      if (isExits(id, size, newMaze) && element === "white") exits.push(id);
    });
    newMaze[exits[Math.floor(Math.random() * exits.length)]] = "blue";

    setMaze(newMaze);
  };
  return <button onClick={random}>Random</button>;
};
