import Square from "./Square";

export default function Borad({ xIsNext, squares, handlePlay, calculateWinner }) {
    const result = calculateWinner(squares);

    function handleClick(i) {
        if (squares[i] || result) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        let col, row;
        if ((i + 1) % 3 === 1) {
            col = 1;
        } else if ((i + 1) % 3 === 2) {
            col = 2;
        } else {
            col = 3;
        }
        row = (i - (col - 1)) / 3 + 1;

        const clickLoaction = "(" + row + "," + col + ")";

        handlePlay(nextSquares, clickLoaction);
    }

    const winningSquares = result ? result.winningSquares : [];

    return (
        <>
            {[...Array(3)].map((_, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {[...Array(3)].map((_, colIndex) => {
                        const squareIndex = rowIndex * 3 + colIndex;
                        const isWinningSquare = winningSquares.includes(squareIndex);
                        return (
                            <Square
                                key={squareIndex}
                                value={squares[squareIndex]}
                                onSquareClick={() => handleClick(squareIndex)}
                                isWinningSquare={isWinningSquare}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}
