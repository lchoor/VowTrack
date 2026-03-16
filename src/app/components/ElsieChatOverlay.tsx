import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Sun, CloudRain, CloudSun, Thermometer, List, Clock, Edit2, Palette, X, Minus } from 'lucide-react';

export interface VowAiMessage {
    sender: 'ai' | 'user';
    text: string;
    prompts?: string[];
    promptTitle?: string;
    widget?: 'vow_draft' | 'timeline' | 'venue_card' | 'checklist' | 'weather' | 'vendor_proposal' | 'timeline_adjustment' | 'design_swatches';
    widgetData?: any;
}

const getVowAiContext = (view?: string, intent?: string) => {
    switch(view) {
        case 'timeline': return { title: 'Timeline Planning', greeting: "I am so thrilled to help you perfect your timeline! Every beautiful moment deserves its own space. How are we feeling about the 5:00 PM ceremony time? 💕", prompts: ["Yes, 5 PM is perfect", "Let's push it back", "Vendor Arrivals"], promptTitle: "Timeline Focus:" };
        case 'budget': return { title: 'Budget Review', greeting: "Great news! I've been reviewing your vendor quotes and we're actually slightly under budget on florals! 🎉 We could save this, or perhaps add that stunning string quartet you loved?", prompts: ["Save the extra", "Upgrade music", "Review breakdown"], promptTitle: "Budget Actions:" };
        case 'vendors': return { title: 'Vendor Management', greeting: "Your vendor dream team is coming together so beautifully! I have the loveliest proposal from the florist ready for your review. Shall we take a look together?", prompts: ["View Proposal", "Next Steps", "Contact Vendor"], promptTitle: "Vendor Actions:" };
        case 'guests': return { title: 'Guest Management', greeting: "We have 145 wonderful guests confirmed! I noticed a few haven't selected their meals just yet. Would you like me to draft a sweet, gentle reminder for them?", prompts: ["Draft Follow-up", "Seating Chart", "Dietary Needs"], promptTitle: "Guest Tasks:" };
        default: return { title: 'Wedding Planning', greeting: "Hello there! I'm VowAi Concierge, your dedicated AI assistant. I am so honored to help bring your dream wedding to life! What exciting details shall we focus on today? We can refine the timeline, review vendor proposals, or dream up some beautiful design details. ✨", prompts: ["Review Timeline", "Vendor Proposals", "Design Decisions"], promptTitle: "What's on your mind?" };
    }
};

export const VowAiChatOverlay = ({ isOpen, onClose, intent, currentView }: { isOpen: boolean, onClose: () => void, intent?: string, currentView?: string }) => {
    const [messages, setMessages] = useState<VowAiMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const contextConfig = getVowAiContext(currentView, intent);
    
    const lastIntentRef = useRef(intent);
    const lastViewRef = useRef(currentView);

    const handleEndChat = () => {
        setMessages([]);
        lastIntentRef.current = undefined;
        lastViewRef.current = undefined;
        setInputValue("");
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            let initialMsg = contextConfig.greeting;
            if (intent === 'venue_finder') initialMsg = "I would be absolutely thrilled to help you find the venue of your dreams! To get us started on this exciting journey, what kind of vibe and guest count are you envisioning?";
            if (intent === 'vows') initialMsg = "Writing vows is one of the most magical parts of the entire day! I would be so honored to help draft them so they sound uniquely and beautifully like you. Who are we writing these sweet words for today? ✨";
            
            setMessages(prev => {
                if (prev.length === 0) {
                    return [{ sender: 'ai', text: initialMsg, prompts: contextConfig.prompts, promptTitle: contextConfig.promptTitle }];
                }
                
                if (intent !== lastIntentRef.current || currentView !== lastViewRef.current) {
                    lastIntentRef.current = intent;
                    lastViewRef.current = currentView;
                    if (prev[prev.length - 1].text === initialMsg) return prev;
                    return [...prev, { sender: 'ai', text: `*Switched to ${contextConfig.title}* \n\n${initialMsg}`, prompts: contextConfig.prompts, promptTitle: contextConfig.promptTitle }];
                }
                return prev;
            });
        }
    }, [isOpen, intent, currentView]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = (overrideText?: string) => {
        const textToSend = typeof overrideText === 'string' ? overrideText : inputValue;
        if (!textToSend.trim()) return;
        
        const updatedMessages = messages.map((m, idx) => 
            idx === messages.length - 1 && m.sender === 'ai' ? { ...m, prompts: undefined, promptTitle: undefined } : m
        );

        setMessages([...updatedMessages, { sender: 'user', text: textToSend }]);
        if (typeof overrideText !== 'string') setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            
            let aiResponse = "I absolutely love that idea! Let's dive right in. Tell me everything you're envisioning, and we'll make it happen together! What's our first step? 🌟";
            let nextPrompts: string[] | undefined = ["Vendor Proposals", "Timeline Planning", "Design Details"];
            let nextPromptTitle: string | undefined = "Some things we can tackle together:";
            let widgetType: VowAiMessage['widget'] = undefined;
            let widgetData: any = undefined;
            
            const lowerText = textToSend.toLowerCase();
            const matches = (...keywords: string[]) => keywords.some(k => lowerText.includes(k));

            if (matches("seating chart", "seating")) {
                aiResponse = "Let's tackle that seating chart! 🗺️ It can feel like a huge puzzle, but we've totally got this. Do you want to start by grouping your family, or should we map out the wedding party first? I'm ready when you are! 🎉";
                nextPromptTitle = "Let's build this table by table:";
                nextPrompts = ["Family Tables", "Wedding Party", "Friends Groupings"];
            } else if (matches("dietary needs", "allergies", "dietary")) {
                aiResponse = "I'm completely on top of this! Making sure everyone is well-cared for is a top priority. I'll flag all the dietary notes and send a perfectly organized list straight to the caterer so you don't have to lift a finger. How does that sound? 🤝";
                nextPromptTitle = "Dietary coordination:";
                nextPrompts = ["Send to Caterer", "Review List First", "Add Custom Note"];
            } else if (matches("draft follow-up", "follow up", "remind", "reminder")) {
                aiResponse = "Consider it handled! 📱 I'll draft a warm and polite message to nudge those last few guests for their meal choices without making it awkward at all. Want to see the draft before I cue it up?";
                nextPromptTitle = "Review text draft:";
                nextPrompts = ["Yes, show me", "Just send it", "Change tone"];
            } else if (matches("save the extra", "budget", "save")) {
                aiResponse = "Such a smart move! 💡 Saving that extra budget gives us a fantastic cushion, or we can use it for something epic later—like an amazing late-night snack! I'll update the tracker right now. You're crushing this planning! 🥂";
                nextPromptTitle = "Budget updated! Next steps:";
                nextPrompts = ["View Budget", "Late Night Snacks", "Review Florals"];
            } else if (matches("upgrade music", "band", "strings", "music")) {
                aiResponse = "This is going to be incredible! 🎻 Live strings during the cocktail hour will create such an unforgettable atmosphere. I'm reaching out to the quartet right now to confirm their availability. I can already picture it! 🎶";
                nextPromptTitle = "Music coordination:";
                nextPrompts = ["Contact Quartet", "Review Playlist", "DJ for Reception"];
            } else if (matches("vendor", "proposal", "florist", "quote")) {
                aiResponse = "I have great news! I just received the revised quote from 'Petals & Poetry'. It looks fantastic, and they even managed to include those specific floral details you really wanted! This is coming together perfectly. 🌿";
                widgetType = 'vendor_proposal';
                widgetData = { 
                    vendor: "Petals & Poetry", 
                    service: "Florals & Decor", 
                    amount: "$4,250", 
                    dueDate: "Deposit due in 3 days",
                    imageUrl: "figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.png" // using existing random asset format, wait, let's use an unsplash URL
                };
                nextPromptTitle = "How should we proceed?";
                nextPrompts = ["Approve & Pay Deposit", "Request Changes", "View Full Quote"];
            } else if (matches("adjust time", "push it back", "timeline", "late", "vendor arrivals", "arrivals")) {
                aiResponse = "I completely agree. We shouldn't rush those important moments—you deserve to actually enjoy them! I'll handle the logistics for you. I suggest a seamless adjustment to the itinerary so everything flows perfectly. Here's the update:";
                widgetType = 'timeline_adjustment';
                widgetData = {
                    event: "First Dance & Toasts",
                    oldTime: "8:00 PM",
                    newTime: "8:15 PM",
                    impact: "Pushes Cake Cutting back by 10 mins"
                };
                nextPromptTitle = "Update the itinerary?";
                nextPrompts = ["Yes, update timeline", "No, keep original times", "Ask Photographer"];
            } else if (matches("design", "colors", "swatches", "linens", "blush", "champagne")) {
                aiResponse = "I am so excited about these design mockups! Those textured velvet linens add such incredible depth to the room. We just need to lock in the napkin color today. Which of these options are you leaning toward? ✨";
                widgetType = 'design_swatches';
                widgetData = {
                    optionA: { name: "Blush Velvet", hex: "#E9CFCB" },
                    optionB: { name: "Champagne Silk", hex: "#DEC29B" }
                };
                nextPromptTitle = "Lock in a decision:";
                nextPrompts = ["Go with Blush", "Go with Champagne", "Show me other options"];
            } else if (matches("vows", "draft vows", "speech", "write")) {
                aiResponse = "Writing your vows is such a meaningful step! I took the notes you shared about your first date in Napa and drafted a heartfelt starting point. Please feel free to shape it so it feels perfectly 'you'. You've got this! 💫";
                widgetType = 'vow_draft';
                widgetData = { 
                    text: "From the moment we shared that first glass of wine in Napa, I knew my life was about to change beautifully. Your spirit lights up my world. I promise to cherish our memories, to always support your dreams, and to choose you every single day." 
                };
                nextPromptTitle = "How does this feel?";
                nextPrompts = ["Make it sweeter", "Add some humor", "Perfect, save it!"];
            } else if (matches("approve", "yes", "go with")) {
                aiResponse = "Consider it done! 🎉 I've updated your planning dashboard. You are making such fantastic progress, and everything is coming together flawlessly. What exciting detail shall we tackle next?";
                nextPromptTitle = "Keep planning:";
                nextPrompts = ["Review Timeline", "Vendor Management", "Guest List"];
            }

            setMessages(prev => [...prev, { 
                sender: 'ai', 
                text: aiResponse,
                prompts: nextPrompts,
                promptTitle: nextPromptTitle,
                widget: widgetType,
                widgetData: widgetData
            }]);
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] pointer-events-none" style={{ perspective: 1000 }}>
                    <motion.div 
                        drag
                        dragMomentum={false}
                        dragElastic={0.1}
                        dragConstraints={{ top: -600, left: -1200, right: 100, bottom: 100 }}
                        initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 5 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, rotateX: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-24 right-12 w-[400px] h-[650px] bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E2D8C8] flex flex-col overflow-hidden pointer-events-auto"
                        style={{ cursor: 'auto' }}
                    >
                        {/* Header */}
                        <div className="h-[90px] bg-[#FAF7F2] border-b border-[#E2D8C8] text-navy flex flex-col px-6 flex-shrink-0 relative cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 bg-[#E2D8C8] rounded-full mx-auto mt-3 mb-2" />
                            <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
                                <button onClick={onClose} className="p-1.5 text-taupe hover:text-navy hover:bg-[#E2D8C8]/50 rounded-full transition-colors" title="Minimize Chat">
                                    <Minus size={16} />
                                </button>
                                <button onClick={handleEndChat} className="p-1.5 text-taupe hover:text-navy hover:bg-[#E2D8C8]/50 rounded-full transition-colors" title="End Chat">
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-[#C9A84C] text-white flex items-center justify-center font-serif text-lg">
                                        VA
                                    </div>
                                <div className="flex flex-col">
                                    <h3 className="font-serif font-bold text-[18px] leading-none">VowAi Concierge</h3>
                                    <span className="text-[10px] text-taupe tracking-widest uppercase font-bold flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2B8B5B]" /> Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}>
                                    <div className={`p-4 rounded-2xl shadow-sm text-[13px] leading-relaxed ${
                                        msg.sender === 'user' 
                                            ? 'bg-navy text-white rounded-br-sm' 
                                            : 'bg-[#FAF7F2] text-navy border border-[#E2D8C8] rounded-bl-sm'
                                    }`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                        
                                        {/* WIDGETS */}
                                        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                                            
                                            {/* Vendor Proposal Widget */}
                                            {msg.widget === 'vendor_proposal' && msg.widgetData && (
                                                <div className="bg-white rounded-xl shadow-sm border border-[#E2D8C8] overflow-hidden text-left">
                                                    <div className="h-24 bg-[#E9CFCB] relative flex items-center justify-center overflow-hidden">
                                                        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Floral" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                        <span className="relative z-10 text-white font-serif text-lg font-bold">Proposal</span>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">{msg.widgetData.service}</div>
                                                        <div className="font-serif text-[18px] font-bold text-navy">{msg.widgetData.vendor}</div>
                                                        <div className="flex items-center justify-between mt-3 border-t border-[#E2D8C8] pt-3">
                                                            <span className="text-[16px] font-light text-navy">{msg.widgetData.amount}</span>
                                                            <span className="text-[10px] text-taupe">{msg.widgetData.dueDate}</span>
                                                        </div>
                                                        <div className="flex gap-2 mt-4">
                                                            <button className="flex-1 bg-[#C9A84C] text-white py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#b5953e] transition-colors" onClick={() => handleSend("Approve & Pay Deposit")}>Approve</button>
                                                            <button className="flex-1 bg-white border border-[#E2D8C8] text-navy py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FAF7F2] transition-colors" onClick={() => handleSend("Request Changes")}>Decline</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Timeline Adjustment Widget */}
                                            {msg.widget === 'timeline_adjustment' && msg.widgetData && (
                                                <div className="bg-white rounded-xl shadow-sm border border-[#C4D7E2] p-4 text-left relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                                                        <Clock size={64} />
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-6 h-6 rounded-full bg-[#E8F0F4] flex items-center justify-center text-[#5A7E9D]">
                                                            <Clock size={12} />
                                                        </div>
                                                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#5A7E9D]">Schedule Update</span>
                                                    </div>
                                                    <div className="font-serif text-[16px] font-bold text-navy mb-3">{msg.widgetData.event}</div>
                                                    <div className="flex items-center gap-3 mb-3 text-[14px]">
                                                        <span className="text-taupe line-through">{msg.widgetData.oldTime}</span>
                                                        <span className="text-[#C9A84C]">→</span>
                                                        <span className="text-navy font-bold">{msg.widgetData.newTime}</span>
                                                    </div>
                                                    <div className="text-[11px] text-taupe italic border-t border-[#E2D8C8] pt-2 mb-4">
                                                        Note: {msg.widgetData.impact}
                                                    </div>
                                                    <button className="w-full bg-navy text-white py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-navy/90 transition-colors" onClick={() => handleSend("Yes, update timeline")}>
                                                        Confirm Change
                                                    </button>
                                                </div>
                                            )}

                                            {/* Design Decision Swatches */}
                                            {msg.widget === 'design_swatches' && msg.widgetData && (
                                                <div className="bg-white rounded-xl shadow-sm border border-[#E2D8C8] p-4 text-left">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Palette size={14} className="text-[#C9A84C]" />
                                                        <span className="text-[11px] font-bold uppercase tracking-widest text-navy">Design Decision</span>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div 
                                                            className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                                                            onClick={() => handleSend("Go with Blush")}
                                                        >
                                                            <div className="w-full aspect-square rounded-lg shadow-sm border-2 border-transparent group-hover:border-[#C9A84C] transition-all" style={{ backgroundColor: msg.widgetData.optionA.hex }} />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-taupe text-center">{msg.widgetData.optionA.name}</span>
                                                        </div>
                                                        <div 
                                                            className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                                                            onClick={() => handleSend("Go with Champagne")}
                                                        >
                                                            <div className="w-full aspect-square rounded-lg shadow-sm border-2 border-transparent group-hover:border-[#C9A84C] transition-all" style={{ backgroundColor: msg.widgetData.optionB.hex }} />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-taupe text-center">{msg.widgetData.optionB.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Vow Drafter (Elegant Parchment) */}
                                            {msg.widget === 'vow_draft' && msg.widgetData && (
                                                <div className="bg-[#FCFBF8] rounded-xl shadow-inner border border-[#E2D8C8] p-5 text-left relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E2D8C8]/30 to-transparent rounded-bl-3xl" />
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Vow Draft</span>
                                                        <Edit2 size={12} className="text-taupe" />
                                                    </div>
                                                    <p className="font-serif text-[15px] italic text-navy leading-relaxed relative z-10">
                                                        "{msg.widgetData.text}"
                                                    </p>
                                                    <div className="mt-4 flex gap-2">
                                                        <button className="flex-1 bg-white border border-[#E2D8C8] text-navy py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:border-[#C9A84C] transition-colors" onClick={() => handleSend("Add some humor")}>Add Humor</button>
                                                        <button className="flex-1 bg-navy text-white py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#C9A84C] transition-colors" onClick={() => handleSend("Perfect, save it!")}>Save</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {msg.sender === 'ai' && msg.prompts && msg.prompts.length > 0 && (
                                        <div className="mt-1 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both px-2">
                                            <p className="text-[10px] text-taupe mb-2 font-bold uppercase tracking-widest">{msg.promptTitle || contextConfig.promptTitle}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {msg.prompts.map((p) => (
                                                    <button 
                                                        key={p} 
                                                        onClick={() => handleSend(p)} 
                                                        className="px-3 py-1.5 bg-white border border-[#E2D8C8] hover:border-navy hover:text-navy rounded-full text-[10px] font-bold text-taupe transition-all shadow-sm"
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#FAF7F2] border border-[#E2D8C8] p-4 rounded-2xl rounded-bl-sm flex gap-1 shadow-sm items-center h-[48px]">
                                        <span className="w-1.5 h-1.5 bg-taupe/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-taupe/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-taupe/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-[#E2D8C8] flex flex-col gap-3 relative z-10">
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Message VowAi Concierge..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:bg-white transition-all text-navy placeholder:text-taupe shadow-inner"
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#C9A84C] transition-colors shadow-md"
                                >
                                    <Send size={14} className="ml-0.5" />
                                </button>
                            </div>
                            <div className="flex justify-center mt-2">
                                <button onClick={handleEndChat} className="text-[10px] uppercase tracking-widest font-bold text-taupe hover:text-navy transition-colors pb-1">
                                    End Chat Session
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
