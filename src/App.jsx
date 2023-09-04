import "./app.css";
import { useEffect, useMemo, useState } from "react";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
import { GiDiamonds } from "react-icons/gi";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(4);
  const [stop, setStop] = useState(false);
  const [chooseVariant, setChooseVariant] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [easyDataArray, setEasyDataArray] = useState(false);
  const [mediumDataArray, setMediumDataArray] = useState(false);
  const [hardDataArray, setHardDataArray] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerPercent, setTimerPercent] = useState(30);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((resEasy) => {
        if (resEasy.ok && resEasy.status === 200) {
          return resEasy.json();
        }
      })
      .then((easyData) => {
        setEasyDataArray(easyData);
      })
      .catch(console.log("err"));

    fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
    )
      .then((resMed) => {
        if (resMed.ok && resMed.status === 200) {
          return resMed.json();
        }
      })
      .then((mediumData) => {
        setMediumDataArray(mediumData);
      })
      .catch(console.log("err"));

    fetch("https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple")
      .then((resHard) => {
        if (resHard.ok && resHard.status === 200) {
          return resHard.json();
        }
      })
      .then((hardData) => {
        setHardDataArray(hardData);
      })
      .catch(console.log("err"));
  }, []);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, borderId: 101, amount: "$100" },
        { id: 2, borderId: 102, amount: "$200" },
        { id: 3, borderId: 103, amount: "$300" },
        { id: 4, borderId: 104, amount: "$500" },
        { id: 5, borderId: 105, amount: "$1.000" },
        { id: 6, borderId: 106, amount: "$2.000" },
        { id: 7, borderId: 107, amount: "$4.000" },
        { id: 8, borderId: 108, amount: "$8.000" },
        { id: 9, borderId: 109, amount: "$16.000" },
        { id: 10, borderId: 110, amount: "$32.000" },
        { id: 11, borderId: 111, amount: "$64.000" },
        { id: 12, borderId: 112, amount: "$125.000" },
        { id: 13, borderId: 113, amount: "$250.000" },
        { id: 14, borderId: 114, amount: "$500.000" },
        { id: 15, borderId: 115, amount: "$1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber <= 5) {
      setEarned("$ 0");
    } else if (questionNumber > 5 && questionNumber <= 10) {
      setEarned("$ 1000");
    } else if (questionNumber > 10 && questionNumber < 15) {
      setEarned("$ 32.000");
    } else {
      setEarned("$ 1 MILLION");
      setStop(true);
    }
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      <>
        {userName ? (
          <>
            <div className="main">
              <div className="top">
                <div className="userName">{userName} </div>
              </div>
              <div className="bottom ">
                <div className="stepMoney d-none">
                  <div className="lineCenterQuestion"></div>
                  <div className="questionBorder">
                    <div className="textDiv">
                      {stop ? (
                        <div>{earned}</div>
                      ) : (
                        <div>{questionNumber > 15 ? (earned):(moneyPyramid[15 - questionNumber].amount)}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="containerTrivia">
                  <div  className={
                        questionNumber > 10
                          ? "timer d-none"
                          : "timer"
                      }>
                    <div
                      className="rotation"
                      style={{
                        "--rotation":
                          ((timerPercent - timer) / timerPercent) * 100 + "%",
                      }}
                    ></div>
                    <div className="d-none">
                      <Timer
                        setStop={setStop}
                        questionNumber={questionNumber}
                        chooseVariant={chooseVariant}
                        setChooseVariant={setChooseVariant}
                        timer={timer}
                        setTimer={setTimer}
                        setTimerPercent={setTimerPercent}
                      />
                    </div>
                  </div>
                  <Trivia
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    easyDataArray={easyDataArray}
                    mediumDataArray={mediumDataArray}
                    hardDataArray={hardDataArray}
                    setChooseVariant={setChooseVariant}
                  />
                </div>
              </div>
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneyPyramid.map((m) => (
                  <li
                    key={m.id}
                    className={
                      questionNumber === m.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                  >
                    <div
                      className={
                        questionNumber === m.id
                          ? "moneyBorder active"
                          : "moneyBorder"
                      }
                    >
                      <div className="resp">
                        <span className="moneyListItemNumber">{m.id}</span>
                        <span className="iconSpan">
                          <span
                            className={
                              questionNumber >= m.id
                                ? " " : "d-none"
                            }
                          >
                            <GiDiamonds />
                          </span>
                        </span>
                        <span className="moneyListItemAmount">{m.amount}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <Start
            setUserName={setUserName}
            setEasyDataArray={setEasyDataArray}
            easyDataArray={easyDataArray}
            mediumDataArray={mediumDataArray}
            setMediumDataArray={setMediumDataArray}
            hardDataArray={hardDataArray}
            setHardDataArray={setHardDataArray}
          />
        )}
      </>
    </div>
  );
}

export default App;
