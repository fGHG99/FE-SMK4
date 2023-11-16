import { useState } from "react";

export default function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentSquares = currentHistory[currentHistory.length - 1].slice();

    if (currentSquares[i] || calculateWinner(currentSquares)) {
      return;
    }

    currentSquares[i] = xIsNext ? "X" : "O";

    setHistory([...currentHistory, currentSquares]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);
  const isBoardFull = currentSquares.every((square) => square !== null);

  let status = "";
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull) {
    status = "It's a draw! Nobody wins.";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((step, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move === 0 ? "Go to game start" : `Go to move ${move}`}
      </button>
    </li>
  ));

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {currentSquares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
        ))}
      </div>
      <div className="moves">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
