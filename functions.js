export function add(a, b) {
  return +a + +b;
}

export function subtract(a, b) {
  return +a - +b;
}

export function multiply(a, b) {
  return +a * +b;
}

export function divide(a, b) {
  return +a / +b;
}

export function operate(operand1, operand2, operator) {
  return operator(operand1, operand2);
}
