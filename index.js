const chessboard = document.getElementById('chessboard');
const initialBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

let turn = 'white'; // Define o turno inicial
let selectedPiece = null;

// Cria o tabuleiro
function createBoard() {
    chessboard.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square', (row + col) % 2 === 0 ? 'light' : 'dark');
            square.dataset.row = row;
            square.dataset.col = col;

            const piece = initialBoard[row][col];
            if (piece !== "") {
                const pieceElement = document.createElement('div');
                pieceElement.textContent = piece;
                pieceElement.classList.add('piece');
                pieceElement.dataset.color = row < 2 ? 'black' : 'white';
                square.appendChild(pieceElement);
            }

            square.addEventListener('click', () => selectPiece(square));
            chessboard.appendChild(square);
        }
    }
}

function selectPiece(square) {
    if (selectedPiece) {
        movePiece(square);
    } else {
        const piece = square.firstChild;
        if (piece && piece.dataset.color === turn) {
            selectedPiece = square;
            square.classList.add('selected');
        }
    }
}

function movePiece(targetSquare) {
    const piece = selectedPiece.firstChild;
    const targetPiece = targetSquare.firstChild;

    if (targetPiece && targetPiece.dataset.color === turn) {
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        return;
    }

    // Lógica básica para evitar mover para a mesma posição
    if (targetSquare === selectedPiece) {
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        return;
    }

    targetSquare.appendChild(piece);
    selectedPiece.classList.remove('selected');
    selectedPiece = null;
    turn = turn === 'white' ? 'black' : 'white'; // Alterna o turno
}

createBoard();
