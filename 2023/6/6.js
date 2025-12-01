import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let allRaces = [];
let times = input[0].split(':')[1].trim().split(' ').filter(x=>x!=='');
let distances = input[1].split(':')[1].trim().split(' ').filter(x=>x!=='');

let combineTime = '';
let combineDistance = '';
for(let x in times){
    allRaces.push({ time: parseInt(times[x]), distance: parseInt(distances[x])});
    combineTime += times[x];
    combineDistance += distances[x];
}

const countWinners = (race) => {
    let winners = 0;
    for(let x=0;x<race.time;x++){
        let amount = x*(race.time-x);
        if(amount > race.distance){
            winners++;
        }
    }
    return winners;
}

const multiplyWinners = (races) => {
    let sum = 1;
    for(let race of races){
        sum *= countWinners(race);
    }
    return sum;
}

console.log(multiplyWinners(allRaces));

console.log(multiplyWinners([{ time: parseInt(combineTime), distance: parseInt(combineDistance) }]));
