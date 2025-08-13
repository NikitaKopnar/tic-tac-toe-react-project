
import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Players from "./Components/Players"
import GameOver from "./Components/GameOver";
import Log from "./Components/Log";
import {WINNING_COMBINATIONS} from './winning-combinations'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({'X' : 'john','O':'jason'})
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer]= useState('X');
  const gameBoard = initialGameBoard.map((row) => [...row]);

  for (const turn of gameTurns) {
    const { square, Player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = Player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) //not null condition
    {
      winner = players[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectedSquare(rowIndex, colIndex) {
    const currentPlayer = activePlayer;
    setActivePlayer(currentPlayer==='X' ? 'O': 'X')
    
    setGameTurns((prevTurns) => [
      { square: { row: rowIndex, col: colIndex }, Player: currentPlayer },
      ...prevTurns,
    ]);
}

  function handleRestart(){
    setGameTurns([]);
    setActivePlayer('X');
  }

  function handlePlayerNameChange(symbol, newName){
      setPlayers(prevPlayer=> {
        return {
          ...prevPlayer,
          [symbol]:newName
        }
      });
  }

  return (
   <main>
    <div id="game-container">
    <ol id="players" className="highlight-player">
      <Players name={players.X} symbol="X" isActive={activePlayer === 'X'}
      onChangeName = {handlePlayerNameChange}
      gameEnded={(!winner || hasDraw)}
      />
      <Players name={players.O} symbol="O" isActive={activePlayer==='O'}
      onChangeName = {handlePlayerNameChange}
      gameEnded={(!winner || hasDraw)}
      />
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
     Game board
     <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
    Log
   </main>
  )
}

export default App
  