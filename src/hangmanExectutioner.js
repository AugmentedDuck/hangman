import words from "./wordList.js"
import userWords from "./userWords.js"

var form = document.getElementById("wordLength");
var word = ""
var unknownWord = "The Word:"
var guessedLetters = ""
var wrongLetters = ""
var nextLetter = ""
var knownPositions = ""
const possibleWords = words.concat(userWords)


function HandleForm(event) {
  event.preventDefault();
  var unknownWordText = document.getElementById("unknownWordText")
  var wordSize = document.getElementById("size").value;

  for (let i = 0; i < wordSize; i++) {
    unknownWord += " _"
    knownPositions += "?"
  }

  for (let i = possibleWords.length - 1; i >= 0; i--) {
    if (possibleWords[i].length != knownPositions.length) {
      possibleWords.splice(i, 1);
    }
  }

  console.log(possibleWords)

  unknownWordText.innerHTML = `<p>${unknownWord}</p>`

  NextGuess();
}

form.addEventListener('submit', HandleForm);
document.getElementById('noButton').addEventListener('click', WrongLetter)

function NextGuess() {
  let letters = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  if(possibleWords.length > 0){
    for (let i = 0; i < possibleWords.length; i++) {
      for (let j = 0; j < possibleWords[i].length; j++) {
        let letter = possibleWords[i][j];
        
        // Convert the letter to lowercase
        letter = letter.toLowerCase();
        
        // Increment the count for the corresponding letter index
        letters[letter.charCodeAt(0) - 97]++;
      }
    }

    let indexOfNextLetter = IndexOfMax(letters);
    console.log(letters)
    nextLetter = String.fromCharCode(97 + indexOfNextLetter);
  }

  let nextGuessText = document.getElementById("guess")
  nextGuessText.innerHTML = `<p>Is there an "${nextLetter}" ?`

  let usedLetterText = document.getElementById("usedLettersText")
  usedLetterText.innerHTML = `<p>Used Letter: "${wrongLetters}" ?`
}

function IndexOfMax(arr) {
  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i]
    }
  }

  return maxIndex
}

function CorrectLetter(){
  guessedLetters += nextLetter
}

function WrongLetter(){
  guessedLetters += nextLetter;
  wrongLetters += nextLetter;

  console.log(wrongLetters)
  UpdateWordList();
}

function UpdateWordList() {
  let spliceIndex = []
  let index = 0
  for (let i = 0; i < possibleWords.length; i++){
    for (let j = 0; j < possibleWords[i].length; j++) {
      if (knownPositions[j] != "?") {
        if(knownPositions[j] != possibleWords[i][j]) {
          spliceIndex[index] = i;
        }
      }

      for (let l = 0; l < wrongLetters.length; l++) {
        if(wrongLetters[l] == possibleWords[i][j]) {
          spliceIndex[index] = i;
        }
      }
    }
    if(spliceIndex[index]) {
      index++
    }
  }
  console.log(spliceIndex)

  for (let i = spliceIndex.length - 1; i >= 0; i--) {
    possibleWords.splice(spliceIndex[i], 1)
  }

  console.log(possibleWords);
  NextGuess();
}