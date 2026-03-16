const fs = require('fs');
const path = './src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const getVowAIContext = ')) {
        startIdx = i;
    }
    if (lines[i].includes('// --- GUEST LIST & SEATING CHART ---')) {
        endIdx = i;
        break;
    }
}

if (startIdx !== -1 && endIdx !== -1) {
    const newLines = [...lines.slice(0, startIdx), ...lines.slice(endIdx)];
    fs.writeFileSync(path, newLines.join('\n'));
    console.log('Removed old VowAI components');
} else {
    console.log('Could not find start or end index', { startIdx, endIdx });
}
