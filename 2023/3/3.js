import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

for(let x in input){
    input[x] = input[x].split('');
}

let isSymbol = (x) => {
    return x !== '.' && isNaN(parseInt(x));
}

let isGear = (x) => {
    return x === '*';
}

let isNumber = (x) => {
    return !isNaN(parseInt(x));
}

let findNeighbors = (grid, y, x, func) => {
    let neighbors = [];
    if(y > 0){
        if(func(grid[y-1][x])){
            neighbors.push([y-1,x]);
        }
        if(x > 0){
            if(func(grid[y-1][x-1])){
                neighbors.push([y-1,x-1]);
            }
        }
        if(x+1 < grid[y].length){
            if(func(grid[y-1][x+1])){
                neighbors.push([y-1,x+1]);
            }
        }
    }
    if(x > 0){
        if(func(grid[y][x-1])){
            neighbors.push([y,x-1]);
        }
    }
    if(x+1 < grid[y].length){
        if(func(grid[y][x+1])){
            neighbors.push([y,x+1]);
        }
    }
    if(y+1 < grid.length){
        if(func(grid[y+1][x])){
            neighbors.push([y+1,x]);
        }
        if(x > 0){
            if(func(grid[y+1][x-1])){
                neighbors.push([y+1,x-1]);
            }
        }
        if(x+1 < grid[y].length){
            if(func(grid[y+1][x+1])){
                neighbors.push([y+1,x+1]);
            }
        }
    }
    return neighbors;
}

const findPartSum = function(grid){
    let sum = 0;
    let currentNumber = '';
    for(let y=0;y<grid.length;y++){
        currentNumber = '';
        for(let x=0;x<grid[y].length;x++){
            if(isNumber(grid[y][x])){
                currentNumber += grid[y][x];
                if(findNeighbors(grid,parseInt(y),parseInt(x),isSymbol).length > 0){
                    x++;
                    while(isNumber(grid[y][x])){
                        currentNumber += grid[y][x];
                        x++;
                    }
                    sum += parseInt(currentNumber);
                    currentNumber = '';
                }
            } else {
                currentNumber = '';
            }
        }
    }
    return sum;
}

const findGearRatioSum = function(grid){
    let currentNumber = '';
    let gears = {};
    for(let y=0;y<grid.length;y++){
        currentNumber = '';
        for(let x=0;x<grid[y].length;x++){
            if(isNumber(grid[y][x])){
                currentNumber += grid[y][x];
                const neighbors = findNeighbors(grid,parseInt(y),parseInt(x),isGear);
                if(neighbors.length > 0){
                    x++;
                    while(isNumber(grid[y][x])){
                        currentNumber += grid[y][x];
                        x++;
                    }
                    for(let neighbor of neighbors){
                        let key = neighbor[0] + ',' + neighbor[1];
                        if(!gears.hasOwnProperty(key)){
                            gears[key] = [];
                        }
                        gears[key].push(parseInt(currentNumber));
                    }
                    currentNumber = '';
                }
            } else {
                currentNumber = '';
            }
        }
    }
    let sum = 0;
    for(let x of Object.keys(gears)){
        if(gears[x].length === 2){
            sum += gears[x][0] * gears[x][1];
        }
    }
    return sum;
}

console.log(findPartSum(input));

console.log(findGearRatioSum(input));
