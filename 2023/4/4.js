const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

const deck = [];
for(let line of input){
    line = line.split(':')[1].split('|');
    line[0] = line[0].trim().split(' ').filter(x=>x!=='').map(x => parseInt(x)).sort((a,b)=>{return a-b;});
    line[1] = line[1].trim().split(' ').filter(x=>x!=='').map(x => parseInt(x)).sort((a,b)=>{return a-b;});
    deck.push({
        winners: line[0],
        all: line[1],
    })
}

const findWinners = (deck) => {
    let final = [];
    for(let game of Object.values(deck)){
        let winners = [];
        let i = 0;
        let j = 0;
        while(i < game.winners.length && j < game.all.length){
            if(game.winners[i] === game.all[j]){
                winners.push(game.winners[i]);
                i++;
                j++;
            } else if(game.winners[i] < game.all[j]){
                i++;
            } else {
                j++;
            }
        }
        final.push(winners);
    }
    return final;
}

const calculateWinners = (deck) => {
    let winners = findWinners(deck);
    let sum = 0;
    for(let winner of winners){
        if(winner.length > 0){
            sum += Math.pow(2,winner.length-1);
        }
    }
    return sum;
}

const calculateCopyWinners = (deck) => {
    let winners = findWinners(deck);
    let sum = 0;
    let copies = new Array(winners.length).fill(1);
    let i = 0;
    for(let winner of winners){
        let j = winner.length;
        while(j > 0){
            copies[i+j]+=copies[i];
            j--;
        }
        sum += copies[i];
        i++;
    }
    return sum;
}

console.log(calculateWinners(deck));

console.log(calculateCopyWinners(deck));
