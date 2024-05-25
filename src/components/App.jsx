import "../styles/App.css";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initalState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
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
      return { ...state, answer: action.payload };

    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initalState
  );

  const numQuestions = questions.length;

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
      {/* {console.log(status)} */}
      <Header />
      <Main>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status == "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
