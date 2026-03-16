import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, Check, Sparkles, Upload, X, GripHorizontal, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// --- Mood Board DND Types & Components ---
const ItemTypes = { MOOD_ITEM: 'moodItem' };

// --- Constants ---
const SUITE_COLORS = [
  { name: 'Champagne', hex: '#C9A84C' },
  { name: 'Blush', hex: '#F2D4CF' },
  { name: 'Sky Blue', hex: '#C9DCE8' },
  { name: 'Lavender', hex: '#DDD4E8' },
  { name: 'Taupe', hex: '#9B8F8A' },
  { name: 'Sage', hex: '#4CAF7C' },
  { name: 'Charcoal', hex: '#3D3535' },
  { name: 'Rose Red', hex: '#C9564C' },
  { name: 'Navy', hex: '#1A1A2E' },
  { name: 'Ivory', hex: '#FAF7F2' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
];

const SUITE_STYLES = [
  { name: 'Classic', bg: '#F9F7F3', textBg: 'bg-[#F4EFE6]' },
  { name: 'Modern', bg: '#FFFFFF', textBg: 'bg-white' },
  { name: 'Rustic', bg: '#F4F0E8', textBg: 'bg-[#F4F0E8] border-dashed' },
  { name: 'Luxe', bg: '#1A1A2E', forceText: '#FFFFFF', textBg: 'bg-[#1A1A2E]' },
  { name: 'Minimalist', bg: '#FAFAFA', textBg: 'bg-[#FAFAFA]' },
  { name: 'Vintage', bg: '#F2D4CF', textBg: 'bg-[#F2D4CF]' },
  { name: 'Botanical', bg: '#EAF0EB', textBg: 'bg-[#EAF0EB]', forceText: '#2D4A3E' },
  { name: 'Floral', bg: '#FDF6F7', textBg: 'bg-[#FDF6F7]' },
];

const DraggableItem = ({ id, url, type, color, text }: { id: string, url?: string, type: 'image' | 'color' | 'text', color?: string, text?: string }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.MOOD_ITEM,
    item: { id, url, type, color, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (type === 'image') {
    return (
      <div ref={dragRef as any} className={`cursor-grab active:cursor-grabbing w-full aspect-square rounded-xl overflow-hidden border-2 hover:border-[#C9A84C] transition-all shadow-sm ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
        <img src={url} alt="Inspiration" className="w-full h-full object-cover pointer-events-none" />
      </div>
    );
  }
  if (type === 'color') {
    return (
      <div ref={dragRef as any} className={`cursor-grab active:cursor-grabbing w-full aspect-square rounded-full shadow-sm hover:scale-110 transition-all border-2 border-white ring-1 ring-black/10 ${isDragging ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundColor: color }} />
    );
  }
  return null;
};

const InvitationSuiteDesignContent = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'Mood Board' | 'Style' | 'Colours' | 'Fonts' | 'Wording'>('Mood Board');
  const [previewMode, setPreviewMode] = useState<'Invitation Card' | 'Envelope'>('Invitation Card');
  
  // Mood Board State
  const [boardItems, setBoardItems] = useState<{id: string, url?: string, type: string, color?: string, text?: string, x: number, y: number}[]>(() => {
    try {
      const saved = localStorage.getItem('vowtrack_boardItems');
      return saved ? JSON.parse(saved) : [];
    } catch(e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vowtrack_boardItems', JSON.stringify(boardItems));
  }, [boardItems]);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.MOOD_ITEM,
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const initialClientOffset = monitor.getInitialClientOffset();
      const clientOffset = monitor.getClientOffset();
      
      // Calculate drop position relative to the board
      // Assuming a simplistic approach for demonstration
      if (!clientOffset) return;
      
      setBoardItems(prev => {
        const existing = prev.find(p => p.id === item.id);
        if (existing) {
          // If already on board, update position
          return prev.map(p => p.id === item.id ? { ...p, x: p.x + (delta?.x || 0), y: p.y + (delta?.y || 0) } : p);
        } else {
          // It's a new drop onto the board!
          // Smart update feature: change suite style and colors based on mood board inspiration
          if (item.type === 'color' && item.color) {
            const matchedColor = SUITE_COLORS.find(c => c.hex.toLowerCase() === item.color.toLowerCase());
            if (matchedColor) {
              setTimeout(() => {
                setAccentColor(matchedColor);
                setProgress(p => ({ ...p, colors: true }));
                toast.success(`Colour palette updated to ${matchedColor.name}`);
              }, 0);
            }
          } else if (item.type === 'image' && item.url) {
            let newStyle = null;
            if (item.url.includes('1769523198723')) newStyle = SUITE_STYLES.find(s => s.name === 'Luxe'); // Wax seal
            else if (item.url.includes('1542617270')) newStyle = SUITE_STYLES.find(s => s.name === 'Vintage'); // Calligraphy
            else if (item.url.includes('1631084854605')) newStyle = SUITE_STYLES.find(s => s.name === 'Botanical'); // Floral liner
            else if (item.url.includes('1705362150355')) newStyle = SUITE_STYLES.find(s => s.name === 'Modern'); // Flatlay
            
            if (newStyle) {
              setTimeout(() => {
                setSuiteStyle(newStyle);
                setProgress(p => ({ ...p, style: true }));
                toast.success(`Suite style adapted to ${newStyle.name}`);
              }, 0);
            }
          }

          // 420 is sidebar width, + padding
          const dropX = clientOffset.x - 450; 
          const dropY = clientOffset.y - 120;
          return [...prev, { ...item, id: item.id + '-' + Date.now(), x: Math.max(0, dropX), y: Math.max(0, dropY) }];
        }
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Progress tracking for checkboxes
  const [progress, setProgress] = useState({
    style: false,
    colors: false,
    fonts: false,
    submitted: false
  });

  // Wording State (starts empty to force user interaction for progress checklist)
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [dateLine, setDateLine] = useState('');
  const [year, setYear] = useState('');
  const [venueName, setVenueName] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [preamble, setPreamble] = useState('');
  const [requestLine, setRequestLine] = useState('');

  // Fallback display values for the live preview
  const displayPartner1 = partner1 || 'Jessica Chen';
  const displayPartner2 = partner2 || 'Michael Torres';
  const displayDateLine = dateLine || 'Saturday, the Twenty-Fourth of October';
  const displayYear = year || 'Two Thousand and Twenty Six';
  const displayVenueName = venueName || 'The Grand Estate';
  const displayVenueLocation = venueLocation || 'Napa Valley, California';
  const displayPreamble = preamble || 'Together with their families';
  const displayRequestLine = requestLine || 'REQUEST THE HONOUR OF YOUR PRESENCE';

  // Colors State
  const [accentColor, setAccentColor] = useState(SUITE_COLORS[0]); // Champagne
  const [fontColor, setFontColor] = useState(SUITE_COLORS[6]); // Charcoal

  // Fonts State
  const fonts = [
    { name: 'Playfair', display: 'Jessica & Michael', family: '"Playfair Display", serif', class: 'font-serif' },
    { name: 'Cormorant', display: 'Jessica & Michael', family: '"Cormorant Garamond", serif', class: 'font-serif italic' },
    { name: 'Bodoni', display: 'Jessica & Michael', family: '"Bodoni MT", "Didot", serif', class: 'font-serif' },
    { name: 'Cinzel', display: 'JESSICA & MICHAEL', family: '"Cinzel", serif', class: 'font-serif uppercase tracking-widest' },
    { name: 'Dancing Script', display: 'Jessica & Michael', family: '"Dancing Script", "Great Vibes", cursive', class: 'text-4xl' },
    { name: 'Alex Brush', display: 'Jessica & Michael', family: '"Alex Brush", cursive', class: 'text-4xl' },
    { name: 'Montserrat', display: 'JESSICA & MICHAEL', family: '"Montserrat", "Inter", sans-serif', class: 'font-sans uppercase tracking-[0.2em] text-sm' },
    { name: 'Inter Minimal', display: 'Jessica & Michael', family: '"Inter", sans-serif', class: 'font-sans tracking-tight font-light' },
  ];
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  // Style & Elements State
  const [suiteStyle, setSuiteStyle] = useState(SUITE_STYLES[0]);
  
  const [elements, setElements] = useState({
    innerBorder: true,
    cornerAccents: true,
    goldDivider: true
  });

  const [customBackground, setCustomBackground] = useState<string | null>(null);

  const toggleElement = (key: keyof typeof elements) => {
    setElements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
  };

  const handleSubmit = () => {
    setProgress(p => ({ ...p, submitted: true }));
    toast.success('Design submitted to your planner');
  };

  // Derived preview styles
  const currentFontColor = suiteStyle.forceText || fontColor.hex;
  // Use a brighter gold (#E8B923) for Luxe emphasis so it pops against the dark background
  const emphasisColor = suiteStyle.name === 'Luxe' ? '#E8B923' : accentColor.hex;
  
  // Base rendering class for the bouncing rounded boxes
  const actionBoxClass = "bg-white border-2 border-transparent rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm flex flex-col cursor-pointer overflow-hidden";
  const actionBoxActiveClass = "border-[#C9A84C] shadow-[0_8px_30px_rgb(201,168,76,0.15)] ring-1 ring-[#C9A84C]/50";

  // Dynamic Checklist Logic
  const checklistItems = [
    { label: 'Suite style selected', done: progress.style, step: '1' },
    { label: 'Names entered', done: partner1.trim().length > 0 && partner2.trim().length > 0, step: '2' },
    { label: 'Wording finalised', done: dateLine.trim().length > 0 && venueName.trim().length > 0, step: '3' },
    { label: 'Colour palette chosen', done: progress.colors, step: '4' },
    { label: 'Font selected', done: progress.fonts, step: '5' },
    { label: 'Submitted to planner', done: progress.submitted, step: '6' },
  ];

  let firstIncompleteFound = false;
  const checklist = checklistItems.map(item => {
    if (!item.done && !firstIncompleteFound) {
      firstIncompleteFound = true;
      return { ...item, active: true };
    }
    return { ...item, active: false };
  });

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF7F2] text-charcoal font-sans overflow-hidden">
      {/* Header */}
        <header className="flex items-center justify-between px-8 h-24 shrink-0 bg-transparent">
          <button 
            onClick={onBack}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] transition-colors tracking-widest"
        >
          <ChevronLeft size={14} strokeWidth={2.5} /> BACK
        </button>
        
        <div className="font-serif text-[32px] font-bold italic text-navy tracking-tight drop-shadow-sm">
          VowTrack
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={handleSaveDraft} className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-navy bg-white border border-[#E2D8C8] rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all shadow-sm">
            Save Draft
          </button>
        </div>
      </header>

      {/* Main Content Area - Padding for floating effect */}
      <div className="flex flex-1 overflow-hidden px-8 pb-8 gap-6">
        
        {/* Left Sidebar - Controls */}
        <aside className="w-[420px] flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgb(201,168,76,0.08)] border border-[#C9A84C]/20 overflow-hidden shrink-0">
          <div className="p-8 pb-4 border-b border-[#E2D8C8] bg-gradient-to-b from-[#F9F7F3] to-white">
            <h1 className="text-[28px] font-serif font-bold text-black mb-2 flex items-center gap-2">
              <Sparkles className="text-[#C9A84C]" size={24} /> Design Your Suite
            </h1>
            <p className="text-taupe text-sm leading-relaxed">
              Customise every detail — your planner reviews and finalises before printing.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-4 border-b border-[#E2D8C8] gap-1 bg-white shrink-0 overflow-x-auto custom-scrollbar">
            {['Mood Board', 'Style', 'Colours', 'Fonts', 'Wording'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 min-w-max px-2 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-[#C9A84C] text-white shadow-md' 
                    : 'text-taupe hover:bg-[#FAF7F2] hover:text-navy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {activeTab === 'Mood Board' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Inspiration Elements</h3>
                  <p className="text-xs text-taupe mb-4">Drag elements onto your canvas to build a vision board for your suite.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <DraggableItem id="img1" url="https://images.unsplash.com/photo-1769523198723-7788b3d25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXglMjBzZWFsJTIwc3RhbXAlMjBlbnZlbG9wZXxlbnwxfHx8fDE3NzMxNzE3MTZ8MA&ixlib=rb-4.1.0&q=80&w=400" type="image" />
                    <DraggableItem id="img2" url="https://images.unsplash.com/photo-1542617270-267b0f5a56da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FsbGlncmFwaHklMjBpbnZpdGF0aW9ufGVufDF8fHx8MTc3MzE3MTcxNnww&ixlib=rb-4.1.0&q=80&w=400" type="image" />
                    <DraggableItem id="img3" url="https://images.unsplash.com/photo-1631084854605-2ea7de264ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZW52ZWxvcGUlMjBsaW5lciUyMGZsb3JhbHxlbnwxfHx8fDE3NzMxNzE3MjF8MA&ixlib=rb-4.1.0&q=80&w=400" type="image" />
                    <DraggableItem id="img4" url="https://images.unsplash.com/photo-1705362150355-fb43eeda02be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwc3RhdGlvbmVyeSUyMGZsYXRsYXl8ZW58MXx8fHwxNzczMTcxNzIxfDA&ixlib=rb-4.1.0&q=80&w=400" type="image" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 border-t border-[#E2D8C8] pt-8">Texture & Colour</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <DraggableItem id="col1" type="color" color="#C9A84C" />
                    <DraggableItem id="col2" type="color" color="#FAF7F2" />
                    <DraggableItem id="col3" type="color" color="#9B8F8A" />
                    <DraggableItem id="col4" type="color" color="#3D3535" />
                    <DraggableItem id="col5" type="color" color="#F2D4CF" />
                    <DraggableItem id="col6" type="color" color="#EAF0EB" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Style' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Suite Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {SUITE_STYLES.map(style => (
                      <div 
                        key={style.name}
                        onClick={() => {
                          setSuiteStyle(style);
                          setProgress(p => ({ ...p, style: true }));
                        }}
                        className={`${actionBoxClass} ${suiteStyle.name === style.name ? actionBoxActiveClass : 'border-[#E2D8C8]'}`}
                      >
                        <div className="relative p-4 flex flex-col items-center gap-3">
                          {suiteStyle.name === style.name && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#C9A84C] rounded-full text-white flex items-center justify-center shadow-sm">
                              <Check size={12} />
                            </div>
                          )}
                          <div className={`w-full h-16 rounded border border-[#E2D8C8] flex items-center justify-center ${style.textBg}`}>
                             <span className={`text-xl font-serif italic ${style.name === 'Luxe' ? 'text-[#E8B923]' : 'text-taupe'}`}>Ag</span>
                          </div>
                          <span className="text-xs font-bold text-black uppercase tracking-widest">{style.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 border-t border-[#E2D8C8] pt-8">Card Elements</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'innerBorder', label: 'Inner border frame' },
                      { key: 'cornerAccents', label: 'Corner accents' },
                      { key: 'goldDivider', label: 'Divider lines' },
                    ].map(item => (
                      <label key={item.key} className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl border border-[#E2D8C8] hover:border-[#C9A84C]/50 hover:bg-[#FAF7F2] transition-all" onClick={() => toggleElement(item.key as keyof typeof elements)}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${elements[item.key as keyof typeof elements] ? 'bg-[#C9A84C] text-white shadow-inner' : 'bg-white border-2 border-[#E2D8C8]'}`}>
                          {elements[item.key as keyof typeof elements] && <Check size={14} />}
                        </div>
                        <span className="text-sm text-black font-medium group-hover:text-[#C9A84C] transition-colors">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 border-t border-[#E2D8C8] pt-8">Custom Background</h3>
                  <div className="flex flex-col gap-3">
                    {!customBackground ? (
                      <label className="flex items-center justify-center gap-2 w-full p-4 rounded-xl border-2 border-dashed border-[#E2D8C8] hover:border-[#C9A84C] hover:bg-[#FAF7F2] transition-colors cursor-pointer text-taupe hover:text-[#C9A84C]">
                        <Upload size={16} className="text-[#C9A84C]" />
                        <span className="text-sm font-medium">Upload Background Pattern</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    ) : (
                      <div className="relative w-full h-24 rounded-xl border-2 border-[#C9A84C] overflow-hidden group">
                        <div 
                          className="absolute inset-0 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${customBackground})` }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => setCustomBackground(null)}
                            className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <X size={16} className="text-[#C9A84C]" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Colours' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Accent Colour</h3>
                  <p className="text-xs text-taupe mb-6">Used for borders, lines, and envelope details.</p>
                  <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                    {SUITE_COLORS.map(color => (
                      <div key={color.name} className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => {
                            setAccentColor(color);
                            setProgress(p => ({ ...p, colors: true }));
                          }}
                          className={`w-14 h-14 rounded-full transition-all shadow-sm ${
                            accentColor.name === color.name 
                              ? 'ring-4 ring-offset-2 ring-[#C9A84C] scale-110' 
                              : 'border border-black/10 hover:scale-110 hover:shadow-md'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {accentColor.name === color.name && (
                            <div className="flex h-full items-center justify-center text-white mix-blend-difference drop-shadow-md">
                              <Check size={20} color={['White', 'Ivory', 'Champagne', 'Sky Blue'].includes(color.name) ? 'black' : 'white'} />
                            </div>
                          )}
                        </button>
                        <span className="text-[10px] font-bold text-black uppercase tracking-widest text-center mt-2">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Fonts' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Typography Style</h3>
                  <div className="space-y-3">
                    {fonts.map(font => (
                      <button
                        key={font.name}
                        onClick={() => {
                          setSelectedFont(font);
                          setProgress(p => ({ ...p, fonts: true }));
                        }}
                        className={`w-full p-5 flex items-center justify-between rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 shadow-sm ${
                          selectedFont.name === font.name
                            ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-[0_8px_30px_rgb(201,168,76,0.15)]'
                            : 'border-[#E2D8C8] bg-white hover:border-[#C9A84C]/50'
                        }`}
                      >
                        <span className={`text-xl text-black ${font.class}`} style={{ fontFamily: font.family }}>
                           {font.display}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-taupe bg-white/80 px-2 py-1 rounded">
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 border-t border-[#E2D8C8] pt-8">Font Colour</h3>
                  {suiteStyle.forceText ? (
                    <p className="text-xs text-[#C9A84C] bg-[#C9A84C]/10 p-4 rounded-xl border border-[#C9A84C]/20 font-medium">
                      The selected suite style ({suiteStyle.name}) enforces a specific text colour for readability.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {SUITE_COLORS.map(color => (
                        <button
                          key={'font-'+color.name}
                          onClick={() => {
                            setFontColor(color);
                            setProgress(p => ({ ...p, fonts: true }));
                          }}
                          className={`w-10 h-10 rounded-full transition-all shadow-sm ${
                            fontColor.name === color.name 
                              ? 'ring-2 ring-offset-2 ring-black scale-110' 
                              : 'border border-black/10 hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {fontColor.name === color.name && (
                            <div className="flex h-full items-center justify-center mix-blend-difference">
                              <Check size={16} color={['White', 'Ivory'].includes(color.name) ? 'black' : 'white'} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Wording' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Names</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Partner 1 Name</label>
                      <input 
                        type="text" 
                        value={partner1} 
                        onChange={(e) => setPartner1(e.target.value)}
                        placeholder="Jessica Chen"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Partner 2 Name</label>
                      <input 
                        type="text" 
                        value={partner2} 
                        onChange={(e) => setPartner2(e.target.value)}
                        placeholder="Michael Torres"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 border-t border-[#E2D8C8] pt-8">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Date Line</label>
                      <input 
                        type="text" 
                        value={dateLine} 
                        onChange={(e) => setDateLine(e.target.value)}
                        placeholder="Saturday, the Twenty-Fourth of October"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Year</label>
                      <input 
                        type="text" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Two Thousand and Twenty Six"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Venue Name</label>
                      <input 
                        type="text" 
                        value={venueName} 
                        onChange={(e) => setVenueName(e.target.value)}
                        placeholder="The Grand Estate"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Venue Location</label>
                      <input 
                        type="text" 
                        value={venueLocation} 
                        onChange={(e) => setVenueLocation(e.target.value)}
                        placeholder="Napa Valley, California"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 border-t border-[#E2D8C8] pt-8">Additional Text</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Opening Preamble</label>
                      <input 
                        type="text" 
                        value={preamble} 
                        onChange={(e) => setPreamble(e.target.value)}
                        placeholder="Together with their families"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-2">Request Line</label>
                      <input 
                        type="text" 
                        value={requestLine} 
                        onChange={(e) => setRequestLine(e.target.value)}
                        placeholder="REQUEST THE HONOUR OF YOUR PRESENCE"
                        className="w-full h-12 bg-[#FAF7F2] border-2 border-[#E2D8C8] rounded-xl px-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-black font-medium placeholder:text-taupe/60"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Center Panel - Live Preview */}
        <main className="flex-1 bg-[#E8E4DB] rounded-2xl flex flex-col relative overflow-hidden shadow-inner border border-[#C9A84C]/10">
          
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          {activeTab === 'Mood Board' ? (
            <div ref={dropRef as any} className={`flex-1 relative overflow-hidden transition-colors ${isOver ? 'bg-[#C9A84C]/10' : ''}`}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {boardItems.length === 0 && (
                   <div className="text-center text-taupe/60 flex flex-col items-center gap-4 animate-pulse">
                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-taupe/40 flex items-center justify-center">
                       <ImageIcon size={24} className="text-[#C9A84C]" />
                     </div>
                     <span className="text-sm font-medium">Drag inspiration here</span>
                   </div>
                 )}
              </div>
              
              {boardItems.map(item => (
                <div 
                  key={item.id} 
                  className="absolute cursor-grab active:cursor-grabbing shadow-xl transition-all hover:scale-105 hover:z-50"
                  style={{ left: item.x, top: item.y, zIndex: 10 }}
                >
                  {item.type === 'image' && (
                    <div className="w-48 h-48 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-white p-2">
                       <img src={item.url} className="w-full h-full object-cover rounded" draggable={false} />
                    </div>
                  )}
                  {item.type === 'color' && (
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: item.color }} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Toggle View */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
                <div className="flex bg-white rounded-full shadow-lg overflow-hidden p-1.5 gap-1 border border-[#E2D8C8]">
                  <button 
                    onClick={() => setPreviewMode('Invitation Card')}
                    className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                      previewMode === 'Invitation Card' 
                        ? 'bg-navy text-white shadow-sm' 
                        : 'text-taupe hover:text-navy hover:bg-[#FAF7F2]'
                    }`}
                  >
                Invitation Card
              </button>
              <button 
                onClick={() => setPreviewMode('Envelope')}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                  previewMode === 'Envelope' 
                    ? 'bg-navy text-white shadow-sm' 
                    : 'text-taupe hover:text-navy hover:bg-[#FAF7F2]'
                }`}
              >
                Envelope
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-12 overflow-y-auto mt-16 relative z-10 custom-scrollbar">
            <div className="animate-in zoom-in-95 duration-500">
              {previewMode === 'Invitation Card' ? (
                // Invitation Card Preview
                <div 
                  className="w-[480px] aspect-[5/7] shadow-2xl relative p-12 flex flex-col items-center text-center justify-between transition-colors duration-500 bg-cover bg-center"
                  style={{ 
                    backgroundColor: suiteStyle.bg, 
                    color: currentFontColor,
                    backgroundImage: customBackground ? `url(${customBackground})` : undefined
                  }}
                >
                  {/* Decorative Borders based on toggles */}
                  {elements.innerBorder && (
                    <div className="absolute inset-6 border" style={{ borderColor: emphasisColor, opacity: suiteStyle.name === 'Luxe' ? 0.4 : 0.4 }}></div>
                  )}
                  {elements.cornerAccents && (
                    <>
                      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l" style={{ borderColor: emphasisColor }}></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r" style={{ borderColor: emphasisColor }}></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l" style={{ borderColor: emphasisColor }}></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r" style={{ borderColor: emphasisColor }}></div>
                    </>
                  )}

                  <div className="flex flex-col items-center mt-6 z-10 w-full">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 mb-8 w-full justify-center" style={{ color: emphasisColor }}>
                      <span className="w-8 h-[1px]" style={{ backgroundColor: emphasisColor }}></span> 
                      INVITATION 
                      <span className="w-8 h-[1px]" style={{ backgroundColor: emphasisColor }}></span>
                    </div>
                    <p className="text-[11px] uppercase tracking-widest mb-8 max-w-[80%] leading-relaxed" style={{ opacity: suiteStyle.name === 'Luxe' ? 0.9 : 0.8 }}>
                      {displayPreamble}
                    </p>
                    
                    <div className="w-full px-4 mb-2">
                      <h2 className={selectedFont.class} style={{ fontFamily: selectedFont.family, fontSize: selectedFont.name.includes('Script') || selectedFont.name.includes('Brush') ? '3.5rem' : '2.5rem', lineHeight: '1.2', color: suiteStyle.name === 'Luxe' ? emphasisColor : currentFontColor }}>
                        {displayPartner1}
                      </h2>
                      <span className="text-2xl font-serif italic my-3 block" style={{ color: emphasisColor }}>&</span>
                      <h2 className={selectedFont.class} style={{ fontFamily: selectedFont.family, fontSize: selectedFont.name.includes('Script') || selectedFont.name.includes('Brush') ? '3.5rem' : '2.5rem', lineHeight: '1.2', color: suiteStyle.name === 'Luxe' ? emphasisColor : currentFontColor }}>
                        {displayPartner2}
                      </h2>
                    </div>

                    {elements.goldDivider && (
                      <div className="w-16 h-[1px] my-8" style={{ backgroundColor: emphasisColor, opacity: suiteStyle.name === 'Luxe' ? 0.8 : 0.5 }}></div>
                    )}

                    <p className="text-[9px] uppercase tracking-[0.2em] px-8 leading-loose" style={{ opacity: suiteStyle.name === 'Luxe' ? 0.9 : 0.8 }}>
                      {displayRequestLine}
                    </p>
                  </div>

                  <div className="flex flex-col items-center z-10 w-full mb-4">
                    <h3 className="text-lg font-serif mb-2 font-medium" style={{ color: suiteStyle.name === 'Luxe' ? emphasisColor : currentFontColor }}>
                      {displayDateLine}
                    </h3>
                    <p className="text-sm font-serif mb-6" style={{ color: suiteStyle.name === 'Luxe' ? emphasisColor : currentFontColor, opacity: suiteStyle.name === 'Luxe' ? 0.9 : 0.9 }}>
                      {displayYear}
                    </p>

                    {elements.goldDivider && (
                      <div className="w-16 h-[1px] mb-6" style={{ backgroundColor: emphasisColor, opacity: suiteStyle.name === 'Luxe' ? 0.8 : 0.5 }}></div>
                    )}

                    <p className="text-xs tracking-widest mb-1 uppercase font-medium">
                      {displayVenueName}
                    </p>
                    <p className="text-xs tracking-widest mb-8 uppercase" style={{ opacity: suiteStyle.name === 'Luxe' ? 0.9 : 0.8 }}>
                      {displayVenueLocation}
                    </p>

                    <p className="text-[8px] font-bold uppercase tracking-[0.2em]" style={{ opacity: suiteStyle.name === 'Luxe' ? 0.7 : 0.6 }}>
                      BLACK TIE OPTIONAL · SIX O'CLOCK IN THE EVENING
                    </p>
                  </div>
                </div>
              ) : (
                // Envelope Preview
                <div 
                  className="w-[540px] aspect-[7/5] shadow-2xl relative flex flex-col items-center justify-center p-12 overflow-hidden transition-colors duration-500 border border-black/5"
                  style={{ backgroundColor: '#F9F7F3' }}
                >
                  {/* Envelope Flap Illusion */}
                  <div className="absolute top-0 left-0 right-0 h-[45%] border-b shadow-sm" style={{ backgroundColor: '#FAF7F2', borderColor: '#E2D8C8', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                  
                  {/* Wax Seal */}
                  <div 
                    className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center absolute top-[45%] -translate-y-1/2 z-10 border-2 border-white/20"
                    style={{ backgroundColor: emphasisColor }}
                  >
                    <span className="font-serif text-white text-lg font-bold tracking-widest drop-shadow-md">
                      {displayPartner1[0]}&{displayPartner2[0]}
                    </span>
                  </div>

                  <div className="mt-20 text-center z-10 flex flex-col items-center">
                    <h3 className="text-2xl font-serif mb-3 italic" style={{ color: fontColor.hex }}>
                      Mr. & Mrs. James Whitfield
                    </h3>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: fontColor.hex, opacity: 0.8 }}>
                      42 Elmwood Avenue
                    </p>
                    <p className="text-xs uppercase tracking-widest mb-8" style={{ color: fontColor.hex, opacity: 0.8 }}>
                      San Francisco, California 94102
                    </p>
                    
                    <div className="px-6 py-2 border rounded" style={{ borderColor: emphasisColor, backgroundColor: emphasisColor + '10' }}>
                      <p className="text-[8px] uppercase tracking-[0.2em] font-bold" style={{ color: fontColor.hex }}>
                        FROM: {displayPartner1.toUpperCase()} & {displayPartner2.toUpperCase()} · RETURN ADDRESS
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          </>
          )}
        </main>

        {/* Right Sidebar - Status */}
        <aside className="w-[340px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(201,168,76,0.08)] border border-[#C9A84C]/20 overflow-y-auto shrink-0 flex flex-col relative custom-scrollbar">
          <div className="p-8 flex flex-col gap-8">
            <div>
              <h2 className="text-[22px] font-serif font-bold text-black mb-2">Design Progress</h2>
              <p className="text-xs text-taupe mb-8 leading-relaxed">
                Complete all steps before submitting to your planner.
              </p>

              <div className="space-y-5">
                {checklist.map((item, i) => (
                  <div key={i} className="flex flex-col relative">
                    <div className="flex items-center gap-4 z-10 bg-white">
                      {item.done ? (
                        <div className="w-6 h-6 rounded-full bg-[#4CAF7C] text-white flex items-center justify-center shrink-0 shadow-sm border border-[#4CAF7C]">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : item.active ? (
                        <div className="w-6 h-6 rounded-full bg-[#C9A84C] text-white flex items-center justify-center shrink-0 text-[10px] font-bold shadow-sm border border-[#C9A84C]">
                          {item.step}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-[#E2D8C8] text-taupe flex items-center justify-center shrink-0 text-[10px] font-bold">
                          {item.step}
                        </div>
                      )}
                      <span className={`text-sm font-medium ${item.done ? 'text-taupe line-through decoration-taupe/40' : item.active ? 'text-black font-bold' : 'text-taupe'}`}>
                        {item.label}
                      </span>
                    </div>
                    {i < 5 && <div className="absolute top-6 left-3 bottom-[-24px] w-[2px] bg-[#E2D8C8] -z-0" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#C9A84C]/30 flex flex-col gap-3 relative overflow-hidden group hover:border-[#C9A84C] transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A84C]"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                   <div className="w-full h-full bg-[#FAF7F2] flex items-center justify-center text-[#C9A84C] font-serif font-bold text-lg">VA</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-black">VowAi Concierge</div>
                  <div className="text-[10px] text-taupe font-bold uppercase tracking-widest">AI Assistant</div>
                </div>
              </div>
              <p className="text-[11.5px] text-charcoal italic leading-relaxed pt-2">
                "Take your time with the wording — it sets the tone for everything! Once you submit I'll review within 24 hrs and suggest any tweaks before we go to print."
              </p>
            </div>

            {/* This box is pushed up to avoid VowAI icon clash */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#C9A84C] flex flex-col items-center text-center gap-4 shadow-[0_8px_30px_rgb(201,168,76,0.12)] relative overflow-hidden mt-6">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#C9A84C]/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#C9A84C]/5 rounded-full blur-xl"></div>
              
              <h3 className="text-xl font-serif font-bold text-black relative z-10">Ready to submit?</h3>
              <p className="text-[11px] text-taupe leading-relaxed mb-1 relative z-10 px-2">
                Your planner will review your design brief and confirm next steps within 24 hours.
              </p>
              <button 
                onClick={handleSubmit} 
                className="w-full py-3.5 bg-[#C9A84C] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#b09140] hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 relative z-10"
              >
                SUBMIT TO PLANNER <ArrowLeft size={14} className="rotate-180 text-[#C9A84C]" />
              </button>
            </div>
            
            {/* Spacer to allow scrolling past the VowAI icon which is typically absolute bottom-6 right-12 */}
            <div className="h-24 shrink-0"></div>
          </div>
        </aside>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E2D8C8;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #C9A84C;
        }
      `}</style>
      </div>
  );
};

export const InvitationSuiteDesign = ({ onBack }: { onBack: () => void }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <InvitationSuiteDesignContent onBack={onBack} />
    </DndProvider>
  );
};