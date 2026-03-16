const fs = require('fs');
const path = './src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');
const startLine = 3358 - 1; // 0-based
const endLine = 4514 - 1;   // 0-based

const newLines = [...lines.slice(0, startLine), ...lines.slice(endLine)];

fs.writeFileSync(path, newLines.join('\n'));
console.log('Removed from ' + startLine + ' to ' + endLine);
