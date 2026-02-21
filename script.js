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
  deleteLastOperand,
} from "./functions.js";

let operand1 = " 0";
let operand2 = " 0";
let operator = "";

let postEval = false;

let stackOperations = [operand1];
let stackInput = [];

const operandInput = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "+/-",
];
const operatorInput = ["+", "/", "x", "-"];

const operatorFunctions = {
  "+": add,
  "-": subtract,
  x: multiply,
  "/": divide,
};
const litteralId = {
  "k-0": "0",
  "k-1": "1",
  "k-2": "2",
  "k-3": "3",
  "k-4": "4",
  "k-5": "5",
  "k-6": "6",
  "k-7": "7",
  "k-8": "8",
  "k-9": "9",
  "decimal-separator": ".",
  positivity: "+/-",
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/",
  eval: "eval",
  clear: "clear",
  del: "del",
};

const icons = document.querySelectorAll(".fa-solid");
icons.forEach((elem) =>
  elem.addEventListener("click", function (event) {
    console.log(event);
    event.preventDefault();
  }),
);

const keys = document.querySelectorAll("a");

keys.forEach((elem) =>
  elem.addEventListener("click", function (event) {
    const keyClass = event.currentTarget.className.split(" ").at(0);
    const keyContent = litteralId[event.currentTarget.id];
    switch (keyClass) {
      case "operand":
        stackInput.push(keyContent);
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
          stackInput.push(keyContent);
          operator = keyContent;
          stackOperations[1] = operator;
        } else if (+operand2 === 0 && operator === "/") {
          operand1 = " 0";
          operand2 = " 0";
          operator = "";
          postEval = false;
          stackOperations = [operand1];
          stackInput = [];
          showResult("Erreur: div par 0 !");
        } else {
          operand1 = operate(operand1, operand2, operatorFunctions[operator]);
          operand2 = " 0";
          operator = keyContent;
          stackOperations = [operand1, operator];
          stackInput = [];
          showResult(operand1);
        }
        break;

      case "eval":
        if (+operand2 === 0 && operator === "/") {
          operand1 = " 0";
          operand2 = " 0";
          operator = "";
          postEval = false;
          stackOperations = [operand1];
          stackInput = [];
          showResult("Erreur: div par 0 !");
        } else if (stackOperations.length === 3) {
          operand1 = operate(operand1, operand2, operatorFunctions[operator]);
          operand2 = " 0";
          operator = "";
          stackOperations = [operand1];
          stackInput = [];
          showResult(operand1);
        } else {
          showResult(operand1);
        }
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

      case "del":
        if (stackInput.length === 0) {
          break;
        }
        const lastInput = stackInput.pop();
        console.log(
          "last input :" +
            lastInput +
            "\n" +
            "type n and n-1 input " +
            operatorInput.includes(stackInput.at(-1)) +
            " " +
            stackInput.at(-1),
        );

        if (operandInput.includes(lastInput) && stackOperations.length === 1) {
          operand1 = deleteLastOperand(lastInput, stackOperations[0]);
          stackOperations[0] = operand1;
        } else if (
          operandInput.includes(lastInput) &&
          !operandInput.includes(stackInput.at(-1))
        ) {
          stackOperations.pop();
          operand2 = " 0";
        } else if (operandInput.includes(lastInput)) {
          operand2 = deleteLastOperand(lastInput, stackOperations[2]);
          stackOperations[2] = operand2;
        } else if (operatorInput.includes(stackInput.at(-1))) {
          operator = stackInput.at(-1);
          stackOperations[1] = operator;
        } else {
          operator = "";
          stackOperations.pop();
        }
        break;
    }

    console.log({
      keyClass: keyClass,
      keyContent: keyContent,
      operand1: operand1,
      stackInput: stackInput,

      stackOperations: stackOperations,
    });
    showFormula(getStackText(stackOperations));
  }),
);
