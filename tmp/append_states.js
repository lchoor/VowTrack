const fs = require('fs');
const path = '../src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

const marker = "// --- Main App Component ---";

const guestsState = `
// --- GUEST LIST & SEATING CHART ---
const GUEST_DATA = [
  { id: '1', name: 'Eleanor Roosevelt', status: 'attending', dietary: 'Vegetarian', table: null },
  { id: '2', name: 'Winston Churchill', status: 'pending', dietary: 'None', table: null },
  { id: '3', name: 'Marie Curie', status: 'attending', dietary: 'Gluten-Free', table: 1 },
  { id: '4', name: 'Albert Einstein', status: 'declined', dietary: 'None', table: null },
  { id: '5', name: 'Frida Kahlo', status: 'attending', dietary: 'Vegan', table: 1 },
  { id: '6', name: 'Isaac Newton', status: 'attending', dietary: 'None', table: 2 },
  { id: '7', name: 'Ada Lovelace', status: 'pending', dietary: 'Vegetarian', table: null },
];

const DraggableGuest = ({ guest }: { guest: any }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'GUEST',
    item: { id: guest.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as any}
      className={\`p-3 bg-white border border-[#E2D8C8] rounded-md shadow-sm mb-2 cursor-grab hover:border-[#C9A84C] transition-colors flex items-center justify-between \${isDragging ? 'opacity-50' : ''}\`}
    >
      <div className="flex items-center gap-3">
        <GripVertical size={14} className="text-[#C9A84C]" />
        <div>
          <p className="text-sm font-semibold text-navy">{guest.name}</p>
          {guest.dietary !== 'None' && <span className="text-[10px] text-white bg-[#C9A84C] px-1.5 py-0.5 rounded-sm mt-1 inline-block">{guest.dietary}</span>}
        </div>
      </div>
      <Badge variant={guest.status === 'attending' ? 'success' : guest.status === 'declined' ? 'destructive' : 'outline'}>
        {guest.status}
      </Badge>
    </div>
  );
};

const SeatingTable = ({ tableId, guests, onDropGuest }: { tableId: number, guests: any[], onDropGuest: (guestId: string, tableId: number) => void }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'GUEST',
    drop: (item: { id: string }) => onDropGuest(item.id, tableId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef as any}
      className={\`relative w-full aspect-square rounded-full border-2 border-dashed \${isOver ? 'border-[#C9A84C] bg-[#F4F0E8]' : 'border-[#E2D8C8] bg-white'} flex items-center justify-center transition-colors shadow-inner\`}
    >
      <div className="text-center absolute inset-0 flex flex-col items-center justify-center z-0">
        <span className="text-xl font-serif text-navy font-bold">Table {tableId}</span>
        <span className="text-xs text-taupe mt-1">{guests.length} / 8 Guests</span>
      </div>
      
      {guests.map((g, i) => {
        const angle = (i * (360 / Math.max(guests.length, 1))) * (Math.PI / 180);
        const radius = 90;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <div 
            key={g.id} 
            className="absolute w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10 hover:bg-[#C9A84C] transition-colors cursor-pointer border-2 border-white"
            style={{ transform: \`translate(\${x}px, \${y}px)\` }}
            title={g.name}
          >
            {g.name.split(' ').map(n=>n[0]).join('')}
          </div>
        );
      })}
    </div>
  );
};

const GuestsState = ({ onBack }: { onBack: () => void }) => {
  const [guests, setGuests] = useState(GUEST_DATA);
  const [filter, setFilter] = useState('');

  const handleDropGuest = (guestId: string, tableId: number) => {
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, table: tableId } : g));
  };

  const unassignedGuests = guests.filter(g => g.table === null && g.name.toLowerCase().includes(filter.toLowerCase()));
  const tables = [1, 2, 3, 4];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-6 bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center hover:bg-[#F4F0E8] transition-colors text-navy shadow-sm">
              <ArrowLeft size={18} />
            </button>
            <h2 className="font-serif text-4xl font-bold text-navy">Guest List & Seating</h2>
          </div>
          <div className="flex gap-3">
            <Button variant="outline"><Download size={16} /> Export</Button>
            <Button variant="gold"><Plus size={16} /> Add Guest</Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 min-h-[600px] flex-1">
          <Card className="col-span-4 flex flex-col bg-white overflow-hidden shadow-sm border border-[#E2D8C8]">
            <div className="p-5 border-b border-[#E2D8C8] bg-[#F4F0E8]/30">
              <h3 className="font-serif text-xl text-navy mb-4">Unassigned Guests</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
                <input 
                  type="text" 
                  placeholder="Search guests..." 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#E2D8C8] rounded-md text-sm focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {unassignedGuests.map(g => (
                <DraggableGuest key={g.id} guest={g} />
              ))}
              {unassignedGuests.length === 0 && (
                <div className="text-center py-10 text-taupe text-sm">No unassigned guests.</div>
              )}
            </div>
          </Card>

          <Card className="col-span-8 bg-[#F9F7F3] overflow-y-auto shadow-inner border border-[#E2D8C8]">
             <div className="grid grid-cols-2 gap-x-16 gap-y-16 p-16 place-items-center">
               {tables.map(t => (
                 <SeatingTable 
                    key={t} 
                    tableId={t} 
                    guests={guests.filter(g => g.table === t)} 
                    onDropGuest={handleDropGuest} 
                 />
               ))}
             </div>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};

// --- VENDOR MANAGEMENT BOARD ---
const VENDOR_DATA = [
  { id: 1, role: 'Photography', name: 'Lumina Studios', status: 'Hired', paid: 2500, total: 5000, nextPayment: 'Oct 15' },
  { id: 2, role: 'Florist', name: 'Petals & Co.', status: 'Reviewing Contract', paid: 0, total: 3200, nextPayment: '-' },
  { id: 3, role: 'Catering', name: 'Epicurean Delights', status: 'Hired', paid: 5000, total: 15000, nextPayment: 'Nov 01' },
  { id: 4, role: 'Music / DJ', name: 'SoundWave', status: 'Interviewing', paid: 0, total: 1800, nextPayment: '-' },
];

const VendorsState = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-6 bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center hover:bg-[#F4F0E8] transition-colors text-navy shadow-sm">
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-serif text-4xl font-bold text-navy">Vendor Team</h2>
        </div>
        <div className="flex gap-3">
          <Button variant="gold"><Plus size={16} /> Add Vendor</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        {['Interviewing', 'Reviewing Contract', 'Hired'].map(columnStatus => (
          <div key={columnStatus} className="flex flex-col gap-4 bg-[#F4F0E8]/50 p-4 rounded-xl border border-[#E2D8C8]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy text-sm uppercase tracking-widest">{columnStatus}</span>
              <Badge variant={columnStatus === 'Hired' ? 'success' : 'outline'} className="bg-white">
                {VENDOR_DATA.filter(v => v.status === columnStatus).length}
              </Badge>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
              {VENDOR_DATA.filter(v => v.status === columnStatus).map(vendor => (
                <Card key={vendor.id} className="p-5 border border-[#E2D8C8] hover:shadow-md hover:border-[#C9A84C] transition-all bg-white flex flex-col gap-4 group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider mb-1 block bg-[#C9A84C]/10 w-fit px-2 py-0.5 rounded-sm">{vendor.role}</span>
                      <h4 className="font-serif text-xl text-navy leading-tight mt-2">{vendor.name}</h4>
                    </div>
                    <button className="text-taupe hover:text-navy opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  {columnStatus === 'Hired' && (
                    <div className="mt-2 bg-[#F9F7F3] p-3 rounded-md border border-[#E2D8C8]/50">
                      <div className="flex justify-between text-[11px] text-navy mb-2 font-medium">
                        <span>Paid: \$\${vendor.paid.toLocaleString()}</span>
                        <span>Total: \$\${vendor.total.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[#E2D8C8] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#C9A84C] h-full" style={{ width: \`\${(vendor.paid / vendor.total) * 100}%\` }}></div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-xs text-taupe font-medium">
                        <Calendar size={12} className="text-[#C9A84C]" /> Next Payment: {vendor.nextPayment}
                      </div>
                    </div>
                  )}

                  {columnStatus !== 'Hired' && (
                    <div className="flex items-center gap-2 text-xs text-taupe mt-2 font-medium bg-[#F9F7F3] p-2 rounded-md border border-[#E2D8C8]/50">
                      <CheckSquare size={12} className="text-[#C9A84C]" />
                      <span>Next step pending...</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BUDGET TRACKER ---
const BUDGET_DATA = [
  { name: 'Venue & Catering', actual: 27000, estimated: 25000 },
  { name: 'Photography', actual: 5000, estimated: 4500 },
  { name: 'Attire', actual: 4200, estimated: 5000 },
  { name: 'Florals', actual: 3200, estimated: 3000 },
  { name: 'Music', actual: 1800, estimated: 2000 },
  { name: 'Decor', actual: 2100, estimated: 2000 },
];

const PIE_DATA = BUDGET_DATA.map(d => ({ name: d.name, value: d.actual }));
const COLORS = ['#1D2B36', '#C9A84C', '#F2D4CF', '#E8F0F4', '#8C8C8C', '#E2D8C8'];

const BudgetState = ({ onBack }: { onBack: () => void }) => {
  const totalActual = BUDGET_DATA.reduce((sum, item) => sum + item.actual, 0);
  const totalEst = BUDGET_DATA.reduce((sum, item) => sum + item.estimated, 0);

  return (
    <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-6 bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center hover:bg-[#F4F0E8] transition-colors text-navy shadow-sm">
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-serif text-4xl font-bold text-navy">Budget Tracker</h2>
        </div>
        <Button variant="gold"><Plus size={16} /> Add Expense</Button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-2 flex-shrink-0">
        <Card className="p-6 border border-[#E2D8C8] shadow-sm bg-white flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-full bg-[#F4F0E8] flex items-center justify-center text-navy shadow-inner border border-[#E2D8C8]">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-taupe uppercase tracking-widest mb-1">Total Spent</p>
            <p className="text-3xl font-serif text-navy">\$\${totalActual.toLocaleString()}</p>
          </div>
        </Card>
        <Card className="p-6 border border-[#E2D8C8] shadow-sm bg-white flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-full bg-[#F4F0E8] flex items-center justify-center text-navy shadow-inner border border-[#E2D8C8]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-taupe uppercase tracking-widest mb-1">Estimated Budget</p>
            <p className="text-3xl font-serif text-navy">\$\${totalEst.toLocaleString()}</p>
          </div>
        </Card>
        <Card className="p-6 border border-navy shadow-sm bg-navy text-white flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C9A84C]/10 rounded-full blur-2xl"></div>
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C] border border-white/20 z-10 backdrop-blur-sm">
            <Receipt size={24} />
          </div>
          <div className="z-10">
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">Remaining</p>
            <p className="text-3xl font-serif text-white">\$\${Math.max(0, 50000 - totalActual).toLocaleString()}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6 min-h-[450px] flex-1">
        <Card className="col-span-8 p-8 bg-white border border-[#E2D8C8] flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl text-navy">Actual vs Estimated</h3>
            <Button variant="outline" size="sm">Filter by Category</Button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUDGET_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2D8C8" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8C8C8C', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8C8C8C', fontSize: 12, fontWeight: 500 }} tickFormatter={(val) => \`\$\${val}\`} dx={-10} />
                <RechartsTooltip cursor={{fill: '#F4F0E8', opacity: 0.5}} contentStyle={{ borderRadius: '12px', border: '1px solid #E2D8C8', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px', fontWeight: 500, color: '#1D2B36' }} />
                <Bar dataKey="actual" name="Actual Spent" fill="#1D2B36" radius={[6, 6, 0, 0]} maxBarSize={48} />
                <Bar dataKey="estimated" name="Estimated" fill="#C9A84C" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-4 p-8 bg-white border border-[#E2D8C8] flex flex-col shadow-sm">
          <h3 className="font-serif text-2xl text-navy mb-8">Expense Distribution</h3>
          <div className="flex-1 w-full min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => \`\$\${Number(value).toLocaleString()}\`} contentStyle={{ borderRadius: '12px', border: '1px solid #E2D8C8', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col mt-2">
               <span className="text-[10px] text-taupe uppercase tracking-widest font-bold mb-1">Total</span>
               <span className="text-xl font-serif text-navy font-bold">\$\${totalActual.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
`;

content = content.replace(marker, guestsState + "\n" + marker);
fs.writeFileSync(path, content);
console.log("States appended successfully.");
