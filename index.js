//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

//generate alphabet button
function generateButton() {
  var buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
  "The Random Category Is PROGRAMMING LANGUAGE",
  "The Random Category Is COMPUTER HARDWARES",
  "The Random Category Is COMPUTER SOFTWARES"
];

const categories = [
    [
    "ADALOVELACE",
    "PHP",
    "JAVASCRIPT",
    "HYPERTEXTPREPROCESSOR",
    "HYPERTEXTMARKUPLANGUAGE",
    "CSS",
    "C",
    "APPLICATION",
    "PHYTON",
    "JAVA",


    ],
    [
      "CPU",
      "RAM",
      "POWERSUPPLY",
      "CHASIS",
      "MOTHERBOARD",
      "HARDDISK",
      "SSD",
      "MONITOR",
      "MOUSE",
      "FLASHDRIVE",
      
    ],
    [
      "PHOTOSHOP",
      "GOOGLE",
      "ADOBEFLASH",
      "FACEBOOK",
      "TWITTER",
      "INSTAGRAM",
      "VISUALSTUDIO",
      "VISUALBASIC",
      "STEAM",
      "LOL",
      
  
    ]
];

const hints = [
  [
    "First programmer",
    "Is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.",
    "A programming language used primarily by Web browsers to create a dynamic and interactive experience for the user.",
    "PHP stands for?",
    "HTML stands for",
    "What programming language do we use to add styles and design to the website",
    "A programming language made by Dennis Ritchie in 1970s",
    "A computer software package that performs a specific function for an end user or another application based on carefully designed features.",
    "What is a interpreted, object-oriented, high-level programming language?",
    "What is the best language for creating large-scale applications?",
  ],
  [
    "What is the brain of the computer",
    "What is a physical hardware inside a computer that temporarily stores data?",
    "It's the main power source of the whole system unit.",
    "It is a box where all components of the system unit stored.",
    "This is where all the wires get connected, it is also knows as the spine of the computer.",
    "It is use as the main storage of the computer that uses a disk.",
    "It can be also use as the storage of the computer but instead of using a disk it is only a small and compact.",
    "It is the EYES of the computer that projects anything that the computer runs.",
    "It is use to navigate through the screen and can click on the screen.",
    "It can be inserted through the system unit to either transfer files or be a storage for some file.",
  ],
  [
    "An image creation, graphic design and photo editing software developed by Adobe.",
    "An internet search engine",
    "A software platform used to create rich digital content containing animation, graphic effects, streaming video and other interactive elements to deliver engaging user experiences over many platforms, including desktops and mobile devices.",
    "A social networking site that makes it easy for you to connect and share with family and friends online.",
    "A free social networking site where users broadcast short posts known as tweets.",
    "A multimedia-driven social media platform that allows users to create a public or private profile, share images and videos, and engage with other user's content through liking, commenting, and saving posts.",
    "A powerful developer tool that enables you to complete the entire development cycle in one place.",
    "An event-driven programming language and environment from Microsoft that provides a graphical user interface (GUI) which allows programmers to modify code by simply dragging and dropping objects and defining their behavior and appearance.",
    "A digital platform created by Valve Corporation to serve as a distributor of PC games.",
    "One of the world's most popular video games, developed by Riot Games. It features a team-based competitive game mode based on strategy and outplaying opponents. Players work with their team to break the enemy Nexus before the enemy team breaks theirs.",
  
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Clue - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Clue -`;
  livesDisplay.innerHTML = `You have ${life} lives!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `YOU WIN!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `You have ${life} lives!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `You have ${life} life!`;
      } else {
        livesDisplay.innerHTML = `GAME OVER!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `YOU WIN!`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#00000";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];
