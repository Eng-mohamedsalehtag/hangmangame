//chose category from URL
var category = new URLSearchParams(window.location.search).get("category");
console.log(category);
function selectCategory(category) {
  console.log(category);
  location.href = "index.html?category=" + category;
}

//data words with categories
const wordsWithCategories = [
  { word: "javascript", category: "Programming" },
  { word: "python", category: "Programming" },
  { word: "java", category: "Programming" },
  { word: "php", category: "Programming" },
  { word: "ruby", category: "Programming" },
  { word: "swift", category: "Programming" },
  { word: "kotlin", category: "Programming" },
  { word: "egypt", category: "Countries" },
  { word: "germany", category: "Countries" },
  { word: "france", category: "Countries" },
  { word: "italy", category: "Countries" },
  { word: "turkey", category: "Countries" },
  { word: "canada", category: "Countries" },
  { word: "pizza", category: "Foods" },
  { word: "burger", category: "Foods" },
  { word: "hotdog", category: "Foods" },
  { word: "pasta", category: "Foods" },
  { word: "sandwich", category: "Foods" },
  { word: "sushi", category: "Foods" },
  { word: "interstellar", category: "Movies" },
  { word: "the dark knight", category: "Movies" },
  { word: "the avengers", category: "Movies" },
  { word: "the matrix", category: "Movies" },
  { word: "the lord of the rings", category: "Movies" },
  { word: "the shawshank redemption", category: "Movies" },
];

let selectedObj;
if (category) {
  const filteredWords = wordsWithCategories.filter(
    (word) => word.category === category,
  );
  selectedObj = filteredWords[Math.floor(Math.random() * filteredWords.length)];
} else {
  selectedObj =
    wordsWithCategories[Math.floor(Math.random() * wordsWithCategories.length)];
}
const selectedWord = selectedObj.word;
let correctLetters = [];
let wrongLetters = [];
// dom elements
const bodyParts = document.querySelectorAll(".part");
const wordDisplay = document.getElementById("word-display");
const wrongLettersList = document.getElementById("wrong-letters-list");
const categoryName = document.getElementById("category");
const remainingTries = document.getElementById("remaining-tries");
const keyboardContainer = document.getElementById("keyboard-container");
const gameModal = document.getElementById("game-modal");
const finalStatus = document.getElementById("final-status");
// display word
function displayWord() {
  categoryName.innerText = selectedObj.category;
  wordDisplay.innerHTML = selectedWord
    .split("")
    .map(
      (letter) => `
        <span class="letter-slot">
            ${correctLetters.includes(letter) ? letter : ""}
        </span>
    `,
    )
    .join("");

  // check win
  const isWin = selectedWord
    .split("")
    .every((letter) => correctLetters.includes(letter));

  if (isWin && selectedWord.length > 0) {
    setTimeout(() => {
      showGameOver(true);
    }, 300);
  }
}

function updateHangman() {
  bodyParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });

  remainingTries.innerText = 6 - wrongLetters.length;

  if (wrongLetters.length === bodyParts.length) {
    showGameOver(false);
  }
}
// create keyboard
function createKeyboard() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  keyboardContainer.innerHTML = letters
    .split("")
    .map(
      (letter) => `
        <button class="key-btn" onclick="handleGuess('${letter}')" id="key-${letter}">
            ${letter}
        </button>
    `,
    )
    .join("");
}

// handle letter guess
function handleGuess(letter) {
  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
    alert();
    return;
  }

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      wrongLettersList.innerHTML = `wrong letters: <strong>${wrongLetters.join(", ")}</strong>`;
      updateHangman();
    }
  }
  document.getElementById(`key-${letter}`).disabled = true;
}

// show game over modal
function showGameOver(isWin) {
  finalStatus.innerText = isWin ? "You Won! 🎉" : "Game Over! 💀";
  document.getElementById("reveal-word").innerHTML =
    `The word was: <strong>${selectedWord}</strong>`;
  gameModal.showModal();
}

// restart game
document.getElementById("play-again-btn").onclick = () => location.reload();
document.getElementById("reset-btn").onclick = () => location.reload();

// start game
createKeyboard();
displayWord();
updateHangman();

// kyboard press
window.addEventListener("keydown", (e) => {
  if (e.key >= "a" && e.key <= "z") {
    handleGuess(e.key);
  }
});
//function alert
// handle alert for already clicked letter from local keyboard
const alertBox = document.querySelector(".alert");
function alert() {
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 500);
}
