import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let elves = [{
    position: 0,
    calories: 0,
}];

(()=>{
    let elfPosition = 0;
    for(let i=0;i<input.length;i++){
        if(input[i] === ''){
            elfPosition++;
            elves.push({
                position: elfPosition,
                calories: 0,
            });
        } else {
            elves[elves.length-1].calories += parseInt(input[i]);
        }
    }
    elves.sort((a,b)=>{ return a.calories - b.calories; });
})();


const calculateTopCalorieElves = function(count){
    return elves.slice(elves.length-count,elves.length).reduce((a,c)=>{
        return a+c.calories;
    }, 0);
}

console.log(calculateTopCalorieElves(1));

console.log(calculateTopCalorieElves(3));
