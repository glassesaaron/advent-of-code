import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

const buildBoards = function(){
    let boards = [];
    let board = [];
    board.playing = true;
    for(let i=2;i<input.length;i++){
        board.push([
            [parseInt(input[i].slice(0,3)), false],
            [parseInt(input[i].slice(3,6)), false],
            [parseInt(input[i].slice(6,9)), false],
            [parseInt(input[i].slice(9,12)), false],
            [parseInt(input[i].slice(12,15)), false]
        ]);
        if(i+1 == input.length || input[i+1] === ''){
            boards.push(board);
            board=[];
            board.playing = true;
            i++;
        }
    }
    return boards;
}

const markNum = function(board, num){
    for(let x=0;x<board.length;x++){
        for(let y=0;y<board[x].length;y++){
            board[x][y][1]=board[x][y][1] || (board[x][y][0]==num);
        }
    }
}

const checkForBingo = function(board){
    let cols=(new Array(board.length)).fill(true);
    for(let x=0;x<board.length;x++){
        let row = true;
        for(let y=0;y<board[x].length;y++){
            cols[y] = cols[y] && board[x][y][1];
            row = row && board[x][y][1];
        }
        if(row){
            return true;
        }
    }
    for(let col of cols){
        if(col == true){
            return true;
        }
    }
    return false;
}

const findUnmarked = function(board){
    let result=0;
    for(let row of board){
        for(let val of row){
            result += !val[1] ? val[0] : 0;
        }
    }
    return result;
}

const playBingo = function(){
    let calledNums = input[0].split(',').map(x=>parseInt(x));
    let boards = buildBoards();
    for(let num of calledNums){
        for(let board of boards){
            markNum(board, num);
            if(checkForBingo(board)){
                board.playing = false;
                return num * findUnmarked(board);
            }
        }
    }
    return false;
}

const playBingoWrong = function(){
    let calledNums = input[0].split(',').map(x=>parseInt(x));
    let boards = buildBoards();
    let winningBoards = [];
    for(let num of calledNums){
        for(let board of boards){
            if(board.playing){
                markNum(board, num);
                if(checkForBingo(board)){
                    board.playing = false;
                    winningBoards.push(board);
                    if(winningBoards.length == boards.length){
                        return num * findUnmarked(board);
                    }
                }
            }
        }
    }
    return false;
}

console.log(playBingo());

console.log(playBingoWrong());
