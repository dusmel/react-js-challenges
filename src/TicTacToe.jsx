import { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";

const generateBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

function TicTacToe() {
  const [board, setBoard] = useState(generateBoard(3));
  const [currentUser, setCurrentUser] = useState("X");
  const [winner, setWinner] = useState("");
  console.log(board);

  const checkForWinHorizontal = (board) => {
    // horizontal
    for (const row of board) {
      const rowUniq = new Set(row);
      if (rowUniq.size === 1 && !rowUniq.has(undefined)) {
        return true;
      }
    }
    return false;
  };

  const convertColumnToRow = (board) => {
    let columnIndex = 0;
    const transformedBoard = [];

    while (columnIndex < board.length) {
      const newRow = [];
      for (const row of board) {
        newRow.push(row[columnIndex]);
      }
      transformedBoard.push(newRow);
      columnIndex++;
    }

    return transformedBoard;
  };

  const convertDiagonalToRow = (board) => {
    let cell = 0;

    const leftToRight = [];
    const rightToLeft = [];
    while (cell < board.length) {
      leftToRight.push(board[cell][cell]);
      rightToLeft.push(board[cell][board.length - 1 - cell]);
      cell++;
    }

    return [leftToRight, rightToLeft];
  };

  const checkForWinVertical = (board) => {
    const convertedBoard = convertColumnToRow(board);
    return checkForWinHorizontal(convertedBoard);
  };

  const checkForWinDiagonal = (board) => {
    const convertedBoard = convertDiagonalToRow(board);
    return checkForWinHorizontal(convertedBoard);
  };

  const checkForWin = (board) => {
    // horizontal
    if (checkForWinHorizontal(board)) {
      return true;
    }

    // vertical
    if (checkForWinVertical(board)) {
      return true;
    }

    // diagonal
    if (checkForWinDiagonal(board)) {
      return true;
    }
  };

  const handleClick = (row, column) => {
    board[row][column] = currentUser;
    if (checkForWin(board)) {
      setWinner(currentUser);
    }
    setBoard([...board]);
    setCurrentUser(currentUser === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setWinner(null);
    const newBoard = board.map((row) => row?.map(() => undefined));
    setBoard([...newBoard]);
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h3>Tic Tac Toe</h3>
      {!!winner && (
        <p style={{ color: "green", fontWeight: 'bold' }}>We have a winner, {winner} congs!!</p>
      )}
      {board.map((row, rowNumber) => (
        <div key={rowNumber} style={{ display: "flex" }}>
          {row.map((cell, columnNumber) => (
            <div
              style={{
                border: "1px white solid",
                cursor: "pointer",
                height: 50,
                width: 50,
                display: "grid",
                placeItems: "center",
              }}
              key={columnNumber}
              onClick={() => handleClick(rowNumber, columnNumber)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      {!!winner && <Confetti />}

      <button onClick={resetGame} style={{ marginTop: "2rem" }}>
        Reset game
      </button>
    </div>
  );
}

export default TicTacToe;
