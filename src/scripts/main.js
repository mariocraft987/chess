// chessboard colors
let board_color1 = "#769656";
let board_color2 = "#eeeed2";

// math stuff
let square_size = 64;

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

let board_pieces = 
{
  
    0: "black_rook",
    1: "black_knight",
    2: "black_bishop",
    3: "black_queen",
    4: "black_king",
    5: "black_bishop",
    6: "black_knight",
    7: "black_rook",
    8: "black_pawn",
    9: "black_pawn",
    10: "black_pawn",
    11: "black_pawn",
    12: "black_pawn",
    13: "black_pawn",
    14: "black_pawn",
    15: "black_pawn",
    16: "",
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
    59: "white_queen",
    60: "white_king",
    61: "white_bishop",
    62: "white_knight",
    63: "white_rook",
  
};

function drawBoard() {
  let x = 1; // start on square zero
  let y = 0;

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
}

function drawPieces() {
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
        }  else if (board_pieces[n] == "duck") {
          var filepath = "special/duck";
        } 
  
        draw(`/src/pieces/${filepath}.svg`, (Math.floor(n % 8)) * square_size, (Math.floor(n / 8)) * square_size, square_size, square_size);
      }
    }
}

// draw checkboard on canvas
drawBoard();

setInterval(drawPieces(), 100);

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

elm.addEventListener("mousedown", function (e) {

  // log mouse x, and y to console
  console.log(`mouse x: ${getMousePos(elm, e).x}, mouse y: ${getMousePos(elm, e).y}`)

  // right click
  if (e.button == 2) {
    ctx.fillStyle = "rgb(255, 0, 0, 0.5)";

    ctx.fillRect(roundToSquareSize(square_size, getMousePos(elm, e).x), roundToSquareSize(square_size, getMousePos(elm, e).y), square_size, square_size);
  }

  // left click
  if (e.button == 0) {
    drawBoard();
    drawPieces()

    ctx.fillStyle = "#F7F57D";
    ctx.fillRect(roundToSquareSize(square_size, getMousePos(elm, e).x), roundToSquareSize(square_size, getMousePos(elm, e).y), square_size, square_size);

    ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
    var mousex = getMousePos(elm, e).x;
    var mousey = getMousePos(elm, e).y;

    var rmousex = roundToSquareSize(square_size, mousex)
    var rmousey = roundToSquareSize(square_size, mousey)
    
    var findpiece_x = Math.round(mousex / square_size);
    var findpiece_y = Math.round(mousey / square_size);
    var findpiece = findpiece_x + findpiece_y;
    console.log(findpiece)

    if (board_pieces[findpiece] != "") {
      ctx.fillRect(rmousex, rmousey - square_size, square_size, square_size);
      ctx.fillRect(rmousex, rmousey - (square_size * 2), square_size, square_size);
    }

    var pieceon = ""
  }

}); 

