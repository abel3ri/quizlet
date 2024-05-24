import "../styles/StartScreen.css";

export default function StartScreen({ questions }) {
  return (
    <div className="start-screen">
      <h1 className="headline">Welcome to Quizlet!</h1>
      <h2 className="sub-headline">
        {questions.length} questions to test your React mastery
      </h2>
      <button className="btn start-btn">Let's Start</button>
    </div>
  );
}
