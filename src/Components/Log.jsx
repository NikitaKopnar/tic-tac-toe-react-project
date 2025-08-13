export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map((turn) => (
                <li key={`${turn.square.row}-${turn.square.col}`}>
                    {turn.Player} selected row {turn.square.row}, column {turn.square.col}
                </li>
            ))}
        </ol>
    );
}
