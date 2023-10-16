import Square from './Square';
import {calculateWinner} from '../Utilities';

export default function Board({squares, xIsNext, currentMove, onPlay}) {
    const winner = calculateWinner(squares);
    let status;
    status = winner ? 'Winner : ' + squares[winner[0]] : (currentMove === 9 ? 'Draw' : 'Next Turn : ' + (xIsNext ? 'X' : 'O')); 
  
    function handleClick(i){
      if(squares[i] || calculateWinner(squares))  return;
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? 'X' : 'O';
      onPlay(nextSquares);
    }
  
    let grid = Array(3).fill(0).map(row => new Array(3).fill(0));
    let gridView = grid.map((row, index) => {
      return (
        <div className='board-row' key={index}>
          {row.map((value, sindex) => {
            let squareIndex = index*3 + sindex;
            return <Square key={squareIndex} id={squareIndex} winner={winner} value={squares[squareIndex]} onSquareClick={() => {handleClick(squareIndex)}}></Square>
          })}
        </div>
      );
    });
  
    return (
      <>
        <div className="status">{status}</div>
        {gridView}
      </>
    );
}
