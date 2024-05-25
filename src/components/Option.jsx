import "../styles/Option.css";
export default function ({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => {
        return (
          <button
            onClick={() => {
              {
                console.log(answer);
              }

              dispatch({
                type: "newAnswer",
                payload: i,
              });
            }}
            key={i}
            className={`${"btn btn-option"} ${answer == i ? "answer" : ""} ${
              hasAnswer && (i == question.correctOption ? "correct" : "wrong")
            }`}
            disabled={hasAnswer}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
