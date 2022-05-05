// Wait for the DOM to finish loading before execution the runGame function below
// Also get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    // Firstly, return all the buttons in the DOM
    let buttons = document.getElementsByTagName("button");
    // Iterate thru the buttons, store each in a variable button
    // Within the for-Loop, add event listener to act, when each button is clicked
    for (let button of buttons) {
      button.addEventListener("click", function() {
        if (this.getAttribute("data-type") == "submit") {
          checkAnswer();
        } else {
          // Create a variable gameType to get other 4 buttons to run game
          let gameType = this.getAttribute("data-type");
          // Execute the runGame function with gameType variable passed into it
          runGame(gameType);
        }
  
      })
  
    }
  
  // Enable press Enter key as alternative to press submit button
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    })
  
  // To make Addition the default game, and to start it as soon as the page loaded
  // Inside the event listener but outside for-Loop, add runGame function 
      runGame("addition");
  })
  
  
  function runGame(gameType) {
  // Set initial default value of answer box to empty string before any operation
  // this prevents user to manually clear the box before a new operation
  document.getElementById("answer-box").value = "";
  
  // Set focus for the answer box - make cursor blink when the game is opened  
  // this means users dont have to click inside the box to type answer
  document.getElementById("answer-box").focus();
  
  // Generate two random numbers betw 1 and 25
  // Math.random generates random numbers less than 1,
  // so multiply it by 26 or by 25 and add 1, to get numbers betw 1-25 and then
  // wrap inside Math.floor to round them down to whole numbers
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
  
    // Check which gameType is being run with the generated random numbers using if & else if statements
    if (gameType === "addition") {
      // Execute displayAdditionQuestion function created down below
      displayAdditionQuestion(num1, num2);
    } 
    else if (gameType === "subtract") {
      displaySubtractQuestion(num1, num2);
    } 
    else if (gameType === "multiply") {
      displayMultiplyQuestion(num1, num2);
    }
    else if (gameType === "division") {
      displayDivisionQuestion(num1, num2);
    }
    else {
      alert(`Unknown game type ${gameType}`);             // Alert display to user in browser window
      throw `Unknown game type ${gameType}, aborting!`;   // Error thrown at the console for debugging
    }
  
  }
  
  
  function checkAnswer() {
    // Check value that user inputs as answer against the first value returned by calculateCorrectAnswer function's array
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
  
    // Greet the user if he got the answer right i.e if isCorrect returns true
    // Note that comparison in JS can only return true or false
    if (isCorrect) {
      alert("Hey! You got it right! :D");
      incrementScore();
    } else {
      alert(`Awww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
      incrementWrongAnswer();
    }
  
  // Next run another game of same type, using 2nd item returned in calculatedAnswer function array
    runGame(calculatedAnswer[1]);
  
  }
  
  
  function calculateCorrectAnswer() {
  // Get the operands/numbers and the math operators, from the DOM
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;
  
  // Put an if statement to calculate correct answer based on game type
  // the Else part throws an error in case user can't recognise the operator
    if (operator === "+") {
      return [operand1 + operand2, "addition"];
    } 
    else if (operator === "-") {
      return [operand1 - operand2, "subtract"];
    }
    else if (operator === "x") {
      return [operand1 * operand2, "multiply"];
    }
    else if (operator === "/") {
      return [Math.floor(operand1 / operand2), "division"];
    }
    else {
      alert(`Unimplemented operator ${operator}`);
      throw `Unimplemented operator ${operator}, aborting!`;
    }
  
  }
  
  
  function incrementScore() {
    // Get current score from the DOM and set it to increment
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
  
  }
  
  
  function incrementWrongAnswer() {
    // Get current tally of incorrect answers from the DOM and set it to increment
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
  
  }
  
  // Write function to display addition operation
  function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
  
  }
  
  // Write fucntion to display subtract operation
  // Note the Ternary operator used here wc is substitute to an if statement. 
  // it helps to avoid getting -ve answers by always displaying bigger number as operand1
  function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
    
  }
  
  // Write fucntion to display multiply operation
  function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
  
  }
  
  // Write fucntion to display division operation
  // Note that we use Ternary operator here also to ensure bigger number is dispalyed first
  function displayDivisionQuestion(operand1, operand2) {
      document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
      document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
      document.getElementById('operator').textContent = "/";
  
  }