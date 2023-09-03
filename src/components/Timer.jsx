import { useEffect, useState } from "react";

export default function Timer({
  setStop,
  questionNumber,
  chooseVariant,
  setChooseVariant,
  timer,
  setTimer,
  setTimerPercent,
}) {
  useEffect(() => {
    if (timer === 0) {
      document.querySelector(".hexagon.true").classList.add("green");
      setTimeout(() => {
        document.querySelector(".stepMoney").classList.remove("d-none");
        document.querySelector(".containerTrivia").classList.add("d-none");
      }, 5000);
      return setStop(true);
    }
    if (!chooseVariant) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setTimer((prev) => prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [setStop, timer]);
  useEffect(() => {
    if (questionNumber <= 5) {
      setChooseVariant(false);
      setTimer(30);
      setTimerPercent(30);
    } else if (questionNumber > 5 && questionNumber <= 10) {
      setChooseVariant(false);
      setTimer(45);
      setTimerPercent(45);
    } else {
      setChooseVariant(true);
    }
  }, [questionNumber]);
  return timer;
}
