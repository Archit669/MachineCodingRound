(() => {

    console.log("start game")
    
    // variables
    const N = 3;

    // define player1 : 1 and player2 : -1 values
    let player = 1;

    // state for each row col and diagonal
    let rowStates = new Array(N).fill(0);
    let colStates = new Array(N).fill(0);
    let diagonal1 = 0 , diagonal2 = 0;
    let moves = 0;

    // getters
    const gameWinner = document.getElementById('game-winner');
    const board = document.getElementById('board');

    // style for build grid , dynamically changed by variable N
    // grid-template-columns: repeat(3, 1fr);
    board.style.gridTemplateColumns =  `repeat(${N}, 1fr)`;

    // functions

    // function to switch players
    function switchPlayer(){
        player = -player;
    }

    // function to check that player is  winner or not
    function checkBoard(row, col, player){

        if (row == col){
            diagonal1 += player;
        }
        
        if (row + col == N-1){
            diagonal2 += player;
        }

        rowStates[row] += player;
        colStates[col] += player;

        if (Math.abs(rowStates[row]) == N || Math.abs(colStates[col]) == N || Math.abs(diagonal1) == N || Math.abs(diagonal2) == N){
            gameWinner.innerText = `Player ${player == 1 ? "1" : "2"} is winner`;
        }

    }

    // function to create board and set listeners on cells
    function createBoard(){
        for (let row = 0; row < N; row++){
            for (let col = 0; col < N; col++){

                // create a cell in board
                const cell = document.createElement("div");

                // give class to the cell
                cell.classList.add("cell");

                // set Attribute to cell that defines it rowIdx and colIdx
                cell.setAttribute("rowIdx", row);
                cell.setAttribute("colIdx", col);

                // add event listener in cell
                cell.addEventListener("click", (e) => {

                    if (e.target.innerText || gameWinner.innerText) return;

                    if (player == 1){
                        e.target.innerText = "X";
                    }else{
                        e.target.innerText = "O";
                    }

                    checkBoard(row, col, player);
                
                    switchPlayer();

                    moves++;

                    if (moves == N*N){
                        gameWinner.innerText = "Game is tie";
                    }
                })

                // append the cell in the board
                board.appendChild(cell);
            }
        }
    }

    createBoard()
})()