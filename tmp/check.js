const fs = require('fs');

const content = fs.readFileSync('src/app/components/HighFiPrototype.tsx', 'utf-8');

// Super naive check for JSX tags balance
const lines = content.split('\n');
let opened = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Find <div ...> and </div>
    const openDivs = (line.match(/<div(\s|>)/g) || []).length;
    const closeDivs = (line.match(/<\/div>/g) || []).length;
    
    if (openDivs > closeDivs) {
        for(let j=0; j<openDivs-closeDivs; j++) opened.push(i+1);
    } else if (closeDivs > openDivs) {
        for(let j=0; j<closeDivs-openDivs; j++) opened.pop();
    }
}
console.log('Unclosed divs count:', opened.length, opened);
