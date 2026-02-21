// Logic calculator functions
function roundFourDigit(num) {
  return Math.floor(num * 10000) / 10000;
}
export function add(a, b) {
  return roundFourDigit(+a + +b);
}

export function subtract(a, b) {
  return roundFourDigit(+a - +b);
}

export function multiply(a, b) {
  return roundFourDigit(+a * +b);
}

export function divide(a, b) {
  if (+b === 0) {
    return "Erreur: div par 0 !";
  }
  return roundFourDigit(+a / +b);
}

export function operate(operand1, operand2, operator) {
  return operator(operand1, operand2);
}

// Display calcultator functions
export function showFormula(text) {
  const display = document.querySelector(".formula");
  display.textContent = text;
}

export function showResult(text) {
  const display = document.querySelector(".result");
  display.textContent = text;
}

export function getStackText(stack) {
  switch (stack.length) {
    case 1:
      return `${stack[0]}`;
    case 2:
      return `${stack[0]} ${stack[1]}`;
    case 3:
      return `${stack[0]} ${stack[1]} ${stack[2]}`;
    default:
      return "Erreur : stack vide !";
  }
}

// EventListener callback functions

/**
 *
 * @param {string} key
 * @param {string} operand
 * @returns {string} updatedOperand
 */
export function updateOperand(key, operand) {
  let updatedOperand;
  switch (key) {
    case "+/-":
      operand[0] === " "
        ? (updatedOperand = "-" + operand.slice(1))
        : (updatedOperand = " " + operand.slice(1));
      break;

    case "0":
      operand.length === 2 && operand[1] === "0"
        ? (updatedOperand = operand)
        : (updatedOperand = operand + "0");
      break;

    case ".":
      operand.includes(".")
        ? (updatedOperand = operand)
        : (updatedOperand = operand + ".");
      break;

    default:
      operand.length === 2 && operand[1] === "0"
        ? (updatedOperand = operand[0] + key)
        : (updatedOperand = operand + key);
  }
  return updatedOperand;
}

export function deleteLastOperand(lastKey, operand) {
  let updatedOperand;
  switch (lastKey) {
    case "+/-":
      updatedOperand = updateOperand(lastKey, operand);
      break;

    case "0":
      operand.length === 2 && operand[1] === "0"
        ? (updatedOperand = operand)
        : (updatedOperand = operand.slice(0, -1));
      break;

    case ".":
      operand.includes(".")
        ? (updatedOperand = operand.slice(0, -1))
        : (updatedOperand = operand);
      break;

    default:
      operand.length === 2
        ? (updatedOperand = operand[0] + "0")
        : (updatedOperand = operand.slice(0, -1));
  }
  return updatedOperand;
}
