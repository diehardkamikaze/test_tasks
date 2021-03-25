
const fs = require('fs');

const input = "input.csv";
const output = "output.csv"
var csv = fs.readFileSync('input.csv', 'utf8').split('\n');

var final = [];
var result = {};

var i = 1;
var tmp;


while (i < csv.length)
{
    tmp = csv[i].split(',');
    if(tmp[2][0] === 'н' && i++)
        continue;
    if (!result[tmp[0]])
        result[tmp[0]] = {};
    result[tmp[0]][parseInt(tmp[1])] = i;
    i++;
}

for(street in result)
    for(num in result[street])
        if (result[street][num])
            final.push(csv[result[street][num]]);


fs.writeFileSync(output, final.join('\n'));