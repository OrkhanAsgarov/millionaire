import "./app.css";
import { useEffect, useMemo, useState } from "react";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
// import { randomQuestion } from "./Api";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  // API den soru cekme ucun irelide lazim olacaq
  // API ALINAN ADRES:::::: https://opentdb.com/api_config.php
  // const questionsEasy = new XMLHttpRequest();
  // questionsEasy.open('GET', 'https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple');
  // questionsEasy.send();
  // questionsEasy.addEventListener('load', function () {
  //   const data = JSON.parse(this.responseText);
  //   console.log(data);
  //   const randomData = Math.floor(Math.random() * 50);
  //   console.log(data.results[randomData]);
  //   let sonuc = data.results[randomData].question;
  //   console.log(sonuc);

  // })

  const moneyPyramid = useMemo(()=>
    [
      { id: 1, amount: "500 TL" },
      { id: 2, amount: "1.000 TL" },
      { id: 3, amount: "2.000 TL" },
      { id: 4, amount: "3.000 TL" },
      { id: 5, amount: "5.000 TL" },
      { id: 6, amount: "7.500 TL" },
      { id: 7, amount: "15.000 TL" },
      { id: 8, amount: "30.000 TL" },
      { id: 9, amount: "60.000 TL" },
      { id: 10, amount: "125.000 TL" },
      { id: 11, amount: "250.000 TL" },
      { id: 12, amount: "1.000.000 TL" },
    ].reverse(),[]);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">You earned: {earned} </h1>
        ) : (
          <>
            <div className="top">
              <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setStop={setStop}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
            >
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
