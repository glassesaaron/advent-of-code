const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let games = [];
let gameMaxes = [];
let i = 0;
for(let line of input){
    if(line.length === 0){
        continue;
    }
    let gameLines = line.split(':')[1].split(';')
    games[i] = [];
    gameMaxes[i] = {};
    for(let gameLine of gameLines){
        gameLine = gameLine.trim();
        let game = {};
        let cubes = gameLine.split(', ');
        for(let cube of cubes){
            let cubeSplit = cube.split(' ');
            let color = cubeSplit[1];
            let amount = parseInt(cubeSplit[0]);
            game[color] = amount;
            if(gameMaxes[i].hasOwnProperty(color)){
                gameMaxes[i][color] = Math.max(amount, gameMaxes[i][color]);
            } else {
                gameMaxes[i][color] = amount;
            }
        }
        games[i].push(game);
    }
    i++;
}

const findValidGames = (r,g,b) => {
    let count = 0;
    for(let i=0; i<gameMaxes.length; i++){
        let currentGame = gameMaxes[i];
        if(currentGame.hasOwnProperty('red') && currentGame['red'] > r){
            continue;
        }
        if(currentGame.hasOwnProperty('green') && currentGame['green'] > g){
            continue;
        }
        if(currentGame.hasOwnProperty('blue') && currentGame['blue'] > b){
            continue;
        }
        count += i+1;
    }
    return count;
}

const findPower = () => {
    let count = 0;
    for(let i=0; i<gameMaxes.length; i++){
        let maxes = gameMaxes[i];
        count += maxes.red * maxes.green * maxes.blue;
    }
    return count;
}

console.log(findValidGames(12,13,14));

console.log(findPower());
