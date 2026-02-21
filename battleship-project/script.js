document.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".grid-box"));
  const dialogContainer = document.querySelector(".dialog-container");
  const dialog = document.getElementsByClassName("game-over-dialog");
  const dialogMessage = document.querySelector("#game-over-dialog > h2");
  const closeDialogBtn = document.getElementById("close-dialog");

  let shipCount = 0;
  let clickCount = 8;
  const visited = new Set();
  const shipsSet = new Set();
  let shipsFound = 0;
  let won = false;
  let gameOver = false;

  closeDialogBtn.addEventListener("click", closeDialog);

  function closeDialog() {
    dialogContainer.classList.add("hidden");
    window.location.reload();
  }
  const handleBoxClick = (box) => {
    if (gameOver) return;

    if (
      !visited.has(box.classList.item(1)) &&
      !shipsSet.has(box.classList.item(1))
    ) {
      visited.add(box.classList.item(1));
      console.log("lol u missed");
      box.style.backgroundImage = "url('assets/water.jpg')";
      clickCount--;
    } else if (
      !visited.has(box.classList.item(1)) &&
      shipsSet.has(box.classList.item(1))
    ) {
      visited.add(box.classList.item(1));
      console.log("u hit a ship");
      box.style.backgroundImage = "url('assets/battleship.png')";
      shipsFound++;
      clickCount--;
    }

    if (shipsFound === 5) {
      gameOver = true;
      won = true;
      dialogMessage.textContent = "You win!";
      dialogContainer.classList.remove("hidden");
    } else if (clickCount === 0) {
      gameOver = true;
      won = false;
      dialogMessage.textContent = "You lose!";
      dialogContainer.classList.remove("hidden");
    }
  };
  const runGame = () => {
    const usedIds = new Set();
    boxes.forEach((box) => {
      let id;
      do {
        id = Math.floor(Math.random() * 100);
      } while (usedIds.has(id));
      usedIds.add(id);
      box.classList.add(id);
      box.addEventListener("click", () => {
        handleBoxClick(box);
      });
    });
    while (shipCount < 5) {
      let randomIndex;
      let boxId;
      do {
        randomIndex = Math.floor(Math.random() * boxes.length);
        boxId = boxes[randomIndex].classList.item(1);
      } while (shipsSet.has(boxId));
      shipsSet.add(boxId);
      shipCount++;
    }
  };
  runGame();
});
