import { useState } from 'react';
import Board from './Board';

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSqaures = history[currentMove];
  const [toggleList, setToggleList] = useState(false);

  function handlePlay(squares){
    const nextHistory = [...history.slice(0, currentMove+1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(move){
    setCurrentMove(move);
  }

  let moves = history.map((squares, move) => {
    let desc;
    if(move === currentMove){
      desc = move === 0 ? 'You are at Game Start' : ('You are at #' + move + ' - ' + getPosition(move));
      return <li key={move}>{desc}</li>;
    }
    desc = move > 0 ? ('Go to Move' + move + ' - ' + getPosition(move)) : 'Go to Game Start';
    return (
      <li key={move}>
        <button onClick={() => {jumpTo(move)}}>{desc}</button>
      </li>
    );
  });

  function getPosition(move){
    let currentSquares = history[move];
    let previousSqaures = history[move-1];
    let pos = [0,0];
    currentSquares.forEach((value, index) => {
      if(previousSqaures[index] !== value){
        pos = [Math.floor(index/3),index%3];
      }
    });
    return pos;
  }

  function toggleHistory(){
    setToggleList(!toggleList);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSqaures} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <button className="toggle" onClick={toggleHistory}>Sort {toggleList ? "Ascending": "Descending"}</button>
        {toggleList? <ol reversed>{moves.reverse()}</ol> : <ol>{moves}</ol>}
      </div>
    </div>
  );
}
