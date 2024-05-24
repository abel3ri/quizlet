import logo from "../assets/quiz_logo.png";
import axios from "axios";
import { useEffect } from "react";
export default function Header() {
  useEffect(() => {
    async function fakeAPIDemo() {
      const res = await axios.get("http://localhost:3000/posts/");
      console.log(res.data);
    }

    fakeAPIDemo();
  }, []);

  return (
    <header className="app-header">
      <img src={logo} alt="quiz logo" />
      <h1>Quizlet</h1>
    </header>
  );
}
