import React, { useState } from "react";
import { clearAllTimeout } from "../App";

export const Resize = ({ size, setMaze }) => {
  const [line, setLine] = useState("");
  const [column, setColumn] = useState("");

  const inpt1 = (val) => {
    if (val.target.value >= 0 && val.target.value <= 50)
      setLine(val.target.value);
  };
  const inpt2 = (val) => {
    if (val.target.value >= 0 && val.target.value <= 50)
      setColumn(val.target.value);
  };

  const resize = () => {
    clearAllTimeout();
    setMaze(new Array(size.line * size.column).fill("white"));
    if (line < 2) return alert("line este prea mic");
    if (column < 2) return alert("column este prea mic");
    size.line = Number(line * 2 + 1);
    size.column = Number(column * 2 + 1);
    setMaze(new Array(size.line * size.column).fill("white"));
  };

  return (
    <>
      <label>height:</label>
      <input type='text' placeholder='2-50' value={line} onChange={inpt1} />
      <label>width:</label>
      <input type='text' placeholder='2-50' value={column} onChange={inpt2} />
      <button onClick={resize}>Resize</button>
    </>
  );
};
