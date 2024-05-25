import "../styles/Question.css";
import Option from "./Option";

export default function Question({ question, dispatch, answer }) {
  return (
    <div className="question">
      <h4 className="question-title">{question.question}</h4>

      <Option
        question={question}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
}
