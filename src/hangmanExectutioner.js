import words from "./wordList.js"

var form = document.getElementById("wordLength");
var word = ""
var unknownWord = "The Word:"
var guessedLetters = ""
var knownPositions = ""
const possibleWords = words


function HandleForm(event) {
  event.preventDefault();
  var unknownWordText = document.getElementById("unknownWordText")
  var wordSize = document.getElementById("size").value;

  for (let i = 0; i < wordSize; i++) {
    unknownWord += " _"
    knownPositions += "?"
  }

  for (let i = words.length - 1; i >= 0; i--) {
    if (possibleWords[i].length != knownPositions.length) {
      possibleWords.splice(i, 1);
    }
  }

  console.log(possibleWords)

  unknownWordText.innerHTML = `<p>${unknownWord}</p>`
}

form.addEventListener('submit', HandleForm);

function NextGuess() {
  let letters = new Array[26];

  if(possibleWords.length > 0){
    for (let i = 0; i < possibleWords.length; i++) {
      for (let j = 0; j < possibleWords[i].length; j++) {
        let letter = possibleWords[i][j];
        // Check if the character is a letter
        if (Char.IsLetter(letter)) {
          // Convert the letter to lowercase
          letter = Char.ToLower(letter);
          // Increment the count for the corresponding letter index
          letters[letter - 'a']++;
        }
      }
    }

    letters.sort(function(a, b){return a - b});
  }
}

function UpdateWordList() {
  for (let i = possibleWords.length - 1; i >= 0; i--){
    for (let j = 0; j < knownPositions.length; i++) {
      if (knownPositions[j] != "?") {
        if(knownPositions[j] != possibleWords[i][j]) {
          possibleWords.splice(i, 1);
        }
      }
    }
  }

  console.log(possibleWords)
}