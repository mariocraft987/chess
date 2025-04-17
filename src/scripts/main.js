// chessboard colors
let board_color1 = "#769656";
let board_color2 = "#eeeed2";

// get canvas id and ctx 2d
const elm = document.getElementById("board");
const ctx = elm.getContext("2d");

ctx.fillStyle = board_color2;
ctx.fillRect(0, 0, 500, 500);