// chessboard colors
let style = "green";
let board_color1 = "#769656";
let board_color2 = "#eeeed2";

// chess variables
this_team = "white";
opponent_team = "black";

// math stuff
let square_size = 64;
let selected_piece_id = "";
let selected_piece_pos = "";

// sfx variables
let move_sfx = new Audio("/src/sfx/move-self.mp3");
let capture_sfx = new Audio("/src/sfx/capture.mp3");

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

  function writeText(txt, x, y, font = "14px sans-serif", color = "blue") {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(txt, x, y);
    
  }

  function drawCircle(x, y, color, radius) {

    ctx.beginPath();
    ctx.arc(x + (square_size / 2), y + (square_size / 2), radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  
  }

  function drawCircleOutline(x, y, color, radius, line_width) {

    ctx.beginPath();
    ctx.arc(x + (square_size / 2), y + (square_size / 2), radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.stroke();
  
  }

  function playSound(sfx) {
    if (sfx == "move") {
      move_sfx.play();
    } else if (sfx == "capture") {
      capture_sfx.play();
    }
  }

function changeBoardStyle(id) {
  style = id;

  if (style == "classic") {
    board_color1 = "#769656";
    board_color2 = "#eeeed2";
  }

  if (style == "purple") {
    board_color1 = "#8476ba";
    board_color2 = "#f0f1f0";
  }

  if (style == "brown") {
    board_color1 = "#b88762";
    board_color2 = "#edd6b0";
  }

  if (style == "red") {
    board_color1 = "#bb5746";
    board_color2 = "#f5dbc3";
  }

  if (style == "tournament") {
    board_color1 = "#316548";
    board_color2 = "#eaeae7";
  }

  drawBoard();
  drawPieces();
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

    writeText("8", (square_size * 0) + 2, (square_size * 0) + 14, "15px sans-serif", board_color1);
    writeText("7", (square_size * 0) + 2, (square_size * 1) + 14, "15px sans-serif", board_color2);
    writeText("6", (square_size * 0) + 2, (square_size * 2) + 14, "15px sans-serif", board_color1);
    writeText("5", (square_size * 0) + 2, (square_size * 3) + 14, "15px sans-serif", board_color2);
    writeText("4", (square_size * 0) + 2, (square_size * 4) + 14, "15px sans-serif", board_color1);
    writeText("3", (square_size * 0) + 2, (square_size * 5) + 14, "15px sans-serif", board_color2);
    writeText("2", (square_size * 0) + 2, (square_size * 6) + 14, "15px sans-serif", board_color1);
    writeText("1", (square_size * 0) + 2, (square_size * 7) + 14, "15px sans-serif", board_color2);

    writeText("a", (square_size * 0) + 53, (square_size * 7) + 61, "15px sans-serif", board_color2);
    writeText("b", (square_size * 1) + 53, (square_size * 7) + 61, "15px sans-serif", board_color1);
    writeText("c", (square_size * 2) + 53, (square_size * 7) + 61, "15px sans-serif", board_color2);
    writeText("d", (square_size * 3) + 53, (square_size * 7) + 61, "15px sans-serif", board_color1);
    writeText("e", (square_size * 4) + 53, (square_size * 7) + 61, "15px sans-serif", board_color2);
    writeText("f", (square_size * 5) + 53, (square_size * 7) + 61, "15px sans-serif", board_color1);
    writeText("g", (square_size * 6) + 53, (square_size * 7) + 61, "15px sans-serif", board_color2);
    writeText("h", (square_size * 7) + 53, (square_size * 7) + 61, "15px sans-serif", board_color1);


}

function drawPieces() {
    for (n = 0; n < 64; n++) {
      if (board_pieces[n] != "") {
  
        // vanilla pieces
        if (board_pieces[n] == "white_pawn") {
          var filepath = "vanilla/white/pawn";
        } else if (board_pieces[n] == "white_king") {
          var filepath = "vanilla/white/king";
        } else if (board_pieces[n] == "white_queen") {
          var filepath = "vanilla/white/queen";
        } else if (board_pieces[n] == "white_bishop") {
          var filepath = "vanilla/white/bishop";
        } else if (board_pieces[n] == "white_knight") {
          var filepath = "vanilla/white/knight";
        } else if (board_pieces[n] == "white_rook") {
          var filepath = "vanilla/white/rook";
        } else if (board_pieces[n] == "black_pawn") {
          var filepath = "vanilla/black/pawn";
        } else if (board_pieces[n] == "black_king") {
          var filepath = "vanilla/black/king";
        } else if (board_pieces[n] == "black_queen") {
          var filepath = "vanilla/black/queen";
        } else if (board_pieces[n] == "black_bishop") {
          var filepath = "vanilla/black/bishop";
        } else if (board_pieces[n] == "black_knight") {
          var filepath = "vanilla/black/knight";
        } else if (board_pieces[n] == "black_rook") {
          var filepath = "vanilla/black/rook";
        } 

        // chaturanga pieces
        else if (board_pieces[n] == "white_ferz") {
          var filepath = "chaturanga/white/ferz";
        } else if (board_pieces[n] == "white_elephant") {
          var filepath = "chaturanga/white/elephant";
        } else if (board_pieces[n] == "black_ferz") {
          var filepath = "chaturanga/black/ferz";
        } else if (board_pieces[n] == "black_elephant") {
          var filepath = "chaturanga/black/elephant";
        } 

        // the powerful all mighty duck
        else if (board_pieces[n] == "duck") {
          var filepath = "special/duck";
        } 
  
        draw(`/src/pieces/${filepath}.svg`, (Math.floor(n % 8)) * square_size, (Math.floor(n / 8)) * square_size, square_size, square_size);
      }
    }
}

function movePiece(last_position, movement, piece) {
    board_pieces[last_position] = "";
    board_pieces[Number(selected_piece_pos) - movement] = piece;

    playSound("move");
}

function capturePiece(capture, last_position, piece) {
  board_pieces[last_position] = "";
  board_pieces[capture] = piece;

  playSound("capture");
}

function convertPiece(pos, result) {
  board_pieces[pos] = result;
}

// draw checkboard on canvas
drawBoard();
drawPieces();

// setInterval(drawPieces, 100);

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
  console.log("-------------------------------------------")
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

    var mousex = getMousePos(elm, e).x;
    var mousey = getMousePos(elm, e).y;

    var rmousex = roundToSquareSize(square_size, mousex)
    var rmousey = roundToSquareSize(square_size, mousey)
    
    var findpiece_x = rmousex / square_size
    var findpiece_y = rmousey / square_size
    var findpiece = findpiece_x + (findpiece_y * 8);

    if (board_pieces[findpiece].includes(this_team)) {
      ctx.fillStyle = "#F7F57D";
      ctx.fillRect(roundToSquareSize(square_size, getMousePos(elm, e).x), roundToSquareSize(square_size, getMousePos(elm, e).y), square_size, square_size);

      var tran_black = "rgb(0, 0, 0, 0.45)";
      var radius = 11
      var radius_plus = 25
      var line_width = 5.3
      var piece = board_pieces[findpiece];
      console.log("piece:"+piece)

      selected_piece_id = piece;
      selected_piece_pos = findpiece;
      console.log("findpiece:"+findpiece)
      console.log("spp:"+selected_piece_pos)

      if (piece == `${this_team}_pawn`) {
        drawCircle(rmousex, rmousey - (square_size * 1), tran_black, radius);

        if (selected_piece_pos >  47 && selected_piece_pos < 56) {
          drawCircle(rmousex, rmousey - (square_size * 2), tran_black, radius);
        }

        if (board_pieces[selected_piece_pos - 9].includes(opponent_team)) {
          drawCircleOutline(rmousex - (square_size * 1), rmousey - (square_size * 1), tran_black, radius_plus, line_width)
        }
        if (board_pieces[selected_piece_pos - 7].includes(opponent_team)) {
          drawCircleOutline(rmousex + (square_size * 1), rmousey - (square_size * 1), tran_black, radius_plus, line_width)
        }
      }

      if (piece == `${this_team}_king`) {
        drawCircle(rmousex + (square_size * 1), rmousey, tran_black, radius);
        drawCircle(rmousex - (square_size * 1), rmousey, tran_black, radius);
        drawCircle(rmousex, rmousey - (square_size * 1), tran_black, radius);
        drawCircle(rmousex, rmousey + (square_size * 1), tran_black, radius);

        drawCircle(rmousex + (square_size * 1), rmousey + (square_size * 1), tran_black, radius);
        drawCircle(rmousex - (square_size * 1), rmousey + (square_size * 1), tran_black, radius);
        drawCircle(rmousex - (square_size * 1), rmousey - (square_size * 1), tran_black, radius);
        drawCircle(rmousex + (square_size * 1), rmousey - (square_size * 1), tran_black, radius);
      }

      if (piece == `${this_team}_queen`) {

        // rook movement
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey, tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex + (square_size * 8) - (square_size * q), rmousey, tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex, rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex, rmousey + (square_size * 8) - (square_size * q), tran_black, radius);
        }

        // bishop movement
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex + (square_size * 8) - (square_size * q), rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey + (square_size * 8) - (square_size * q), tran_black, radius);
        }
      }

      if (piece == `${this_team}_bishop`) {

        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex + (square_size * 8) - (square_size * q), rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey + (square_size * 8) - (square_size * q), tran_black, radius);
        }

      }

      if (piece == `${this_team}_knight`) {
        drawCircle(rmousex - (square_size * 1), rmousey - (square_size * 2), tran_black, radius);
        drawCircle(rmousex + (square_size * 1), rmousey - (square_size * 2), tran_black, radius);

        drawCircle(rmousex - (square_size * 1), rmousey + (square_size * 2), tran_black, radius);
        drawCircle(rmousex + (square_size * 1), rmousey + (square_size * 2), tran_black, radius);

        drawCircle(rmousex - (square_size * 2), rmousey - (square_size * 1), tran_black, radius);
        drawCircle(rmousex - (square_size * 2), rmousey + (square_size * 1), tran_black, radius);

        drawCircle(rmousex + (square_size * 2), rmousey - (square_size * 1), tran_black, radius);
        drawCircle(rmousex + (square_size * 2), rmousey + (square_size * 1), tran_black, radius);
      }

      if (piece == `${this_team}_rook`) {
        
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex - (square_size * 8) + (square_size * q), rmousey, tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex + (square_size * 8) - (square_size * q), rmousey, tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex, rmousey - (square_size * 8) + (square_size * q), tran_black, radius);
        }
        for (q = 0; q < 8; q++) {
          drawCircle(rmousex, rmousey + (square_size * 8) - (square_size * q), tran_black, radius);
        }

      }

    } else {
      // movement of pieces

      if (selected_piece_id == `${this_team}_pawn`) {

        // motion
        if (Number(findpiece) + 8 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 8, selected_piece_id);
        } else if (Number(findpiece) + 16 == Number(selected_piece_pos) && selected_piece_pos >  47 && selected_piece_pos < 56  && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 16, selected_piece_id);
        }

        // capture
        if (Number(findpiece) + 9 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) + 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        }
      }

      if (selected_piece_id == `${this_team}_king`) {

        // horizontal, vertical movement
        if (Number(findpiece) + 8 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, 8, selected_piece_id);
        } else if (Number(findpiece) - 8 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, 16, selected_piece_id);
        } else if (Number(findpiece) + 1 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, 1, selected_piece_id);
        } else if (Number(findpiece) - 1 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, -1, selected_piece_id);
        }

        // diagonal movement
        else if (Number(findpiece) - 7 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, -7, selected_piece_id);
        } else if (Number(findpiece) - 9 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, -9, selected_piece_id);
        } else if (Number(findpiece) + 7 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, 7, selected_piece_id);
        } else if (Number(findpiece) + 9 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, 9, selected_piece_id);
        }
      }

      if (selected_piece_id == `${this_team}_knight`) {

        // motion
        if (Number(findpiece) + 17 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 17, selected_piece_id);
        } else if (Number(findpiece) + 15 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 15, selected_piece_id);
        } else if (Number(findpiece) + 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 6, selected_piece_id);
        } else if (Number(findpiece) + 10 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 10, selected_piece_id);
        } else if (Number(findpiece) - 17 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -17, selected_piece_id);
        } else if (Number(findpiece) - 15 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -15, selected_piece_id);
        } else if (Number(findpiece) - 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -6, selected_piece_id);
        } else if (Number(findpiece) - 10 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -10, selected_piece_id);
        }

        // capture
        if (Number(findpiece) + 17 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) + 15 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) + 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) + 10 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) - 17 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) - 15 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) - 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) - 10 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        }
      }

      selected_piece_id = "";
      selected_piece_pos = "";

      setTimeout(function (){
        drawBoard();
        drawPieces();
      }, 70);
    }

  }


}); 

changeBoardStyle(style);