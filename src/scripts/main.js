// chessboard colors
let board_color1 = "#769656";
let board_color2 = "#eeeed2";

// math stuff
let square_size = 64;
let x = 1; // start on square zero
let y = 0;

// get canvas id and ctx 2d
const elm = document.getElementById("board");
const ctx = elm.getContext("2d");
ctx.imageSmoothingEnabled = false;
elm.oncontextmenu = () => false;

function draw(url, x, y, w, h) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, x, y, w, h);
    };
    img.src = url;
  }

ctx.fillStyle = board_color2;
ctx.fillRect(0, 0, 512, 512);

// fill checkboard pattern
ctx.fillStyle = board_color1;
for (i = 0; i < 64; i++) {
    ctx.fillRect(x * square_size, y * square_size, square_size, square_size);
    x += 2;

    if (x > 8) {
        x -= 9;
        y++;
    }
}

let board_pieces = 
{

  1: "black_rook",
  2: "black_knight",
  3: "black_bishop",
  4: "black_queen",
  5: "black_king",
  6: "black_bishop",
  7: "black_knight",
  8: "black_rook",
  9: "black_pawn",
  10: "black_pawn",
  11: "black_pawn",
  12: "black_pawn",
  13: "black_pawn",
  14: "black_pawn",
  15: "black_pawn",
  16: "black_pawn",
  17: "",
  18: "",
  19: "",
  20: "",
  21: "",
  22: "",
  23: "",
  24: "",
  25: "",
  26: "",
  27: "",
  28: "",
  29: "",
  30: "",
  31: "",
  32: "",
  33: "",
  34: "",
  35: "",
  36: "",
  37: "",
  38: "",
  39: "",
  40: "",
  41: "",
  42: "",
  43: "",
  44: "",
  45: "",
  46: "",
  47: "",
  48: "white_pawn",
  49: "white_pawn",
  50: "white_pawn",
  51: "white_pawn",
  52: "white_pawn",
  53: "white_pawn",
  54: "white_pawn",
  55: "white_pawn",
  56: "white_rook",
  57: "white_knight",
  58: "white_bishop",
  59: "white_king",
  60: "white_queen",
  61: "white_king",
  62: "white_bishop",
  63: "white_knight",
  64: "white_rook"

};

setInterval(function () {
  for (n = 0; n < 64; n++) {
    if (board_pieces[n] != "") {

      if (board_pieces[n] == "white_pawn") {
        var filepath = "white/pawn";
      } else if (board_pieces[n] == "white_king") {
        var filepath = "white/king";
      } else if (board_pieces[n] == "white_queen") {
        var filepath = "white/queen";
      } else if (board_pieces[n] == "white_bishop") {
        var filepath = "white/bishop";
      } else if (board_pieces[n] == "white_knight") {
        var filepath = "white/knight";
      } else if (board_pieces[n] == "white_rook") {
        var filepath = "white/rook";
      } else if (board_pieces[n] == "black_pawn") {
        var filepath = "black/pawn";
      } else if (board_pieces[n] == "black_king") {
        var filepath = "black/king";
      } else if (board_pieces[n] == "black_queen") {
        var filepath = "black/queen";
      } else if (board_pieces[n] == "black_bishop") {
        var filepath = "black/bishop";
      } else if (board_pieces[n] == "black_knight") {
        var filepath = "black/knight";
      } else if (board_pieces[n] == "black_rook") {
        var filepath = "black/rook";
      } 

      draw(`/src/pieces/${filepath}.svg`, (Math.floor(n % 8)) * square_size, (Math.floor(n / 8)) * square_size, square_size, square_size);
    }
  }
}, 100);

/*
// white pawns
draw("/src/pieces/white/pawn.svg", 0 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 1 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 2 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 3 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 4 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 5 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 6 * square_size, 6 * square_size, square_size, square_size);
draw("/src/pieces/white/pawn.svg", 7 * square_size, 6 * square_size, square_size, square_size);

// white pieces
draw("/src/pieces/white/rook.svg", 0 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/knight.svg", 1 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/bishop.svg", 2 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/queen.svg", 3 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/king.svg", 4 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/bishop.svg", 5 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/knight.svg", 6 * square_size, 7 * square_size, square_size, square_size);
draw("/src/pieces/white/rook.svg", 7 * square_size, 7 * square_size, square_size, square_size);

// black pawns
draw("/src/pieces/black/pawn.svg", 0 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 1 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 2 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 3 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 4 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 5 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 6 * square_size, 1 * square_size, square_size, square_size);
draw("/src/pieces/black/pawn.svg", 7 * square_size, 1 * square_size, square_size, square_size);

// black pieces
draw("/src/pieces/black/rook.svg", 0 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/knight.svg", 1 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/bishop.svg", 2 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/queen.svg", 3 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/king.svg", 4 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/bishop.svg", 5 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/knight.svg", 6 * square_size, 0 * square_size, square_size, square_size);
draw("/src/pieces/black/rook.svg", 7 * square_size, 0 * square_size, square_size, square_size);
*/

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - (rect.left * 2)) - 27,
    y: (evt.clientY - rect.top) - 30
  };
}

function roundToSquareSize(size, value) {
  return (Math.round(value / size) * size);
}

ctx.fillStyle = "rgb(255, 0, 0, 0.5)";

elm.addEventListener("mousedown", function (e) {

  // right click
  if (e.button == 2) {
    ctx.fillRect(roundToSquareSize(square_size, getMousePos(elm, e).x), roundToSquareSize(square_size, getMousePos(elm, e).y), square_size, square_size);
    console.log(`mouse x: ${getMousePos(elm, e).x}, mouse y: ${getMousePos(elm, e).y}`)
  }

}); 

