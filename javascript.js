function Player(name, marker, score) {
    this.name = name
    this.marker = marker
    this.score = score
}
// const playerOne = new Player('Player One', 'X', 0)
// const playerTwo = new Player('Player Two', 'O', 0)
let playerOne;
let playerTwo;

const namesForm = document.querySelector('.names-form');
const namesButton = document.querySelector('.names-button');

namesButton.addEventListener('click', () => {
    const namesForm = document.querySelector('.names-form');
    name1 = namesForm[0].value;
    marker1 = namesForm[1].value;

    if (name1 != "" && marker1 != "") {
    playerOne = new Player(name1, marker1, 0);
    } else (playerOne = new Player('Player One', 'X', 0));

    name2 = namesForm[2].value;
    marker2 = namesForm[3].value;
    if (name2 != "" && marker1 != "") {
    playerTwo = new Player(name2, marker2, 0);
    } else (playerTwo = new Player('Player Two', 'O', 0));

    if (marker1 === marker2) {
        (playerOne = new Player('Player One', 'X', 0)) && (playerTwo = new Player('Player Two', 'O', 0));
    }
    resetGame();
});

const gameBoard = ['', '', '', '', '', '', '', '', '',]

let currentPlayer;
let gameBoardElement;
const container = document.querySelector('.container');

const makeGameBoard = () => {
    const container = document.querySelector('.container');
    const gameBoardElement = document.createElement('div');
    gameBoardElement.classList.add('gameBoard');
    container.appendChild(gameBoardElement);
    return gameBoardElement;
}

const makeSquareElement = squareNumber => {
    const squareElement = document.createElement('div');
    squareElement.classList.add('game-square');

    squareElement.addEventListener('click', (e) => {
        const { target } = e; 
        target.textContent = currentPlayer.marker;
        gameBoard[squareNumber] = currentPlayer.marker;
        gameOver();
        switchPlayer();
    },
    { once: true });

    return squareElement;
}

const switchPlayer = () => {
    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
    } else {
        currentPlayer = playerOne;
    }
    document.getElementById('playerTurn').textContent = "It is " + currentPlayer.name + "'s turn!"
    // document.getElementById('playerTurn').textContent = "It is " + currentPlayer.name + " (" + currentPlayer.marker + ")" + "'s turn!"
}

const gameOver = () => {
    // ['0', '1', '2']
    // ['3', '4', '5']
    // ['6', '7', '8']

    const wins = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['6', '4', '2'],
    ];
    for (let win of wins) {
        const [position1, position2, position3] = win;

        if  (gameBoard[position1] !== '' && 
            gameBoard[position1] === gameBoard[position2] && 
            gameBoard[position1] === gameBoard[position3]
        ) {
            // completeGame(`${gameBoard[position1]}'s wins!`);
            completeGame(currentPlayer.name + " wins!");
            currentPlayer.score++
            return;
        }
    }

    const tie = gameBoard.every(square => square !== '');
    if (tie) {
        completeGame("It's a draw!");
    }
};

const completeGame = message => {
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('winScreen');

    const messageElement = document.createElement('h2');
    messageElement.textContent = message;
    messageElement.classList.add('winnerMessage');

    const resetButtonElement = document.createElement('button');
    resetButtonElement.textContent = 'Restart';
    resetButtonElement.classList.add('resetButton');

    resetButtonElement.addEventListener('click', () => {
        resetGame();
        document.body.removeChild(overlayElement)
    })

    overlayElement.appendChild(messageElement);
    overlayElement.appendChild(resetButtonElement);
    document.body.appendChild(overlayElement);
};

const resetGame = () => {
    namesForm.style.display = "none";
    const container = document.querySelector('.container');
    if (gameBoardElement) {
        // const container = document.querySelector('.container');
        container.removeChild(gameBoardElement);
    }

    // const container = document.querySelector('.container');
    gameBoardElement = makeGameBoard();

    for(let square = 0; square < 9; square++){
        gameBoardElement.appendChild(makeSquareElement(square));
    }
    document.body.appendChild(gameBoardElement);
    container.appendChild(gameBoardElement);

    currentPlayer = playerOne;
    gameBoard.fill('');
    document.getElementById('playerOneScore').textContent = playerOne.name + " has " + playerOne.score + " points."
    document.getElementById('playerTwoScore').textContent = playerTwo.name + " has " + playerTwo.score + " points."
    document.getElementById('playerTurn').textContent = "It is " + currentPlayer.name + "'s turn!"
    // document.getElementById('playerTurn').textContent = "It is " + currentPlayer.name + " (" + currentPlayer.marker + ")'s turn!"
}


// resetGame();