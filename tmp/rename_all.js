const fs = require('fs');
const path = './src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(/VowAI/g, 'Elsie Voyette');
content = content.replace(/VOWAI/g, 'ELSIE VOYETTE');
content = content.replace(/vowai/g, 'elsie_voyette');

fs.writeFileSync(path, content);
console.log('Renamed all instances');
