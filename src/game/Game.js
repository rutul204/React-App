import { useState } from 'react';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentMove, selectHistory, selectToggleList, updateGameHistory } from './gameSlice';
import { toggleHistory, updateCurrentMove } from './gameSlice';

export default function Game(){
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const currentMove = useSelector(selectCurrentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSqaures = history[currentMove];
  const toggleList = useSelector(selectToggleList);
  const navigate = useNavigate();

  function handlePlay(squares){
    dispatch(updateGameHistory(squares));
  }

  let moves = history.map((squares, move) => {
    let desc;
    if(move === currentMove){
      desc = move === 0 ? 'You are at Game Start' : ('You are at #' + move + ' - ' + getPosition(move));
      return <li className='history-item' key={move}>{desc}</li>;
    }
    desc = move > 0 ? ('Go to Move' + move + ' - ' + getPosition(move)) : 'Go to Game Start';
    return (
      <li className='history-item' key={move}>
        <button className='btn btn-primary history-btn' onClick={() => dispatch(updateCurrentMove(move))}>{desc}</button>
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
    dispatch(toggleHistory());
  }

  return (
    <>
      <nav className='nav'>
      <li className='nav-item'>
          <a className='nav-link disabled'>Welcome to Tic-Tac-Toe</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#' onClick={() => {navigate('/home')}}>Home</a>
        </li>
      </nav>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSqaures} onPlay={handlePlay} currentMove={currentMove} />
        </div>
        <div className="game-info">
          <button className="btn btn-primary toggle" onClick={handleToggle}>Sort {toggleList ? "Ascending": "Descending"}</button>
          {toggleList? <ol reversed>{moves.reverse()}</ol> : <ol>{moves}</ol>}
        </div>
      </div>
    </>
  );
}
