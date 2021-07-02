// const gameRestart = document.getElementById("restart");
const innerCards = document.querySelectorAll(".flip-card-inner");
const cards = document.querySelectorAll(".flip-card");
let preCard = null;
let guessCount = 0;
let nonMatchedCard = cards.length / 2;
let pairImages;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter) + 1;

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// console.dir(innerCards[0].children[1].children[0]);

function startGame() {
  // create Pair Images List
  let indices = [];
  for (let i = 1; i <= nonMatchedCard; i++) {
    indices.push(i.toString());
  }
  pairImages = shuffle(indices.concat(indices));

  for (let i = 0; i < innerCards.length; i++) {
    let path = "images/" + pairImages[i] + ".jpeg";
    innerCards[i].children[1].children[0].src = path;
  }
}

startGame();

let bestScore = parseInt(localStorage.getItem("lowestScore")) || 0;

function finishGame(score) {
  if (score < bestScore) {
    console.log("update best score");
    localStorage.setItem("lowestScore", score);
  } else {
    console.log("show score");
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", handleCardClick);
}

function handleCardClick(event) {
  if (event.target.parentElement.className !== "flip-card-front") {
    return;
  }

  let currentCard = event.target.parentElement.parentElement;
  currentCard.classList.add("flipped");
  guessCount++;

  if (preCard) {
    preCardSrc = preCard.children[1].children[0].src;
    currentCardSrc = currentCard.children[1].children[0].src;

    if (preCardSrc === currentCardSrc) {
      nonMatchedCard--;

      if (nonMatchedCard == 0) {
        finishGame(guessCount);
      }
      preCard = null;
    } else {
      setTimeout(function () {
        preCard.classList.remove("flipped");
        currentCard.classList.remove("flipped");
        preCard = null;
      }, 700);
    }
  } else {
    preCard = currentCard;
  }
}
