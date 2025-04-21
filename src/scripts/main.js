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


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function roundToSquareSize(size, value) {
  new_value = value * (size / 4);
  Math.round(new_value);
  return (new_value / size);
}

ctx.fillStyle = "rgb(255, 0, 0, 0.5)";

elm.addEventListener("mousedown", function (e) {
  ctx.fillRect(roundToSquareSize(square_size, getMousePos(elm, e).x), roundToSquareSize(square_size, getMousePos(elm, e).y), square_size, square_size);
  console.log(`mouse x: ${getMousePos(elm, e).x}, mouse y: ${getMousePos(elm, e).y}`)
}); 

