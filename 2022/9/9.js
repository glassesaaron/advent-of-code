import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let moves = [];
for(let line of input){
    let x = 0;
    let y = 0;
    let parts = line.split(' ');
    let amount = parseInt(parts[1]);
    if(parts[0] === 'L'){
        x -= amount;
    }
    if(parts[0] === 'R'){
        x += amount;
    }
    if(parts[0] === 'U'){
        y -= amount;
    }
    if(parts[0] === 'D'){
        y += amount;
    }
    moves.push({
        x: x,
        y: y,
    })
}

let doMove = (move,head,tail) => {
    if(move){
        let increment = {
            x: move.x === 0 ? 0 : (move.x > 0 ? 1 : -1),
            y: move.y === 0 ? 0 : (move.y > 0 ? 1 : -1),
        }
        head.x += increment.x;
        head.y += increment.y;

        move.x -= increment.x;
        move.y -= increment.y;
    }

    let diff = {
        x: Math.abs(head.x-tail.x),
        y: Math.abs(head.y-tail.y),
    }
    if((diff.x===1&&diff.y===0)||(diff.x===0&&diff.y===1)||(diff.x===1&&diff.y===1)){
        return false;
    }else if((diff.x===2&&diff.y===0)||(diff.x===0&&diff.y===2)||(diff.x===2&&diff.y===2)){
        tail.x += (head.x-tail.x)/2;
        tail.y += (head.y-tail.y)/2;
    }else if(diff.x===2&&diff.y===1){
        tail.x += (head.x-tail.x)/2;
        tail.y = head.y;
    }else if(diff.x===1&&diff.y===2){
        tail.x = head.x;
        tail.y += (head.y-tail.y)/2;
    }
    return true;
}

let doMoves = (ropeLength) => {
    let tailPositions = { '0,0': 1 };
    let head = { x: 0, y: 0};
    let rope = [];
    for(let i=0;i<ropeLength;i++){
        rope.push({x: 0, y: 0});
    }
    for(let move of JSON.parse(JSON.stringify(moves))){
        let step = Math.max(Math.abs(move.x),Math.abs(move.y));
        while(step>0){
            step--;
            let oldTail = Object.assign({}, rope[0]);
            if(!doMove(move, head, rope[rope.length-1])){
                continue;
            }

            for(let i=rope.length-2;i>=0;i--){
                if(!doMove(null, rope[i+1], rope[i])){
                    break;
                }
            }

            if(oldTail.x !== rope[0].x || oldTail.y !== rope[0].y){
                if(!tailPositions.hasOwnProperty(rope[0].x+','+rope[0].y)){
                    tailPositions[rope[0].x+','+rope[0].y] = 0;
                }
                tailPositions[rope[0].x+','+rope[0].y]++;
            }
        }
    }
    return Object.keys(tailPositions).length;
}


console.log(doMoves(1));

console.log(doMoves(9));
