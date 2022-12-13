let buffer = "0";
let total = 0;
let previousOperator = null;
let screenValue = document.querySelector(".screen");

(function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", (event) =>
      buttonClick(event.target.getAttribute("data-buttonVal"))
    );
})();

function buttonClick(value) {
  if (isNaN(value)) {
    handleOperatorClick(value);
    console.log("handleoperation buffer", buffer);
  } else {
    handleNumberClick(value);
    console.log("handleoNumner buffer", buffer);
  }
  screenValue.innerText = buffer;
}

function handleNumberClick(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}
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
function flushOperation(intBuffer) {
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
  }
}
function clearData(screen, data = false) {
  if (screen) {
    buffer = "0";
  }
  if (data) {
    total = 0;
  }
}
