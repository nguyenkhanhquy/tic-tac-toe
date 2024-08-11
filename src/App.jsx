import { useState } from "react";

import Borad from "./components/Borad";
import ListMove from "./components/ListMove";

export default function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [location, setLocation] = useState([]);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares, clickLoaction) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextLocation = [...location.slice(0, currentMove), clickLoaction];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setLocation(nextLocation);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function handleReset() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setLocation([]);
    }

    function handleNext(currentMove) {
        setCurrentMove(currentMove + 1);
    }

    function handlePrevious(currentMove) {
        setCurrentMove(currentMove - 1);
    }

    const result = calculateWinner(currentSquares);
    let status;
    if (result) {
        status = "Winner: " + result.winner;
    } else if (currentMove === 9) {
        status = "Draw";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <div className="status">{status}</div>

                    <Borad
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        handlePlay={handlePlay}
                        calculateWinner={calculateWinner}
                    />

                    <button
                        type="button"
                        className="game-button"
                        onClick={handleReset}
                        disabled={history.length - 1 === 0}
                    >
                        New game
                    </button>
                </div>

                <div className="game-info">
                    <ListMove history={history} currentMove={currentMove} jumpTo={jumpTo} location={location} />
                </div>

                <div className="game-info">
                    <button
                        type="button"
                        className="game-button"
                        onClick={() => handlePrevious(currentMove)}
                        disabled={currentMove === 0}
                    >
                        Previous step
                    </button>

                    <br />

                    <button
                        type="button"
                        className="game-button"
                        onClick={() => handleNext(currentMove)}
                        disabled={currentMove === history.length - 1}
                    >
                        Next step
                    </button>
                </div>
            </div>
        </>
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winningSquares: [a, b, c] };
        }
    }
    return null;
}
