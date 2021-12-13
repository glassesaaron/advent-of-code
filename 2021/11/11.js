const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '11.txt'))
    .toString()
    .split('\n');

const buildMap = function(){
    let map=[];
    for(let x of input){
        map.push(x.split('').map(x=>parseInt(x,10)));
    }
    return map;
}

const doFlash = function(map,queue){
    let point=queue.pop();
    let x=point.x;
    let y=point.y;
    if(y > 0){
        map[y-1][x] += map[y-1][x] == 0 ? 0 : 1;
        if(x > 0){
            map[y-1][x-1] += map[y-1][x-1] == 0 ? 0 : 1;
        }
        if(x+1 < map[y].length){
            map[y-1][x+1] += map[y-1][x+1] == 0 ? 0 : 1;
        }
    }
    if(x > 0){
        map[y][x-1] += map[y][x-1] == 0 ? 0 : 1;
    }
    if(x+1 < map[y].length){
        map[y][x+1] += map[y][x+1] == 0 ? 0 : 1;
    }
    if(y+1 < map.length){
        map[y+1][x] += map[y+1][x] == 0 ? 0 : 1;
        if(x > 0){
            map[y+1][x-1] += map[y+1][x-1] == 0 ? 0 : 1;
        }
        if(x+1 < map[y].length){
            map[y+1][x+1] += map[y+1][x+1] == 0 ? 0 : 1;
        }
    }
    if(queue.length > 0){
        doFlash(map,queue);
    }
}

const countFlashes = function(steps){
    let sum=0;
    let map=buildMap();
    while(steps > 0){
        let done=false;
        for(let y=0;y<map.length;y++){
            for(let x=0;x<map[y].length;x++){
                map[y][x]++;
            }
        }
        while(!done){
            let nines = [];
            for(let y=0;y<map.length;y++){
                for(let x=0;x<map[y].length;x++){
                    if(map[y][x]>9){
                        sum++;
                        map[y][x]=0;
                        nines.push({x:x,y:y});
                    }
                }
            }           
            if(nines.length > 0){
                doFlash(map,nines);
            } else {
                done=true;
            }
        }
        steps--;
    }
    return sum;
}

const findStepMasterFlash = function(){
    let steps=0;
    let map=buildMap();
    let masterFlash=false;
    while(!masterFlash){
        let sum=0;
        let done=false;
        for(let y=0;y<map.length;y++){
            for(let x=0;x<map[y].length;x++){
                map[y][x]++;
            }
        }
        while(!done){
            let nines = [];
            for(let y=0;y<map.length;y++){
                for(let x=0;x<map[y].length;x++){
                    if(map[y][x]>9){
                        sum++;
                        map[y][x]=0;
                        nines.push({x:x,y:y});
                    }
                }
            }           
            if(nines.length > 0){
                doFlash(map,nines);
            } else {
                done=true;
            }
        }
        if(sum==100){
            masterFlash=true;
        }
        steps++;
    }
    return steps;
}

console.log(countFlashes(100));

console.log(findStepMasterFlash());
