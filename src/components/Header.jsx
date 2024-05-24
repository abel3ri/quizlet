import "../styles/Header.css";
import logo from "../assets/quiz_logo.png";

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="quiz logo" />
      <h1>Quizlet</h1>
    </header>
  );
}
