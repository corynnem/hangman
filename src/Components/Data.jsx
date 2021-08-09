import React, { Component } from "react";
import Guesses from "./Guesses";
import Alphabet from "./Alphabet";
import styles from "./css/styles";

class Data extends Component {
  constructor() {
    super();
    this.state = {
      wordData: {
        word: "",
        definition: "",
        set: false,
        guessed: false,
      },
      currentLetter: "",
      lives: 10,
      won: false,
    };
  }

  reset = () => {
    if (this.state.wordData.word.length === 0) {
      this.randomWord();
    } else {
      this.setState({
        wordData: {
          word: "",
          definition: "",
          set: false,
          guessed: false,
        },
        currentLetter: "",
        lives: 10,
        won: false,
      });
      this.randomWord();
    }
  };

  randomWord = async () => {
    let id = "a200cd3b-6ba8-4bd7-bea4-680414232a91";
    let response = await fetch(`https://random-words-api.vercel.app/word`);
    let json = await response.json();

    let url = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${json[0].word}?key=${id}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((jsonData) => this.getDefinition(jsonData));
  };

  shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  getDefinition = async (json) => {
    let shuffled = this.shuffleArray(json);
    if (json[0].def === undefined) {
      let newUrl = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${shuffled[0]}?key=a200cd3b-6ba8-4bd7-bea4-680414232a91`;
      let response = await fetch(newUrl);
      let jsonData = await response.json();
      let checkFormat = this.format(jsonData[0].meta.id);

      this.setState({
        wordData: {
          word: checkFormat,
          definition: jsonData[0].shortdef[0],
          set: true,
        },
      });
    } else {
      let checkFormat = this.format(shuffled[0].meta.id);
      this.setState({
        wordData: {
          word: checkFormat,
          definition: shuffled[0].shortdef[0],
          set: true,
        },
      });
    }
  };

  format = (colonWord) => {
    if (colonWord.includes(":")) {
      let newWord =  colonWord.split(":")[0].toLowerCase().split("");
      return newWord;
    } else {
      return colonWord.toLowerCase().split("");
    }
  };

  guess = (value, placeholder, i) => {
    let answer = document.getElementsByClassName("answer");
    if (value === placeholder) {
      let final = [];
      answer[i].innerText = value;

      for (let a of answer) {
        final.push(a.innerText);
        final = final.filter((letter) => letter !== "");
      }

      if (final.length === this.state.wordData.word.length) {
        this.setState({
          wordData: {
            word: this.state.wordData.word,
            definition: this.state.wordData.definition,
            set: true,
            guessed: true,
          },
          won: true,
        });
      } else {
        this.setState({
          wordData: {
            word: this.state.wordData.word,
            definition: this.state.wordData.definition,
            set: true,
            guessed: true,
          },
        });
        setTimeout(() => {
          this.setState({
            wordData: {
              word: this.state.wordData.word,
              definition: this.state.wordData.definition,
              set: true,
              guessed: false,
            },
          });
        }, 3000);
      }
    } else {
      let stateLives = this.state.lives
      this.setState({
        lives: (stateLives -= 1),
      });
    }
  };

  setCurrentLetter = (letter) => this.setState({ currentLetter: letter });

  componentDidMount() {
    this.reset();
  }

  render() {
    return (
      <div>
        {this.state.lives === 0 ? `Game over` : ""}
        <button onClick={() => this.reset()} style={styles.button}>reset</button>
        <Alphabet
          state={this.state}
          guess={this.guess}
          setCurrentLetter={this.setCurrentLetter}
        />
        <Guesses wordData={this.state.wordData} guess={this.guess} />
      </div>
    );
  }
}

export default Data;
