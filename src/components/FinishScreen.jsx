import "../styles/FinishScreen.css";

export default function FinishScreen({
  points,
  totalPoints,
  highscore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;
  return (
    <div className="finish-screen">
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">Highscore: {highscore}</p>
      <button
        onClick={() => {
          return dispatch({ type: "restartQuiz" });
        }}
        className="btn btn-restart"
      >
        Restart
      </button>
    </div>
  );
}
