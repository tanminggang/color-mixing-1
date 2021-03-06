import React, { useState } from 'react';

import ColorMixingBtn from './ColorMixingBtn';
import MixedColor from './MixedColor';
import PlayAgain from './PlayAgain';
import Timer from './Timer';

const colors = {
  'orange': ['red', 'yellow'],
  'grey': ['black', 'white'],
  'purple': ['red', 'blue'],
  'green': ['yellow', 'blue'],
  'brown': ['red', 'green']
};
const colorsMixedArr = Object.keys(colors);
let colorMixingArr = [];
colorsMixedArr.forEach((key) => {
  colorMixingArr = colorMixingArr.concat(colors[key]);
});
colorMixingArr = Array.from(new Set(colorMixingArr));


const setGame = () => {
  const [colorsMixed, setColorsMixed] = useState(colorsMixedArr);
  const [correctNum, setCorrectNum] = useState(0);
  const [status, setStatus] = useState('');
  const [chosenColors, setChosenColors] = useState([]);
  const [gameStatus, setGameStatus] = useState('incomplete');
  const [mixedColor, setMixedColor] = useState(colorsMixed[Math.floor(Math.random() * colorsMixed.length)]);
  const [correctAns, setCorrectAns] = useState(colors[mixedColor]);

  const mixCheck = (chosenColors) => {
    setColorsMixed(colorsMixed.filter(c => c !== mixedColor));
    if (correctAns.sort().join() === chosenColors.sort().join()) {
      setStatus('correct');
      setCorrectNum(correctNum + 1);
    } else {
      setStatus('incorrect');
    }
    if (colorsMixed.length === 1) {
      setTimeout(() => {
        setGameStatus('complete');
      }, 1000);
    } else {
      setTimeout(() => {
        setChosenColors([]);
        let ind = Math.floor(Math.random() * colorsMixed.filter(c => c !== mixedColor).length);
        setColorsMixed(colorsMixed.filter(c => c !== mixedColor));
        setMixedColor(colorsMixed.filter(c => c !== mixedColor)[ind]);
        setCorrectAns(colors[colorsMixed.filter(c => c !== mixedColor)[ind]]);
        setStatus('newSet');
      }, 1000)
    }
  }
  return { mixedColor, status, chosenColors, setChosenColors, mixCheck, gameStatus, correctNum };
}

const Game = props => {
  const {
    mixedColor,
    status,
    chosenColors,
    setChosenColors,
    mixCheck,
    gameStatus,
    correctNum,
  } = setGame();

  const onBtnClick = (newColor) => {
    setChosenColors([...chosenColors, newColor]);
    if (chosenColors.length >= 1) {
      mixCheck(chosenColors.concat(newColor));
    }
  }

  const checkBtnStatus = (c) => {
    if (chosenColors.indexOf(c) > -1) {
      return status === 'correct' ? '3px solid green'
            : status === 'incorrect' ? '3px solid red'
            : '3px dotted blue';
    } else {
      return 'none';
    }
  }
  
  return (
    <div>
      <h1>Color Mixing Game</h1>
      {gameStatus === 'incomplete' ? (
          <div className="body">
            <div className="left">
              <MixedColor mixedColor={mixedColor} />
            </div>
            <div className="right">
              {colorMixingArr.map((colorMixing) => {
                const outline = checkBtnStatus(colorMixing);
                return (
                  <ColorMixingBtn
                    key={`color-${colorMixing}`}
                    outline={outline}
                    colorMixing={colorMixing}
                    onClick={onBtnClick}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <PlayAgain onClick={props.startNewGame} />
        )
      }
      
      <div>
        { gameStatus === 'complete' ? (
          <p>{correctNum} correct</p>
        ) : status === 'correct'
            ? (<p>Correct!</p>)
            : status === 'incorrect'
              ? (<p>Incorrect!</p>)
              : (<p>Please select</p>)}
      </div>
      <Timer gameStatus={gameStatus} />
    </div>
  );
};

export default Game;