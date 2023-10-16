import { useState } from 'react';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentMove, selectHistory, selectToggleList, updateGameHistory } from './gameSlice';
import { toggleHistory, updateCurrentMove } from './gameSlice';

export default function Game(){
  const dispatch = useDispatch();
//   const [history, setHistory] = useState([Array(9).fill(null)]);
  const history = useSelector(selectHistory);
//   const [currentMove, setCurrentMove] = useState(0);
  const currentMove = useSelector(selectCurrentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSqaures = history[currentMove];
//   const [toggleList, setToggleList] = useState(false);
  const toggleList = useSelector(selectToggleList)

  function handlePlay(squares){
    // const nextHistory = [...history.slice(0, currentMove+1), squares];
    // setHistory(nextHistory);
    dispatch(updateGameHistory(squares));
    // dispatch(updateCurrentMove(nextHistory.length - 1));
    // setCurrentMove(nextHistory.length -1);
  }

//   function jumpTo(move){
//     setCurrentMove(move);
//     dispatch(updateCurrentMove(move));
//   }

  let moves = history.map((squares, move) => {
    let desc;
    if(move === currentMove){
      desc = move === 0 ? 'You are at Game Start' : ('You are at #' + move + ' - ' + getPosition(move));
      return <li key={move}>{desc}</li>;
    }
    desc = move > 0 ? ('Go to Move' + move + ' - ' + getPosition(move)) : 'Go to Game Start';
    return (
      <li key={move}>
        <button onClick={() => dispatch(updateCurrentMove(move))}>{desc}</button>
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

  function handleToggle(){
    // setToggleList(!toggleList);
    dispatch(toggleHistory());
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSqaures} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <button className="toggle" onClick={handleToggle}>Sort {toggleList ? "Ascending": "Descending"}</button>
        {toggleList? <ol reversed>{moves.reverse()}</ol> : <ol>{moves}</ol>}
      </div>
    </div>
  );
}
