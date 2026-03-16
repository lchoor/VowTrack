const fs = require('fs');
const p = '../src/app/components/HighFiPrototype.tsx';
let str = fs.readFileSync(p, 'utf8');
str = str.replace('<div className="w-[340px] shrink-0 space-y-8">', '<div className="w-[340px] shrink-0 flex flex-col gap-8 h-full pb-10">');
fs.writeFileSync(p, str);
console.log('done');