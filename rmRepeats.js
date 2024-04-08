const fs = require('fs');

const inputData = require('./toGenerate.json');

let outputData = { items: [] };

outputData.items = [...new Set(inputData.items)];

console.log(`${inputData.items.length} > ${outputData.items.length}`);

fs.writeFileSync('./toGenerate.bak.json', JSON.stringify(inputData));

fs.writeFileSync('./toGenerate.json', JSON.stringify(outputData));
