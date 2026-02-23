const gridContainer = document.addEventListener("DOMContentLoaded", () => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  let board = ["", "", "", "", "", "", "", "", ""];
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
  let gameActive = true;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let clickCount = 0;
  let player = "";
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      handleClick(cell);
    });
  });
  const handleClick = (cell) => {
    if (!cell.classList.contains("clicked")) {
      cell.classList.add("clicked");
      let index = cell.getAttribute("id");
      if (board[index] !== "" || !gameActive) return;
      clickCount++;
      fillGrid(cell);
      player = clickCount % 2 === 0 ? "O" : "X";
      board[index] = player;
      if (checkWin(player)) {
        document.getElementById("result").textContent = `${player} wins!`;
        gameActive = false;
        markWin(player);
      }
    }
  };
  const fillGrid = (cell) => {
    cell.textContent = clickCount % 2 === 0 ? "O" : "X";
  };
  const checkWin = (player) => {
    return winConditions.some((condition) => {
      return condition.every((index) => board[index] === player);
    });
  };
  const markWin = (player) => {
    let winInd = winConditions.find((condition) => {
      return condition.every((index) => board[index] === player);
    });
    console.log(winInd);
    winInd.forEach((index) => {
      cells[index].classList.add("win");
    });
  };
});
