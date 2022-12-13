let buffer = "0";
let total = 0;
let previousOperator = null;
let screenValue = document.querySelector(".screen");

//Adding event listners to container that contains buttons during initialisation
(function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", (event) =>
      buttonClick(event.target.getAttribute("data-buttonVal"))
    );
})();

//checks if number is clicked or operator and calls respective function
function buttonClick(value) {
  if (isNaN(value)) {
    handleOperatorClick(value);
  } else {
    handleNumberClick(value);
  }
  screenValue.innerText = buffer;
}
//updates buffer with the entered number
function handleNumberClick(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}
//gets triggered when operator is clicked
function handleOperatorClick(symbolVal) {
  switch (symbolVal) {
    case "clear":
      clearData(true, true);
      return;
    case "delete":
      if (buffer.length !== 1) {
        buffer = buffer.slice(0, -1);
      } else {
        clearData(true, true);
      }
      return;
    case "equals":
      if (previousOperator === null) {
        return;
      } else {
        flushOperation(parseInt(buffer));
        buffer = `${total}`;
        total = 0;
        previousOperator = null;
        return;
      }
  }

  handleMath(symbolVal);
}
//updates total by calling flushOperation and updates previousOperator when symbol is clicked
function handleMath(symbolVal) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (total === 0) {
    total = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbolVal;
  clearData(true);
}
// Logic for mathematical operation to update total running calculation
function flushOperation(intBuffer) {
  if (!previousOperator) {
    return;
  }
  switch (previousOperator) {
    case "add":
      total += intBuffer;
      break;
    case "multiply":
      total *= intBuffer;
      break;
    case "subtract":
      total -= intBuffer;
      break;
    case "divide":
      total /= intBuffer;
      break;
    default:
      break;
  }
}
//clears data on screen and internal state
function clearData(screen, data = false) {
  if (screen) {
    buffer = "0";
  }
  if (data) {
    total = 0;
  }
}
