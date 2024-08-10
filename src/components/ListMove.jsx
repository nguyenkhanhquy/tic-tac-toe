export default function ListMove({ history, currentMove, jumpTo, location }) {
    const moves = history.map((_, move) => {
        let description;

        if (move === currentMove) {
            if (move === 0) {
                description = "You are at game start";
            } else {
                description = "You are at move #" + move + " " + location[move - 1];
            }
        } else {
            if (move === 0) {
                description = "Go to game start";
            } else {
                description = "Go to move #" + move + " " + location[move - 1];
            }
        }

        return (
            <li key={move}>
                {move === currentMove ? (
                    <div className="game-text">{description}</div>
                ) : (
                    <button type="button" className="game-button" onClick={() => jumpTo(move)}>
                        {description}
                    </button>
                )}
            </li>
        );
    });

    return (
        <>
            <ol>{moves}</ol>
        </>
    );
}
