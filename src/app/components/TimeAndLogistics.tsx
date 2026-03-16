import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Clock, Printer, Share2, Plus, 
  MapPin, Users, Heart, Star, Scissors, Coffee,
  Shirt, Camera, Sparkles, Check, Gift, Briefcase,
  ArrowRight, X
} from 'lucide-react';
import { Button } from './ui/button';

export const TimeAndLogistics = ({ onBack, onOpenChat, onNavigate }: { onBack: () => void, onOpenChat: (intent?: string) => void, onNavigate?: (view: string) => void }) => {
    const [activeTab, setActiveTab] = useState<'rehearsal' | 'events' | 'day-of'>('day-of');
    const [emergencyTab, setEmergencyTab] = useState<'kits' | 'contacts'>('kits');
    const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);
    const [isVowAIOpen, setIsVowAIOpen] = useState(false);

    const priorityToDos = [
        { task: "Finalise Seating Chart", time: "Today", status: "overdue" },
        { task: "Confirm Vendor Meals", time: "Tomorrow", status: "pending" },
        { task: "Pack Honeymoon Bags", time: "In 3 days", status: "pending" },
        { task: "Pick up Dress", time: "In 1 week", status: "pending" },
        { task: "Pay Final Balances", time: "In 2 weeks", status: "pending" },
        { task: "Break in Shoes", time: "In 2 weeks", status: "pending" },
        { task: "Write Vows", time: "Completed", status: "completed" },
        { task: "Send Shot List to Photographer", time: "In 1 week", status: "pending" },
        { task: "Confirm DJ Playlist", time: "In 1 week", status: "pending" },
        { task: "Finalise Rehearsal Dinner", time: "In 1 week", status: "pending" },
        { task: "Order Getaway Car", time: "In 2 weeks", status: "pending" }
    ];

    const emergencyItems = [
        { item: "Sewing Kit", status: "Packed" },
        { item: "Pain Relief", status: "Packed" },
        { item: "Extra Shoes", status: "Missing" },
        { item: "Touch-up Makeup", status: "Packed" },
        { item: "Stain Remover", status: "Missing" },
        { item: "Wedding Rings", status: "Confirmed" },
        { item: "Deodorant", status: "Packed" },
        { item: "Bobby Pins", status: "Packed" },
        { item: "Safety Pins", status: "Packed" },
        { item: "Band-Aids", status: "Missing" }
    ];

    const contactList = [
        { role: "Maid of Honour", name: "Emma Chen", phone: "555-0112" },
        { role: "Best Man", name: "James Rivera", phone: "555-0138" },
        { role: "Mother of Bride", name: "Linda Chen", phone: "555-0155" },
        { role: "AI Assistant", name: "VowAi Concierge", phone: "555-0182" },
        { role: "Officiant", name: "Rev. Daniel Park", phone: "555-0219" },
        { role: "Venue Manager", name: "The Grand Estate", phone: "555-0193" },
        { role: "Photographer", name: "Sarah Jenkins", phone: "555-0201" },
        { role: "Videographer", name: "Mark Davis", phone: "555-0202" },
        { role: "Florist", name: "Petals & Co", phone: "555-0203" },
        { role: "DJ", name: "Spin Master", phone: "555-0204" },
        { role: "Caterer", name: "Chef Mario", phone: "555-0205" },
        { role: "Cake Baker", name: "Sweet Delights", phone: "555-0206" },
        { role: "Hair Stylist", name: "Glamour Pro", phone: "555-0207" },
        { role: "Makeup Artist", name: "Beauty Guru", phone: "555-0208" },
        { role: "Transportation", name: "Luxury Rides", phone: "555-0209" },
        { role: "Rentals", name: "Event Co", phone: "555-0210" },
        { role: "Lighting", name: "Bright Ideas", phone: "555-0211" },
        { role: "Photo Booth", name: "Snap Happy", phone: "555-0212" },
        { role: "Setup Crew Leader", name: "Tom Harris", phone: "555-0213" },
        { role: "Emergency Contact", name: "John Doe", phone: "555-0214" }
    ];

    return (
        <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-8 bg-[#FAF7F2] overflow-hidden relative z-0">
            {/* Header Section */}
            <div className="flex items-start justify-between flex-shrink-0">
                <div>
                  <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                    <ChevronLeft size={14} strokeWidth={2.5} /> BACK
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

            {/* Main Content Area */}
            <div className="flex gap-10 h-full overflow-hidden relative z-10">
                {/* LEFT CONTENT (Scrolling) */}
                <div className="flex-[1] min-w-0 flex flex-col gap-8 overflow-y-auto pr-4 pb-[200px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Stats Banner */}
                    <div className="flex border border-[#E2D8C8] rounded-2xl p-8">
                        <div className="flex-1 flex flex-col items-start border-r border-[#E2D8C8] pr-8">
                            <div className="text-[42px] font-serif font-bold text-[#C9A84C] leading-none mb-1">145</div>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe">DAYS TO GO</div>
                        </div>
                        <div className="flex-1 flex flex-col items-start border-r border-[#E2D8C8] px-8">
                            <div className="text-[42px] font-serif font-bold text-navy leading-none mb-1">11</div>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe">EVENTS SCHEDULED</div>
                        </div>
                        <div className="flex-1 flex flex-col items-start border-r border-[#E2D8C8] px-8">
                            <div className="text-[42px] font-serif font-bold text-[#C44343] leading-none mb-1">6</div>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe">TASKS DUE SOON</div>
                        </div>
                        <div className="flex-1 flex flex-col items-start pl-8">
                            <div className="text-[42px] font-serif font-bold text-[#2B8B5B] leading-none mb-1">68%</div>
                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe">DAY-OF PLANNING</div>
                        </div>
                    </div>

                    {/* 2-Column Layout */}
                    <div className="flex gap-10 items-start mt-2">
                        
                        {/* LEFT COLUMN: Tabs & List */}
                        <div className="flex-[1] shrink-0 flex flex-col">
                            {/* Tab Headers */}
                            <div className="flex gap-8 border-b border-[#E2D8C8] mb-8 w-full">
                                <button 
                                    onClick={() => setActiveTab('rehearsal')}
                                    className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-colors ${activeTab === 'rehearsal' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}`}
                                >
                                    REHEARSAL DINNER
                                </button>
                                <button 
                                    onClick={() => setActiveTab('events')}
                                    className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-colors ${activeTab === 'events' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}`}
                                >
                                    ALL EVENTS
                                </button>
                                <button 
                                    onClick={() => setActiveTab('day-of')}
                                    className={`pb-3 text-[11px] font-bold tracking-widest uppercase transition-colors ${activeTab === 'day-of' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}`}
                                >
                                    DAY-OF ITINERARY
                                </button>
                            </div>
                            
                            {/* Tab Content */}
                            <div className="w-full">
                                {activeTab === 'day-of' && (
                                    <div>
                                        <div className="flex justify-between items-baseline mb-10 border-b border-[#E2D8C8] pb-4">
                                            <h3 className="font-serif text-[28px] text-navy font-bold">Saturday, Oct 24 — <span className="italic text-[#C9A84C]">Run of Show</span></h3>
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">11 EVENTS · THE GRAND ESTATE</span>
                                        </div>
                                        
                                        {/* SINGLE COLUMN WITH CENTER LINE TIMELINE */}
                                        <div className="relative pt-2 pb-10">
                                            {/* Center Line */}
                                            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#E8E3DA] z-0" />
                                            
                                            {/* 9:00 AM Left */}
                                            <div className="relative flex justify-between items-start mb-6">
                                                <div className="w-[45%] bg-[#FAF7F2] rounded-[24px] p-6 border border-[#E2D8C8] relative hover:-translate-y-1 transition-transform z-10">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-2 flex items-center gap-2"><Clock size={12}/> 9:00 AM</span>
                                                    <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-4">Jessica's Bridal Suite</h4>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Scissors size={14} className="text-taupe" /> Hair & Makeup begins</div>
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Coffee size={14} className="text-taupe" /> Breakfast delivery</div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#C9A84C] ring-4 ring-[#FAF7F2] z-10" />
                                                <div className="w-[45%]" />
                                            </div>

                                            {/* 10:00 AM Right */}
                                            <div className="relative flex justify-between items-start mb-6 -mt-12">
                                                <div className="w-[45%]" />
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-navy ring-4 ring-[#FAF7F2] z-10" />
                                                <div className="w-[45%] bg-white rounded-[24px] p-6 border border-[#E2D8C8] relative hover:-translate-y-1 transition-transform z-10">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-navy mb-2 flex items-center gap-2"><Clock size={12}/> 10:00 AM</span>
                                                    <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-4">Michael's Prep</h4>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Shirt size={14} className="text-taupe" /> Groomsmen arrival</div>
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Camera size={14} className="text-taupe" /> Detail shots</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 12:00 PM Left */}
                                            <div className="relative flex justify-between items-start mb-10 -mt-6">
                                                <div className="w-[45%] bg-[#FAF7F2] rounded-[24px] p-6 border border-[#E2D8C8] relative hover:-translate-y-1 transition-transform z-10">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-2 flex items-center gap-2"><Clock size={12}/> 12:00 PM</span>
                                                    <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-4">First Look Prep</h4>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Sparkles size={14} className="text-taupe" /> Get into dress</div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#C9A84C] ring-4 ring-[#FAF7F2] z-10" />
                                                <div className="w-[45%]" />
                                            </div>

                                            {/* 1:30 PM Center (First Look) */}
                                            <div className="relative flex justify-center items-start mb-12">
                                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E9CFCB] border-4 border-[#FAF7F2] flex items-center justify-center text-white z-20"><Heart size={14} fill="currentColor"/></div>
                                                <div className="w-[85%] bg-white rounded-[24px] p-8 border border-[#E9CFCB] shadow-sm relative z-10 text-center hover:border-[#C44343] transition-colors cursor-pointer">
                                                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#C44343] mb-3 block mt-2">1:30 PM</span>
                                                    <h4 className="font-serif text-[26px] text-navy font-bold leading-tight mb-4">First Look & Portraits</h4>
                                                    <div className="flex justify-center gap-3 mb-2 flex-wrap">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest text-taupe"><MapPin size={12} className="text-[#C44343]"/> The Rose Garden</span>
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest text-taupe"><Users size={12} className="text-navy"/> Photographers</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 4:30 PM Right */}
                                            <div className="relative flex justify-between items-start mb-12">
                                                <div className="w-[45%]" />
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-navy ring-4 ring-[#FAF7F2] z-10" />
                                                <div className="w-[45%] bg-white rounded-[24px] p-6 border border-[#E2D8C8] relative hover:-translate-y-1 transition-transform z-10">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-navy mb-2 flex items-center gap-2"><Clock size={12}/> 4:30 PM</span>
                                                    <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-4">Guests Arrive</h4>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><MapPin size={14} className="text-taupe" /> Courtyard Entrance</div>
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Heart size={14} className="text-taupe" /> Welcome champagne</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 5:00 PM Center (The Ceremony) */}
                                            <div className="relative flex justify-center items-start mb-12">
                                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C9A84C] border-[6px] border-[#FAF7F2] flex items-center justify-center text-white z-20"><Star size={16} fill="currentColor"/></div>
                                                <div className="w-[90%] bg-[#C9A84C] rounded-[32px] p-10 shadow-lg relative z-10 text-center text-white">
                                                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-4">✦ MAIN EVENT ✦</span>
                                                    <h4 className="font-serif text-[38px] font-bold leading-tight mb-5">The Ceremony</h4>
                                                    <div className="flex justify-center gap-4 mb-5 flex-wrap">
                                                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]"><Clock size={12}/> 5:00 PM</span>
                                                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest text-white"><MapPin size={12}/> The Chapel</span>
                                                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest text-white"><Users size={12}/> Everyone Seated</span>
                                                    </div>
                                                    <p className="text-[15px] text-white/90 mx-auto max-w-[80%] font-medium">Please ensure all guests are seated by 4:50 PM. Officiant: Rev. Davis.</p>
                                                </div>
                                            </div>

                                            {/* 6:00 PM Left */}
                                            <div className="relative flex justify-between items-start mb-6">
                                                <div className="w-[45%] bg-[#FAF7F2] rounded-[24px] p-6 border border-[#E2D8C8] relative hover:-translate-y-1 transition-transform z-10">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] mb-2 flex items-center gap-2"><Clock size={12}/> 6:00 PM</span>
                                                    <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-4">Cocktail Hour</h4>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><MapPin size={14} className="text-taupe" /> Terrace</div>
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Coffee size={14} className="text-taupe" /> Signature drinks served</div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#C9A84C] ring-4 ring-[#FAF7F2] z-10" />
                                                <div className="w-[45%]" />
                                            </div>

                                            {/* 7:30 PM Right */}
                                            <div className="relative flex justify-between items-start mb-12 -mt-8">
                                                <div className="w-[45%]" />
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-navy ring-4 ring-[#FAF7F2] z-10" />
                                                <div className="w-[45%] bg-white rounded-[24px] p-6 border border-[#E2D8C8] relative hover:-translate-y-1 transition-transform z-10">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-navy mb-2 flex items-center gap-2"><Clock size={12}/> 7:30 PM</span>
                                                    <h4 className="font-serif text-[20px] text-navy font-bold leading-tight mb-4">Dinner Served</h4>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><MapPin size={14} className="text-taupe" /> Grand Ballroom</div>
                                                        <div className="flex items-center gap-3 text-[12px] font-medium text-navy"><Star size={14} className="text-taupe" /> 3-Course Menu</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 8:30 PM Center (Toasts & First Dance) */}
                                            <div className="relative flex justify-center items-start mb-8">
                                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-navy border-4 border-[#FAF7F2] flex items-center justify-center text-white z-20"><Users size={14} fill="currentColor"/></div>
                                                <div className="w-[85%] bg-white rounded-[24px] p-8 border border-[#E2D8C8] shadow-sm relative z-10 text-center hover:border-navy transition-colors cursor-pointer">
                                                    <span className="text-[11px] font-bold tracking-widest uppercase text-navy mb-3 block mt-2">8:30 PM</span>
                                                    <h4 className="font-serif text-[26px] text-navy font-bold leading-tight mb-4">Toasts & First Dance</h4>
                                                    <div className="flex justify-center gap-3 mb-2 flex-wrap">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest text-taupe"><MapPin size={12} className="text-navy"/> Grand Ballroom</span>
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest text-taupe"><Heart size={12} className="text-[#C44343]"/> Live Band Starts</span>
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest text-taupe"><Users size={12} className="text-taupe"/> Best Man & Maid of Honour</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'rehearsal' && (
                                    <div className="flex flex-col gap-6 pt-4">
                                        <div className="flex justify-between items-baseline border-b border-[#E2D8C8] pb-4">
                                            <h3 className="font-serif text-[28px] text-navy font-bold">Rehearsal <span className="italic text-[#C9A84C]">Dinner</span></h3>
                                            <span className="text-[12px] font-bold text-navy bg-navy/10 px-3 py-1 rounded-full">Confirmed</span>
                                        </div>
                                        <div className="grid grid-cols-2 border border-[#E2D8C8] bg-white rounded-[24px] overflow-hidden mb-6 shadow-sm">
                                            <div className="p-5 border-b border-r border-[#E2D8C8]">
                                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2"><Clock size={12}/> DATE & TIME</div>
                                                <div className="text-[15px] font-medium text-navy">Friday, Oct 23 · 6:00 PM</div>
                                            </div>
                                            <div className="p-5 border-b border-[#E2D8C8]">
                                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2"><MapPin size={12}/> VENUE</div>
                                                <div className="text-[15px] font-medium text-navy">The Bistro Downtown</div>
                                            </div>
                                            <div className="p-5 border-b border-r border-[#E2D8C8]">
                                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2"><Users size={12}/> GUESTS</div>
                                                <div className="text-[15px] font-medium text-navy">35 confirmed</div>
                                            </div>
                                            <div className="p-5 border-b border-[#E2D8C8]">
                                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2"><Star size={12}/> MENU</div>
                                                <div className="text-[15px] font-medium text-navy">3-course · Finalised</div>
                                            </div>
                                            <div className="p-5 border-r border-[#E2D8C8]">
                                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2"><Shirt size={12}/> DRESS CODE</div>
                                                <div className="text-[15px] font-medium text-navy">Smart Casual</div>
                                            </div>
                                            <div className="p-5">
                                                <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2"><Clock size={12}/> DURATION</div>
                                                <div className="text-[15px] font-medium text-navy">6:00 PM – 10:00 PM</div>
                                            </div>
                                        </div>

                                        <h4 className="font-serif text-[22px] text-navy font-bold mb-2">Speeches & Order of Events</h4>
                                        <div className="space-y-3">
                                            <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] bg-white rounded-[20px] shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-[12px] font-bold shrink-0">1</div>
                                                <div>
                                                    <div className="text-[15px] font-bold text-navy">Welcome Toast</div>
                                                    <div className="text-[13px] text-taupe">Father of Bride · 3 mins</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] bg-white rounded-[20px] shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-[12px] font-bold shrink-0">2</div>
                                                <div>
                                                    <div className="text-[15px] font-bold text-navy">Best Man Speech</div>
                                                    <div className="text-[13px] text-taupe">James Rivera · 5 mins</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] bg-white rounded-[20px] shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-[12px] font-bold shrink-0">3</div>
                                                <div>
                                                    <div className="text-[15px] font-bold text-navy">Mother of Groom</div>
                                                    <div className="text-[13px] text-taupe">Maria Torres · 4 mins</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-center p-4 border-2 border-[#E2D8C8] border-dashed rounded-[20px] bg-transparent text-taupe cursor-pointer hover:border-[#C9A84C] transition-colors group">
                                                <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#C9A84C] flex items-center justify-center text-[#C9A84C] text-[12px] shrink-0 group-hover:bg-[#C9A84C] group-hover:text-white transition-colors"><Plus size={14}/></div>
                                                <div className="italic text-[14px] font-serif group-hover:text-navy transition-colors">Add another speech...</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'events' && (
                                    <div className="flex flex-col gap-4 pt-4">
                                        <div className="flex justify-between items-baseline mb-4 border-b border-[#E2D8C8] pb-4">
                                            <h3 className="font-serif text-[28px] text-navy font-bold">All <span className="italic text-[#C9A84C]">Events</span></h3>
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">6 EVENTS PLANNED</span>
                                        </div>
                                        
                                        <div className="border border-[#E2D8C8] bg-white rounded-[24px] flex flex-col overflow-hidden shadow-sm">
                                            <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-xl bg-white border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                        <span className="text-[20px] font-serif font-bold text-navy leading-none">12</span>
                                                        <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">SEP</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[18px] font-serif font-bold text-navy mb-1">Bachelor/Bachelorette Party</h4>
                                                        <div className="text-[13px] text-taupe flex items-center gap-2"><Clock size={12}/> Saturday · Weekend Getaway · 15 guests</div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-[#E8F0F4] text-[#5A7E9D] text-[10px] font-bold rounded-full uppercase tracking-widest">Planning</span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-xl bg-white border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                        <span className="text-[20px] font-serif font-bold text-navy leading-none">15</span>
                                                        <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[18px] font-serif font-bold text-navy mb-1">Marriage License Registration</h4>
                                                        <div className="text-[13px] text-taupe flex items-center gap-2"><Clock size={12}/> Thursday · 10:00 AM · City Hall · 2 guests</div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-[#FDF2E9] text-[#A68735] text-[10px] font-bold rounded-full uppercase tracking-widest">Coming Up</span>
                                            </div>

                                            <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-xl bg-white border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                        <span className="text-[20px] font-serif font-bold text-navy leading-none">22</span>
                                                        <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[18px] font-serif font-bold text-navy mb-1">Welcome Drinks</h4>
                                                        <div className="text-[13px] text-taupe flex items-center gap-2"><Clock size={12}/> Thursday · 8:00 PM · Hotel Lobby Bar · 28 guests</div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-[#FDF2E9] text-[#A68735] text-[10px] font-bold rounded-full uppercase tracking-widest">Coming Up</span>
                                            </div>

                                            <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-xl bg-white border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                        <span className="text-[20px] font-serif font-bold text-navy leading-none">23</span>
                                                        <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[18px] font-serif font-bold text-navy mb-1">Rehearsal Dinner</h4>
                                                        <div className="text-[13px] text-taupe flex items-center gap-2"><Clock size={12}/> Friday · 6:00 PM · The Bistro Downtown · 35 guests</div>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] font-bold text-navy uppercase tracking-widest bg-navy/5 px-3 py-1 rounded-full">Confirmed</span>
                                            </div>

                                            <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50 bg-[#FAF8F5] hover:bg-[#F4F0E8] transition-colors cursor-pointer border-l-4 border-l-[#C9A84C]">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-xl bg-[#C9A84C] text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                                                        <span className="text-[20px] font-serif font-bold leading-none">24</span>
                                                        <span className="text-[9px] font-bold tracking-widest uppercase mt-1 opacity-90">OCT</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[18px] font-serif font-bold text-navy mb-1 flex items-center gap-2">The Wedding ✦</h4>
                                                        <div className="text-[13px] text-taupe flex items-center gap-2"><Clock size={12}/> Saturday · 5:00 PM · The Grand Estate · 150 guests</div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-[#C9A84C] text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">Main Event</span>
                                            </div>

                                            <div className="flex items-center justify-between p-6 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-xl bg-white border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                        <span className="text-[20px] font-serif font-bold text-navy leading-none">25</span>
                                                        <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[18px] font-serif font-bold text-navy mb-1">Farewell Brunch</h4>
                                                        <div className="text-[13px] text-taupe flex items-center gap-2"><Clock size={12}/> Sunday · 10:00 AM · Garden Terrace · ~40 guests</div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-[#E8F0F4] text-[#5A7E9D] text-[10px] font-bold rounded-full uppercase tracking-widest">Planning</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* MIDDLE COLUMN: Floor Plan & Checklist */}
                        <div className="w-[340px] shrink-0 flex flex-col gap-8 h-full pb-10">
                            
                            {/* FLOOR PLAN BOX - IN SYNC WITH MODAL */}
                            <div className="bg-white rounded-[32px] border border-[#E2D8C8] p-6 flex flex-col shadow-sm cursor-pointer group hover:border-[#C9A84C] hover:shadow-md transition-all shrink-0" onClick={() => setIsFloorPlanModalOpen(true)}>
                                <div className="flex justify-between items-baseline mb-4">
                                    <h3 className="font-serif text-[20px] text-navy font-bold">Floor Plan</h3>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] group-hover:underline">EXPAND →</span>
                                </div>
                                <div className="bg-[#FAF7F2] rounded-[24px] border border-[#E2D8C8] p-4 flex flex-col items-center justify-center relative overflow-hidden h-[180px]">
                                    {/* Abstract Floor Plan Graphic matching 1 Sweetheart + 3 Round Tables */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-4 rounded-full border-[2.5px] border-navy" />
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full border-[2.5px] border-navy" />
                                            <div className="w-10 h-10 rounded-full border-[2.5px] border-navy" />
                                            <div className="w-10 h-10 rounded-full border-[2.5px] border-navy" />
                                        </div>
                                    </div>
                                    <div className="relative z-10 text-center bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
                                        <div className="text-[36px] font-serif font-bold text-navy leading-none mb-1">145<span className="text-[16px] text-taupe font-sans font-normal">/150</span></div>
                                        <div className="text-[10px] font-bold tracking-widest uppercase text-taupe">SEATS ASSIGNED</div>
                                    </div>
                                </div>
                            </div>

                            {/* Master Checklist - h-fit (No extra stretch, no internal scroll) */}
                            <div className="bg-white rounded-[32px] border border-[#E2D8C8] p-6 flex flex-col shadow-sm h-fit">
                                <div className="flex justify-between items-baseline mb-4 border-b border-[#E2D8C8] pb-4 shrink-0">
                                    <h3 className="font-serif text-[20px] text-navy font-bold">Priority To-Dos</h3>
                                    <span className="text-[10px] font-bold text-[#C44343] uppercase tracking-widest bg-[#FDF2F2] px-3 py-1 rounded-full">2 OVERDUE</span>
                                </div>
                                <div className="space-y-3">
                                    {priorityToDos.map((todo, idx) => (
                                        <div key={idx} className={`flex items-start gap-4 p-4 rounded-[20px] border transition-colors cursor-pointer group ${
                                            todo.status === 'overdue' ? 'bg-[#FDF2F2] border-[#F5C2C2] hover:border-[#C44343]' :
                                            todo.status === 'completed' ? 'bg-white/50 border-transparent opacity-60' :
                                            'bg-white border-[#E2D8C8] hover:border-[#C9A84C]'
                                        }`}>
                                            <div className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                todo.status === 'overdue' ? 'border-2 border-[#C44343] bg-white group-hover:bg-[#C44343]/10' :
                                                todo.status === 'completed' ? 'bg-[#C9A84C] text-white' :
                                                'border-2 border-[#E2D8C8] bg-white group-hover:border-[#C9A84C]'
                                            }`}>
                                                {todo.status === 'completed' && <Check size={14} strokeWidth={3} />}
                                            </div>
                                            <div>
                                                <span className={`text-[14px] text-navy font-medium block leading-tight mb-1 ${todo.status === 'completed' ? 'line-through' : ''}`}>
                                                    {todo.task}
                                                </span>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                                    todo.status === 'overdue' ? 'text-[#C44343]' :
                                                    todo.status === 'completed' ? 'text-taupe' :
                                                    idx === 1 ? 'text-[#C9A84C]' : 'text-taupe'
                                                }`}>
                                                    {todo.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR (Registry & Emergency) */}
                <div className="w-[300px] shrink-0 flex flex-col gap-6 border-l border-[#E2D8C8] pl-8 relative z-10 h-full pb-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex flex-col gap-6">
                        {/* Gift Registry */}
                        <div>
                            <h3 className="font-serif text-[18px] text-navy font-bold mb-4 flex items-center gap-2 tracking-wide uppercase"><Gift size={16} className="text-[#C44343]" /> Gift Registry</h3>
                            <div className="bg-white border border-[#E2D8C8] rounded-2xl overflow-hidden shrink-0">
                                <div className="flex p-4">
                                    <div className="flex-1 text-center border-r border-[#E2D8C8]">
                                        <div className="text-[22px] font-serif font-bold text-[#2B8B5B] leading-none">42</div>
                                        <div className="text-[8px] font-bold uppercase tracking-widest text-taupe mt-1">PURCHASED</div>
                                    </div>
                                    <div className="flex-1 text-center border-r border-[#E2D8C8]">
                                        <div className="text-[22px] font-serif font-bold text-navy leading-none">18</div>
                                        <div className="text-[8px] font-bold uppercase tracking-widest text-taupe mt-1">REMAINING</div>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="text-[22px] font-serif font-bold text-[#C9A84C] leading-none">$4.2k</div>
                                        <div className="text-[8px] font-bold uppercase tracking-widest text-taupe mt-1">RECEIVED</div>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-[#E2D8C8] bg-[#FAF7F2]">
                                    <button onClick={() => onNavigate?.('gifts')} className="w-full text-center text-[10px] font-bold tracking-widest uppercase text-taupe hover:text-navy transition-colors">
                                        OPEN REGISTRY →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Kit - h-fit (expanding vertically) */}
                        <div className="flex flex-col">
                            <h3 className="font-serif text-[18px] text-navy font-bold mb-4 flex items-center gap-2 tracking-wide uppercase shrink-0"><Briefcase size={16} className="text-[#8B5A2B]" /> Day-Of Essentials</h3>
                            <div className="bg-white border border-[#E2D8C8] rounded-2xl shadow-sm flex flex-col h-fit">
                                <div className="flex items-center px-4 pt-4 shrink-0">
                                    <div className="flex gap-4 border-b border-[#E2D8C8] w-full">
                                        <button 
                                            onClick={() => setEmergencyTab('kits')}
                                            className={`pb-2 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-colors ${emergencyTab === 'kits' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}`}
                                        >
                                            EMERGENCY KIT
                                        </button>
                                        <button 
                                            onClick={() => setEmergencyTab('contacts')}
                                            className={`pb-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${emergencyTab === 'contacts' ? 'text-navy border-b-[2px] border-navy' : 'text-taupe hover:text-navy'}`}
                                        >
                                            CONTACTS
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="px-4 pb-4 pt-2">
                                    {emergencyTab === 'kits' ? (
                                        <div className="space-y-0">
                                            {emergencyItems.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3 group hover:bg-[#FAF7F2] -mx-4 px-4 transition-colors">
                                                    <span className="text-[13px] font-serif text-navy">{item.item}</span>
                                                    <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest ${
                                                        item.status === 'Packed' ? 'bg-[#E8F3EE] text-[#2B8B5B]' :
                                                        item.status === 'Confirmed' ? 'bg-[#FDF2E9] text-[#A68735]' :
                                                        'bg-[#FAEEEE] text-[#C44343]'
                                                    }`}>
                                                        {item.status === 'Confirmed' ? '✓ Confirmed' : item.status}
                                                    </span>
                                                </div>
                                            ))}
                                            <button className="w-full mt-4 text-center text-taupe font-bold text-[10px] uppercase tracking-widest py-3 border border-[#E2D8C8] rounded-xl hover:border-[#C9A84C] hover:text-navy transition-colors bg-[#FAF7F2]">
                                                + ADD ITEM
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-0">
                                            {contactList.map((contact, idx) => (
                                                <div key={idx} className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3 group hover:bg-[#FAF7F2] -mx-4 px-4 transition-colors">
                                                    <div>
                                                        <div className="text-[13px] font-serif text-navy mb-0.5">{contact.role}</div>
                                                        <div className="text-[11px] text-taupe">{contact.name}</div>
                                                    </div>
                                                    <span className="text-[11px] font-bold text-[#A68735] font-mono">{contact.phone}</span>
                                                </div>
                                            ))}
                                            <button className="w-full mt-4 text-center text-taupe font-bold text-[10px] uppercase tracking-widest py-3 border border-[#E2D8C8] rounded-xl hover:border-[#C9A84C] hover:text-navy transition-colors bg-[#FAF7F2]">
                                                + ADD CONTACT
                                            </button>
                                        </div>
                                    )}
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
                            className="bg-[#FAF7F2] rounded-[32px] shadow-2xl w-full max-w-5xl h-full max-h-[85vh] flex flex-col overflow-hidden border border-[#E2D8C8]"
                        >
                            <div className="flex justify-between items-center px-10 py-8 border-b border-[#E2D8C8] bg-white shrink-0">
                                <div>
                                    <h2 className="text-4xl font-serif text-navy font-bold mb-1">Floor Plan <span className="italic font-light text-taupe">& Seating</span></h2>
                                    <p className="text-sm text-taupe font-medium">Grand Ballroom • 145/150 Seats Assigned</p>
                                </div>
                                <button onClick={() => setIsFloorPlanModalOpen(false)} className="w-12 h-12 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center text-taupe hover:text-navy hover:border-navy hover:bg-[#F4F0E8] transition-colors shadow-sm">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <div className="flex-1 p-10 flex items-center justify-center relative overflow-hidden">
                                {/* Large Static Seating Chart Graphic (No Scroll!) */}
                                <div className="w-full h-full max-w-4xl bg-white rounded-[32px] border border-[#E2D8C8] shadow-sm relative flex flex-col items-center justify-center p-12">
                                    <div className="absolute top-8 left-8 text-[14px] font-bold tracking-widest uppercase text-taupe flex items-center gap-2">
                                        <MapPin size={16} className="text-[#C9A84C]" /> The Grand Ballroom
                                    </div>
                                    
                                    {/* Main Table */}
                                    <div className="w-80 h-20 bg-[#FAF7F2] border-2 border-[#C9A84C] rounded-full flex items-center justify-center mb-16 shadow-md relative">
                                        <span className="font-serif text-[20px] text-navy font-bold">Sweetheart Table</span>
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E9CFCB] border-2 border-white flex items-center justify-center"><Heart size={12} className="text-white" fill="currentColor"/></div>
                                        {/* Couple Seats */}
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-6 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                        <div className="absolute -bottom-4 left-1/2 translate-x-2 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                    </div>
                                    
                                    {/* Guest Tables */}
                                    <div className="flex gap-20">
                                        {[1, 2, 3].map((tableNum) => (
                                            <div key={tableNum} className="relative group cursor-pointer">
                                                <div className="w-40 h-40 rounded-full border-2 border-[#E2D8C8] bg-white flex flex-col items-center justify-center shadow-sm group-hover:border-[#C9A84C] group-hover:shadow-md transition-all">
                                                    <span className="font-serif text-[24px] text-navy font-bold">T{tableNum}</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-taupe mt-1">8/8 SEATS</span>
                                                </div>
                                                {/* Seats */}
                                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                
                                                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#F0F4F8] border-2 border-white shadow-sm" />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="absolute bottom-10 right-10">
                                        <Button variant="gold" className="rounded-full bg-navy text-white px-8 py-4 text-[12px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#C9A84C] hover:-translate-y-1 transition-all flex items-center gap-2" onClick={() => { setIsFloorPlanModalOpen(false); onNavigate?.('seating'); }}>
                                            <Users size={16} /> Manage Guests
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            
            {/* VowAI Assistant (Pinned to footer) */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {isVowAIOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="w-[320px] rounded-[32px] p-6 shadow-2xl flex flex-col border border-[#E2D8C8] bg-white origin-bottom-right"
                            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FAF7F2 100%)' }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-[36px] h-[36px] rounded-xl bg-white flex items-center justify-center border border-[#E2D8C8] shadow-sm">
                                    <Sparkles size={16} className="text-[#C9A84C]" />
                                </div>
                                <span className="px-3 py-1 rounded-[4px] border border-[#E2D8C8] text-[#C9A84C] text-[8px] font-bold uppercase tracking-widest bg-white/50 shadow-sm">
                                    VOWAI
                                </span>
                            </div>
                            
                            <h3 className="text-[24px] font-serif italic text-navy font-bold leading-tight mb-2">Need a guide?</h3>
                            <p className="text-[11px] text-taupe leading-relaxed mb-4">
                                I'm your AI assistant. Let me help you navigate your planning dashboard and find exactly what you need.
                            </p>

                            <div className="flex flex-col gap-2 relative z-10">
                                <button onClick={() => { setIsVowAIOpen(false); onNavigate?.('seating'); }} className="w-full bg-white border border-[#E2D8C8] rounded-xl py-3 px-4 text-left hover:border-[#C9A84C]/50 hover:shadow-sm transition-all flex items-center justify-between group">
                                    <span className="text-[10px] font-bold text-navy uppercase tracking-widest">GO TO SEATING CHART</span>
                                    <ArrowRight size={14} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </button>
                                <button onClick={() => { setIsVowAIOpen(false); onNavigate?.('registry'); }} className="w-full bg-white border border-[#E2D8C8] rounded-xl py-3 px-4 text-left hover:border-[#C9A84C]/50 hover:shadow-sm transition-all flex items-center justify-between group">
                                    <span className="text-[10px] font-bold text-navy uppercase tracking-widest">VIEW REGISTRY</span>
                                    <ArrowRight size={14} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVowAIOpen(!isVowAIOpen)}
                    className="w-16 h-16 rounded-full bg-navy text-white shadow-xl flex items-center justify-center border-[3px] border-white relative z-50 hover:bg-[#1a2b4a] transition-colors"
                >
                    {isVowAIOpen ? <X size={24} className="text-white" /> : <Sparkles size={24} className="text-[#C9A84C]" />}
                </motion.button>
            </div>
        </div>
    );
};
