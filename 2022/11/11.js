const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
    .toString()
    .split('\n');

let monkeys = [];

let buildMonkeys = () => {
    monkeys = [];
    for(let i=0;i<input.length;i+=7){
        let monkey = {
            items: input[i+1].substr(18, input[i+1].length-1).split(', ').map(x=>parseInt(x)),
            operation: (x)=>{return eval(input[i+2].substr(19, input[i+2].length-1).replace(/old/g, x))},
            test: parseInt(input[i+3].substr(21, input[i+3].length-1)),
            testTrue: parseInt(input[i+4].substr(29, input[i+4].length-1)),
            testFalse: parseInt(input[i+5].substr(30, input[i+5].length-1)),
            inspections: 0,
        };
        monkeys.push(monkey);
    }
}

let doRound = (worryLevel) => {
    for(let monkey of monkeys){
        let items = [...monkey.items];
        monkey.items = [];
        for(let item of items){
            monkey.inspections++;
            let worry = monkey.operation(item);
            if(worryLevel>1){
                worry = Math.floor(worry/worryLevel);
            }
            monkeys[(worry % monkey.test === 0) ? monkey.testTrue : monkey.testFalse].items.push(worry);
        }
    }
}

let doRounds = (x, worryLevel) => {
    while(x>0){
        doRound(worryLevel);
        if(worryLevel === 1){
            for(let monkey of monkeys){
                monkey.test = monkey.test/10;
                for(let item of monkey.items){
                    item = item/10;
                }
            }
        }
        x--;
    }
}

let countMonkeyBusiness = (x, worryLevel) => {
    buildMonkeys();
    doRounds(x, worryLevel);
    let inspections = monkeys.map(x=>x.inspections).sort((a,b)=>b-a);
    console.log(inspections);
    return inspections[0] * inspections[1];
}

console.log(countMonkeyBusiness(20,3));

console.log(countMonkeyBusiness(20,1));
