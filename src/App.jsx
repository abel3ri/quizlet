import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Main from "./components/Main";
import { useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";

const initalState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "error" };

    case "dataFailed":
      return { ...state, status: "error" };

    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initalState);
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
      {console.log(status)}
      <Header />
      <Main>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
