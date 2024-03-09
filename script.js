const options = {
  Numere: ["Unu", "Doi", "Trei", "Patru", "Cinci", "Sase", "Sapte"],
  Culoare: ["Rosu", "Galben", "Albastru", "Verde", "Violet", "Portocaliu", "Maro"],
  Planete: ["Pamant", "Jupiter", "Saturn", "Uranus", "Neptun", "Marte", "Mercur"],
  Meseri: ["Doctor", "Avocat", "Bucatar", "Mecanic", "Profesor", "Electrician", "Programator"],
  Instrumente: ["Pian", "Vioara", "Chitara", "Toba", "Flaut", "Saxofon", "Trompeta"],
  Sport: ["Fotbal", "Baschet", "Tenis", "Volei", "Golf", "Inot", "Ciclism"],
  Legume: ["Morcov", "Cartof", "Ceapa", "Rosie", "Ardei", "Dovlecel", "Vinete"],
  Fructe: ["Mere", "Banane", "Portocale", "Mure", "Capsuni", "Pepene", "Kivi"],
  Copaci: ["Brad", "Stejar", "Fag", "Plop", "Mesteacan", "Tei", "Cires"],
  Flori: ["Trandafir", "Lalea", "Zambila", "Liliac", "Crin", "Garoafa", "Iris"],
  Padure: ["Urs", "Lup", "Veveriță", "Mistreț", "Căprioară", "Vulpe", "Jder"],
  Jungla: ["Elefant", "Girafa", "Rinocer", "Leu", "Zebra", "Maimuta", "Tigru"],
  Ocean: ["Rechin", "Delfin", "Balenă", "Meduză", "Caracatiță", "Testoasa", "Crab"],
  Dinozauri: ["Tyrannosaurus", "Triceratops", "Velociraptor", "Stegosaurus", "Brachiosaurus", "Pterodactyl", "Ankylosaurus"],
  Insecte: ["Furnică", "Albina", "Fluture", "Căpușă", "Gândac", "Păianjen", "Muste"],
  Pasari: ["Bufnita", "Pinguin", "Papagal", "Ciocanitoare", "Randunica", "Cioara", "Porumbel"],
  Europa: ["Romania", "Germania", "Norvegia", "Polonia", "Grecia", "Italia", "Spania"],
  America: ["America", "Canada", "Brazilia", "Argentina", "Mexico", "Chile", "Peru"],
  Asia: ["China", "India", "Japonia", "Rusia", "Mongolia", "Indonezia", "Thailanda"],
  Africa: ["Egipt", "Nigeria", "Maroc", "Kenya", "Madagascar", "Libia", "Algeria"]
};

// Initial level
let currentLevel = 0; // Am modificat inițializarea la nivelul 0 pentru a corespunde indexului corect în obiectul options

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach(button => {
    button.disabled = true;
  });
  stopGame();
};

// Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

// Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
};

// Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";

  // Get words and hints for the current level
  const levelWords = options[Object.keys(options)[currentLevel]]; // Am eliminat "-1" deoarece indexul a fost inițializat la 0
  const words = levelWords;

  randomWord = words[generateRandomValue(words)];
  randomHint = Object.keys(options)[currentLevel]; // Am modificat pentru a afișa numele nivelului

  // Display current level and hint
  hintRef.innerHTML = `<div id="wordHint">
  <span>Nivelul ${currentLevel + 1} - Indiciu: </span>${randomHint}</div>`; // Am adăugat "+1" pentru a afișa numărul nivelului corect

  let displayItem = "";
  randomWord.split("").forEach(() => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  // Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Vieții: ${lossCount}</div>`;
};

// Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  // For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    // Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    // Character button onclick
    button.addEventListener("click", () => {
      message.innerText = `Literă Corectă`;
      message.style.color = "#048000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      // If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character in array is the same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            // Replace dash with letter
            inputSpace[index].innerText = char;
            // Increment counter
            winCount += 1;
            // If winCount equals word length
            if (winCount === charArray.length) {
              resultText.innerHTML = "Ai Câștigat!";
              startBtn.innerText = "Nivelul Urmator";

              // Increment to the next level
              currentLevel += 1;

              // If there are no more levels, reset to the first level
              if (!options[Object.keys(options)[currentLevel]]) {
                currentLevel = 0; // Resetăm la nivelul 0
                resultText.innerHTML = "Ai Castigat, Felicitari!";
                startBtn.innerText = "Ai Ajuns la Finalul Jocului";
              }

              // Block all buttons
              blocker();
            }
          }
        });
      } else {
        // Lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Vieții: ${lossCount}`;
        message.innerText = `Literă Greșită`;
        message.style.color = "#800000";
        if (lossCount === 0) {
          word.innerHTML = `Cuvantul este: <span>${randomWord}</span>`;
          resultText.innerHTML = "Joc Terminat";
          startBtn.innerText = "Restart"; // Actualizăm textul butonului pentru restart
          blocker();
        }
      }

      // Disable clicked buttons
      button.disabled = true;
    });

    // Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }



};

window.onload = () => {
  init();
};

// Adăugare timp 3 minute
let timerElement = document.getElementById('timer');
let totalTime = 1800; // 60 de minute * 60 de secunde
let timer = setInterval(function() {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;
  timerElement.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  totalTime--;
  if (totalTime < 0) {
    clearInterval(timer);
    resultText.innerHTML = "Timpul a expirat!";
    currentLevel = 0; // Resetează nivelul la 0
    init(); // Repornește jocul de la nivelul 0
  }
}, 1000); // actualizare la fiecare secundă