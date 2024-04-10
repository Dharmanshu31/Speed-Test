import { useState, useRef } from "react";
import ResultModel from "./ResultModel";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemainnig, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemainnig > 0 && timeRemainnig < targetTime * 1000;
  if (timeRemainnig <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };
  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    setTimeStartted(true);
  };
  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };
  return (
    <>
      <ResultModel
        ref={dialog}
        targetTime={targetTime}
        reaminingTime={timeRemainnig}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-name">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} The Challenge
          </button>
        </p>
        <p className={targetTime ? "active" : undefined}>
          {timerIsActive ? "Time is running" : "Time is Inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
