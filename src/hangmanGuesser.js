import words from "./wordList.js"
import userWords from "./userWords.js"

let knownWordText = document.getElementById("theWordHints")
let guessedParts = ""
let wrongLetters = ""
let lives = 5
const word = StartUp()

document.getElementById("guessingForm").addEventListener('submit', SubmitLetter)


function StartUp() {
  const possibleWords = words.concat(userWords)

  const word = possibleWords[Math.floor(Math.random() * possibleWords.length)]
  
  
  for(let i = 0; i < word.length; i++) {
    guessedParts += "?"
  }

  knownWordText.innerHTML = guessedParts

  return word
}

function SubmitLetter(event) {
  event.preventDefault();
  let letter = document.getElementById("letterInput").value
  if (letter.match(/[a-z]/i)) {
    CheckIfInWord(letter)
  }
}

function CheckIfInWord(str) {
  let wrong = 0
  for(let i = 0; i < word.length; i++) {
    if(word[i] == str) {
      const knownPositionsArray = guessedParts.split(''); // Convert string to array
      knownPositionsArray[i] = str.toUpperCase(); // Modify the array
      guessedParts = knownPositionsArray.join(''); // Convert array back to string
      knownWordText.innerHTML = guessedParts
    } else {
      wrong++
    }
  }

  if (wrong == word.length) {
    wrongLetters += str
    document.getElementById("wrongLetters").innerHTML = `Wrong letters: "${wrongLetters}"`
    lives--
  }

  if(lives <= 0) {
    knownWordText.innerHTML = "YOU LOST"
  }
}