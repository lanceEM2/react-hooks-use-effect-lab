import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    const timerId = setTimeout(() => {
      // decreasing time by 1 second
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    // Cleanup function for useEffect
    return () => clearTimeout(timerId);
  }, [timeRemaining]); // Dependency array to ensure useEffect runs when timeRemaining changes

  useEffect(() => {
    // to check if time runs out
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      // call the onAnswered callback with a value of false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
