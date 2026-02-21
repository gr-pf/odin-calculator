import {
  add,
  subtract,
  multiply,
  divide,
  operate,
  showFormula,
  showResult,
  getStackText,
  updateOperand,
} from "./functions.js";

let operand1 = " 0";
let operand2 = " 0";
let operator = "";
let postEval = false;
let stackOperations = [operand1];
const operatorFunctions = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const keys = document.querySelectorAll("a");

keys.forEach((elem) =>
  elem.addEventListener("click", function (event) {
    const keyClass = event.target.className.split(" ").at(0);
    const keyContent = event.target.textContent;
    switch (keyClass) {
      case "operand":
        if (postEval) {
          operand1 = updateOperand(keyContent, " 0");
          stackOperations[0] = operand1;
          postEval = false;
        } else if (stackOperations.length === 1) {
          operand1 = updateOperand(keyContent, operand1);
          stackOperations[0] = operand1;
        } else {
          operand2 = updateOperand(keyContent, operand2);
          stackOperations[2] = operand2;
        }
        break;

      case "operator":
        postEval = false;
        if (stackOperations.length < 3) {
          operator = keyContent;
          stackOperations[1] = operator;
        } else {
          operand1 = operate(operand1, operand2, operatorFunctions[operator]);
          operand2 = " 0";
          operator = keyContent;
          stackOperations = [operand1, operator];
          showResult(operand1);
        }
        break;

      case "eval":
        if (stackOperations.length === 3) {
          operand1 = operate(operand1, operand2, operatorFunctions[operator]);
          operand2 = " 0";
          operator = "";
          stackOperations = [operand1];
        }
        showResult(operand1);
        postEval = true;
        break;

      case "clear":
        operand1 = " 0";
        operand2 = " 0";
        operator = "";
        postEval = false;
        stackOperations = [operand1];
        showResult("0");
        break;
    }
    console.log(operand1);
    console.log(stackOperations);
    showFormula(getStackText(stackOperations));
  }),
);
