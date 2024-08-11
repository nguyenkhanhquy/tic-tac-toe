export default function ModeGame({ setMode, resetGame }) {
    return (
        <>
            <div className="game-button">
                <select
                    onChange={(e) => {
                        setMode(e.target.value);
                        resetGame();
                    }}
                >
                    <option value="0">Human vs Human</option>
                    <option value="1">Human vs Bot(O)</option>
                    <option value="2">Human vs Bot(X)</option>
                </select>
            </div>
        </>
    );
}
