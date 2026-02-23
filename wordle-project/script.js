let words = [];
let ans = "";
let currentRow = 0;

fetch("words.json")
  .then((response) => response.json())
  .then((data) => {
    words = data;
    ans = words[Math.floor(Math.random() * words.length)];
  });
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit-guess").addEventListener("click", () => {
    const guess = document.getElementById("guess").value.toLowerCase();
    const result = document.getElementById("result");
    if (guess.length !== 5) {
      return;
    }

    if (currentRow >= 5) return;

    const row = document.querySelectorAll(".word-row")[currentRow];
    const cells = row.querySelectorAll(".cell");

    for (let i = 0; i < 5; i++) {
      cells[i].textContent = guess[i];

      if (guess[i] === ans[i]) {
        cells[i].classList.add("correct");
      } else if (ans.includes(guess[i])) {
        cells[i].classList.add("present");
      } else {
        cells[i].classList.add("absent");
      }
    }

    if (guess === ans) {
      result.textContent = "Congratulations! You guessed the word";
    } else if (currentRow === 4) {
      result.textContent = `Game over, the word was ${ans}`;
    }

    currentRow++;
    document.getElementById("guess").value = "";
  });
});
