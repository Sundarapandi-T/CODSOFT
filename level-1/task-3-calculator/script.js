let buttonsInput = document.querySelectorAll(".cal_in"),
  input = document.getElementById("input"),
  clear = document.getElementById("clear"),
  del = document.getElementById("delete");

let equalPressed = false;

window.onload = () => {
  input.value = "";
};

buttonsInput.forEach((buttonInput) => {
  buttonInput.addEventListener("click", () => {
    handleButtonInput(buttonInput.value);
  });
});

document.addEventListener("keydown", (event) => {
  const pressed = event.key;
  if (!isNaN(pressed) || "+-*/%.".includes(pressed)) {
    handleButtonInput(pressed);
  }
  if (pressed === "Enter") {
    calculate.click();
  }
  if (pressed === "Backspace") {
    del.click();
  }
  if (pressed === "Delete") {
    clear.click();
  }
});

function handleButtonInput(value) {
  if (equalPressed == true) {
    input.value = "";
    equalPressed = false;
  }

  input.value += value;

  if (
    "+-*/%.".includes(value) &&
    "+-*/%.".includes(input.value.slice(-2, -1))
  ) {
    input.value = input.value.slice(0, -2) + value;
  }
  if (value == 0 && input.value == "00") {
    input.value = "";
  }
}

calculate.addEventListener("click", () => {
  equalPressed = true;
  let inputValue = input.value;
  try {
    let answer = eval(inputValue);
    if (Number.isInteger(answer)) {
      input.value = answer;
    } else {
      input.value = parseFloat(answer).toFixed(4);
    }
  } catch (error) {
    input.value = "";
  }
});

clear.addEventListener("click", () => {
  input.value = "";
});

del.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
});
