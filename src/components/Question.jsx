import "../styles/Question.css";
import Option from "./Option";

export default function Question({ question, dispatch, answer }) {
  return (
    <div className="question">
      {/* {console.log(question)} */}
      <h4 className="question-title">{question.question}</h4>

      <Option
        question={question}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />

      <div className="timer-container">
        <div className="timer">
          <h5>7:12</h5>
        </div>
        {answer != null && (
          <button onClick={() => {}} className="btn btn-next">
            Next
          </button>
        )}
      </div>
    </div>
  );
}
