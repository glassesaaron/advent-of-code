const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, '15.txt'))
    .toString()
    .split('\n');

for(let i=0;i<input.length;i++){
    input[i]=input[i].split('').map(x=>{return parseInt(x,10);});
}

// this is terrible, and needs to be redone
// i'm sorry
// i'm so, so sorry
const buildBigMap = function(size){
    let result = [];
    for(let x of input){
        result.push([]);
    }
    let current=0;
    for(let i=0;i<size;i++){
        for(let j=0;j<input.length;j++){
            for(let k=0;k<input[0].length;k++){
                let next=input[j][k]+current;
                next=next>9?next-9:next;
                result[j].push(next);
            }
        }
        current++;
    }
    while(result.length < input.length*5){
        let row=[...result[result.length-input.length]];
        for(let i=0;i<row.length;i++){
            let next = row[i]+1;
            next=next>9?next-9:next;
            row[i]=next;
        }
        result.push(row);
    }
    return result;
}

let pointDist = function(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

// a*
const findPath = function(map){
    let endX = map[0].length-1;
    let endY = map.length-1;

    let open=new Map();
    open.set('0,0',{x:0,y:0,g:0,h:pointDist(0,0,endX,endY)});
    let closed=new Map();

    while(open.size>0){
        let x=0;
        let y=0;
        let f=Number.MAX_SAFE_INTEGER;
        for(let point of open.values()){
            if(point.g+point.h<f){
                x=point.x;
                y=point.y;
                f=point.g+point.h;
            }
        }
        let id=x+','+y;
        let next=open.get(id);
        open.delete(id);
        closed.set(id,next);
        if(closed.has(endX+','+endY)){
            return closed;
        }
        if(x < map[0].length-1 && !closed.has((x+1)+','+y)){
            let newId=(x+1)+','+y;
            let newG=next.g+map[x+1][y];
            if(!open.has(newId) || newG < open.get(newId).g){
                open.set(newId,{x:x+1,y:y,g:newG,h:pointDist(x+1,y,endX,endY)});
            }
        }
        if(y < map.length-1 && !closed.has(x+','+(y+1))){
            let newId=x+','+(y+1);
            let newG=next.g+map[x][y+1];
            if(!open.has(newId) || newG < open.get(newId).g){
                open.set(newId,{x:x,y:y+1,g:newG,h:pointDist(x,y+1,endX,endY)});
            }
        }
        if(x > 0 && !closed.has((x-1)+','+y)){
            let newId=(x-1)+','+y;
            let newG=next.g+map[x-1][y];
            if(!open.has(newId) || newG < open.get(newId).g){
                open.set(newId,{x:x-1,y:y,g:newG,h:pointDist(x-1,y,endX,endY)});
            }
        }
        if(y > 0 && !closed.has(x+','+(y-1))){
            let newId=x+','+(y-1);
            let newG=next.g+map[x][y-1];
            if(!open.has(newId) || newG < open.get(newId).g){
                open.set(newId,{x:x,y:y-1,g:newG,h:pointDist(x,y-1,endX,endY)});
            }
        }
    }
    return closed;
}

const findPathLength = function(){
    let values = findPath(input);
    return values.get((input[0].length-1)+','+(input.length-1)).g;
}

const findPathLengthBigMap = function(){
    let map=buildBigMap(5);
    let values = findPath(map);
    return values.get((map[0].length-1)+','+(map.length-1)).g;
}

console.log(findPathLength());

console.log(findPathLengthBigMap());
