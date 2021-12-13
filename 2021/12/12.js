const fs = require('fs');
const path = require("path");
const { resourceLimits } = require('worker_threads');

const input = fs.readFileSync(path.resolve(__dirname, '12.txt'))
    .toString()
    .split('\n');

let nodes = new Map();
for(let line of input){
    x=line.split('-');
    if(!nodes.has(x[0])){
        nodes.set(x[0],[]);
    }
    nodes.get(x[0]).push(x[1]);

    if(!nodes.has(x[1])){
        nodes.set(x[1],[]);
    }
    nodes.get(x[1]).push(x[0]);
}

const findDistinctPaths = function(useDouble){
    let paths=[];
    let completedPaths=[];
    let start = nodes.get('start');
    for(let x of start){
        let path=['start', x];
        path.visited=new Set();
        path.visited.add('start');
        path.visited.add(x);
        path.double=null;
        paths.push(path);
    }
    while(paths.length > 0){
        let newPaths=[];
        for(let x of paths){
            let last = x[x.length-1];
            if(nodes.has(last)){
                let next = nodes.get(last);
                for(let y of next){
                    if(useDouble){
                        if(y.toLowerCase() != y){
                            let newPath = x.slice(0,x.length);
                            newPath.visited = new Set(x.visited);
                            newPath.push(y);
                            newPath.visited.add(y);
                            newPath.double=x.double;
                            newPaths.push(newPath);
                        } else {
                            if(!x.double && y!='start' && y!='end'){
                                let newPath = x.slice(0,x.length);
                                newPath.visited = new Set(x.visited);
                                newPath.push(y);
                                newPath.double=y;
                                newPaths.push(newPath);
                                if(!x.visited.has(y)) {
                                    newPath = x.slice(0,x.length);
                                    newPath.visited = new Set(x.visited);
                                    newPath.push(y);
                                    newPath.visited.add(y);
                                    newPath.double=x.double;
                                    newPaths.push(newPath);
                                }
                            } else if(!x.visited.has(y)) {
                                let newPath = x.slice(0,x.length);
                                newPath.visited = new Set(x.visited);
                                newPath.push(y);
                                newPath.visited.add(y);
                                newPath.double=x.double;
                                newPaths.push(newPath);
                            }
                        }
                    } else {
                        if(y.toLowerCase() != y || !x.visited.has(y)){
                            let newPath = x.slice(0,x.length);
                            newPath.visited = new Set(x.visited);
                            newPath.push(y);
                            newPath.visited.add(y);
                            newPath.double=x.double;
                            newPaths.push(newPath);
                        }
                    }
                }
            }
        }
        completedPaths = completedPaths.concat(paths.filter(x=>x[x.length-1]=='end'));
        paths = newPaths;
    }
    let results = new Set();
    let resultCount=0;
    for(let x of completedPaths){
        let str=x.join(',');
        if(!results.has(str)){
            results.add(str);
            resultCount++;
        }
    }
    return resultCount;
}

console.log(findDistinctPaths(false));

console.log(findDistinctPaths(true));
