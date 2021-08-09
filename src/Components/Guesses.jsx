import React from "react";
import styles from "./css/styles";

const Guesses = ({ wordData, guess }) => {
  return (
    <div style={styles.guessDiv}>
      <h1 id="def">{wordData.set === true ? wordData.definition : ""}</h1>
      <div style={styles.guessDiv}>
        {wordData.set
          ? wordData.word.map((letter, i) => {
              return (
                <div
                  key={i}
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <input
                    style={styles.input}
                    className="question"
                    placeholder={letter}
                    onChange={(e) =>
                      guess(e.target.value, e.target.placeholder, i)
                    }
                  />
                  <br />
                  <br />
                  <p className="answer" style={styles.correct}></p>
                </div>
              );
            })
          : "loading"}
      </div>
    </div>
  );
};

export default Guesses;
