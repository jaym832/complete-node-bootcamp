const fs = require('fs');
const text = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
console.log(text);


const textOut = `this is my new text`

fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);