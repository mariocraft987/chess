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
elm.oncontextmenu = () => false;

function draw(url, x, y) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, x, y);
    };
    img.src = url;
    img.width = 64; 
    img.height = 64;
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

draw("/src/pieces/black/pawn.svg", 0, 0);