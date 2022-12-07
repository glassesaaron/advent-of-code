const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let fileSystemFlat = {
    '/' : [],
};
let currentDir = '/';
let dirTree = ['/'];

for(let line of input){
    if(line === '$ cd /'){
        continue;
    }
    if(line[0] !== '$'){
        if(line.substr(0,3) === 'dir'){
            fileSystemFlat[currentDir].push('dir ' + currentDir + '-' + line.substr(4,line.length));
        } else {
            fileSystemFlat[currentDir].push(line);
        }
    }
    if(line.substr(0,4) === '$ cd'){
        let dir = line.substr(5,line.length-1);
        if(dir === '..'){
            dir = dirTree.pop();
        } else {
            dirTree.push(dir);
            fileSystemFlat[dirTree.join('-')] = [];
        }
        currentDir = dirTree.join('-');
        continue;
    }
    if(line === '$ ls'){
        continue;
    }
}

let buildDirSizes = function(dir){
    let result = [];
    let size = 0
    for(let x of fileSystemFlat[dir]){
        if(x.substr(0,3) === 'dir'){
            let children = buildDirSizes(x.substr(4,x.length-1));
            let layer = dir.split('-').length;
            for(let child of children){
                if(child.dir.split('-').length === (layer+1)){
                    size += child.size;
                }
            }
            result = result.concat(children);
        } else {
            size += parseInt(x.split(' ')[0]);
        }
    }
    result.push({ dir: dir, size: size});
    if(dir === '/'){
        result.totalFileSize = size;
    }
    return result;
};

const dirSizes = buildDirSizes('/');

let dirSizeSumUnderLimit = (dirs, maxSize) => {
    return dirs.filter(x=>x.size<=maxSize).reduce((a,c)=>a+c.size,0);
}

let deleteSmallestNecessary = (dirs, systemSize, updateSize) => {
    let requiredSize = systemSize - updateSize;
    let dirToDelete = null;
    for(let dir of dirs){
        if((dirs.totalFileSize - dir.size) <= requiredSize && 
            (!dirToDelete || dir.size < dirToDelete.size)){
                dirToDelete = dir;
        }
    }
    return dirToDelete.size;
}

console.log(dirSizeSumUnderLimit(dirSizes, 100000));

console.log(deleteSmallestNecessary(dirSizes, 70000000, 30000000));
