import "../styles/NextButton.css";
export default function NextButton({ answer, dispatch, index, numQuestion }) {
  const isLastQuestion = index + 1 == numQuestion;
  if (answer !== null)
    return (
      <div className="next-button">
        <button
          onClick={() => {
            if (!isLastQuestion) return dispatch({ type: "nextQuestion" });

            return dispatch({ type: "finish" });
          }}
          className="btn btn-next"
        >
          {isLastQuestion ? "Finish" : "Next"}
        </button>
      </div>
    );
}
