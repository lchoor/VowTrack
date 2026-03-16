const fs = require('fs');
const path = './src/app/components/HighFiPrototype.tsx';

let content = fs.readFileSync(path, 'utf8');

const startIndex = content.indexOf('const TimelineState = ({ onBack, onOpenChat, onNavigate }');
const endIndex = content.indexOf('// --- VowAI Chat Overlay Component ---');

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find start or end index');
  process.exit(1);
}

const newTimelineState = `const TimelineState = ({ onBack, onOpenChat, onNavigate }: { onBack: () => void, onOpenChat: (intent?: string) => void, onNavigate?: (view: string) => void }) => {
    const [activeTab, setActiveTab] = useState<'rehearsal' | 'events' | 'day-of'>('day-of');
    const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);

    return (
        <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-8 bg-[#FAF7F2] overflow-hidden relative z-0">
            {/* Header Section */}
            <div className="flex items-start justify-between flex-shrink-0">
                <div>
                  <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold uppercase text-taupe hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
                    Timelines & Logistics <Clock className="text-[#C9A84C]" size={36} strokeWidth={1.5} />
                  </h2>
                  <p className="text-base text-taupe font-medium">Run of show, events, and day-of details for October 24.</p>
                </div>
                <div className="flex gap-3 items-end pb-2">
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent border-[#E2D8C8] text-navy hover:bg-[#E2D8C8]/30 text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all"><Printer size={16} /> Print</Button>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent border-[#E2D8C8] text-navy hover:bg-[#E2D8C8]/30 text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all"><Share2 size={16} /> Share</Button>
                    <Button variant="gold" className="flex items-center gap-2 bg-navy text-white hover:bg-navy/90 border-navy shadow-md text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all"><Plus size={16} /> Add Event</Button>
                </div>
            </div>

            {/* Asymmetric Dashboard Layout */}
            <div className="flex gap-6 h-full overflow-hidden relative z-10">
                
                {/* WIDER MAIN BOX: Day-Of Itinerary */}
                <div className="flex-[2] bg-white rounded-[32px] border border-[#E2D8C8] p-8 flex flex-col h-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex justify-between items-baseline mb-8 border-b border-[#E2D8C8] pb-6">
                        <h3 className="font-serif text-[28px] text-navy font-bold">Saturday, Oct 24 — <span className="italic text-[#C9A84C]">Run of Show</span></h3>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setActiveTab('rehearsal')}
                                className={\`pb-2 text-[10px] font-bold tracking-widest uppercase transition-colors \${activeTab === 'rehearsal' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}\`}
                            >
                                Rehearsal
                            </button>
                            <button 
                                onClick={() => setActiveTab('day-of')}
                                className={\`pb-2 text-[10px] font-bold tracking-widest uppercase transition-colors \${activeTab === 'day-of' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}\`}
                            >
                                Day-Of
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {activeTab === 'day-of' && (
                            <div className="relative">
                                {/* Timeline connecting line */}
                                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#E2D8C8]" />
                                
                                {/* 9:00 AM - Split Columns (Partner 1 vs Partner 2) */}
                                <div className="relative flex justify-between items-start mb-12">
                                    <div className="w-[45%] bg-[#FAF7F2] rounded-[24px] p-5 border border-[#E2D8C8] relative">
                                        <div className="absolute top-5 -right-[calc(11%+8px)] w-3 h-3 rounded-full bg-[#C9A84C] ring-4 ring-white z-10" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-1 block">9:00 AM</span>
                                        <h4 className="font-serif text-[18px] text-navy font-bold leading-tight mb-2">Jessica's Bridal Suite</h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[11px] text-taupe"><Scissors size={12} /> Hair & Makeup begins</div>
                                            <div className="flex items-center gap-2 text-[11px] text-taupe"><Coffee size={12} /> Breakfast delivery</div>
                                        </div>
                                    </div>
                                    <div className="w-[45%] bg-[#F0F4F8] rounded-[24px] p-5 border border-[#C4D7E2] relative mt-12">
                                        <div className="absolute top-5 -left-[calc(11%+8px)] w-3 h-3 rounded-full bg-[#5A7E9D] ring-4 ring-white z-10" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#5A7E9D] mb-1 block">10:00 AM</span>
                                        <h4 className="font-serif text-[18px] text-[#2A4D6B] font-bold leading-tight mb-2">Michael's Prep</h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[11px] text-[#5A7E9D]"><Shirt size={12} /> Groomsmen arrival</div>
                                            <div className="flex items-center gap-2 text-[11px] text-[#5A7E9D]"><Camera size={12} /> Detail shots</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 12:00 PM - Split */}
                                <div className="relative flex justify-between items-start mb-12">
                                    <div className="w-[45%] bg-[#FAF7F2] rounded-[24px] p-5 border border-[#E2D8C8] relative">
                                        <div className="absolute top-5 -right-[calc(11%+8px)] w-3 h-3 rounded-full bg-[#C9A84C] ring-4 ring-white z-10" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-1 block">12:00 PM</span>
                                        <h4 className="font-serif text-[18px] text-navy font-bold leading-tight mb-2">First Look Prep</h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[11px] text-taupe"><Sparkles size={12} /> Get into dress</div>
                                        </div>
                                    </div>
                                    <div className="w-[45%] bg-[#F0F4F8] rounded-[24px] p-5 border border-[#C4D7E2] relative mt-8">
                                        <div className="absolute top-5 -left-[calc(11%+8px)] w-3 h-3 rounded-full bg-[#5A7E9D] ring-4 ring-white z-10" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#5A7E9D] mb-1 block">12:30 PM</span>
                                        <h4 className="font-serif text-[18px] text-[#2A4D6B] font-bold leading-tight mb-2">Head to Garden</h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[11px] text-[#5A7E9D]"><MapPin size={12} /> Wait at the oak tree</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 1:30 PM - Merged Event */}
                                <div className="relative flex justify-center items-start mb-12">
                                    <div className="w-[70%] bg-white rounded-[24px] p-6 border-2 border-[#E9CFCB] shadow-sm relative z-10 text-center">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E9CFCB] border-4 border-white flex items-center justify-center text-white"><Heart size={10} fill="currentColor"/></div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C44343] mb-2 block mt-2">1:30 PM</span>
                                        <h4 className="font-serif text-[22px] text-navy font-bold leading-tight mb-2">First Look & Portraits</h4>
                                        <p className="text-[13px] text-taupe mx-auto max-w-[80%]">The Rose Garden. Photographers & Videographers present.</p>
                                    </div>
                                </div>

                                {/* 3:00 PM - Merged Event */}
                                <div className="relative flex justify-center items-start mb-12">
                                    <div className="w-[70%] bg-white rounded-[24px] p-6 border border-[#E2D8C8] shadow-sm relative z-10 text-center">
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E2D8C8] ring-4 ring-white" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-2 block">3:00 PM</span>
                                        <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-2">Wedding Party Photos</h4>
                                        <p className="text-[13px] text-taupe mx-auto max-w-[80%]">Estate Grounds. All bridesmaids and groomsmen.</p>
                                    </div>
                                </div>

                                {/* 5:00 PM - MAIN MERGED EVENT */}
                                <div className="relative flex justify-center items-start mb-12">
                                    <div className="w-[85%] bg-navy rounded-[32px] p-8 shadow-lg relative z-10 text-center text-white">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#C9A84C] border-4 border-[#FAF7F2] flex items-center justify-center text-white"><Star size={14} fill="currentColor"/></div>
                                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#C9A84C] mb-3 block mt-2">5:00 PM • The Chapel</span>
                                        <h4 className="font-serif text-[32px] font-bold leading-tight mb-3">The Ceremony</h4>
                                        <p className="text-[14px] text-white/70 mx-auto max-w-[80%]">Please ensure all guests are seated by 4:50 PM. Officiant: Rev. Davis.</p>
                                    </div>
                                </div>
                                
                                {/* 6:00 PM - Reception */}
                                <div className="relative flex justify-center items-start mb-12">
                                    <div className="w-[70%] bg-white rounded-[24px] p-6 border border-[#E2D8C8] shadow-sm relative z-10 text-center">
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E2D8C8] ring-4 ring-white" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-2 block">6:00 PM</span>
                                        <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-2">Cocktail Hour</h4>
                                        <p className="text-[13px] text-taupe mx-auto max-w-[80%]">Terrace. Signature drinks served.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'rehearsal' && (
                            <div className="flex items-center justify-center h-64 text-taupe italic">Rehearsal schedule not yet finalised.</div>
                        )}
                    </div>
                </div>

                {/* NARROW SIDE COLUMNS: Floor Plan & Checklist */}
                <div className="flex-[1] flex flex-col gap-6 h-full">
                    
                    {/* FLOOR PLAN BOX */}
                    <div className="bg-white rounded-[32px] border border-[#E2D8C8] p-6 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer group hover:border-[#C9A84C] transition-colors" onClick={() => setIsFloorPlanModalOpen(true)}>
                        <div className="flex justify-between items-baseline mb-4">
                            <h3 className="font-serif text-[20px] text-navy font-bold">Floor Plan</h3>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] group-hover:underline">EXPAND →</span>
                        </div>
                        <div className="bg-[#FAF7F2] rounded-[20px] border border-[#E2D8C8] p-4 flex-1 flex flex-col items-center justify-center relative overflow-hidden h-[180px]">
                            {/* Abstract Floor Plan Graphic */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col items-center justify-center gap-4">
                                <div className="w-24 h-8 rounded-full border-2 border-navy" />
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-navy" />
                                    <div className="w-12 h-12 rounded-full border-2 border-navy" />
                                    <div className="w-12 h-12 rounded-full border-2 border-navy" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-navy" />
                                    <div className="w-12 h-12 rounded-full border-2 border-navy" />
                                </div>
                            </div>
                            <div className="relative z-10 text-center">
                                <div className="text-[32px] font-serif font-bold text-navy leading-none mb-1">145<span className="text-[16px] text-taupe font-sans">/150</span></div>
                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe">SEATS ASSIGNED</div>
                            </div>
                        </div>
                    </div>

                    {/* MASTER CHECKLIST BOX */}
                    <div className="bg-white rounded-[32px] border border-[#E2D8C8] p-6 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-hidden">
                        <div className="flex justify-between items-baseline mb-4 border-b border-[#E2D8C8] pb-4">
                            <h3 className="font-serif text-[20px] text-navy font-bold">Priority To-Dos</h3>
                            <span className="text-[10px] font-bold text-[#C44343] uppercase tracking-widest bg-[#FDF2F2] px-2 py-1 rounded-full">2 OVERDUE</span>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            
                            <div className="flex items-start gap-3 p-3 rounded-[16px] bg-[#FAF7F2] border border-[#E2D8C8] hover:border-[#C9A84C] transition-colors cursor-pointer">
                                <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#E2D8C8] bg-white flex-shrink-0" />
                                <div>
                                    <span className="text-[13px] text-navy font-medium block leading-tight mb-1">Finalise Seating Chart</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#C44343]">Today</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-[16px] bg-[#FAF7F2] border border-[#E2D8C8] hover:border-[#C9A84C] transition-colors cursor-pointer">
                                <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#E2D8C8] bg-white flex-shrink-0" />
                                <div>
                                    <span className="text-[13px] text-navy font-medium block leading-tight mb-1">Confirm Vendor Meals</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#C44343]">Tomorrow</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-[16px] bg-white border border-[#E2D8C8] hover:border-[#C9A84C] transition-colors cursor-pointer">
                                <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#E2D8C8] bg-white flex-shrink-0" />
                                <div>
                                    <span className="text-[13px] text-navy font-medium block leading-tight mb-1">Pack Honeymoon Bags</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 3 days</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-[16px] bg-white border border-[#E2D8C8] hover:border-[#C9A84C] transition-colors cursor-pointer">
                                <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#E2D8C8] bg-white flex-shrink-0" />
                                <div>
                                    <span className="text-[13px] text-navy font-medium block leading-tight mb-1">Pick up Dress</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 1 week</span>
                                </div>
                            </div>

                            {/* Completed */}
                            <div className="flex items-start gap-3 p-3 rounded-[16px] bg-white/50 opacity-60">
                                <div className="w-5 h-5 mt-0.5 rounded-full bg-[#C9A84C] text-white flex items-center justify-center flex-shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="text-[13px] text-navy font-medium block leading-tight mb-1 line-through">Write Vows</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">Completed</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* EXPANDING MODAL (No internal scrolling) */}
            <AnimatePresence>
                {isFloorPlanModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-navy/40 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[32px] shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col overflow-hidden border border-[#E2D8C8]"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-[#E2D8C8] bg-[#FAF7F2]">
                                <h2 className="text-3xl font-serif text-navy font-bold">Floor Plan <span className="italic font-light text-taupe">& Seating</span></h2>
                                <button onClick={() => setIsFloorPlanModalOpen(false)} className="w-10 h-10 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center text-taupe hover:text-navy hover:border-navy transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 p-8 bg-[#FAF7F2] flex items-center justify-center relative">
                                {/* Large Static Seating Chart Graphic (No Scroll!) */}
                                <div className="w-full max-w-3xl aspect-[16/9] bg-white rounded-[24px] border border-[#E2D8C8] shadow-sm relative flex flex-col items-center justify-center p-12">
                                    <div className="absolute top-6 left-6 text-[12px] font-bold tracking-widest uppercase text-taupe">Grand Ballroom</div>
                                    
                                    {/* Main Table */}
                                    <div className="w-64 h-16 bg-[#F4F0E8] border-2 border-[#C9A84C] rounded-full flex items-center justify-center mb-12 shadow-sm">
                                        <span className="font-serif text-navy font-bold">Sweetheart Table</span>
                                    </div>
                                    
                                    {/* Guest Tables */}
                                    <div className="flex gap-16">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-2 border-[#E2D8C8] bg-white flex items-center justify-center shadow-sm">
                                                <span className="font-serif text-navy">Table 1</span>
                                            </div>
                                            {/* Seats */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                        </div>
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-2 border-[#E2D8C8] bg-white flex items-center justify-center shadow-sm">
                                                <span className="font-serif text-navy">Table 2</span>
                                            </div>
                                            {/* Seats */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                        </div>
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-2 border-[#E2D8C8] bg-white flex items-center justify-center shadow-sm">
                                                <span className="font-serif text-navy">Table 3</span>
                                            </div>
                                            {/* Seats */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E8F0F4] border border-[#C4D7E2]" />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-12">
                                        <Button variant="gold" className="rounded-full bg-navy text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest shadow-md hover:bg-[#C9A84C] transition-colors" onClick={() => { setIsFloorPlanModalOpen(false); onNavigate?.('seating'); }}>
                                            Edit Assignments
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
`;

const updatedContent = content.substring(0, startIndex) + newTimelineState + content.substring(endIndex);
fs.writeFileSync(path, updatedContent);
console.log('Replaced TimelineState');
