const fs = require('fs');
const path = './src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Rename VowAI to Elsie Voyette in the chat overlay
content = content.replace(/VowAIChatOverlay/g, 'ElsieChatOverlay');
content = content.replace(/VowAIMessage/g, 'ElsieMessage');
content = content.replace(/getVowAIContext/g, 'getElsieContext');
content = content.replace(/Message VowAI\.\.\./g, 'Message Elsie Voyette...');

// Replace any leftover VowAI mentions in text strings
content = content.replace(/"VowAI"/g, '"Elsie Voyette"');
content = content.replace(/>VowAI</g, '>Elsie Voyette<');

fs.writeFileSync(path, content);
console.log('Renamed VowAI to Elsie Voyette');
