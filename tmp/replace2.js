const fs = require('fs');
let s = fs.readFileSync('../src/app/components/HighFiPrototype.tsx', 'utf8');
s = s.replace('<BarChart data={BUDGET_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>', '<BarChart accessibilityLayer={false} data={BUDGET_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>');
s = s.replace('<PieChart>', '<PieChart accessibilityLayer={false}>');
fs.writeFileSync('../src/app/components/HighFiPrototype.tsx', s);
console.log("Replaced charts");
