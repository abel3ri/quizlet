import "../styles/Progress.css";
export default function Progress({
  totalPoints,
  index,
  numQuestions,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        className="progress-bar"
        max={numQuestions}
        value={index + Number(answer !== null)}
      />

      <div className="point-container">
        <h5>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </h5>
        <h5>
          Points {points} / {totalPoints}
        </h5>
      </div>
    </header>
  );
}
