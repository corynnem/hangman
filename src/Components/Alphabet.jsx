import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import styles from "../Components/css/styles";

const Alphabet = ({ state, guess, setCurrentLetter }) => {
  const { width, height } = useWindowSize();
  let [inputs, setInputs] = useState(0);
  let [alphabet] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]);

  const checkLetter = (e) => {
    let question = document.getElementsByClassName("question");
    let letter = e.target.value;
    setCurrentLetter(letter);

    for (let i = 0; i < 1; i++) {
       if (inputs < question.length ) {
        question[inputs].value = letter;
        setInputs(inputs + 1);
        guess(letter, question[inputs].placeholder, inputs, e);
      } else if (inputs === question.length) {
        question[0].value = letter;
        setInputs(0);
        guess(letter, question[0].placeholder, 0, e);
      }
    }
  };

  return (
    <div>
      {state.wordData.guessed ? <Confetti width={width} height={height} /> : ""}
      <div style={styles.alphabetDiv}>
        {alphabet.map((letter, i) => {
          return (
            <div
              style={{ marginLeft: "2%", marginTop: ".5%", height: "4vh" }}
              key={i}
            >
              <button
                style={styles.alphabet}
                className="letter"
                value={letter}
                onClick={(e) => checkLetter(e)}
              >
                {letter}
              </button>
            </div>
          );
        })}
      </div>

      <h4 id="guesses">
        {state.won
          ? `you win!`
          : state.wordData.guessed
          ? `Woohoo you picked the correct letter!`
          : state.currentLetter.length > 0
          ? ` You picked ${state.currentLetter}`
          : ""}
      </h4>
      <h1>{`${state.lives} lives left`}</h1>
    </div>
  );
};

export default Alphabet;
