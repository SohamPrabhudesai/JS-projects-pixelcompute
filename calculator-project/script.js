const display = document.getElementById("display");
let firstNum = "";
let oprn = "";
let doClear = false;

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("id");

    if (
      [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "zero",
      ].includes(id)
    ) {
      const nums = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
        zero: "0",
      };
      if (display.value === "0" || doClear) {
        display.value = nums[id];
        doClear = false;
      } else {
        display.value += nums[id];
      }
    } else if (id === "decimal") {
      if (doClear) {
        display.value = "0.";
        doClear = false;
      } else if (!display.value.includes(".")) {
        display.value += ".";
      }
    } else if (
      ["add", "subtract", "multiply", "divide", "exp", "mod"].includes(id)
    ) {
      firstNum = display.value;
      oprn = id;
      doClear = true;
    } else if (id === "equals") {
      if (firstNum && oprn) {
        const a = firstNum;
        const b = display.value;

        if (oprn === "add") display.value = a + b;
        else if (oprn === "subtract") display.value = a - b;
        else if (oprn === "multiply") display.value = a * b;
        else if (oprn === "divide") display.value = a / b;
        else if (oprn === "exp") display.value = a ** b;
        else if (oprn === "mod") display.value = a % b;
        firstNum = "";
        oprn = "";
        doClear = true;
      }
    } else if (id === "clear") {
      display.value = "0";
      firstNum = "";
      oprn = "";
      doClear = false;
    } else if (id === "del") {
      display.value = Number(
        display.value.substring(0, display.value.length - 1),
      );
    }
  });
});
