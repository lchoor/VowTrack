const fs = require('fs');

let content = fs.readFileSync('/src/app/components/HighFiPrototype.tsx', 'utf8');

content = content.replace(/className="flex-1 flex flex-col overflow-y-auto pr-4 pb-10"/g, 'className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4 pb-10"');
content = content.replace(/className="w-\[240px\] shrink-0 border-r border-\[#C9A84C\]\/20 pr-6 overflow-y-auto"/g, 'className="w-[240px] shrink-0 border-r border-[#C9A84C]/20 pr-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"');
content = content.replace(/className="flex-1 overflow-y-auto pr-4"/g, 'className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4"');
content = content.replace(/className="flex-1 overflow-y-auto pr-2 relative"/g, 'className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2 relative"');
content = content.replace(/className="flex-1 p-6 bg-white overflow-y-auto flex flex-col gap-4"/g, 'className="flex-1 p-6 bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4"');

fs.writeFileSync('/src/app/components/HighFiPrototype.tsx', content);
console.log('done');
