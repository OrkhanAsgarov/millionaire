import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import { GiDiamonds } from "react-icons/gi";

export default function Trivia({
  setStop,
  questionNumber,
  setQuestionNumber,
  easyDataArray,
  mediumDataArray,
  hardDataArray,
  setChooseVariant,
}) {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("hexagon");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    if (questionNumber < 6) {
      setQuestion(easyDataArray[questionNumber - 1]);
    } else if (questionNumber >= 6 && questionNumber < 11) {
      setQuestion(mediumDataArray[questionNumber - 6]);
    } else if (questionNumber >= 11 && questionNumber < 16) {
      setQuestion(hardDataArray[questionNumber - 11]);
    } else {
      setStop(true);
    }
  }, [easyDataArray, mediumDataArray, hardDataArray, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("hexagon active");
    setChooseVariant(true);
    delay(3000, () => {
      setClassName(a.correct ? "hexagon correct" : "hexagon wrong");
    });
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(2000, () => {
          document.querySelector(".stepMoney").classList.remove("d-none");
          document.querySelector(".containerTrivia").classList.add("d-none");
        });
        delay(4000, () => {
          document.querySelector(".stepMoney").classList.add("d-none");
          document.querySelector(".containerTrivia").classList.remove("d-none");
          if (questionNumber < 15) {
            setQuestionNumber((prev) => prev + 1);
          } else {
            setQuestionNumber(15);
            document.querySelector(".stepMoney").classList.remove("d-none");
            document.querySelector(".containerTrivia").classList.add("d-none");
          }
          setSelectAnswer(null);
        });
      } else {
        wrongAnswer();

        delay(1000, () => {
          document.querySelector(".hexagon.true").classList.add("green");
          setStop(true);
        });
        delay(5000, () => {
          document.querySelector(".stepMoney").classList.remove("d-none");
          document.querySelector(".containerTrivia").classList.add("d-none");
        });
      }
    });
    if (questionNumber === 5 || questionNumber === 10) {
      delay(8000, () => {
        document.querySelector(".app").classList.add("addPyramid");
        document.querySelector(".pyramid").classList.add("d-flex");
        document.querySelector(".bottom").classList.add("d-none");
        delay(4000, () => {
          document.querySelector(".app").classList.remove("addPyramid");
          document.querySelector(".pyramid").classList.remove("d-flex");
          document.querySelector(".bottom").classList.remove("d-none");
        });
      });
    }
  };

  return (
    <>
      <div>
        A:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: question?.answers[0].correct }}
        ></span>
        {" | "}
        B:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: question?.answers[1].correct }}
        ></span>
        {" | "}
        C:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: question?.answers[2].correct }}
        ></span>
        {" | "}
        D:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: question?.answers[3].correct }}
        ></span>
      </div>
      <div className="trivia">
        <div className="lineQuestion">
          <div className="lineCenterQuestion"></div>
          <div className="questionBorder">
            <div className="textDiv">
              <div
                className="question"
                dangerouslySetInnerHTML={{ __html: question?.question }}
              ></div>
            </div>
          </div>
        </div>

        <div className="answers">
          {question?.answers.map((a) => (
            <div key={a.id} className="answer">
              <div className="hexagonBorder">
                <div
                  className={
                    selectAnswer === a ? className : `hexagon ${a.correct}`
                  }
                  onClick={() => handleClick(a)}
                >
                  <span className="iconDiamond">
                    <GiDiamonds />
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: a.text }}></p>
                </div>
              </div>
              <div className="answerLine"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
