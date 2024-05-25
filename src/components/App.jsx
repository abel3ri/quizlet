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

const initalState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

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

    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initalState
  );

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => {
    return (acc += cur.points);
  }, 0);

  useEffect(() => {
    async function fakeAPIDemo() {
      try {
        const res = await axios.get("http://localhost:8000/questions/");
        return dispatch({ type: "dataReceived", payload: res.data });
      } catch (error) {
        return dispatch({ type: "dataFailed" });
      }
    }
    fakeAPIDemo();
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
      </Main>
    </div>
  );
}

export default App;
