// chessboard colors
let style = "green";
let board_color1 = "#adadad"; // darker color
let board_color2 = "#dadada"; // lighter color

// chess variables
this_team = "1";
opponent_team = "black";
piece_set = "wbrb";

let team_path_1 = "vanilla/white"
let team_path_2 = "vanilla/black"
let team_path_3 = "4p/red"
let team_path_4 = "4p/blue"

// math stuff
let square_size = 36.7;
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

function changePieceSet(id) {
  piece_set = id;

  drawBoard();
  drawPieces();
}

function changeBoardStyle(id) {
  style = id;

  if (style == "green") {
    board_color1 = "#769656";
    board_color2 = "#eeeed2";
  }

  if (style == "blue") {
    board_color1 = "#4b7399";
    board_color2 = "#eae9d2";
  }

  if (style == "purple") {
    board_color1 = "#8476ba";
    board_color2 = "#f0f1f0";
  }

  if (style == "brown") {
    board_color1 = "#d28c45";
    board_color2 = "#ffcf9f";
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
  
    0: "",
    1: "",
    2: "",
    3: "4_rook",
    4: "4_knight",
    5: "4_bishop",
    6: "4_queen",
    7: "4_king",
    8: "4_bishop",
    9: "4_knight",
    10: "4_rook",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "4_pawn",
    18: "4_pawn",
    19: "4_pawn",
    20: "4_pawn",
    21: "4_pawn",
    22: "4_pawn",
    23: "4_pawn",
    24: "4_pawn",
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
    42: "3_rook",
    43: "3_pawn",
    44: "",
    45: "",
    46: "",
    47: "",
    48: "",
    49: "",
    50: "",
    51: "",
    52: "",
    53: "",
    54: "2_pawn",
    55: "2_rook",
    56: "3_knight",
    57: "3_pawn",
    58: "",
    59: "",
    60: "",
    61: "",
    62: "",
    63: "",
    64: "",
    65: "",
    66: "",
    67: "",
    68: "2_pawn",
    69: "2_knight",
    70: "3_bishop",
    71: "3_pawn",
    72: "",
    73: "",
    74: "",
    75: "",
    76: "",
    77: "",
    78: "",
    79: "",
    80: "",
    81: "",
    82: "2_pawn",
    83: "2_bishop",
    84: "3_queen",
    85: "3_pawn",
    86: "",
    87: "",
    88: "",
    89: "",
    90: "",
    91: "",
    92: "",
    93: "",
    94: "",
    95: "",
    96: "2_pawn",
    97: "2_king",
    98: "3_king",
    99: "3_pawn",
    100: "",
    101: "",
    102: "",
    103: "",
    104: "",
    105: "",
    106: "",
    107: "",
    108: "",
    109: "",
    110: "2_pawn",
    111: "2_queen",
    112: "3_bishop",
    113: "3_pawn",
    114: "",
    115: "",
    116: "",
    117: "",
    118: "",
    119: "",
    120: "",
    121: "",
    122: "",
    123: "",
    124: "2_pawn",
    125: "2_bishop",
    126: "3_knight",
    127: "3_pawn",
    128: "",
    129: "",
    130: "",
    131: "",
    132: "",
    133: "",
    134: "",
    135: "",
    136: "",
    137: "",
    138: "2_pawn",
    139: "2_knight",
    140: "3_rook",
    141: "3_pawn",
    142: "",
    143: "",
    144: "",
    145: "",
    146: "",
    147: "",
    148: "",
    149: "",
    150: "",
    151: "",
    152: "2_pawn",
    153: "2_rook",
    154: "",
    155: "",
    156: "",
    157: "",
    158: "",
    159: "",
    160: "",
    161: "",
    162: "",
    163: "",
    164: "",
    165: "",
    166: "",
    167: "",
    168: "",
    169: "",
    170: "",
    171: "1_pawn",
    172: "1_pawn",
    173: "1_pawn",
    174: "1_pawn",
    175: "1_pawn",
    176: "1_pawn",
    177: "1_pawn",
    178: "1_pawn",
    179: "",
    180: "",
    181: "",
    182: "",
    183: "",
    184: "",
    185: "1_rook",
    186: "1_knight",
    187: "1_bishop",
    188: "1_king",
    189: "1_queen",
    190: "1_bishop",
    191: "1_knight",
    192: "1_rook",
    193: "",
    194: "",
    195: "",
    
    
};

function findBoardLocation(val) {
  numbers = ["a", "b", "c", "d", "e", "f", "g", "h"];

  result1 = numbers[(val % 8)];
  result2 = 9 - (Math.floor(val / 8));

  return result1 + result2;
}

function writeSidebar(value, piece) {
    let not = "";

    if (piece.includes("pawn")) {
      not = ""
    } else if (piece.includes("king")) {
      not = "K"
    } else if (piece.includes("queen")) {
      not = "Q"
    } else if (piece.includes("bishop")) {
      not = "B"
    } else if (piece.includes("knight")) {
      not = "N"
    } else if (piece.includes("rook")) {
      not = "R"
    }
    
    document.getElementById("notation").innerHTML += `<span style="padding: 20px; word-wrap: break-word;">${not}${value}</span>`;
}

function drawBoard() {
    let x = 1; // start on square zero
    let y = 0;

    if (style == "walnut") {
      draw("/src/img/boards/walnut.png", 0, 0, 512, 512);
    }

    else if (style == "darkwood") {
      draw("/src/img/boards/darkwood.png", 0, 0, 512, 512);
    }
    
    else {

    ctx.fillStyle = board_color1;
    ctx.fillRect(0, 0, 512, 512);

    // fill checkboard pattern
    ctx.fillStyle = board_color2;
    for (i = 0; i < 196; i++) {
      ctx.fillRect(x * square_size, y * square_size, square_size, square_size);
      x += 2;

      if (x > 14) {
          x -= 15;
          y++;
      }
    }

    function drawBigSquare(x, y) {
      ctx.fillRect(x * square_size, y * square_size, square_size+1, square_size+1);
      ctx.fillRect((x + 1) * square_size, y * square_size, square_size+1, square_size+1);
      ctx.fillRect((x + 2) * square_size, y * square_size, square_size+1, square_size+1);

      ctx.fillRect(x * square_size, (y + 1) * square_size, square_size+1, square_size+1);
      ctx.fillRect((x + 1) * square_size, (y + 1) * square_size, square_size+1, square_size+1);
      ctx.fillRect((x + 2) * square_size, (y + 1) * square_size, square_size+1, square_size+1);

      ctx.fillRect(x * square_size, (y + 2) * square_size, square_size+1, square_size+1);
      ctx.fillRect((x + 1) * square_size, (y + 2) * square_size, square_size+1, square_size+1);
      ctx.fillRect((x + 2) * square_size, (y + 2) * square_size, square_size+1, square_size+1);
    }

    ctx.fillStyle = "black";
    drawBigSquare(0, 0)
    drawBigSquare(0, 11)
    drawBigSquare(11, 0)
    drawBigSquare(11, 11)

  }

}

function drawPieces() {
    for (n = 0; n < 196; n++) {
      if (board_pieces[n] != "") {

        if (document.getElementById("pieceSet").value == "wbrb") {
          team_path_1 = "vanilla/white";
          team_path_2 = "vanilla/black";
          team_path_3 = "4p/red";
          team_path_4 = "4p/blue";
        }
        else if (document.getElementById("pieceSet").value == "rgyb") {
          team_path_1 = "4p/red";
          team_path_2 = "4p/green";
          team_path_3 = "4p/blue";
          team_path_4 = "4p/yellow";
        }
  
        // vanilla pieces
        if (board_pieces[n] == "1_pawn") {
          var filepath = "cburnett/"+team_path_1+"/pawn";
        } else if (board_pieces[n] == "1_king") {
          var filepath = "cburnett/"+team_path_1+"/king";
        } else if (board_pieces[n] == "1_queen") {
          var filepath = "cburnett/"+team_path_1+"/queen";
        } else if (board_pieces[n] == "1_bishop") {
          var filepath = "cburnett/"+team_path_1+"/bishop";
        } else if (board_pieces[n] == "1_knight") {
          var filepath = "cburnett/"+team_path_1+"/knight";
        } else if (board_pieces[n] == "1_rook") {
          var filepath = "cburnett/"+team_path_1+"/rook";
        }
         else if (board_pieces[n] == "2_pawn") {
          var filepath = "cburnett/"+team_path_2+"/pawn";
        } else if (board_pieces[n] == "2_king") {
          var filepath = "cburnett/"+team_path_2+"/king";
        } else if (board_pieces[n] == "2_queen") {
          var filepath = "cburnett/"+team_path_2+"/queen";
        } else if (board_pieces[n] == "2_bishop") {
          var filepath = "cburnett/"+team_path_2+"/bishop";
        } else if (board_pieces[n] == "2_knight") {
          var filepath = "cburnett/"+team_path_2+"/knight";
        } else if (board_pieces[n] == "2_rook") {
          var filepath = "cburnett/"+team_path_2+"/rook";
        } 
         else if (board_pieces[n] == "3_pawn") {
          var filepath = "cburnett/"+team_path_3+"/pawn";
        } else if (board_pieces[n] == "3_king") {
          var filepath = "cburnett/"+team_path_3+"/king";
        } else if (board_pieces[n] == "3_queen") {
          var filepath = "cburnett/"+team_path_3+"/queen";
        } else if (board_pieces[n] == "3_bishop") {
          var filepath = "cburnett/"+team_path_3+"/bishop";
        } else if (board_pieces[n] == "3_knight") {
          var filepath = "cburnett/"+team_path_3+"/knight";
        } else if (board_pieces[n] == "3_rook") {
          var filepath = "cburnett/"+team_path_3+"/rook";
        } 
         else if (board_pieces[n] == "4_pawn") {
          var filepath = "cburnett/"+team_path_4+"/pawn";
        } else if (board_pieces[n] == "4_king") {
          var filepath = "cburnett/"+team_path_4+"/king";
        } else if (board_pieces[n] == "4_queen") {
          var filepath = "cburnett/"+team_path_4+"/queen";
        } else if (board_pieces[n] == "4_bishop") {
          var filepath = "cburnett/"+team_path_4+"/bishop";
        } else if (board_pieces[n] == "4_knight") {
          var filepath = "cburnett/"+team_path_4+"/knight";
        } else if (board_pieces[n] == "4_rook") {
          var filepath = "cburnett/"+team_path_4+"/rook";
        } 
  
        draw(`/src/pieces/${filepath}.svg`, (Math.floor(n % 14)) * square_size, (Math.floor(n / 14)) * square_size, square_size, square_size);
      }
    }
}

function movePiece(last_position, movement, piece) {
    board_pieces[last_position] = "";
    board_pieces[Number(selected_piece_pos) - movement] = piece;

    writeSidebar(findBoardLocation(last_position), piece);

    playSound("move");
}

function capturePiece(capture, last_position, piece) {
  board_pieces[last_position] = "";
  board_pieces[capture] = piece;

  writeSidebar("x" + findBoardLocation(last_position), piece);

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
    if (e.ctrlKey) {
      ctx.fillStyle = "rgb(252, 202, 3, 0.5)";
    } else if (e.altKey) {
      ctx.fillStyle = "rgb(3, 107, 252, 0.5)";
    } else if (e.shiftKey) {
      ctx.fillStyle = "rgb(71, 237, 0, 0.5)";
    } else {
      ctx.fillStyle = "rgb(255, 0, 0, 0.5)";
    }
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
    var findpiece = findpiece_x + (findpiece_y * 14);

    if (board_pieces[findpiece].includes(this_team)) {

      ctx.fillStyle = "#F7F57D";
      ctx.fillRect(roundToSquareSize(square_size, getMousePos(elm, e).x), roundToSquareSize(square_size, getMousePos(elm, e).y), square_size, square_size);

      var tran_black = "rgb(0, 0, 0, 0.55)";
      var radius = 7
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

        if (selected_piece_pos > 171 && selected_piece_pos < 178) {
          drawCircle(rmousex, rmousey - (square_size * 2), tran_black, radius);
        }

        if (board_pieces[selected_piece_pos - 15].includes(opponent_team)) {
          drawCircleOutline(rmousex - (square_size * 1), rmousey - (square_size * 1), tran_black, radius_plus, line_width)
        }
        if (board_pieces[selected_piece_pos - 13].includes(opponent_team)) {
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
          drawCircle(rmousex + (square_size * 8) - (square_size * q), rmousey + (square_size * 8) - (square_size * q), tran_black, radius);
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
          drawCircle(rmousex + (square_size * 8) - (square_size * q), rmousey + (square_size * 8) - (square_size * q), tran_black, radius);
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
        if (Number(findpiece) + 14 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 14, selected_piece_id);
        } else if (Number(findpiece) + 28 == Number(selected_piece_pos) && selected_piece_pos >  171 && selected_piece_pos < 178  && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 28, selected_piece_id);
        }

        // capture
        if (Number(findpiece) + 15 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        } else if (Number(findpiece) + 13 == Number(selected_piece_pos) && board_pieces[Number(findpiece)].includes(opponent_team)) {
            capturePiece((Number(findpiece)), selected_piece_pos, selected_piece_id);
        }

        if (Number(selected_piece_pos) < 9) {
            convertPiece(selected_piece_pos, `${this_team}_queen`)
        }

      }

      if (selected_piece_id == `${this_team}_king`) {

        // horizontal, vertical movement
        if (Number(findpiece) + 8 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, 8, selected_piece_id);
        } else if (Number(findpiece) - 8 == Number(selected_piece_pos)) {
            movePiece(selected_piece_pos, -8, selected_piece_id);
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

      
      if (selected_piece_id == `${this_team}_queen`) {


        // rook motion

        // left motion
        if (Number(findpiece) + 1 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 1,  selected_piece_id);
        } else if (Number(findpiece) + 2 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 2,  selected_piece_id);
        } else if (Number(findpiece) + 3 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 3,  selected_piece_id);
        } else if (Number(findpiece) + 4 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 4,  selected_piece_id);
        } else if (Number(findpiece) + 5 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 5,  selected_piece_id);
        } else if (Number(findpiece) + 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 6,  selected_piece_id);
        } else if (Number(findpiece) + 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 7,  selected_piece_id);
        }

        // right motion
        if (Number(findpiece) - 1 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -1,  selected_piece_id);
        } else if (Number(findpiece) - 2 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -2,  selected_piece_id);
        } else if (Number(findpiece) - 3 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -3,  selected_piece_id);
        } else if (Number(findpiece) - 4 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -4,  selected_piece_id);
        } else if (Number(findpiece) - 5 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -5,  selected_piece_id);
        } else if (Number(findpiece) - 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -6,  selected_piece_id);
        } else if (Number(findpiece) - 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -7,  selected_piece_id);
        }

        // up motion
        else if (Number(findpiece) - 8 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -8,  selected_piece_id);
        } else if (Number(findpiece) - 16 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -16,  selected_piece_id);
        } else if (Number(findpiece) - 24 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -24,  selected_piece_id);
        } else if (Number(findpiece) - 32 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -32,  selected_piece_id);
        } else if (Number(findpiece) - 40 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -40,  selected_piece_id);
        } else if (Number(findpiece) - 48 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -48,  selected_piece_id);
        } else if (Number(findpiece) - 56 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -56,  selected_piece_id);
        }

        // down motion
        else if (Number(findpiece) + 8 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 8,  selected_piece_id);
        } else if (Number(findpiece) + 16 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 16,  selected_piece_id);
        } else if (Number(findpiece) + 24 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 24,  selected_piece_id);
        } else if (Number(findpiece) + 32 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 32,  selected_piece_id);
        } else if (Number(findpiece) + 40 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 40,  selected_piece_id);
        } else if (Number(findpiece) + 48 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 48,  selected_piece_id);
        } else if (Number(findpiece) + 56 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 56,  selected_piece_id);
        }

        // bishop motion

                // up left motion
        if (Number(findpiece) + 9 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 9,  selected_piece_id);
        } else if (Number(findpiece) + 18 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 18,  selected_piece_id);
        } else if (Number(findpiece) + 27 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 27,  selected_piece_id);
        } else if (Number(findpiece) + 36 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 36,  selected_piece_id);
        } else if (Number(findpiece) + 45 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 45,  selected_piece_id);
        } else if (Number(findpiece) + 54 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 54,  selected_piece_id);
        } 

        // up right motion
        else if (Number(findpiece) + 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 7,  selected_piece_id);
        } else if (Number(findpiece) + 14 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 14,  selected_piece_id);
        } else if (Number(findpiece) + 21 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 21,  selected_piece_id);
        } else if (Number(findpiece) + 28 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 28,  selected_piece_id);
        } else if (Number(findpiece) + 35 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 35,  selected_piece_id);
        } else if (Number(findpiece) + 42 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 42,  selected_piece_id);
        }

        // down left motion
        else if (Number(findpiece) - 9 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -9,  selected_piece_id);
        } else if (Number(findpiece) - 18 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -18,  selected_piece_id);
        } else if (Number(findpiece) - 27 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -27,  selected_piece_id);
        } else if (Number(findpiece) - 36 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -36,  selected_piece_id);
        } else if (Number(findpiece) - 45 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -45,  selected_piece_id);
        } else if (Number(findpiece) - 54 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -54,  selected_piece_id);
        } 

        // down right motion
        else if (Number(findpiece) - 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -7,  selected_piece_id);
        } else if (Number(findpiece) - 14 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -14,  selected_piece_id);
        } else if (Number(findpiece) - 21 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -21,  selected_piece_id);
        } else if (Number(findpiece) - 28 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -28,  selected_piece_id);
        } else if (Number(findpiece) - 35 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -35,  selected_piece_id);
        } else if (Number(findpiece) - 42 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -42,  selected_piece_id);
        }


      }

      if (selected_piece_id == `${this_team}_rook`) {

        if (Number(findpiece) + 1 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 1,  selected_piece_id);
        } else if (Number(findpiece) + 2 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 2,  selected_piece_id);
        } else if (Number(findpiece) + 3 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 3,  selected_piece_id);
        } else if (Number(findpiece) + 4 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 4,  selected_piece_id);
        } else if (Number(findpiece) + 5 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 5,  selected_piece_id);
        } else if (Number(findpiece) + 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 6,  selected_piece_id);
        } else if (Number(findpiece) + 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 7,  selected_piece_id);
        }

        // right motion
        if (Number(findpiece) - 1 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -1,  selected_piece_id);
        } else if (Number(findpiece) - 2 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -2,  selected_piece_id);
        } else if (Number(findpiece) - 3 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -3,  selected_piece_id);
        } else if (Number(findpiece) - 4 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -4,  selected_piece_id);
        } else if (Number(findpiece) - 5 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -5,  selected_piece_id);
        } else if (Number(findpiece) - 6 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -6,  selected_piece_id);
        } else if (Number(findpiece) - 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -7,  selected_piece_id);
        }

        // up motion
        else if (Number(findpiece) - 8 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -8,  selected_piece_id);
        } else if (Number(findpiece) - 16 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -16,  selected_piece_id);
        } else if (Number(findpiece) - 24 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -24,  selected_piece_id);
        } else if (Number(findpiece) - 32 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -32,  selected_piece_id);
        } else if (Number(findpiece) - 40 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -40,  selected_piece_id);
        } else if (Number(findpiece) - 48 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -48,  selected_piece_id);
        } else if (Number(findpiece) - 56 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -56,  selected_piece_id);
        }

        // down motion
        else if (Number(findpiece) + 8 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 8,  selected_piece_id);
        } else if (Number(findpiece) + 16 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 16,  selected_piece_id);
        } else if (Number(findpiece) + 24 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 24,  selected_piece_id);
        } else if (Number(findpiece) + 32 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 32,  selected_piece_id);
        } else if (Number(findpiece) + 40 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 40,  selected_piece_id);
        } else if (Number(findpiece) + 48 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 48,  selected_piece_id);
        } else if (Number(findpiece) + 56 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 56,  selected_piece_id);
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

      if (selected_piece_id == `${this_team}_bishop`) {

        // up left motion
        if (Number(findpiece) + 9 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 9,  selected_piece_id);
        } else if (Number(findpiece) + 18 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 18,  selected_piece_id);
        } else if (Number(findpiece) + 27 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 27,  selected_piece_id);
        } else if (Number(findpiece) + 36 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 36,  selected_piece_id);
        } else if (Number(findpiece) + 45 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 45,  selected_piece_id);
        } else if (Number(findpiece) + 54 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 54,  selected_piece_id);
        } 

        // up right motion
        else if (Number(findpiece) + 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 7,  selected_piece_id);
        } else if (Number(findpiece) + 14 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 14,  selected_piece_id);
        } else if (Number(findpiece) + 21 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 21,  selected_piece_id);
        } else if (Number(findpiece) + 28 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 28,  selected_piece_id);
        } else if (Number(findpiece) + 35 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 35,  selected_piece_id);
        } else if (Number(findpiece) + 42 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, 42,  selected_piece_id);
        }

        // down left motion
        else if (Number(findpiece) - 9 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -9,  selected_piece_id);
        } else if (Number(findpiece) - 18 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -18,  selected_piece_id);
        } else if (Number(findpiece) - 27 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -27,  selected_piece_id);
        } else if (Number(findpiece) - 36 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -36,  selected_piece_id);
        } else if (Number(findpiece) - 45 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -45,  selected_piece_id);
        } else if (Number(findpiece) - 54 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -54,  selected_piece_id);
        } 

        // down right motion
        else if (Number(findpiece) - 7 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -7,  selected_piece_id);
        } else if (Number(findpiece) - 14 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -14,  selected_piece_id);
        } else if (Number(findpiece) - 21 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -21,  selected_piece_id);
        } else if (Number(findpiece) - 28 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -28,  selected_piece_id);
        } else if (Number(findpiece) - 35 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -35,  selected_piece_id);
        } else if (Number(findpiece) - 42 == Number(selected_piece_pos) && board_pieces[Number(findpiece)] == "") {
            movePiece(selected_piece_pos, -42,  selected_piece_id);
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

document.getElementById("boardStyle").value = style;
changeBoardStyle(style);

// --------------------------------------------

document.getElementById("pieceSet").length = 0;

var option1 = document.createElement("option");
option1.text = "W, B, R, B";
option1.value = "wbrb";
document.getElementById("pieceSet").add(option1);

var option2 = document.createElement("option");
option2.text = "R, G, Y, B";
option2.value = "rgyb";
document.getElementById("pieceSet").add(option2);