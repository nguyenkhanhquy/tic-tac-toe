import { useState } from "react";

import Borad from "./components/Borad";
import ListMove from "./components/ListMove";
import ModeGame from "./components/ModeGame";

export default function App() {
    const [mode, setMode] = useState("0");

    let humanPlayer;
    let aiPlayer;

    if (mode === "1") {
        humanPlayer = "X";
        aiPlayer = "O";
    } else if (mode === "2") {
        humanPlayer = "O";
        aiPlayer = "X";
    }

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

    function isDraw(currentMove, result) {
        if (!result && currentMove === 9) {
            return true;
        }
    }

    const result = calculateWinner(currentSquares);
    let status;
    if (isDraw(currentMove, result)) {
        status = "Draw";
    } else if (result) {
        if (mode === "0") {
            status = "Winner: " + result.winner;
        } else if (mode === "1") {
            if (result.winner === "O") {
                status = "Winner: Bot(O)";
            } else {
                status = "Winner: Human(X)";
            }
        } else if (mode === "2") {
            if (result.winner === "X") {
                status = "Winner: Bot(X)";
            } else {
                status = "Winner: You(O)";
            }
        }
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
        if ((mode === "1" && !xIsNext) || (mode === "2" && xIsNext)) {
            status = "Waiting...";
            const nextSquares = currentSquares.slice();
            const bestMove = parseInt(getBestMove(nextSquares, aiPlayer).index);
            nextSquares[bestMove] = aiPlayer;
            handlePlay(nextSquares, "Bot");
        }
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

                    <ModeGame setMode={setMode} resetGame={handleReset} />
                </div>

                {mode === "0" && (
                    <>
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
                    </>
                )}
            </div>
        </>
    );

    function getBestMove(newBoard, player) {
        const availableSpots = newBoard.reduce((accumulator, cell, index) => {
            if (!cell) accumulator.push(index);
            return accumulator;
        }, []);

        const winner = calculateWinner(newBoard);
        if (winner) {
            if (winner.winner === humanPlayer) {
                return { score: -10 };
            } else if (winner.winner === aiPlayer) {
                return { score: 10 };
            }
        } else if (availableSpots.length === 0) {
            return { score: 0 };
        }

        const moves = [];
        for (const index of availableSpots) {
            const move = {};
            move.index = index;
            newBoard[index] = player;

            if (player === aiPlayer) {
                const result = getBestMove(newBoard, humanPlayer);
                move.score = result.score;
            } else {
                const result = getBestMove(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[index] = null;
            moves.push(move);
        }

        let bestMove;
        if (player === aiPlayer) {
            let bestScore = -Infinity;
            for (const move of moves) {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            }
        } else {
            let bestScore = Infinity;
            for (const move of moves) {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            }
        }

        return bestMove;
    }
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
