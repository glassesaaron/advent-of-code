const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let hands = [];
let altHands = [];
for(let x of input){
    x = x.split(' ');
    hands.push({
        hand: x[0].trim(),
        bid: parseInt(x[1].trim()),
    })
}

let values = {
    'A':14,
    'K':13,
    'Q':12,
    'J':11,
    'T':10,
    '9':9,
    '8':8,
    '7':7,
    '6':6,
    '5':5,
    '4':4,
    '3':3,
    '2':2,
    '1':1,
}

let jValues = {
    'A':14,
    'K':13,
    'Q':12,
    'T':10,
    '9':9,
    '8':8,
    '7':7,
    '6':6,
    '5':5,
    '4':4,
    '3':3,
    '2':2,
    '1':1,
    'J':0,
}

const evaluateHand = (hand) => {
    hand.dict = {};
    hand.vals = [0,0,0,0,0,0];
    for(let card of hand.hand){
        if(!hand.dict.hasOwnProperty(card)){
            hand.dict[card] = 0;
        }
        hand.vals[hand.dict[card]]--;
        hand.dict[card]++;
        hand.vals[hand.dict[card]]++;
    }
    hand.score = 0;
    // one pair
    if(hand.vals[2] === 1 && hand.vals[3] === 0 && hand.vals[4] === 0 && hand.vals[5] === 0){
        hand.score = 1;
    }
    // two pair
    if(hand.vals[2] === 2 && hand.vals[3] === 0 && hand.vals[4] === 0 && hand.vals[5] === 0){
        hand.score = 2;
    }
    // three of a kind
    if(hand.vals[2] === 0 && hand.vals[3] === 1 && hand.vals[4] === 0 && hand.vals[5] === 0){
        hand.score = 3;
    }
    // full house
    if(hand.vals[2] === 1 && hand.vals[3] === 1 && hand.vals[4] === 0 && hand.vals[5] === 0){
        hand.score = 4;
    }
    // four of a kind
    if(hand.vals[2] === 0 && hand.vals[3] === 0 && hand.vals[4] === 1 && hand.vals[5] === 0){
        hand.score = 5;
    }
    // five of a kind
    if(hand.vals[2] === 0 && hand.vals[3] === 0 && hand.vals[4] === 0 && hand.vals[5] === 1){
        hand.score = 6;
    }
}

for(let hand of hands){
    evaluateHand(hand);
    altHands.push(hand);
    if(hand.hand.indexOf('J') > -1){
        // todo: don't evaluate alts that have been previously evaluated
        for(let i=0;i<5;i++){
            if(hand.hand[i] !== 'J'){
                let newHand = Object.assign({}, hand);
                newHand.hand = newHand.hand.replaceAll('J',hand.hand[i]);
                evaluateHand(newHand);
                newHand.hand = hand.hand;
                if(newHand.score > altHands[altHands.length-1].score){
                    altHands[altHands.length-1] = newHand;
                }
            }
        }
    }
}

const compareHandsBase = (a,b,dict) => {
    if(a.score === b.score){
        let i = 0;
        let val1 = dict[a.hand[i]];
        let val2 = dict[b.hand[i]];
        while(val1 === val2){
            i++;
            val1 = dict[a.hand[i]];
            val2 = dict[b.hand[i]];
        }
        return val1 - val2;
    }
    return a.score - b.score;
}

const compareHands = (a,b) => {
    return compareHandsBase(a,b,values);
}

const compareJHands = (a,b) => {
    return compareHandsBase(a,b,jValues);
}

const calculateBids = function(x){
    let sum = 0;
    for(let i=0;i<x.length;i++){
        sum += x[i].bid * (i+1);
    }
    return sum;
}

hands = hands.sort(compareHands);

console.log(calculateBids(hands));

altHands = altHands.sort(compareJHands);

console.log(calculateBids(altHands));
