const fs = require('fs');
const path = './src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(/VowAI/g, 'Elsie');
content = content.replace(/vowai/g, 'elsie');
content = content.replace(/VOWAI/g, 'ELSIE');

fs.writeFileSync(path, content);
console.log('Renamed remaining VowAI instances to Elsie');
