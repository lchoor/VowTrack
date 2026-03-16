import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  ListPlus,
  Gift,
  MapPin,
  Sparkles,
  User,
  Settings,
  ArrowRight,
  CheckCircle2,
  Map,
  Utensils,
  Clock,
  List,
  Check,
  Share2,
  Heart,
  Star,
  MessageSquare,
  Send,
  Eye,
  LogOut,
  X,
  Bell,
  MessageCircle,
  Phone,
  Send
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// --- Shared Components ---

const Section = ({ title, children, delay = 0, accentColor = "bg-rose-50" }: { title: string, children: React.ReactNode, delay?: number, accentColor?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 mb-6 hover:-translate-y-1 relative overflow-hidden"
  >
    <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`} />
    <h3 className="text-xs font-black text-gray-900 mb-4 uppercase tracking-widest flex items-center gap-2">
      {title}
    </h3>
    {children}
  </motion.div>
);

const WireframeButton = ({ onClick, label, filled = false, className = "" }: { onClick?: () => void, label: string | React.ReactNode, filled?: boolean, className?: string }) => (
  <button 
    onClick={onClick}
    className={`
      h-8 px-4 border-2 border-gray-800 rounded text-[10px] font-bold uppercase tracking-wider transition-all
      ${filled ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'}
      ${className}
    `}
  >
    {label}
  </button>
);

const VowAIFloatingButton = ({ onClick }: { onClick: () => void }) => (
    <div className="absolute bottom-8 right-8 z-50">
        <div 
            onClick={onClick}
            className="w-16 h-16 bg-black rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white cursor-pointer hover:scale-110 transition-transform group"
        >
            <div className="w-8 h-8 rounded-full border border-white/50 mb-1 flex items-center justify-center group-hover:border-white">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="text-[8px] text-white font-bold tracking-widest uppercase">VowAI</div>
        </div>
    </div>
);

const RegistryPromoBox = ({ onClick }: { onClick: () => void }) => (
    <div 
        onClick={onClick}
        className="bg-gray-900 p-6 rounded-[32px] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden mb-6"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        
        <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Gift size={24} />
            </div>
            <div className="px-3 py-1 bg-white/20 backdrop-blur border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white">
                Registry
            </div>
        </div>
        
        <div className="space-y-1 mb-6 relative z-10">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Gift Registry</h4>
            <p className="text-[10px] text-white/70 font-bold leading-relaxed">
                Manage your wishlist and track contributions.
            </p>
        </div>
        
        <div className="flex items-center justify-between h-12 px-5 bg-white rounded-2xl group-hover:bg-gray-100 transition-colors relative z-10">
            <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Open Registry</span>
            <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
        </div>
    </div>
);

// --- Layout Components ---

const NavBar = ({ 
  onLogoClick, 
  onNavigate,
  currentStep,
  onProfileClick,
  userProfilePic
}: { 
  onLogoClick: () => void, 
  onNavigate: (view: any) => void,
  currentStep: string,
  onProfileClick: (e: React.MouseEvent) => void,
  userProfilePic?: string | null
}) => {
  const [activeMenu, setActiveMenu] = useState<'notifications' | 'messages' | null>(null);
  const [smsSync, setSmsSync] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'guests', label: 'Guests' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'budget', label: 'Finance' }
  ];

  return (
    <div className="h-28 bg-white flex flex-col items-center justify-between px-12 flex-shrink-0 w-full z-40 relative border-b border-gray-100 transition-all">
      {/* Top Row: Logo & Profile */}
      <div className="w-full flex justify-between items-center pt-6">
         <div className="w-48">
            {/* Empty spacer to balance profile */}
         </div>
         
         <div 
            onClick={() => {
                if (currentStep === 'dashboard') {
                    onLogoClick();
                } else {
                    onNavigate('dashboard');
                }
            }}
            className="text-3xl font-black tracking-tighter font-serif italic cursor-pointer hover:scale-105 transition-transform"
         >
            VowTrack
         </div>

         <div className="flex-shrink-0 flex justify-end items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors relative">
                <Eye size={24} />
             </div>
             <div 
                onClick={() => setActiveMenu(activeMenu === 'notifications' ? null : 'notifications')}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors relative
                    ${activeMenu === 'notifications' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}
                `}
             >
                <Bell size={24} />
                <div className="absolute top-3 right-3.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
             </div>

             <div 
                onClick={() => setActiveMenu(activeMenu === 'messages' ? null : 'messages')}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors relative
                    ${activeMenu === 'messages' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}
                `}
             >
                <MessageCircle size={24} />
                <div className="absolute top-3 right-3.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
             </div>

             {/* Messages Dropdown for Low-Fi */}
             <AnimatePresence>
                 {activeMenu === 'messages' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-32 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-[100] flex flex-col"
                    >
                        <div className="px-5 py-4 border-b border-gray-100 mb-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black font-bold">
                                    EV
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-black leading-tight">VowAi Concierge</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">AI Assistant</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSmsSync(!smsSync)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors border ${smsSync ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Phone size={12} className={smsSync ? 'text-white' : 'text-gray-500'} />
                                <span>{smsSync ? 'SMS On' : 'SMS Off'}</span>
                            </button>
                        </div>
                        
                        <div className="h-[250px] overflow-y-auto px-4 py-2 flex flex-col gap-4">
                            <div className="flex flex-col gap-1 items-start">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                                    <p className="text-[13px] text-gray-800">Hi! Florist revised the proposal.</p>
                                </div>
                                <span className="text-[10px] text-gray-400 px-1">10:42 AM</span>
                            </div>
                            
                            <div className="flex flex-col gap-1 items-end">
                                <div className="bg-black text-white rounded-xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                                    <p className="text-[13px]">Did they include the dahlias?</p>
                                </div>
                                <span className="text-[10px] text-gray-400 px-1">11:15 AM</span>
                            </div>

                            <div className="flex flex-col gap-1 items-start">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                                    <p className="text-[13px] text-gray-800">Yes! Looks beautiful.</p>
                                </div>
                                <span className="text-[10px] text-gray-400 px-1">11:18 AM</span>
                            </div>
                        </div>

                        <div className="mt-2 p-2 pt-3 border-t border-gray-100">
                            <div className="relative flex">
                                <input 
                                    type="text" 
                                    placeholder="Message VowAi..." 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-12 py-3 text-[13px] text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-all"
                                />
                                <button className="absolute right-2 top-1.5 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                 )}
             </AnimatePresence>

             {/* Notifications Dropdown for Low-Fi */}
             <AnimatePresence>
                 {activeMenu === 'notifications' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-16 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-[100]"
                    >
                        <div className="px-5 py-4 border-b border-gray-100 mb-2 flex justify-between items-center">
                            <span className="text-sm font-bold text-black">Notifications</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider cursor-pointer hover:text-black">Mark all read</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {[
                                { title: 'VowAi Concierge sent a message', time: '10m ago', unread: true },
                                { title: 'Venue payment due tomorrow', time: '2h ago', unread: true },
                                { title: '3 new RSVPs received', time: '5h ago', unread: false },
                                { title: 'Floral contract updated', time: '1d ago', unread: false }
                            ].map((note, i) => (
                                <div key={i} className={`p-4 rounded-xl mb-1 cursor-pointer transition-colors ${note.unread ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}>
                                    <div className="flex gap-3">
                                        {note.unread && <div className="w-2 h-2 rounded-full bg-black mt-1.5 shrink-0" />}
                                        <div>
                                            <p className={`text-sm ${note.unread ? 'font-bold text-black' : 'text-gray-600'}`}>{note.title}</p>
                                            <p className="text-[11px] text-gray-400 mt-1">{note.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                 )}
             </AnimatePresence>

             <div 
                onClick={onProfileClick}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors overflow-hidden"
             >
                {userProfilePic ? (
                    <img src={userProfilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={24} />
                )}
             </div>
         </div>
      </div>

      {/* Bottom Row: Navigation Links */}
      <div className="flex gap-10 pb-4">
        {navItems.map((item) => {
            // Mapping logic for grouped items
            const isActive = 
                currentStep === item.id || 
                (item.id === 'guests' && currentStep === 'registry') ||
                (item.id === 'vendors' && (currentStep === 'search' || currentStep === 'detail'));

            return (
                <button
                    key={item.id}
                    onClick={() => {
                        // Intelligent routing
                        if (item.id === 'vendors' && currentStep === 'search') onNavigate('search');
                        else onNavigate(item.id);
                    }}
                    className={`
                        text-[11px] font-bold uppercase tracking-[0.15em] py-2 border-b-2 transition-all
                        ${isActive ? 'text-black border-black' : 'text-gray-400 border-transparent hover:text-black'}
                    `}
                >
                    {item.label}
                </button>
            );
        })}
      </div>
    </div>
  );
};

const Footer = () => (
  <div className="h-10 border-t border-gray-100 bg-white flex items-center justify-between px-8 flex-shrink-0 w-full z-10 relative">
    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">© 2026 VowTrack Inc.</div>
    <div className="flex gap-4 text-[9px] font-bold text-gray-400">
      <span className="cursor-pointer hover:text-black">Privacy</span>
      <span className="cursor-pointer hover:text-black">Terms</span>
      <span className="cursor-pointer hover:text-black">Legal</span>
    </div>
  </div>
);

const ChatOverlay = ({ onClose, intent }: { onClose: () => void, intent?: string }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm VowAI, your personal wedding concierge. How can I help you plan your big day?" }
    ]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (intent === 'vows') {
            setMessages(prev => [
                ...prev, 
                { role: 'assistant', text: "I can definitely help with your vows! How would you like to start? Here are a few directions we could take:" }
            ]);
        }
    }, [intent]);

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: text }]);
        setInput("");
        
        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', text: "I've added that to your planning notes. Is there anything else you need help with?" }]);
        }, 1000);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute bottom-28 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 overflow-hidden"
        >
            <div className="h-16 bg-black text-white flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <div className="text-sm font-bold">VowAI Concierge</div>
                        <div className="text-[10px] text-white/60 font-medium">Always online</div>
                    </div>
                </div>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed
                            ${msg.role === 'user' ? 'bg-black text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'}
                        `}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {intent === 'vows' && messages.length === 2 && (
                    <div className="flex flex-col gap-2 ml-2">
                        {["Sentimental & Romantic", "Funny & Lighthearted", "Short & Sweet"].map((opt, i) => (
                            <button 
                                key={i}
                                onClick={() => handleSend(`I'd like to go with: ${opt}`)}
                                className="text-left px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-black hover:text-white transition-colors shadow-sm w-fit"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask VowAI..." 
                    className="flex-1 h-10 bg-gray-50 rounded-full px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black/5"
                />
                <button 
                    onClick={() => handleSend()}
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                    <Send size={14} />
                </button>
            </div>
        </motion.div>
    );
};

const ProfileDropdown = ({ onClose, position, onOpenProfile, userProfilePic }: { onClose: () => void, position: { top: number, right: number }, onOpenProfile?: () => void, userProfilePic?: string | null }) => (
    <div 
        className="absolute w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2"
        style={{ top: position.top + 10, right: 20 }}
    >
        <div className="px-4 py-3 border-b border-gray-50 mb-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 text-gray-900 font-bold overflow-hidden shrink-0">
                {userProfilePic ? (
                    <img src={userProfilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    "J"
                )}
            </div>
            <div>
                <div className="text-sm font-bold text-gray-900">Jessica & Michael</div>
                <div className="text-xs text-gray-500">October 24, 2026</div>
            </div>
        </div>
        
        <div className="flex flex-col">
            <button 
                onClick={() => {
                    onClose();
                    if (onOpenProfile) onOpenProfile();
                }}
                className="px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2"
            >
                <User size={14} /> Profile & Account
            </button>
            <button className="px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2">
                <Settings size={14} /> Settings
            </button>
            <button className="px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2">
                <Eye size={14} /> Accessibility
            </button>
            <div className="h-px bg-gray-50 my-1"></div>
            <button className="px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
                <LogOut size={14} /> Sign Out
            </button>
        </div>
    </div>
);

// --- Content States ---

const LandingState = ({ onEnter }: { onEnter: () => void }) => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-300">
    <div className="relative z-10 flex flex-col items-center text-center text-gray-900 max-w-4xl px-8">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            <div className="w-20 h-20 mb-8 bg-black rounded-full flex items-center justify-center shadow-xl"></div>
            
            <h1 className="text-8xl font-black tracking-tighter mb-6 font-serif italic text-black">VowTrack</h1>
            <p className="text-xl font-bold tracking-widest uppercase mb-12 text-gray-700">
                Your Big Day Made Simple. <br/>Memories Made Forever.
            </p>

            <div className="flex gap-6 mt-8">
                <button className="h-14 px-8 border-2 border-black bg-transparent hover:bg-black hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center gap-3">
                    New Client Portal
                </button>
                <button 
                    onClick={onEnter}
                    className="h-14 px-8 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all hover:scale-105 flex items-center gap-3 shadow-xl"
                >
                    Client Dashboard <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    </div>
    <div className="absolute bottom-8 w-full text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold z-10">
        The Modern Standard for Wedding Planning
    </div>
  </div>
);

const DashboardState = ({ onNavigate, onOpenChat }: { onNavigate: (view: any) => void, onOpenChat: (intent?: string) => void }) => (
  <div className="p-8 h-full flex flex-col w-full gap-8 bg-white overflow-y-auto">
    {/* Hero Section */}
    <div className="w-full h-[566px] border border-gray-100 bg-[#f9fafb] p-12 flex justify-between items-center relative rounded-[24px] shadow-sm flex-shrink-0">
      <div className="z-10 relative flex flex-col justify-center h-full max-w-2xl ml-4">
        <div className="inline-block px-3 py-1.5 bg-white text-[12px] font-bold uppercase tracking-[1.2px] text-gray-400 mb-8 border border-gray-100 w-fit">
          On Track
        </div>
        <h2 className="text-[60px] font-black text-[#101828] mb-6 tracking-[-2.7px] leading-tight">Welcome Back</h2>
        <p className="text-[20px] text-gray-500 mb-10 leading-relaxed max-w-md">
          You have <strong className="text-black border-b-4 border-black/10">145 days</strong> until your big day. 
          Everything is moving along perfectly.
        </p>
        <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('timeline')}
              className="h-[48px] px-8 bg-black text-white rounded-[14px] flex items-center justify-center text-[12px] font-bold cursor-pointer hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
              View Full Timeline
            </button>
            <button 
              onClick={() => onNavigate('timeline')}
              className="h-[48px] px-8 rounded-[14px] border-2 border-gray-100 text-[12px] font-bold text-gray-600 bg-white flex items-center hover:border-black transition-all">
              3 Tasks Due Today
            </button>
        </div>
      </div>
      <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border-[12px] border-white bg-[#e5e7eb] shadow-2xl flex items-center justify-center overflow-hidden">
        <div className="text-[20px] text-gray-400 font-serif italic">Couple Photo</div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="flex gap-6 w-full h-[234px] flex-shrink-0 mb-8">
      {/* Plan Card */}
      <div className="flex-1 border border-[#e5e7eb] bg-[#f9fafb] rounded-[24px] p-8 flex flex-col items-center justify-center text-center relative">
         <div className="text-[30px] font-serif leading-tight mb-8 text-[#101828]">
           Plan your <span className="italic">perfect</span> day,<br />
           <span className="italic">stress-free.</span>
         </div>
         
         <div className="flex gap-4">
            <div onClick={() => onNavigate('bridal')} className="w-[128px] h-[96px] bg-white border border-[#d1d5dc] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
              <span className="text-[12px] font-bold text-[#1e2939] uppercase leading-none mb-1">Bridal</span>
              <span className="text-[12px] font-bold text-[#1e2939] uppercase leading-none">Suite</span>
            </div>
            <div onClick={() => onNavigate('groom')} className="w-[128px] h-[96px] bg-white border border-[#d1d5dc] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
              <span className="text-[12px] font-bold text-[#1e2939] uppercase leading-none mb-1">Groom</span>
              <span className="text-[12px] font-bold text-[#1e2939] uppercase leading-none">Suite</span>
            </div>
         </div>
      </div>

      {/* VowAI Concierge Card */}
      <div 
          onClick={() => onOpenChat()}
          className="flex-1 border-4 border-black bg-white rounded-[24px] p-8 flex flex-col justify-center relative shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] cursor-pointer group"
      >
         <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold px-6 py-2 rounded-bl-[14px] uppercase tracking-widest">
            VowAI Concierge
         </div>
         
         <div className="w-full flex flex-col items-center max-w-lg mx-auto">
            <div className="text-[20px] font-serif italic font-bold text-[#101828] mb-8 text-center leading-snug">
              "How can I help you today?"
            </div>
            
            <div className="w-full h-14 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-full flex items-center px-6 mb-8 group-hover:border-black transition-all">
              <div className="w-2.5 h-2.5 bg-black rounded-full mr-4"></div>
              <span className="text-[#99a1af] text-sm font-medium">Type a command or ask a question...</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Find Venues", filled: true, action: () => onNavigate('search') },
                { label: "Draft Vows", filled: false, action: () => onOpenChat('vows') },
                { label: "Invites", filled: false, action: () => onNavigate('guests') }
              ].map((btn, i) => (
                <button 
                  key={i}
                  onClick={(e) => { e.stopPropagation(); btn.action(); }}
                  className={`
                    px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                    ${btn.filled 
                        ? 'bg-black text-white border-2 border-black hover:bg-gray-800' 
                        : 'bg-white text-[#4a5565] border-2 border-[#e5e7eb] hover:border-black hover:text-black'}
                  `}
                >
                  {btn.label}
                </button>
              ))}
            </div>
         </div>
      </div>
    </div>
  </div>
);

const SearchResultsState = ({ onSelect, onBack, onOpenChat }: { onSelect: () => void, onBack: () => void, onOpenChat: () => void }) => {
    const venues = [
        { id: 1, name: "The Grand Estate", price: "$12,000", location: "Napa Valley, CA", rating: 4.9 },
        { id: 2, name: "Azure Bay Villa", price: "$15,500", location: "Malibu, CA", rating: 4.8 },
        { id: 3, name: "Pinecrest Lodge", price: "$9,000", location: "Aspen, CO", rating: 4.7 },
        { id: 4, name: "Ivy Hall Gardens", price: "$11,200", location: "Charleston, SC", rating: 4.9 },
        { id: 5, name: "Mirror Lake Manor", price: "$18,000", location: "Lake Tahoe, NV", rating: 5.0 },
        { id: 6, name: "Sterling Loft", price: "$7,500", location: "New York, NY", rating: 4.6 },
    ];

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
             {/* Header */}
             <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
                  <div>
                     <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 hover:text-black mb-4 transition-colors tracking-widest">
                         <ArrowLeft size={16} /> Back
                     </button>
                     <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Premier Venues</h2>
                     <p className="text-sm text-gray-500 font-medium">Curated luxury locations based on your monochrome aesthetic.</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2">
                         <Map size={14} /> Map View
                     </button>
                     <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase hover:bg-gray-800 shadow-lg flex items-center gap-2">
                         <ListPlus size={14} /> Compare
                     </button>
                  </div>
             </div>

             <div className="flex gap-8 h-full overflow-hidden">
                 {/* Main Content: Venue Grid */}
                 <div className="flex-1 overflow-y-auto pr-2 pb-10">
                     <div className="grid grid-cols-2 gap-6">
                         {venues.map((venue) => (
                             <div 
                                 key={venue.id} 
                                 onClick={onSelect}
                                 className="group border border-gray-200 rounded-[24px] p-4 hover:border-black transition-all cursor-pointer bg-white hover:shadow-xl flex flex-col"
                             >
                                 <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700" />
                                     <MapPin className="text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
                                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm">
                                         {venue.price}
                                     </div>
                                 </div>
                                 
                                 <div className="flex justify-between items-start mb-2">
                                     <div>
                                         <h3 className="text-lg font-bold text-gray-900 leading-tight">{venue.name}</h3>
                                         <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                                             <MapPin size={10} /> {venue.location}
                                         </div>
                                     </div>
                                     <div className="flex items-center gap-1 text-[10px] font-black bg-gray-50 px-2 py-1 rounded">
                                         <Star size={10} fill="currentColor" /> {venue.rating}
                                     </div>
                                 </div>
                                 
                                 <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                     A masterpiece of architectural elegance, offering a strict monochrome palette and expansive garden views.
                                 </p>
                                 
                                 <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                     <div className="flex -space-x-2">
                                         {[1,2,3].map(p => <div key={p} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white" />)}
                                     </div>
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover:underline">View Details</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* Sidebar */}
                 <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                     <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                        <Settings size={14} /> Refine Search
                     </h3>
                     
                     <div className="space-y-6 mb-8">
                         {/* Filter placeholders */}
                         <div>
                             <label className="text-xs font-bold text-gray-900 block mb-2">Price Range</label>
                             <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="w-1/2 h-full bg-black rounded-full" />
                             </div>
                             <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
                                 <span>$5k</span>
                                 <span>$50k+</span>
                             </div>
                         </div>
                         
                         <div>
                             <label className="text-xs font-bold text-gray-900 block mb-2">Capacity</label>
                             <div className="flex gap-2">
                                 {['50-100', '100-200', '200+'].map(opt => (
                                     <button key={opt} className="px-3 py-1.5 border border-gray-200 rounded-lg text-[10px] font-bold hover:bg-black hover:text-white transition-colors">
                                         {opt}
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>

                     {/* Assistant */}
                     <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Sparkles size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    VowAI Scout
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Venue Finder</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    Not sure where to start? I can analyze your guest list and style to recommend the perfect spot.
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Ask for help</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

const VenueDetailState = ({ onAction, onBack }: { onAction: () => void, onBack: () => void }) => {
    const [liked, setLiked] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

    return (
      <div className="h-full flex flex-col relative bg-white w-full overflow-hidden">
        <div className="h-[40%] bg-gray-100 w-full relative flex-shrink-0 group overflow-hidden">
           <button onClick={onBack} className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold uppercase hover:bg-white z-20 shadow-sm transition-all flex items-center gap-2">
             <ArrowLeft size={16} /> Back
           </button>
           
           <div className="absolute top-8 right-8 flex gap-3 z-20">
                <button 
                  onClick={() => setLiked(!liked)}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
                >
                    <Heart size={20} className={liked ? "fill-red-500 text-red-500" : "text-gray-900"} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                    <Share2 size={20} className="text-gray-900" />
                </button>
           </div>
    
           <div className="w-full h-full flex items-center justify-center bg-gray-200">
               <span className="text-2xl font-serif italic text-gray-400">Hero Image Area</span>
           </div>
           
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
           <div className="absolute bottom-8 left-8 text-white z-10">
              <h1 className="text-5xl font-bold mb-2 tracking-tight">The Grand Estate</h1>
              <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                   <span className="flex items-center gap-1"><MapPin size={16} /> Napa Valley, CA</span>
                   <span className="flex items-center gap-1 text-yellow-400"><Star size={16} fill="currentColor" /> 4.9 (120 reviews)</span>
              </div>
           </div>
        </div>
        
        <div className="px-10 py-8 w-full flex-1 min-h-0">
           <div className="grid grid-cols-12 gap-12 h-full">
              
              <div className="col-span-7 flex flex-col h-full">
                 <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-6 flex-shrink-0">
                    <div className="pr-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">About the Venue</h2>
                        <p className="text-base text-gray-500 max-w-2xl leading-relaxed line-clamp-3">
                            A stunning historic estate surrounded by rolling vineyards. 
                            Perfect for both intimate gatherings and grand celebrations, 
                            featuring multiple indoor and outdoor spaces.
                        </p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                       <div className="text-4xl font-black text-gray-900">$12,000</div>
                       <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1">Starting Price</div>
                    </div>
                 </div>

                 <div className="mb-auto flex-shrink-0">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-4">Venue Features</h3>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                            <Sparkles className="text-gray-900" size={24} />
                            <span className="font-bold text-sm">Outdoor & Indoor</span>
                            <span className="text-xs text-gray-500">Flexible spaces</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                            <CheckCircle2 className="text-gray-900" size={24} />
                            <span className="font-bold text-sm">300 Guests</span>
                            <span className="text-xs text-gray-500">Capacity</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                            <Clock className="text-gray-900" size={24} />
                            <span className="font-bold text-sm">Full Day Access</span>
                            <span className="text-xs text-gray-500">10am - 12am</span>
                        </div>
                    </div>
                 </div>
                 
                 <div className="mt-4 pt-6 flex gap-4 flex-shrink-0">
                     <button className="flex-1 h-14 border-2 border-black rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                        <Calendar size={18} /> Book a Tour
                     </button>
                     <button onClick={onAction} className="flex-1 h-14 bg-black text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center gap-2">
                        <ListPlus size={18} /> Add to List
                     </button>
                 </div>
              </div>
    
              <div className="col-span-5 flex flex-col h-full gap-6">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg flex-1 flex flex-col overflow-hidden">
                     <div className="flex justify-between items-center mb-4 flex-shrink-0">
                         <span className="text-lg font-bold">October 2026</span>
                         <div className="flex gap-2">
                             <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"><ArrowLeft size={16} /></button>
                             <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors rotate-180"><ArrowLeft size={16} /></button>
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-7 gap-1 mb-2 flex-shrink-0">
                         {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
                             <div key={i} className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-wider">{d}</div>
                         ))}
                     </div>
                     <div className="grid grid-cols-7 gap-1 flex-1 min-h-0">
                        {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const isAvailable = [5, 12, 19, 26].includes(day); 
                            const isSelected = selectedDate === day;
                            
                            return (
                               <div 
                                 key={i} 
                                 onClick={() => isAvailable && setSelectedDate(day)}
                                 className={`
                                    rounded-lg flex flex-col items-center justify-center text-sm font-bold transition-all duration-200 relative
                                    ${isSelected 
                                        ? 'bg-gray-900 text-white shadow-md scale-105 z-10' 
                                        : isAvailable 
                                            ? 'bg-gray-50 text-gray-900 cursor-pointer hover:bg-gray-100 hover:scale-105 border border-transparent hover:border-gray-200' 
                                            : 'text-gray-300'}
                                 `}
                               >
                                 {day}
                                 {isAvailable && !isSelected && <div className="w-1 h-1 bg-green-500 rounded-full mt-1" />}
                               </div>
                            );
                        })}
                     </div>

                     <div className="h-20 mt-4 border-t border-gray-100 pt-3 flex-shrink-0">
                        <AnimatePresence mode="wait">
                            {selectedDate ? (
                                <motion.div 
                                    key="slots"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2 flex items-center gap-2">
                                        <Clock size={12} /> Available Times
                                    </h4>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`
                                                    py-2 px-3 text-xs font-bold rounded-lg border transition-all whitespace-nowrap
                                                    ${selectedTime === time 
                                                        ? 'bg-gray-900 text-white border-gray-900' 
                                                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
                                                    }
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="empty"
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                    className="h-full flex items-center justify-center text-gray-400 text-sm font-medium italic"
                                >
                                    Select a date to view available times
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    );
};

const RegistryState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: () => void }) => {
    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
            <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
                 <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Gift Registry</h2>
                    <p className="text-sm text-gray-500 font-medium">Curate your wishlist and manage contributions.</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Share Link
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase hover:bg-gray-800 shadow-lg flex items-center gap-2">
                        <ListPlus size={14} /> Add Item
                    </button>
                 </div>
            </div>

            <div className="flex gap-8 h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2 pb-10">
                    {/* Linked Accounts */}
                    <div className="mb-10">
                        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-4">Linked Stores</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {['Amazon', 'Crate & Barrel', 'Target', 'Williams Sonoma'].map((store, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 group">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm font-serif font-bold italic border border-gray-100">
                                        {store.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">{store}</div>
                                        <div className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1">
                                            <CheckCircle2 size={10} /> Connected
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registry Items */}
                    <div>
                        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-4">Your Wishlist</h3>
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { name: "KitchenAid Stand Mixer", price: 450, contributed: 300, group: true },
                                { name: "Dyson V15 Detect", price: 750, contributed: 150, group: true },
                                { name: "Le Creuset Dutch Oven", price: 420, contributed: 420, group: false },
                                { name: "Nespresso Vertuo", price: 250, contributed: 0, group: false },
                                { name: "Parachute Sheet Set", price: 280, contributed: 280, group: false },
                                { name: "Sonos Move 2", price: 450, contributed: 50, group: true },
                            ].map((item, i) => (
                                <div key={i} className="border border-gray-200 rounded-2xl p-4 hover:shadow-xl transition-all hover:-translate-y-1 bg-white group">
                                    <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                                        <Gift className="text-gray-300 w-12 h-12" />
                                        {item.group && (
                                            <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <Users size={10} /> Group Gift
                                            </div>
                                        )}
                                        {item.contributed >= item.price && (
                                            <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                Fulfilled
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h4>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-sm font-medium text-gray-500">${item.price}</div>
                                        {item.group && (
                                            <div className="text-xs font-bold text-black">{Math.round((item.contributed / item.price) * 100)}% Funded</div>
                                        )}
                                    </div>

                                    {item.group ? (
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                            <div 
                                                className="h-full bg-black transition-all duration-500" 
                                                style={{ width: `${(item.contributed / item.price) * 100}%` }} 
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-2 mb-4"></div>
                                    )}

                                    <button className="w-full py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black transition-all">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-4 flex items-center gap-2">
                        <Clock size={14} /> Recent Activity
                    </h3>
                    <div className="space-y-4 mb-6 flex-1 overflow-y-auto pr-2">
                        {[
                            { name: "Aunt Sharon", action: "contributed $100", item: "KitchenAid Mixer", time: "2h ago" },
                            { name: "Mike & Sarah", action: "purchased", item: "Sheet Set", time: "5h ago" },
                            { name: "Grandma", action: "contributed $50", item: "Dyson V15", time: "1d ago" },
                            { name: "The Millers", action: "contributed $200", item: "KitchenAid Mixer", time: "1d ago" },
                            { name: "Chris P.", action: "purchased", item: "Nespresso Vertuo", time: "2d ago" },
                            { name: "Laura W.", action: "contributed $75", item: "Sonos Move 2", time: "2d ago" },
                            { name: "James K.", action: "contributed $150", item: "Dyson V15", time: "3d ago" },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0">
                                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                                <div>
                                    <div className="text-xs text-gray-900 leading-tight">
                                        <span className="font-bold">{act.name}</span> {act.action} to <span className="font-bold">{act.item}</span>
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold mt-1 tracking-wider uppercase">{act.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Registry Promo Box moved down */}
                    <div className="mt-auto pt-6 border-t border-gray-50">
                        <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                             <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Gift size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    Registry Stats
                                </div>
                            </div>
                            <div className="space-y-1 mb-4">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Registry Overview</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    Total: $3,450 funded across 12 items. 4 new contributions this week.
                                </p>
                            </div>
                            <div className="flex items-center justify-between h-10 px-4 bg-white border border-gray-100 rounded-xl group-hover:border-black transition-colors text-[9px] font-black uppercase tracking-widest">
                                Manage Settings <ArrowRight size={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GuestsState = ({ onBack, onOpenChat, onNavigate }: { onBack: () => void, onOpenChat: () => void, onNavigate: (view: any) => void }) => {
    const stats = [
        { label: "Total Invited", value: 150 },
        { label: "Confirmed", value: 82, color: "text-green-600" },
        { label: "Declined", value: 12, color: "text-red-500" },
        { label: "Pending", value: 56, color: "text-gray-400" }
    ];

    const managementSections = [
        {
            title: "Invites",
            items: ["Invitation Suite Design", "Printing & Production", "Guest Addressing", "RSVP Tracking"]
        },
        {
            title: "Save the Date & Announcements",
            items: ["Website Launch", "Digital Save the Dates", "Physical Cards", "Hotel Block Info"]
        },
        {
            title: "Dietary Restrictions",
            items: ["Gluten Free (4)", "Vegan (2)", "Nut Allergy (1)", "Dairy Free (0)", "Kids Meals (5)"]
        }
    ];

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6 flex-shrink-0">
                 <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Guest Management</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage invitations, RSVPs, and guest details.</p>
                 </div>
                 <div className="flex gap-2">
                    <button 
                        onClick={() => onNavigate('registry')}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Gift size={14} /> Gift Registry
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-gray-50 flex items-center gap-2">
                        <Share2 size={14} /> Import/Export
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase hover:bg-gray-800 shadow-lg flex items-center gap-2">
                        <ListPlus size={14} /> Add Guest
                    </button>
                 </div>
            </div>

            {/* Stats Bar */}
            <div className="flex gap-12 mb-10 px-4">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                        <span className={`text-4xl font-serif font-black ${stat.color || 'text-gray-900'}`}>
                            {stat.value}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Content Columns */}
            <div className="flex gap-8 h-full overflow-hidden">
                <div className="flex-1 grid grid-cols-3 gap-8 overflow-y-auto pr-2 pb-10">
                    {managementSections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-black pb-2 mb-2 font-serif italic">{section.title}</h3>
                            {section.items.map((item, i) => (
                                <div key={i} className="group p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white hover:shadow-md flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-800">{item}</span>
                                    {section.title.includes("Dietary") ? (
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                    ) : (
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full group-hover:border-black transition-colors" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    
                    {/* Guest List Preview - Spanning full width below categories */}
                    <div className="col-span-3 mt-8">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
                            <h3 className="text-lg font-bold text-gray-900 font-serif italic">Recent RSVPs</h3>
                            <button className="text-xs font-bold uppercase text-black hover:underline">View All Guests</button>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                             <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Guest</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dietary</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-sm font-bold text-gray-900">Sarah & Tom {i}</td>
                                            <td className="px-6 py-3"><span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Confirmed</span></td>
                                            <td className="px-6 py-3 text-xs text-gray-500">None</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Assistant */}
                <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-4 flex items-center gap-2">
                        <Clock size={14} /> RSVP Timeline
                    </h3>
                    <div className="space-y-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="text-xs font-bold text-gray-900 mb-1">Save the Dates Sent</div>
                            <div className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1"><CheckCircle2 size={10} /> Completed</div>
                        </div>
                         <div className="p-4 bg-white border border-black rounded-xl shadow-md">
                            <div className="text-xs font-bold text-gray-900 mb-1">Send Formal Invites</div>
                            <div className="text-[10px] text-gray-500 mb-2">Due in 2 weeks</div>
                            <div className="w-full h-1 bg-gray-100 rounded-full"><div className="w-1/2 h-full bg-black rounded-full"></div></div>
                        </div>
                    </div>

                    {/* Assistant - More Obvious Interaction Box */}
                    <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <MessageSquare size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    Guest Concierge
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Invitation Bot</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    Need help with wording? I can draft formal or modern invitation text for you.
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Draft wording</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BudgetState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: () => void }) => {
    const [activeFinancialTab, setActiveFinancialTab] = useState<'schedule' | 'rentals' | 'contracts'>('schedule');

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
            {/* Header - Aligned with Vendors */}
            <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6 shrink-0">
                 <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Budget & Finance</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage your wedding investment and payment milestones.</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase hover:bg-gray-800 shadow-lg flex items-center gap-2">
                        <ListPlus size={14} /> Add Expense
                    </button>
                 </div>
            </div>

            {/* Stats Bar - Aligned with Guests Stats */}
            <div className="flex gap-12 mb-10 px-4 shrink-0">
                {[
                    { label: "Total Budget", value: "$85,000" },
                    { label: "Paid to Date", value: "$55,250", color: "text-green-600" },
                    { label: "Pending", value: "$5,000", color: "text-gray-400" },
                    { label: "Remaining", value: "$24,750" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col">
                        <span className={`text-4xl font-serif font-black ${stat.color || 'text-gray-900'}`}>
                            {stat.value}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex gap-8 h-full overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="flex gap-6 mb-6 border-b border-gray-200 shrink-0">
                        {[
                            { id: 'schedule', label: 'Payment Schedule' },
                            { id: 'rentals', label: 'Rentals & Inventory' },
                            { id: 'contracts', label: 'Legal & Contracts' }
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveFinancialTab(tab.id as any)}
                                className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                                    activeFinancialTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {tab.label}
                                {activeFinancialTab === tab.id && <motion.div layoutId="budgetUnderline" className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 pb-10 scrollbar-hide">
                        {activeFinancialTab === 'schedule' && (
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expense Item</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Due Date</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { name: "Venue Final Payment", vendor: "The Grand Estate", date: "Nov 01, 2026", amount: "12,000", status: "Pending" },
                                            { name: "Catering Deposit", vendor: "Feast & Fable", date: "Oct 20, 2026", amount: "5,000", status: "Overdue" },
                                            { name: "Band Booking", vendor: "The Midnight Soul", date: "Sep 15, 2026", amount: "3,500", status: "Paid" },
                                            { name: "Cake Design", vendor: "Sweet Layers", date: "Sep 10, 2026", amount: "800", status: "Paid" },
                                            { name: "Transportation", vendor: "Luxe Limo", date: "Jan 15, 2027", amount: "1,200", status: "Scheduled" },
                                            { name: "Florals Final", vendor: "Bloom & Wild", date: "Nov 10, 2026", amount: "4,200", status: "Scheduled" },
                                        ].map((payment, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-gray-900">{payment.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{payment.vendor}</div>
                                                </td>
                                                <td className={`px-6 py-4 text-xs font-bold ${payment.status === 'Overdue' ? 'text-red-500' : 'text-gray-500'}`}>
                                                    {payment.date}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-serif font-bold text-gray-900 text-right">${payment.amount}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${
                                                        payment.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 
                                                        payment.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-100' : 
                                                        'bg-gray-50 text-gray-400 border-gray-100'
                                                    }`}>
                                                        {payment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeFinancialTab === 'rentals' && (
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { item: "Chiavari Chairs", qty: 150, vendor: "Luxe Rentals", cost: "1,125" },
                                    { item: "Table Linens", qty: 20, vendor: "Silk & Satin", cost: "400" },
                                    { item: "Dance Floor", qty: 1, vendor: "Party Kings", cost: "850" },
                                    { item: "Gold Flatware", qty: 160, vendor: "Luxe Rentals", cost: "320" },
                                ].map((rental, i) => (
                                    <div key={i} className="group p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white hover:shadow-md flex justify-between items-center">
                                        <div>
                                            <div className="text-sm font-bold text-gray-800">{rental.item}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase">{rental.vendor} • Qty: {rental.qty}</div>
                                        </div>
                                        <div className="text-lg font-serif italic font-bold text-gray-900">${rental.cost}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeFinancialTab === 'contracts' && (
                            <div className="space-y-3">
                                {[
                                    { name: "Venue Agreement", vendor: "The Grand Estate", status: "Signed" }, 
                                    { name: "Catering Service", vendor: "Feast & Fable", status: "Signed" }, 
                                    { name: "Photography Release", vendor: "Luna Portraits", status: "Signed" }, 
                                    { name: "Bakery Order", vendor: "Sweet Layers", status: "Pending Signature" }
                                ].map((contract, i) => (
                                    <div key={i} className="group p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-all">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{contract.name}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase">{contract.vendor}</div>
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${
                                            contract.status === 'Signed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                            {contract.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar - Aligned with Vendors Sidebar */}
                <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={14} /> Upcoming Payments
                    </h3>
                    
                    <div className="space-y-6 relative mb-8">
                        <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gray-100" />
                        {[
                            { name: "Florals Deposit", due: "Due in 5 days", amount: "$2,500" },
                            { name: "Venue Installment", due: "Nov 01", amount: "$12,000" },
                            { name: "Band Final", due: "Nov 15", amount: "$3,500" }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="w-3 h-3 rounded-full bg-black border-2 border-white shadow-sm shrink-0 z-10" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs font-bold text-gray-900">{item.name}</div>
                                        <div className="text-xs font-serif font-bold">{item.amount}</div>
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase">{item.due}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* VowAI Advisor - Matching Vendor Assistant Style */}
                    <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Sparkles size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    VowAI Advisor
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Smart Ledger</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    I've analyzed your floral contract. There's a potential $500 savings on the peony order.
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">View Insights</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineState = ({ onBack, onOpenChat, onNavigate }: { onBack: () => void, onOpenChat: () => void, onNavigate: (view: any) => void }) => {
    const [activeTab, setActiveTab] = useState<'rehearsal' | 'events' | 'dayof'>('dayof');

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
             <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
                 <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Timelines & Logistics</h2>
                    <p className="text-sm text-gray-500 font-medium">Master run of show, floor plans, and day-of details.</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Print Itinerary
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase hover:bg-gray-800 shadow-lg flex items-center gap-2">
                        <Calendar size={14} /> Add Event
                    </button>
                 </div>
            </div>

            <div className="flex gap-8 h-full min-h-0">
                {/* Left: Tabs & Itineraries */}
                <div className="flex-[3] flex flex-col h-full overflow-hidden">
                    <div className="flex gap-4 mb-6 border-b border-gray-200 pb-1">
                        {['Rehearsal Dinner', 'Events', 'Day-of Itinerary'].map((tab, i) => {
                             const key = ['rehearsal', 'events', 'dayof'][i] as 'rehearsal' | 'events' | 'dayof';
                             return (
                                <button 
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative
                                        ${activeTab === key ? 'text-black' : 'text-gray-400 hover:text-gray-600'}
                                    `}
                                >
                                    {tab}
                                    {activeTab === key && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                                </button>
                             );
                        })}
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-6 overflow-y-auto relative">
                        {activeTab === 'dayof' && (
                            <>
                                <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gray-200" />
                                {[
                                    { time: "09:00 AM", title: "Bridal Party Hair & Makeup", loc: "Bridal Suite", type: "Prep" },
                                    { time: "11:00 AM", title: "Vendor Arrival & Setup", loc: "Main Hall", type: "Logistics" },
                                    { time: "01:00 PM", title: "First Look Photos", loc: "Garden", type: "Photo" },
                                    { time: "02:30 PM", title: "Wedding Party Photos", loc: "Estate Grounds", type: "Photo" },
                                    { time: "04:30 PM", title: "Guests Arrive", loc: "Courtyard", type: "Guest" },
                                    { time: "05:00 PM", title: "Ceremony Begins", loc: "Chapel", type: "Main" },
                                    { time: "06:00 PM", title: "Cocktail Hour", loc: "Terrace", type: "Social" },
                                    { time: "07:30 PM", title: "Dinner Served", loc: "Ballroom", type: "Food" },
                                    { time: "08:30 PM", title: "Toasts & Speeches", loc: "Ballroom", type: "Main" },
                                    { time: "10:30 PM", title: "Cake Cutting", loc: "Dance Floor", type: "Food" },
                                    { time: "11:45 PM", title: "Grand Exit", loc: "Front Gate", type: "Main" }
                                ].map((event, i) => (
                                    <div key={i} className="flex gap-4 relative mb-6 last:mb-0 group cursor-pointer">
                                        <div className={`w-3 h-3 rounded-full mt-1.5 border-2 border-white shadow-sm z-10 shrink-0
                                            ${event.type === 'Main' ? 'bg-black w-4 h-4 -ml-0.5' : 'bg-gray-400'}
                                        `} />
                                        <div className="p-3 bg-white border border-gray-100 rounded-xl flex-1 shadow-sm group-hover:shadow-md transition-all">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-black text-gray-900">{event.time}</span>
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded">{event.type}</span>
                                            </div>
                                            <div className="text-sm font-bold text-gray-800 mb-0.5">{event.title}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <MapPin size={10} /> {event.loc}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {activeTab === 'rehearsal' && (
                             <div className="h-full flex flex-col items-center justify-center text-center p-6">
                                <Utensils size={32} className="text-gray-300 mb-4" />
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Rehearsal Dinner</h4>
                                <p className="text-sm text-gray-500 mb-6 max-w-xs">
                                    Friday, Oct 23 • 6:00 PM<br/>
                                    Hosted at "The Bistro Downtown".<br/>
                                    Menu selection finalized. Guest count confirmed at 35.
                                </p>
                                <button className="px-6 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800">
                                    Edit Details
                                </button>
                             </div>
                        )}

                        {activeTab === 'events' && (
                             <div className="space-y-4">
                                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-900">Welcome Drinks</h4>
                                        <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Coming Up</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">Thursday, Oct 22 • 8:00 PM</div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        <MapPin size={10} /> Hotel Lobby Bar
                                    </div>
                                </div>
                                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-900">Farewell Brunch</h4>
                                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Planning</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">Sunday, Oct 25 • 10:00 AM</div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        <MapPin size={10} /> Garden Terrace
                                    </div>
                                </div>
                             </div>
                        )}
                    </div>
                </div>

                {/* Middle: Floor Plan & Checklist */}
                <div className="flex-[2] flex flex-col gap-6 h-full overflow-hidden">
                    {/* Floor Plan Card */}
                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer flex-shrink-0">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Map size={20} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">Floor Plan</div>
                                    <div className="text-xs text-gray-400">Ballroom & Terrace</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs border-b border-gray-700 pb-1">
                                    <span className="text-gray-400">Guest Seating</span>
                                    <span className="font-bold">145 / 150</span>
                                </div>
                                <div className="flex justify-between text-xs border-b border-gray-700 pb-1">
                                    <span className="text-gray-400">Tables</span>
                                    <span className="font-bold">18 Round, 2 Long</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full" />
                    </div>

                     {/* Master Checklist */}
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col flex-1 min-h-0">
                         <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-green-600" /> Master Checklist
                        </h4>
                         <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                            {[
                                { task: "Finalize Seating Chart", due: "Today" },
                                { task: "Confirm Vendor Meals", due: "Tomorrow" },
                                { task: "Pack Honeymoon Bags", due: "In 3 days" },
                                { task: "Pick up Dress", due: "In 1 week" },
                                { task: "Write Vows", due: "In 1 week" },
                                { task: "Pay Final Balances", due: "In 2 weeks" }
                            ].map((task, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center cursor-pointer hover:border-black"></div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900 leading-none mb-1">{task.task}</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold">{task.due}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Emergency & Assistant */}
                <div className="w-80 flex flex-col gap-6 h-full overflow-hidden">
                     <RegistryPromoBox onClick={() => onNavigate('registry')} />
                     
                     {/* Emergency Kit */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col flex-1 min-h-0">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase size={16} className="text-red-500" /> Emergency Kit
                        </h4>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                            {[
                                { role: "Maid of Honor", name: "Sarah J.", phone: "555-0123" },
                                { role: "Best Man", name: "David M.", phone: "555-0198" },
                                { role: "Venue Manager", name: "Elena R.", phone: "555-0876" },
                                { role: "Sewing Kit", status: "Packed" },
                                { role: "First Aid", status: "Packed" },
                                { role: "Extra Shoes", status: "Missing" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">{item.role}</span>
                                    <span className={`font-bold ${item.status === 'Missing' ? 'text-red-500' : 'text-gray-900'}`}>
                                        {item.name || item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assistant - More Obvious Interaction Box */}
                    <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Map size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    Ops Concierge
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Logistics Command</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    I've identified a 15-minute gap in the vendor load-in schedule. Should I adjust?
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Resolve conflicts</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VendorsState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: () => void }) => {
    // Grouping the requested categories into logical columns based on user order
    const columns = [
        {
            groups: [
                {
                    title: "Décor & Florals",
                    items: ["Ceremony Arch", "Bouquets & Boutonnieres", "Table Centerpieces", "Installation Art"]
                },
                {
                    title: "Cake & Desserts",
                    items: ["Cake Design", "Tasting", "Dessert Table"]
                }
            ]
        },
        {
            groups: [
                {
                    title: "Catering & Bar Menu",
                    items: ["Menu Tasting", "Bar Package", "Service Staff"]
                },
                {
                    title: "Music, Band & DJ",
                    items: ["Ceremony Music", "Cocktail Hour Playlist", "Reception Band/DJ", "Do Not Play List"]
                }
            ]
        },
        {
            groups: [
                {
                    title: "Photography & Videography",
                    items: ["Photographer & Team", "Videography", "Short List & Mood board", "Engagement session"]
                },
                {
                    title: "Lighting and Production",
                    items: ["Uplighting", "Dance Floor Lighting", "Sound System"]
                }
            ]
        }
    ];

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
            <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
                 <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Vendor Team</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage bookings, contracts, and creative details.</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase hover:bg-gray-800 shadow-lg flex items-center gap-2">
                        <ListPlus size={14} /> Add Vendor
                    </button>
                 </div>
            </div>
            
            <div className="flex gap-8 h-full overflow-hidden">
                {/* Main Columns */}
                <div className="flex-1 grid grid-cols-3 gap-8 overflow-y-auto pr-2 pb-10">
                    {columns.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-8">
                            {col.groups.map((group, groupIdx) => (
                                <div key={groupIdx} className="flex flex-col gap-4">
                                    <h3 className="text-lg font-bold text-gray-900 border-b-2 border-black pb-2 mb-2 font-serif italic">{group.title}</h3>
                                    {group.items.map((item, i) => (
                                        <div key={i} className="group p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white hover:shadow-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-bold text-gray-800">{item}</span>
                                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full group-hover:border-black transition-colors" />
                                            </div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-yellow-400 transition-colors"></span>
                                                {item.includes("Mood board") ? "In Progress" : "Not Booked"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Logistics Sidebar */}
                <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={14} /> Vendor Timeline
                    </h3>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gray-100" />
                        {[
                            { time: "11:00 AM", event: "Florist Setup Begins" },
                            { time: "01:00 PM", event: "Catering Arrival" },
                            { time: "02:00 PM", event: "Photographer On-Site" },
                            { time: "03:30 PM", event: "Band Soundcheck" },
                            { time: "09:00 PM", event: "Late Night Snack" }
                        ].map((t, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="w-3 h-3 rounded-full bg-black border-2 border-white shadow-sm shrink-0 z-10" />
                                <div>
                                    <div className="text-xs font-bold text-gray-900">{t.time}</div>
                                    <div className="text-xs text-gray-500">{t.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Assistant - More Obvious Interaction Box */}
                    <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Briefcase size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    Contract Expert
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Vendor Manager</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    I can review your vendor contracts for hidden fees and risk clauses. Ready to upload?
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Review contracts</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BridalSuiteState = ({ onOpenChat, onBack, onNavigate }: { onOpenChat: () => void, onBack: () => void, onNavigate: (view: any) => void }) => {
    const sections = [
        {
            title: "Bridal Attire",
            items: ["Wedding Dress", "Reception Look", "Rehearsal Outfit", "Other Occasions"]
        },
        {
            title: "Beauty & Wellness",
            items: ["Hair & Makeup", "Day-Of Beauty", "Spa & Massage", "Manicure/Pedicure"]
        },
        {
            title: "Accessories",
            items: ["Shoes", "Veil & Headpieces", "Jewelry", "Garter"]
        }
    ];

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
            <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 hover:text-black mb-4 transition-colors tracking-widest">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Bridal Suite</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage your look, timeline, and party details.</p>
                 </div>
                 <div className="flex gap-2">
                    <button 
                        onClick={() => onNavigate('registry')}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2 relative group/reg"
                    >
                        <div className="relative">
                            <Gift size={14} />
                            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-black shadow-sm">
                                4
                            </div>
                        </div>
                        Gift Registry
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Share Lookbook
                    </button>
                 </div>
            </div>
            
            <div className="flex gap-8 h-full overflow-hidden">
                {/* Main Columns */}
                <div className="flex-1 grid grid-cols-3 gap-8 overflow-y-auto pr-2 pb-10">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-black pb-2 mb-2 font-serif italic">{section.title}</h3>
                            {section.items.map((item, i) => (
                                <div key={i} className="group p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white hover:shadow-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-gray-800">{item}</span>
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full group-hover:border-black transition-colors" />
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-yellow-400 transition-colors"></span>
                                        Pending
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Bridesmaids Section - Spans full width below */}
                    <div className="col-span-3 mt-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-black pb-2 mb-6 font-serif italic">Bridesmaids & Party</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((bm) => (
                                <div key={bm} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-900">Bridesmaid {bm}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Dress: Ordered</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline Sidebar */}
                <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={14} /> Personal Timeline
                    </h3>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gray-100" />
                        {[
                            { time: "09:00 AM", event: "Hair & Makeup" },
                            { time: "11:30 AM", event: "Dress Fitting" },
                            { time: "02:00 PM", event: "Photography" },
                            { time: "04:30 PM", event: "Ceremony Start" }
                        ].map((t, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="w-3 h-3 rounded-full bg-black border-2 border-white shadow-sm shrink-0 z-10" />
                                <div>
                                    <div className="text-xs font-bold text-gray-900">{t.time}</div>
                                    <div className="text-xs text-gray-500">{t.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Assistant - More Obvious Interaction Box */}
                    <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Sparkles size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    Style Concierge
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Style Assistant</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    I can help coordinate your palette with the bridal party looks. Shall we start?
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Coordinate colors</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GroomSuiteState = ({ onOpenChat, onBack, onNavigate }: { onOpenChat: () => void, onBack: () => void, onNavigate: (view: any) => void }) => {
    const sections = [
        {
            title: "Groom’s Attire",
            items: ["Tuxedo/Suit", "Reception Look", "Rehearsal Outfit", "Other Occasions"]
        },
        {
            title: "Grooming & Wellness",
            items: ["Haircut & Shave", "Skincare Prep", "Teeth Whitening", "Massage Therapy", "Manicure/Pedicure"]
        },
        {
            title: "Accessories",
            items: ["Cufflinks & Watch", "Shoes & Socks", "Tie/Bowties", "Belts/Suspenders"]
        }
    ];

    return (
        <div className="p-8 h-full flex flex-col w-full bg-white overflow-hidden">
            <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 hover:text-black mb-4 transition-colors tracking-widest">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight font-serif italic mb-2">Groom Suite</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage your look, timeline, and party details.</p>
                 </div>
                 <div className="flex gap-2">
                    <button 
                        onClick={() => onNavigate('registry')}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2 relative group/reg"
                    >
                        <div className="relative">
                            <Gift size={14} />
                            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-black shadow-sm">
                                4
                            </div>
                        </div>
                        Gift Registry
                    </button>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Share Lookbook
                    </button>
                 </div>
            </div>
            
            <div className="flex gap-8 h-full overflow-hidden">
                {/* Main Columns */}
                <div className="flex-1 grid grid-cols-3 gap-8 overflow-y-auto pr-2 pb-10">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-black pb-2 mb-2 font-serif italic">{section.title}</h3>
                            {section.items.map((item, i) => (
                                <div key={i} className="group p-4 border border-gray-200 rounded-xl hover:border-black transition-all cursor-pointer bg-gray-50 hover:bg-white hover:shadow-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-gray-800">{item}</span>
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full group-hover:border-black transition-colors" />
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-yellow-400 transition-colors"></span>
                                        Pending
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Groomsmen Section */}
                    <div className="col-span-3 mt-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-black pb-2 mb-6 font-serif italic">Groomsmen & Party</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((gm) => (
                                <div key={gm} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-900">Groomsman {gm}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Suit: Ordered</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline Sidebar */}
                <div className="w-80 border-l border-gray-100 pl-8 flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={14} /> Groom's Personal Timeline
                    </h3>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gray-100" />
                        {[
                            { time: "10:00 AM", event: "Barber Appointment" },
                            { time: "12:30 PM", event: "Suit Fitting" },
                            { time: "02:00 PM", event: "Photography" },
                            { time: "04:30 PM", event: "Ceremony Start" }
                        ].map((t, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="w-3 h-3 rounded-full bg-black border-2 border-white shadow-sm shrink-0 z-10" />
                                <div>
                                    <div className="text-xs font-bold text-gray-900">{t.time}</div>
                                    <div className="text-xs text-gray-500">{t.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Assistant - More Obvious Interaction Box */}
                    <div className="mt-auto">
                        <div 
                            onClick={onOpenChat}
                            className="bg-gray-50 p-6 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Briefcase size={20} />
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    Grooming Concierge
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Style Assistant</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    Ready to match your ties and accessories with the party theme. Want to see options?
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between h-12 px-5 bg-white border border-gray-100 rounded-2xl group-hover:border-black transition-colors">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Match accessories</span>
                                <ArrowRight size={14} className="text-gray-900 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SuccessState = ({ onRestart }: { onRestart: () => void }) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 w-full">
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
    >
      <Check size={48} strokeWidth={4} />
    </motion.div>
    
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Venue Added!</h2>
    <p className="text-gray-500 max-w-md mb-8">
      "The Grand Estate" has been added to your Vendors list. You can now compare it with other options or contact the host.
    </p>

    <div className="flex gap-4">
      <WireframeButton onClick={onRestart} label="Return to Dashboard" filled className="h-10 px-8" />
    </div>
  </div>
);

// --- Modals ---

const ViewProfileModal = ({ onClose, userProfilePic, setUserProfilePic }: { onClose: () => void, userProfilePic: string | null, setUserProfilePic: (url: string) => void }) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setUserProfilePic(url);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[600px] bg-white flex flex-col overflow-hidden relative shadow-2xl rounded-2xl my-auto shrink-0 border border-gray-100">
                {/* Header */}
                <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                            <User size={16} className="text-gray-900" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            View Profile
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">
                        <X size={16} />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-8 bg-white flex-1">
                    {/* Header Info */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 text-gray-900 font-bold text-4xl overflow-hidden">
                                {userProfilePic ? (
                                    <img src={userProfilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    "J"
                                )}
                            </div>
                            <label className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-[10px] font-bold uppercase tracking-widest text-center">
                                Edit<br/>Photo
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Jessica & Michael</h3>
                            <p className="text-sm text-gray-500 mb-3">jessica@email.com · michael@email.com</p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                <Sparkles size={10} className="text-gray-900" /> FREE PLAN
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-8" />

                    {/* Partners */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Partner 1</p>
                            <p className="text-sm font-bold text-gray-900 mb-1">Jessica Chen</p>
                            <p className="text-xs text-gray-500 mb-0.5">jessica@email.com</p>
                            <p className="text-xs text-gray-500">+1 (415) 555-0184</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Partner 2</p>
                            <p className="text-sm font-bold text-gray-900 mb-1">Michael Torres</p>
                            <p className="text-xs text-gray-500 mb-0.5">michael@email.com</p>
                            <p className="text-xs text-gray-500">+1 (628) 555-0217</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-16 bg-gray-50 border-t border-gray-100 flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all">
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Container ---

export const LowFiPrototype = () => {
  const [step, setStep] = useState<'landing' | 'dashboard' | 'search' | 'detail' | 'success' | 'guests' | 'registry' | 'timeline' | 'budget' | 'bridal' | 'groom' | 'vendors'>('landing');
  const [chatState, setChatState] = useState<{ open: boolean, intent?: string }>({ open: false });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePosition, setProfilePosition] = useState({ top: 0, right: 0 });
  const [userProfilePic, setUserProfilePic] = useState<string | null>("https://images.unsplash.com/photo-1706565029539-a6dd5496ee30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwY291cGxlJTIwc21pbGluZyUyMHRvZ2V0aGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjU0NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setProfilePosition({ top: rect.bottom - 100, right: rect.right + 20 }); // Adjusted for sidebar position
      setIsProfileOpen(!isProfileOpen);
  };

  const handleOpenChat = (intent?: string) => {
      setChatState({ open: true, intent });
  };

  return (
    <div className="w-[1440px] h-[1024px] bg-white flex flex-col overflow-hidden relative font-sans text-gray-900 shadow-2xl shrink-0 selection:bg-black selection:text-white" onClick={() => setIsProfileOpen(false)}>
        {/* Floating AI Button */}
        {step !== 'landing' && <VowAIFloatingButton onClick={() => setChatState({ open: !chatState.open })} />}
        
        {/* Top Navigation */}
        {step !== 'landing' && (
            <NavBar 
                onLogoClick={() => setStep('landing')} 
                onNavigate={setStep}
                onProfileClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick(e);
                }}
                currentStep={step}
                userProfilePic={userProfilePic}
            />
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative w-full flex flex-col bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full flex-1 flex flex-col"
            >
              {step === 'landing' && <LandingState onEnter={() => setStep('dashboard')} />}
              {step === 'dashboard' && <DashboardState onNavigate={setStep} onOpenChat={handleOpenChat} />}
              {step === 'search' && <SearchResultsState onSelect={() => setStep('detail')} onBack={() => setStep('dashboard')} onOpenChat={() => handleOpenChat()} />}
              {step === 'detail' && <VenueDetailState onAction={() => setStep('success')} onBack={() => setStep('search')} />}
              {step === 'success' && <SuccessState onRestart={() => setStep('dashboard')} />}
              {step === 'guests' && <GuestsState onBack={() => setStep('dashboard')} onOpenChat={() => handleOpenChat()} onNavigate={setStep} />}
              {step === 'registry' && <RegistryState onBack={() => setStep('dashboard')} onOpenChat={() => handleOpenChat()} />}
              {step === 'timeline' && <TimelineState onBack={() => setStep('dashboard')} onOpenChat={() => handleOpenChat()} onNavigate={setStep} />}
              {step === 'budget' && <BudgetState onBack={() => setStep('dashboard')} onOpenChat={() => handleOpenChat()} />}
              {step === 'bridal' && <BridalSuiteState onOpenChat={() => handleOpenChat()} onBack={() => setStep('dashboard')} onNavigate={setStep} />}
              {step === 'groom' && <GroomSuiteState onOpenChat={() => handleOpenChat()} onBack={() => setStep('dashboard')} onNavigate={setStep} />}
              {step === 'vendors' && <VendorsState onBack={() => setStep('dashboard')} onOpenChat={() => handleOpenChat()} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {step !== 'landing' && <Footer />}

        <AnimatePresence>
            {chatState.open && <ChatOverlay onClose={() => setChatState({ ...chatState, open: false })} intent={chatState.intent} />}
            {isProfileOpen && <ProfileDropdown onClose={() => setIsProfileOpen(false)} position={profilePosition} onOpenProfile={() => setShowProfileModal(true)} userProfilePic={userProfilePic} />}
            {showProfileModal && (
                <ViewProfileModal 
                    onClose={() => setShowProfileModal(false)} 
                    userProfilePic={userProfilePic} 
                    setUserProfilePic={setUserProfilePic} 
                />
            )}
        </AnimatePresence>
    </div>
  );
};
