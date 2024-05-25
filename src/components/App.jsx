import "../styles/App.css";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import NextButton from "./NextButton";
import Timer from "./Timer";

const initalState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSeconds: 10,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: SECS_PER_QUESTION * state.questions.length,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        answer: null,
      };

    case "restartQuiz":
      return {
        ...initalState,
        status: "active",
        questions: state.questions,
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds == 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [
    { questions, status, index, answer, points, highscore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => {
    return (acc += cur.points);
  }, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get("http://localhost:8000/questions/");
        return dispatch({ type: "dataReceived", payload: res.data });
      } catch (error) {
        return dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status == "active" && (
          <>
            <Progress
              points={points}
              numQuestions={numQuestions}
              index={index}
              totalPoints={totalPoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        <Footer>
          {status == "active" && (
            <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
          )}

          {status == "active" && (
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              numQuestion={numQuestions}
            />
          )}
        </Footer>

        {status == "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
