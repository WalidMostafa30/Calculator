const calcInput = document.querySelector(".input");
const calcOutput = document.querySelector(".output");
const displayInputs = document.querySelector(".inputs");
const buttons = document.querySelectorAll(".button");
const ThemeBtn = document.querySelector(".toggle__theme");
let input = "";

const removeLastElement = () => {
  const lastChild = calcInput.lastChild;

  if (lastChild && lastChild.nodeType === Node.ELEMENT_NODE) {
    if (lastChild.textContent === "%") {
      input = input.slice(0, -4);
    } else {
      input = input.slice(0, -1);
    }
    calcInput.removeChild(lastChild);
    return true;
  }
  return false;
};

const addOperator = (operator, displayOperator) => {
  if (!calcInput.innerHTML.length) return;

  removeLastElement();

  calcInput.innerHTML += `<span>${displayOperator}</span>`;
  input += operator;
};

const deleteLastInput = () => {
  if (!removeLastElement()) {
    calcInput.innerHTML = calcInput.innerHTML.slice(0, -1);
    input = input.slice(0, -1);
  }
};

const handleDot = () => {
  const lastChild = calcInput.lastChild;

  if (!calcInput.innerHTML.length || !input.length) {
    calcInput.innerHTML += ".";
    input += ".";
  } else if (input.includes(".") && /[.\d]$/.test(input)) {
    return;
  } else {
    calcInput.innerHTML += ".";
    input += ".";
  }
};

const handleDoubleZero = () => {
  const lastChild = calcInput.lastChild;

  if (!calcInput.innerHTML.length) {
    calcInput.innerHTML += "0";
    input += "0";
  } else if (lastChild && lastChild.textContent === "0") {
    return;
  } else if (!eval(lastChild.textContent)) {
    return;
  } else {
    calcInput.innerHTML += "00";
    input += "00";
  }
};

const handleZero = () => {
  const lastChild = calcInput.lastChild;

  if (!calcInput.innerHTML.length) {
    calcInput.innerHTML += "0";
    input += "0";
  } else if (input.endsWith(".")) {
    calcInput.innerHTML += "0";
    input += "0";
  } else if (lastChild && lastChild.nodeType === Node.ELEMENT_NODE) {
    calcInput.innerHTML += "0";
    input += "0";
  } else if (!eval(lastChild.textContent)) {
    return;
  } else {
    calcInput.innerHTML += "0";
    input += "0";
  }
};

const addPercentage = () => {
  if (!calcInput.innerHTML.length) return;

  removeLastElement();

  calcInput.innerHTML += `<span>%</span>`;
  input += "/100";
};

function formatNumber(number) {
  return Number(number).toLocaleString();
}

const handleButtonClick = (e) => {
  const key = e.target.dataset.key;
  displayInputs.classList.remove("active");

  try {
    switch (key) {
      case "Del":
        deleteLastInput();
        break;
      case "AC":
        calcInput.innerHTML = "";
        input = "";
        break;
      case "*":
        addOperator("*", "x");
        break;
      case "/":
        addOperator("/", "÷");
        break;
      case "+":
        addOperator("+", "+");
        break;
      case "-":
        addOperator("-", "-");
        break;
      case "%":
        addPercentage();
        break;
      case "=":
        calcOutput.innerHTML = formatNumber(eval(input)) || "0";
        displayInputs.classList.add("active");
        break;
      case "00":
        handleDoubleZero();
        break;
      case "0":
        handleZero();
        break;
      case ".":
        handleDot();
        break;
      default:
        calcInput.innerHTML += key;
        input += key;
    }
  } catch (error) {
    console.error("Error evaluating expression:", error);
    calcOutput.innerHTML = "Error";
  }
};

buttons.forEach((button) =>
  button.addEventListener("click", handleButtonClick)
);

ThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
