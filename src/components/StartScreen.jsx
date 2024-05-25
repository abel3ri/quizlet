import "../styles/StartScreen.css";

export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start-screen">
      <h1 className="headline">Welcome to Quizlet!</h1>
      <h2 className="sub-headline">
        {numQuestions} questions to test your React mastery
      </h2>
      <button
        onClick={() => {
          dispatch({ type: "start" });
        }}
        className="btn start-btn"
      >
        Let's Start
      </button>
    </div>
  );
}
