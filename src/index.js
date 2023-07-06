const container = document.getElementById("container");
const playerTurn = document.getElementById("player");
const alertText = document.getElementById("alert");

let player = 0;
const players = { 0: "X", 1: "O" };

let matrix = new Array(9).fill(null);

function createTikTacToe() {
  console.log("---123123");
  let count = 0;
  playerTurn.innerText = "Player 1 turn";
  for (let i = 0; i < 3; i++) {
    const subContainer = document.createElement("div");
    subContainer.classList.add("subContainer");
    for (let j = 0; j < 3; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.classList.add(count);
      subContainer.appendChild(box);
      count++;
    }
    container.appendChild(subContainer);
  }
}

createTikTacToe();

container.addEventListener("click", handleBoxClick);

function validateGameResult() {
  const a = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < a.length; i++) {
    const [first, sec, third] = a[i];
    if (
      matrix[first] &&
      matrix[sec] &&
      matrix[third] &&
      matrix[first] === matrix[sec] &&
      matrix[sec] === matrix[third]
    ) {
      return { end: true, winner: matrix[first] };
    }
  }

  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i]) {
      count++;
    }
  }

  if (count === 9) {
    return { end: true, winner: "draw" };
  }
  return { end: false };
}

function handleBoxClick(e) {
  const box = e.target;
  if (!box.innerText) {
    box.innerText = players[player];
    matrix[Number.parseInt(box.classList[1])] = players[player];

    if (player) {
      player = 0;
    } else {
      player = 1;
    }

    playerTurn.innerText = `Player ${player + 1} turn`;
  }
  const { end, winner } = validateGameResult();
  if (end) {
    if (winner === "draw") {
      alertText.innerText = "Game is draw";
    } else {
      alertText.innerText = `Player ${winner === "X" ? 1 : 2} is the winner`;
    }
    container.style.pointerEvents = "none";
  }
}
