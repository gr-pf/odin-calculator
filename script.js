import {
  add,
  subtract,
  multiply,
  divide,
  operate,
  showFormula,
  showResult,
} from "./functions.js";

let formula = {
  operand1: " ",
  operand2: " ",
  operator: "",
};

const keys = document.querySelectorAll("a");

keys.forEach((elem) =>
  elem.addEventListener("click", function (event) {
    formula.operand1 += event.currentTarget.textContent;
    showFormula(`${formula.operand1} ${formula.operator} ${formula.operand2}`);
  }),
);
// const key7 = document.querySelector("#k-7");
// console.log(key7);
// operand1 += key7.textContent;
showFormula(`${formula.operand1} ${formula.operator} ${formula.operand2}`);
