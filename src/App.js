import React, { useState, useEffect } from 'react';
import './App.css'


function App() {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);
  const [amountMoves, setAmountMoves] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState();




  const handleCellClick = (index) => {
    if (winner) {
      console.log("Jogo Finalizado");
      return null;
    }
    if (board[index] !== '') return null;

    setBoard(board.map(
      (item, itemIdex) => itemIdex === index ? currentPlayer : item)
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setAmountMoves(amountMoves + 1);
  }

  const handleResetGame = () => {
    setBoard(emptyBoard);
    setAmountMoves(0);
    setCurrentPlayer("O");
    setWinner(null);
  }
  const verify = (start, end, value, increment = 1) => {
    let straight = [];
    var i;
    for (i = start; i <= end; i = i + increment)
      straight.push(board[i]);

    if (straight.length > 3) {
      straight.pop();
    }

    return straight.every(cell => cell === value);
  }


  const checkWinner = () => {
    if (amountMoves >= 3) {
      if (verify(0, 3, "O", 1) || verify(3, 5, "O", 1) ||
        verify(6, 8, "O", 1) || verify(0, 6, "O", 3) ||
        verify(1, 7, "O", 3) || verify(2, 8, "O", 3) ||
        verify(0, 8, "O", 4) || verify(2, 6, "O", 2)
      )
        setWinner("O");
    }

    if (verify(0, 3, "X", 1) || verify(3, 5, "X", 1) ||
      verify(6, 8, "X", 1) || verify(0, 6, "X", 3) ||
      verify(1, 7, "X", 3) || verify(2, 8, "X", 3) ||
      verify(0, 8, "X", 4) || verify(2, 6, "X", 2)
    ) {
      setWinner("X");
    }

    checkDraw();
  }

  const checkDraw = () => {
    if (amountMoves === 9 && !winner) {
      setWinner("Nobody ");
    }
  }
  useEffect(checkWinner);
  return (
    <main>

      <h1 className="title">Tic Tac Toe</h1>     
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) =>
          (
            <div
              key={index}
              className={`cell ${item}`}
              onClick={() => { handleCellClick(index) }}
            >
              {item}
            </div>
          )
        )}
      </div>
      {winner &&
        <footer>
          <h2 className="winner-message">

            <span className={winner}>{winner}</span>
            win !
        </h2>
          <button onClick={handleResetGame}>
            Restart
        </button>
        </footer>
      }
    </main>
  );
}

export default App;
