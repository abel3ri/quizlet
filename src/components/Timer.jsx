import "../styles/Timer.css";
import { useEffect } from "react";

export default function Timer({ remainingSeconds, dispatch }) {
  const mins = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, 0);
  const secs = (remainingSeconds % 60).toString().padStart(2, 0);
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      <h5>
        {mins} : {secs}
      </h5>
    </div>
  );
}
