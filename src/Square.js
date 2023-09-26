export default function Square({id, value, winner, onSquareClick}) {
    return (
      <button className={"square " + (winner?.includes(id) ? "winner-square" : "")} onClick={onSquareClick}>
        {value}
      </button>
    );
  }