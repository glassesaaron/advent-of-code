const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

let map = [];
for(let line of input){
  map.push(line.split(''));
}

function testWord(word, x, y, direction){
  let count=0;
  if(word.length === 0){
    return count+1;
  }
  const letter = word.split('').shift();
  word = word.slice(1);
  if((typeof direction === 'undefined' || direction === 'l') && x-1>=0 && map[y][x-1] === letter){
    count += testWord(word+'',x-1,y,'l');
  }
  if((typeof direction === 'undefined' || direction === 'u') && y-1 >= 0 && map[y-1][x] === letter){
    count += testWord(word+'',x,y-1,'u');
  }
  if((typeof direction === 'undefined' || direction === 'r') && x+1<map[y].length && map[y][x+1] === letter){
    count += testWord(word+'',x+1,y,'r');
  }
  if((typeof direction === 'undefined' || direction === 'd') && y+1<map.length && map[y+1][x] === letter){
    count += testWord(word+'',x,y+1,'d');
  }
  if((typeof direction === 'undefined' || direction === 'ul') && y-1>=0 && x-1>=0 && map[y-1][x-1] === letter){
    count += testWord(word+'',x-1,y-1,'ul');
  }
  if((typeof direction === 'undefined' || direction === 'ur') && y-1>=0 && x+1<map[y].length && map[y-1][x+1] === letter){
    count += testWord(word+'',x+1,y-1,'ur');
  }
  if((typeof direction === 'undefined' || direction === 'dl') && y+1<map.length && x-1>=0 && map[y+1][x-1] === letter){
    count += testWord(word+'',x-1,y+1,'dl');
  }
  if((typeof direction === 'undefined' || direction === 'dr') && y+1<map.length && x+1<map[y+1].length && map[y+1][x+1] === letter){
    count += testWord(word+'',x+1,y+1,'dr');
  }
  return count;
}

function countWord(word){
  let count = 0;
  const firstLetter = word.split('').shift();
  word = word.slice(1);
  for(let y=0;y<map.length;y++){
    for(let x=0;x<map[y].length;x++){
      if(map[y][x] === firstLetter){
        count += testWord(word,x,y);
      }
    }
  }
  return count;
}

function countXMas(){
  let matches = new Set();
  const firstLetter = 'M';
  const word = 'AS';
  for(let y=0;y<map.length;y++){
    for(let x=0;x<map[y].length;x++){
      if(map[y][x] === firstLetter){
        if(testWord(word,x,y,'ul') > 0){
          matches.add(y + ',' + x + ',' + 'ul');
        }
        if(testWord(word,x,y,'ur') > 0){
          matches.add(y + ',' + x + ',' + 'ur');
        }
        if(testWord(word,x,y,'dl') > 0){
          matches.add(y + ',' + x + ',' + 'dl');
        }
        if(testWord(word,x,y,'dr') > 0){
          matches.add(y + ',' + x + ',' + 'dr');
        }
      }
    }
  }

  let count = 0;
  matches.forEach(x => {
    let vals = x.split(',');
    if(vals[2] === 'dr'){
      if(matches.has(vals[0]+','+(parseInt(vals[1])+2)+',dl')){
        count++;
      }
      if(matches.has((parseInt(vals[0])+2)+','+vals[1]+',ur')){
        count++;
      }
    }
    if(vals[2] === 'ul'){
      if(matches.has(vals[0]+','+(parseInt(vals[1])-2)+',ur')){
        count++;
      }
      if(matches.has((parseInt(vals[0])-2)+','+vals[1]+',dl')){
        count++;
      }
    }
  })

  return count;
}

console.log(countWord('XMAS'));
console.log(countXMas());
