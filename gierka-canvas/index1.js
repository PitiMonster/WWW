let canvas = document.getElementById("canvas_board")
let ctx = canvas.getContext("2d")

let colNum = 4
let rowNum = 4

let img = new Image();
img.src = 'https://bitcoin.pl/wp-content/uploads/2020/01/cardano-ada.jpg'
img.alt = 'cardano'
// ctx.drawImage(img, 0, 0, )

let board;

let crateBoard = () =>{
    board = new Array(rowNum);
    for (let row = 0; row < rowNum; row++) {
        board[row] = new Array(colNum);
        for (let col = 0; col < colNum; col++) {
            board[row][col] = row * rowNum + col
        }
    }
}

let drawBoard = () => {
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            drawTile(board[i][j], j, i)
        }
    }
}

let drawTile = (index, column, row) => {
    let imgTileWidth = img.width / colNum
    let imgTileHeight = img.height / rowNum
    let canvasTileWidth = canvas.width / colNum
    let canvasTileHeight = canvas.height / rowNum
    let tileColumn = index % colNum
    let tileRow = Math.floor(index / rowNum)
    ctx.drawImage(img, tileColumn*imgTileWidth, tileRow*imgTileHeight, imgTileWidth, imgTileHeight, column*canvasTileWidth, row*canvasTileHeight, canvasTileWidth, canvasTileHeight)
}


// let 

crateBoard()
drawBoard()