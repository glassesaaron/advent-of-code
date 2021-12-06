const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '5.txt'))
    .toString()
    .split('\n')
    .map(x=>x.split(' -> '));

const buildPoints = function(useDiagonal){
    let points = [];
    let width = 0;
    let height = 0;
    for(let x of input){
        let line = [];
        let start = x[0].split(',');
        let end = x[1].split(',');
        let point0 = [parseInt(start[0]),parseInt(start[1])];
        let point1 = [parseInt(end[0]),parseInt(end[1])];
        width = Math.max(width, point0[0], point1[0]);
        height = Math.max(height, point0[1], point1[1]);
        if(point0[0] == point1[0]){
            if(point0[1] < point1[1]){
                line.push(point0,point1);
            } else {
                line.push(point1, point0);
            }
        } else if(point0[1] == point1[1]) {
            if(point0[0] < point1[0]){
                line.push(point0,point1);
            } else {
                line.push(point1, point0);
            }
        } else {
            if(useDiagonal){
                if(point0[0] < point1[0]){
                    line.push(point0,point1);
                } else {
                    line.push(point1, point0);
                }
            }
        }
        if(line.length > 0){
            points.push(line);
        }
    }
    return {
        points: points, 
        width: width+1, 
        height: height+1,
    };
}

const buildMap = function(pointsObj){
    let map = new Array(pointsObj.height).fill();
    for(let i=0;i<map.length;i++){
        map[i] = (new Array(pointsObj.width)).fill(0);
    }
    return map;
}

const fillPoints = function(map, points){
    for(let pair of points){
        if(pair[0][0] == pair[1][0]){
            let y = pair[0][1];
            while(y <= pair[1][1]){
                map[y][pair[0][0]] += 1;
                y++;
            }
        } else if(pair[0][1] == pair[1][1]) {
            let x = pair[0][0];
            while(x <= pair[1][0]){
                map[pair[0][1]][x] += 1;
                x++;
            }
        } else if(pair[0][1] < pair[1][1]) {
            let x = pair[0][0];
            let y = pair[0][1];
            while(x <= pair[1][0]){
                map[y][x] += 1;
                x++;
                y++;
            }
        } else {
            let x = pair[0][0];
            let y = pair[0][1];
            while(y >= pair[1][1]){
                map[y][x] += 1;
                x++;
                y--;
            }
        }
    }
    return map;
}

const findDangerousPoints = function(useDiagonal){
    let pointsObj = buildPoints(useDiagonal);
    let map = buildMap(pointsObj);
    let filledMap = fillPoints(map, pointsObj.points);
    let result = [];
    for(let x of filledMap){
        for(let y of x){
            if(y >= 2){
                result.push([x, y]);
            }
        }
    }
    return result;
}

const countDangerousPoints = function(useDiagonal){
    return findDangerousPoints(useDiagonal).length;
}

console.log(countDangerousPoints(false));

console.log(countDangerousPoints(true));
