const gameContainer = document.getElementById("game");
const gameStart = document.getElementById("start");
const gameRestart = document.getElementById("restart");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give data id for each div

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function resetBackgroundColor(element) {
  setTimeout(function () {
    console.log("Hiii");
    element.style.backgroundColor = "";
  }, 300);
}

let bestScore = parseInt(localStorage.getItem("lowestScore")) || 0;

function finishShowScore(score) {
  if (bestScore == 0) {
    localStorage.setItem("lowestScore", score);
    gameContainer.innerHTML = `<h1>Game Over! Your Score is ${score}</h1>`;
  } else if (score < bestScore) {
    gameContainer.innerHTML = `<h1>Game Over! Your Score is best one, ${score}</h1>`;
    localStorage.setItem("lowestScore", score);
  } else {
    gameContainer.innerHTML = `<h1>Game Over! Your Score is ${score} Need more work for making to the best one</h1>`;
  }
}

let preFaceUpCard;
let guessCount = 0;
let nonMatchedCard = 5;

// TODO: Implement this function!
function handleCardClick(event) {
  event.target.style.backgroundColor = event.target.className;
  guessCount++;

  if (preFaceUpCard && preFaceUpCard !== event.target) {
    if (preFaceUpCard.className !== event.target.className) {
      resetBackgroundColor(event.target);
      resetBackgroundColor(preFaceUpCard);
    } else {
      nonMatchedCard--;
      if (nonMatchedCard === 0) {
        finishShowScore(guessCount);
      }
    }
    preFaceUpCard = null;
  } else {
    preFaceUpCard = event.target;
  }
}

// when push start game button

createDivsForColors(shuffledColors);

gameRestart.addEventListener("click", function (e) {
  gameContainer.innerHTML = "";
  preFaceUpCard = null;
  guessCount = 0;
  nonMatchedCard = 5;
  createDivsForColors(shuffledColors);
});
