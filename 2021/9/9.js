const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '9.txt'))
    .toString()
    .split('\n');

const buildMap = function(){
    let map = [];
    for(let line of input){
        let row = [];
        for(let char of line){
            row.push(parseInt(char));
        }
        map.push(row);
    }
    return map;
}

let map = buildMap();

const findLowPoints = function(){
    let lowPoints = [];
    for(let j=0;j<map.length;j++){
        let row = map[j];
        for(let i=0;i<row.length;i++){
            if(j == 0){
                if(i == 0){
                    if(map[j][i] < map[j][i+1] && map[j][i] <  map[j+1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                } else if(i == row.length - 1) {
                    if(map[j][i] < map[j][i-1] && map[j][i] < map[j+1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                } else {
                    if(map[j][i] < map[j][i-1] && map[j][i] < map[j][i+1] && map[j][i] < map[j+1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                }
            } else if(j == map.length - 1){
                if(i == 0){
                    if(map[j][i] < map[j][i+1] && map[j][i] < map[j-1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                } else if(i == row.length - 1) {
                    if(map[j][i] < map[j][i-1] && map[j][i] < map[j-1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                } else {
                    if(map[j][i] < map[j][i-1] && map[j][i] < map[j][i+1] && map[j][i] < map[j-1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                }
            } else {
                if(i == 0){
                    if(map[j][i] < map[j-1][i] && map[j][i] < map[j][i+1] && map[j][i] < map[j+1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                } else if(i == row.length - 1) {
                    if(map[j][i] < map[j-1][i] && map[j][i] < map[j][i-1] && map[j][i] < map[j+1][i]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                } else {
                    if(map[j][i] < map[j-1][i] && map[j][i] < map[j][i+1] && map[j][i] < map[j+1][i] && map[j][i] < map[j][i-1]){
                        lowPoints.push({ y : j, x : i, val : map[j][i] });
                    }
                }
            }
        }
    }
    return lowPoints;
}

let lowPoints = findLowPoints();

const sumRiskPoints = function(){
    let sum = 0;
    for(let point of lowPoints){
        sum += (point.val + 1);
    }
    return sum;
}

const findBasinSize = function(x,y,visited){
    let size=0;
    if(y > 0 && map[y-1][x] != 9 && map[y-1][x] > map[y][x] && !visited.has(x+','+(y-1))){
        size += findBasinSize(x,y-1,visited)
        visited.add(x+','+(y-1));
    }
    if(y < map.length - 1 && map[y+1][x] != 9 && map[y+1][x] > map[y][x] && !visited.has(x+','+(y+1))){
        size += findBasinSize(x,y+1,visited);
        visited.add(x+','+(y+1));
    }
    if(x > 0 && map[y][x-1] != 9 && map[y][x-1] > map[y][x] && !visited.has((x-1)+','+y)){
        size += findBasinSize(x-1,y,visited);
        visited.add((x-1)+','+y);
    }
    if(x < map[y].length - 1 && map[y][x+1] != 9 && map[y][x+1] > map[y][x] && !visited.has((x+1)+','+y)){
        size += findBasinSize(x+1,y,visited);
        visited.add((x+1)+','+y);
    }
    size = size + 1;
    return size;
}

const findThreeLargestBasins = function(){
    let basinSums = [];
    for(let point of lowPoints){
        basinSums.push(findBasinSize(point.x, point.y, new Set()));
    }
    return basinSums.sort((a,b)=>{return b-a;}).slice(0,3).reduce((a,c)=>{return a*c;},1);
}

console.log(sumRiskPoints());

console.log(findThreeLargestBasins());
