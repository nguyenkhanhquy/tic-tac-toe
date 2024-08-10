export default function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        // <button className="square" onClick={onSquareClick} style={{ backgroundColor: isWinningSquare && "yellow" }}>
        //     {value}
        // </button>
        <>
            <button className={`square ${isWinningSquare ? "winning" : ""}`} onClick={onSquareClick}>
                {value}
            </button>
        </>
    );
}
