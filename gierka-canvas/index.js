let canvas = document.getElementById("canvas_board");
let ctx = canvas.getContext("2d");
let gallery = document.getElementById("gallery");
let galleryItems = Array.from(document.getElementById("gallery").children);
let img = new Image();
img.src = "https://bitcoin.pl/wp-content/uploads/2020/01/cardano-ada.jpg";
img.alt = "cardano";

let imageNames = [
  "bitcoin.jpg",
  "coti.png",
  "enj.jpg",
  "ethereum.jpg",
  "kai.jpg",
  "noia.jpg",
  "obrazek.jpg",
  "ogn.jpg",
  "omi.jpeg",
  "stmx.jpg",
  "theta.png",
  "vechain.jpeg",
];

let btnShowGallery = document.getElementById("btn__show_gallery");
let btnResetGame = document.getElementById("btn__reset_game");
let btnStartGame = document.getElementById("btn__start_game");
let inputColumnCount = document.getElementById("input__column__count");
let inputRowCount = document.getElementById("input__row__count");

btnResetGame.disabled = true;

btnShowGallery.addEventListener("click", () => {
  btnShowGallery.innerHTML =
    gallery.style.display === "none" ? "Hide gallery" : "Show gallery";
  gallery.style.display = gallery.style.display === "none" ? "grid" : "none";
});

btnStartGame.addEventListener("click", () => {
  // hide gallery
  btnShowGallery.innerHTML = "Show gallery";
  gallery.style.display = "none";
  btnShowGallery.disabled = true;
  btnStartGame.disabled = true;
  btnResetGame.disabled = false;

  columnCount =
    inputColumnCount.value === "" ? 4 : parseInt(inputColumnCount.value);
  rowCount = inputRowCount.value === "" ? 4 : parseInt(inputRowCount.value);
  createBoard();
  randomiseBoard(30);
  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("click", onMouseClick, false);

  window.addEventListener("touchstart", onMouseMove, false);
  window.addEventListener("touchend", onMouseClick, false);
  drawBoard();
});

btnResetGame.addEventListener("click", () => {
  reset();
});

let reset = () => {
  btnShowGallery.disabled = false;
  btnResetGame.disabled = true;
  btnStartGame.disabled = false;

  window.removeEventListener("mousemove", onMouseMove, false);
  window.removeEventListener("click", onMouseClick, false);

  window.removeEventListener("touchstart", onMouseMove, false);
  widnow.removeEventListener("touchend", onMouseClick, false);

  createBoard();
  drawBoard();
};

let columnCount = 4;
let rowCount = 4;
let redColumn, redRow;
let board;

for (const [index, galImg] of galleryItems.entries()) {
  galImg.src = "low-res-imgs/" + imageNames[index];
  galImg.addEventListener("click", (event) => {
    new Promise((resolve, reject) => {
      img.addEventListener("load", (e) => resolve(img));
      img.src = img.src = "full-size-imgs/" + imageNames[index];
    }).then(() => {
      createBoard();
      drawBoard();
    });
  });
}

function createBoard() {
  redColumn = redRow = 0;
  board = new Array(rowCount);
  for (let row = 0; row < rowCount; row++) {
    board[row] = new Array(columnCount);
    for (let column = 0; column < columnCount; column++) {
      board[row][column] = row * columnCount + column;
    }
  }
}

function hasWon() {
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (board[row][column] != row * columnCount + column) return false;
    }
  }
  return true;
}

function swapTile(row, column) {
  if (row < 0 || column < 0 || row >= rowCount || column >= columnCount) return;
  if (isTileCloseToRed(row, column)) {
    let tempRow = redRow;
    let tempColumn = redColumn;

    redRow = row;
    redColumn = column;
    board[tempRow][tempColumn] = board[row][column];
    board[redRow][redColumn] = 0;
  }
}

function drawBoard() {
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      drawTile(board[i][j], i, j);
    }
  }
}

function randomiseBoard(steps) {
  for (let i = 0; i < steps; i++) {
    let rng = Math.floor(Math.random() * 4);
    let xOffset, yOffset;
    switch (rng) {
      case 0:
        xOffset = -1;
        yOffset = 0;
        break;
      case 1:
        xOffset = 1;
        yOffset = 0;
        break;
      case 2:
        xOffset = 0;
        yOffset = -1;
        break;
      case 3:
        xOffset = 0;
        yOffset = 1;
        break;
    }
    swapTile(redRow + yOffset, redColumn + xOffset);
  }
}

function drawTile(index, imageRow, imageColumn) {
  let imgTileWidth = img.width / columnCount;
  let imgTileHeight = img.height / rowCount;
  let canvasTileWidth = canvas.width / columnCount;
  let canvasTileHeight = canvas.height / rowCount;
  let tileColumn = index % columnCount;
  let tileRow = Math.floor(index / columnCount);

  if (index == 0) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(
      imageColumn * canvasTileWidth,
      imageRow * canvasTileHeight,
      canvasTileWidth,
      canvasTileHeight
    );
    ctx.fill();
  } else
    ctx.drawImage(
      img,
      tileColumn * imgTileWidth,
      tileRow * imgTileHeight,
      imgTileWidth,
      imgTileHeight,
      imageColumn * canvasTileWidth,
      imageRow * canvasTileHeight,
      canvasTileWidth,
      canvasTileHeight
    );
}

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  let posX;
  let posY;
  if (
    e.type == "touchstart" ||
    e.type == "touchmove" ||
    e.type == "touchend" ||
    e.type == "touchcancel"
  ) {
    var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    posX = touch.pageX;
    posY = touch.pageY;
  } else if (
    e.type == "click" ||
    e.type == "mousedown" ||
    e.type == "mouseup" ||
    e.type == "mousemove" ||
    e.type == "mouseover" ||
    e.type == "mouseout" ||
    e.type == "mouseenter" ||
    e.type == "mouseleave"
  ) {
    posX = e.clientX;
    posY = e.clientY;
  }
  return {
    x: ((posX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((posY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

function isTileCloseToRed(tileRow, tileColumn) {
  let rowDiff = Math.abs(tileRow - redRow);
  let columnDiff = Math.abs(tileColumn - redColumn);
  return rowDiff + columnDiff == 1;
}

function onMouseMove(e) {
  var pos = getMousePos(canvas, e);
  let posx = pos.x;
  let posy = pos.y;

  let canvasTileWidth = canvas.width / columnCount;
  let canvasTileHeight = canvas.height / rowCount;

  let row = Math.floor(posy / canvasTileHeight);
  let column = Math.floor(posx / canvasTileWidth);

  drawBoard();
  if (isTileCloseToRed(row, column)) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255, 0.6)";
    ctx.rect(
      column * canvasTileWidth,
      row * canvasTileHeight,
      canvasTileWidth,
      canvasTileHeight
    );
    ctx.fill();
  }
}

function onMouseClick(e) {
  var pos = getMousePos(canvas, e);
  let posx = pos.x;
  let posy = pos.y;

  let canvasTileWidth = canvas.width / columnCount;
  let canvasTileHeight = canvas.height / rowCount;

  let row = Math.floor(posy / canvasTileHeight);
  let column = Math.floor(posx / canvasTileWidth);

  if (isTileCloseToRed(row, column)) {
    swapTile(row, column);
    if (hasWon()) {
      alert("Wygrana");
      reset();
    }
  }
  drawBoard();
}

createBoard();
