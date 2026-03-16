import fs from 'fs';
let code = fs.readFileSync('../src/app/components/HighFiPrototype.tsx', 'utf8');

code = code.replace(
  '<BarChart data={BUDGET_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>',
  '<BarChart accessibilityLayer={false} data={BUDGET_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>'
);

code = code.replace(
  '<PieChart>',
  '<PieChart accessibilityLayer={false}>'
);

fs.writeFileSync('../src/app/components/HighFiPrototype.tsx', code);
console.log('Replaced successfully');
