import { loadInput } from "../../helpers/loadInput.js";
const input = loadInput(import.meta.url);

let trees = [];
for(let line of input){
    let row = line.split('');
    row = row.map(x=>parseInt(x));
    trees.push(row);
}

const countVisibility = function(scenic){
    let result = 0;
    let maxScenic = -1;

    for(let i=0;i<trees.length;i++){
        let row = trees[i];
        for(let j=0;j<row.length;j++){
            if(i === 0 || i === trees.length-1 || j === 0 || j === row.length-1){
                result++;
                continue;
            }

            let clear=[true,true,true,true];
            let scenic=[0,0,0,0];

            let x=j-1;
            while(x>=0){
                scenic[0]++;
                if(row[x] >= row[j]){
                    clear[0]=false;
                    break;
                }
                x--;
            }

            x=j+1;
            while(x<=row.length-1){
                scenic[1]++;
                if(row[x] >= row[j]){
                    clear[1]=false;
                    break;
                }
                x++;
            }

            y=i-1;
            while(y>=0){
                scenic[2]++;
                if(trees[y][j] >= row[j]){
                    clear[2]=false;
                    break;
                }
                y--;
            }

            y=i+1;
            while(y<=trees.length-1){
                scenic[3]++;
                if(trees[y][j] >= row[j]){
                    clear[3]=false;
                    break;
                }
                y++;
            }

            if(clear[0]||clear[1]||clear[2]||clear[3]){
                result++;
            }
            maxScenic = Math.max(maxScenic, scenic.reduce((a,c)=>{return a*c},1));
        }
    }
    return scenic ? maxScenic : result;
}

console.log(countVisibility(false));

console.log(countVisibility(true));
