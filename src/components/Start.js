import React, { useState } from "react";
import { clearAllTimeout, isExits } from "../App";
class Nod {
  constructor(id, parent) {
    this.id = id;
    this.parent = parent;
  }
}

export const Start = ({ maze, setMaze, size }) => {
  const [speed, setSpeed] = useState(1);

  const inp1 = (val) => {
    setSpeed(val.target.value);
  };

  const getInitMaze = () => {
    const newMaze = maze.map((value) => {
      if (value === "red" || value === "green") return "white";
      return value;
    });
    return newMaze;
  };

  const isNeighbord = (nod1, nod2) => {
    if (nod1.id + 1 === nod2.id && nod2.id % size.column !== 0) return true;
    if (nod1.id - 1 === nod2.id && (nod2.id + 1) % size.column !== 0)
      return true;
    if (nod1.id + size.column === nod2.id) return true;
    if (nod1.id - size.column === nod2.id) return true;
    return false;
  };
  const transformDate = (nods, exits, initMaze) => {
    initMaze.forEach((element, id) => {
      if (element === "white") {
        const nod = new Nod(id, 0);
        nods.push(nod);
        if (isExits(id, size, maze)) exits.push(nod);
      }
      if (element === "blue") {
        const nod = new Nod(id, 0);
        nods.unshift(nod);
      }
    });
  };
  const Bfs = (nods) => {
    const queue = new Array();
    queue.push(nods.shift());
    while (queue.length !== 0) {
      const deletes = new Array();
      const nodParcurs = queue.shift();
      nods.forEach((nod) => {
        if (!isNeighbord(nodParcurs, nod)) return null;
        nod.parent = nodParcurs;
        queue.push(nod);
        deletes.push(nod);
      });
      for (let i = 0; i < deletes.length; i++)
        nods.splice(nods.indexOf(deletes[i]), 1);
    }
  };

  const afisare = (exits, initMaze) => {
    exits.forEach((nodExit, time) => {
      const newMaze = initMaze.slice();
      setTimeout(() => {
        if (nodExit === "exit") return setMaze(newMaze);
        let nodCurent = nodExit;
        if (nodCurent.parent === 0) newMaze[nodCurent.id] = "red";
        while (nodCurent.parent !== 0) {
          newMaze[nodCurent.id] = "green";
          nodCurent = nodCurent.parent;
        }
        setMaze(newMaze);
      }, (1000 * time) / speed);
    });
  };

  const click = () => {
    clearAllTimeout();
    const initMaze = getInitMaze(maze);
    const exits = new Array();
    const nods = new Array();
    transformDate(nods, exits, initMaze);
    if (exits.length === 0) return alert("Nu exista iesiri!");
    if (maze[nods[0].id] !== "blue") return alert("Nu exista start!");
    exits.push("exit");
    Bfs(nods);
    afisare(exits, initMaze);
  };

  return (
    <>
      <button onClick={click} className='Start'>
        Start
      </button>
      <input
        type='range'
        min='1'
        max='10'
        value={speed}
        onChange={inp1}
      ></input>
      <label>{speed}</label>
    </>
  );
};
