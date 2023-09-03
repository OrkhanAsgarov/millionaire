import { useRef} from "react";

export default function Start({
  setUserName,
  setEasyDataArray,
  easyDataArray,
  mediumDataArray,
  setMediumDataArray,
  hardDataArray,
  setHardDataArray,
}) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);

    const easyQuestionsArr = easyDataArray.results.map((user) => {
      return {
        question: `${user.question}`,
        answers: [
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.correct_answer}`,
            correct: true,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[0]}`,
            correct: false,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[1]}`,
            correct: false,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[2]}`,
            correct: false,
          },
        ],
      };
    });

    easyQuestionsArr.map((e)=>{
      return {
        question: `${e.question}`,
        answers: e.answers.sort((p1,p2) =>{
          if (p1.id < p2.id) return -1;
          if (p1.id > p2.id) return 1;
          return 0;
        }),
      };
    });
    setEasyDataArray(easyQuestionsArr);

    const mediumQuestionsArr = mediumDataArray.results.map((user) => {
      return {
        question: `${user.question}`,
        answers: [
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.correct_answer}`,
            correct: true,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[0]}`,
            correct: false,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[1]}`,
            correct: false,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[2]}`,
            correct: false,
          },
        ],
      };
    });
    mediumQuestionsArr.map((e)=>{
      return {
        question: `${e.question}`,
        answers: e.answers.sort((p1,p2) =>{
          if (p1.id < p2.id) return -1;
          if (p1.id > p2.id) return 1;
          return 0;
        }),
      };
    });
    setMediumDataArray(mediumQuestionsArr);

    const hardQuestionsArr = hardDataArray.results.map((user) => {
      return {
        question: `${user.question}`,
        answers: [
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.correct_answer}`,
            correct: true,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[0]}`,
            correct: false,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[1]}`,
            correct: false,
          },
          {
            id: Math.floor(Math.random() * 99999999),
            text: `${user.incorrect_answers[2]}`,
            correct: false,
          },
        ],
      };
    });
    hardQuestionsArr.map((e)=>{
      return {
        question: `${e.question}`,
        answers: e.answers.sort((p1,p2) =>{
          if (p1.id < p2.id) return -1;
          if (p1.id > p2.id) return 1;
          return 0;
        }),
      };
    });
    setHardDataArray(hardQuestionsArr);
  };

  return (
    <div className="start">
      <input
        placeholder="enter your name"
        className="startInput"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}

