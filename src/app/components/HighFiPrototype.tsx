import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowUpRight,
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
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Shirt,
  Scissors,
  Crown,
  Gem,
  Camera,
  Watch,
  Flower2,
  Music,
  ShoppingBag,
  CloudSun,
  CloudRain,
  Thermometer,
  Sun,
  GripVertical,
  Trash2,
  Edit2,
  CreditCard,
  DollarSign,
  TrendingUp,
  PieChart as PieChartIcon,
  Wallet,
  Receipt,
  Download,
  Filter,
  MoreVertical,
  CheckSquare,
  BookOpen,
  ArrowRightLeft,
  Circle, Mail, Printer, Globe, Bed, PenTool, Image as ImageIcon, MessageSquareText, ChevronDown, ChevronUp, Speaker, Coffee, AlertCircle, Wine, Mic, Phone, Pin, Cake, Palette, Calendar as CalendarIcon, ToggleRight, ToggleLeft, Settings as SettingsIcon, Link as LinkIcon, Key as KeyIcon, MessageCircle, Edit3, Lightbulb, Target
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';


import bgRing from "figma:asset/d9b5a95923f0aa5a5b46ea13a2f1cb516d4c1e2c.png";
import logoMain from "figma:asset/07ed79acf4603f6b82cbd5bf378cad917ffb71f5.png";
import vowAIIcon from "figma:asset/11ae272f12e6d2b281af79cf4b69942e08b0688b.png";
import accessibilityIcon from "figma:asset/1647b8017988fc5b5723aeb261dd20c0d132160f.png";
import coupleRingImage from "figma:asset/d1e56732b20c369510749230c941b24dd95e9f0b.png";
import { InvitationSuiteDesign } from "./InvitationSuiteDesign";
import { PlannerProfile } from "./PlannerProfile";
import { TimeAndLogistics } from "./TimeAndLogistics";
import { VowAiChatOverlay } from "./ElsieChatOverlay";

// --- CUSTOM ICONS ---
const TiaraIcon = ({ className, size = 40 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 17h18" />
    <path d="M4 19h16" />
    <path d="M12 17V8c0-1.5-1.5-2-1.5-2S9 7.5 9 10c0 3 3 7 3 7z" />
    <path d="M12 17V8c0-1.5 1.5-2 1.5-2S15 7.5 15 10c0 3-3 7-3 7z" />
    <path d="M12 17c0 0-3-2-5-5-1-1.5-3-1-3 1s1.5 4 4 4" />
    <path d="M12 17c0 0 3-2 5-5 1-1.5 3-1 3 1s-1.5 4-4 4" />
    <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="17" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="3" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="21" cy="11" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const BowtieIcon = ({ className, size = 40 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="10" y="10" width="4" height="4" rx="1" />
    <path d="M10 10.5L3 7v10l7-3.5" />
    <path d="M10 12H4" />
    <path d="M14 10.5L21 7v10l-7-3.5" />
    <path d="M14 12h7" />
  </svg>
);

// --- MOCK DATA ---
export const MOCK_VENUES = [
    { 
        id: 1, name: "The Heritage Vineyard", price: "$12,000", location: "Napa Valley, CA", rating: 4.9, 
        image: "https://images.unsplash.com/photo-1738669469820-259d9c7189bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBlbGVnYW50JTIwd2VkZGluZyUyMGRlY29yJTIwc2V0dXAlMjBsdXh1cnl8ZW58MXx8fHwxNzcyNjY1MjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        about: "Nestled amidst rolling vineyards, The Heritage Vineyard is a breathtaking sanctuary designed for unforgettable, grand-scale celebrations. With expansive manicured lawns capable of hosting up to 300 of your cherished guests, this venue seamlessly blends rustic vineyard charm with opulent romance. Imagine exchanging vows under the golden hour sun, followed by a lavish evening of dancing and wine beneath the stars.",
        capacity: "Up to 300", type: "Estate / Vineyard", setting: "Outdoor & Indoor",
        styles: ["Luxury", "Rustic"], maxGuests: 300,
        availableDates: [10, 15, 22, 28], timeSlots: ["11:00 AM", "1:00 PM", "3:00 PM"],
        gallery: [
            "https://images.unsplash.com/photo-1738669469820-259d9c7189bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBlbGVnYW50JTIwd2VkZGluZyUyMGRlY29yJTIwc2V0dXAlMjBsdXh1cnl8ZW58MXx8fHwxNzcyNjY1MjQ5fDA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1770390092829-16dcc978e815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2VhdGluZyUyMGFycmFuZ2VtZW50JTIwZGV0YWlsc3xlbnwxfHx8fDE3NzI2NjUxNzV8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1760623128588-3a0ad5693205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBzZXQlMjB1cCUyMGluZG9vciUyMGVzdGF0ZXxlbnwxfHx8fDE3NzI2NjUxNzh8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1765947384834-3bdcffcaffff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbCUyMG92ZXJ2aWV3fGVufDF8fHx8MTc3MjY2NTE4MHww&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1758612120966-b20c01160c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMG1hbnNpb24lMjB3ZWRkaW5nJTIwdmVudWUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzI2NjUwMDR8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
        ]
    },
    { 
        id: 2, name: "Oasis Palm Resort", price: "$15,500", location: "Miami, FL", rating: 4.8, 
        image: "https://images.unsplash.com/photo-1667842288007-ea49b67ce9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cm9waWNhbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzcyNjY0NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        about: "A luxurious tropical resort offering palm-fringed pathways and pristine poolside cabanas for a sun-kissed, romantic wedding weekend. Dive into paradise and celebrate with up to 150 of your loved ones in an elegant island-inspired oasis. Every gentle breeze and rippling water echo the depth of your commitment.",
        capacity: "Up to 150", type: "Resort", setting: "Tropical Outdoor",
        styles: ["Luxury", "Tropical"], maxGuests: 150,
        availableDates: [3, 8, 12, 25], timeSlots: ["10:00 AM", "4:00 PM"],
        gallery: [
            "https://images.unsplash.com/photo-1667842288007-ea49b67ce9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cm9waWNhbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzcyNjY0NTI5fDA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1558117338-7ef3d637ce2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHBhbG0lMjB0cmVlc3xlbnwxfHx8fDE3NzI2NjQ1NDB8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1679945872214-8afa7f41f3cc?q=80&w=800"
        ]
    },
    { 
        id: 3, name: "Lumina Glasshouse", price: "$9,000", location: "Seattle, WA", rating: 4.7, 
        image: "https://images.unsplash.com/photo-1639156137779-eefa44cda424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNjE3OTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        about: "Sleek lines and floor-to-ceiling windows define the Lumina Glasshouse. This ultra-modern masterpiece bathes your ceremony in natural light, offering a minimalist yet breathtaking canvas for your contemporary love story. Ideal for up to 250 guests, share your first dance as the city lights begin to twinkle through the crystalline walls.",
        capacity: "Up to 250", type: "Modern Venue", setting: "Indoor Glasshouse",
        styles: ["Modern", "Minimalist"], maxGuests: 250,
        availableDates: [5, 12, 19, 26], timeSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
        gallery: [
            "https://images.unsplash.com/photo-1639156137779-eefa44cda424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNjE3OTc0fDA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1694376390682-8a5222d40fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBtdXNldW0lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI2NDAxNzB8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1719786624996-2616492705bd?q=80&w=800"
        ]
    },
    { 
        id: 4, name: "The Vanderbilt Mansion", price: "$11,200", location: "Newport, RI", rating: 4.9, 
        image: "https://images.unsplash.com/photo-1770622006495-86de934162b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGx1eHVyeSUyMG1hbnNpb24lMjBleHRlcmlvcnxlbnwxfHx8fDE3NzI2NjQ1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        about: "Step back in time at The Vanderbilt Mansion, a sprawling historic estate that exudes timeless glamour. With its manicured gardens and grand architectural facade, it’s the ultimate setting for a classic, aristocratic celebration of up to 200 guests. Your romantic fairy tale effortlessly blends the grandeur of the past with the promise of your beautiful future.",
        capacity: "Up to 200", type: "Historic Mansion", setting: "Estate & Garden",
        styles: ["Vintage", "Luxury"], maxGuests: 200,
        availableDates: [2, 9, 16, 23], timeSlots: ["1:00 PM", "3:00 PM", "5:00 PM"],
        gallery: [
            "https://images.unsplash.com/photo-1770622006495-86de934162b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGx1eHVyeSUyMG1hbnNpb24lMjBleHRlcmlvcnxlbnwxfHx8fDE3NzI2NjQ1MzR8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1755801196803-116edbf46245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwZXN0YXRlJTIwZ2FyZGVufGVufDF8fHx8MTc3MjY2NDU0MHww&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
        ]
    },
    { 
        id: 5, name: "The Grand Plaza Hotel", price: "$18,000", location: "Chicago, IL", rating: 5.0, 
        image: "https://images.unsplash.com/photo-1654336037958-c698d50700b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJhbGxyb29tJTIwY2hhbmRlbGllcnxlbnwxfHx8fDE3NzI2NjQ1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        about: "Experience unparalleled five-star service at The Grand Plaza Hotel. Built for truly monumental celebrations of up to 400 guests, this property features a magnificent ballroom dripping with crystal chandeliers. Every lavish detail is meticulously curated to ensure that your grandest dreams of love are celebrated in unparalleled regal style and grace.",
        capacity: "Up to 400", type: "Luxury Hotel", setting: "Grand Ballroom",
        styles: ["Luxury"], maxGuests: 400,
        availableDates: [1, 14, 21, 28], timeSlots: ["12:00 PM", "6:00 PM"],
        gallery: [
            "https://images.unsplash.com/photo-1654336037958-c698d50700b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJhbGxyb29tJTIwY2hhbmRlbGllcnxlbnwxfHx8fDE3NzI2NjQ1NDB8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1719786624996-2616492705bd?q=80&w=800",
            "https://images.unsplash.com/photo-1758612120966-b20c01160c7b?q=80&w=800"
        ]
    },
    { 
        id: 6, name: "Azure Cliff Cove", price: "$7,500", location: "Carmel, CA", rating: 4.6, 
        image: "https://images.unsplash.com/photo-1768611264099-adcd915eee3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaGZyb250JTIwd2VkZGluZyUyMGNlcmVtb255JTIwYXJjaHxlbnwxfHx8fDE3NzI2NjQ1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        about: "Say 'I do' with the sand between your toes and the vast ocean as your backdrop. Azure Cliff Cove offers an intimate seaside escape, blending the rugged beauty of the coast with serene, romantic elegance. Ideally sized for a gathering of up to 120 closest friends and family, let the mesmerizing ocean waves soundtrack your sweetest moments.",
        capacity: "Up to 120", type: "Oceanfront", setting: "Beach & Cliffside",
        styles: ["Coastal", "Romantic"], maxGuests: 120,
        availableDates: [6, 13, 20, 27], timeSlots: ["2:00 PM", "7:00 PM", "9:00 PM"],
        gallery: [
            "https://images.unsplash.com/photo-1768611264099-adcd915eee3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaGZyb250JTIwd2VkZGluZyUyMGNlcmVtb255JTIwYXJjaHxlbnwxfHx8fDE3NzI2NjQ1MzN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1710278919140-22ebea02b21a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNsaWZmJTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3MjY2NDU0MHww&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1679945872214-8afa7f41f3cc?q=80&w=800"
        ]
    }
];

// --- Design System Components ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  size = 'default'
}: { 
  children: React.ReactNode, 
  onClick?: (e?: React.MouseEvent) => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gold',
  className?: string,
  size?: 'default' | 'sm' | 'lg'
}) => {
  const baseStyles = "font-sans font-semibold uppercase tracking-[1.5px] rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-navy text-white hover:bg-charcoal shadow-lg hover:shadow-xl",
    secondary: "bg-white text-navy border border-ivory-dark hover:border-navy hover:shadow-md",
    outline: "bg-transparent border border-ivory-dark text-charcoal hover:border-navy hover:text-navy",
    ghost: "bg-transparent text-taupe hover:text-navy hover:bg-ivory/50",
    destructive: "bg-white text-error border border-error hover:bg-error hover:text-white",
    gold: "bg-[#C9A84C] text-white hover:bg-[#B3933B] shadow-md"
  };

  const sizes = {
    default: "h-[44px] px-6 text-[12px]", // Minimum touch target 44px
    sm: "h-[32px] px-4 text-[10px]",
    lg: "h-[56px] px-8 text-[14px]",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  className = "" 
}: { 
  placeholder: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  icon?: any,
  className?: string
}) => (
  <div className={`relative ${className}`}>
    {Icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe pointer-events-none">
        <Icon size={18} />
      </div>
    )}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full h-[52px] bg-white border-[1.5px] border-ivory-dark rounded-[3px]
        ${Icon ? 'pl-12' : 'pl-4'} pr-4
        font-sans text-charcoal placeholder:text-taupe/60
        focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne
        transition-all duration-200
      `}
    />
  </div>
);

const Badge = ({ 
  children, 
  variant = 'default',
  className = ""
}: { 
  children: React.ReactNode, 
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral' | 'lavender' | 'info',
  className?: string
}) => {
  const styles = {
    default: "bg-gray-100 text-charcoal",
    success: "bg-[#E6F4EA] text-success",
    warning: "bg-[#FFF4E5] text-warning",
    error: "bg-[#FCE8E6] text-error",
    neutral: "bg-ivory-dark text-taupe",
    lavender: "bg-lavender text-navy",
    info: "bg-blue text-navy"
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
      text-[10px] font-bold uppercase tracking-wider
      ${styles[variant]} ${className}
    `}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {children}
    </span>
  );
};

const Card = ({ 
  children, 
  className = "", 
  color = "bg-white",
  padding = "p-8",
  onClick
}: { 
  children: React.ReactNode, 
  className?: string, 
  color?: string,
  padding?: string,
  onClick?: () => void
}) => (
  <div 
    onClick={onClick}
    className={`
      ${color} ${padding} rounded-[32px] 
      shadow-[0_4px_24px_rgba(0,0,0,0.02)] 
      border border-ivory-dark/50
      ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// --- Profile & Preferences Modal ---
// --- Common Components for Modals ---
const ModalToggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
        onClick={onChange} 
        className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${checked ? 'bg-[#C9A84C]' : 'bg-[#E5E0D8]'}`}
    >
        <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm absolute transition-all ${checked ? 'left-[22px]' : 'left-[3px]'}`} />
    </button>
);

const ModalSelect = ({ value, options, onChange }: { value: string, options: string[], onChange?: (val: string) => void }) => (
    <div className="relative w-full">
        <select value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] px-4 py-3 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#C9A84C] appearance-none">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C857B] pointer-events-none" />
    </div>
);

const ModalInput = ({ value, label, type="text" }: { value: string, label: string, type?: string }) => (
    <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">{label}</label>
        <input type={type} defaultValue={value} className="w-full bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] px-4 py-3 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#C9A84C]" />
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[600px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <User size={16} className="text-[#C9A84C]" />
                        </div>
                        <h2 className="text-[20px] font-serif text-[#1E293B] font-bold">
                            View <span className="text-[#C9A84C] italic">Profile</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#E8E3DA]/50 hover:bg-[#E8E3DA] flex items-center justify-center transition-colors text-[#8C857B]">
                        <X size={16} />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-8 bg-white flex-1">
                    {/* Header Info */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full border-2 border-[#C9A84C] flex items-center justify-center bg-[#FAF8F5] text-[#1E293B] font-serif italic text-4xl shadow-sm overflow-hidden">
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
                            <h3 className="text-2xl font-serif font-bold text-[#1E293B] mb-1">Jessica <span className="text-[#C9A84C] italic">&</span> Michael</h3>
                            <p className="text-[13px] text-[#8C857B] mb-3">jessica@email.com · michael@email.com</p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#E8E3DA] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">
                                <Sparkles size={10} className="text-[#C9A84C]" /> FREE PLAN
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#E8E3DA] mb-8" />

                    {/* Partners */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] p-5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">Partner 1</p>
                            <p className="text-[15px] font-bold text-[#1E293B] mb-1">Jessica Chen</p>
                            <p className="text-[12px] text-[#8C857B] mb-0.5">jessica@email.com</p>
                            <p className="text-[12px] text-[#8C857B]">+1 (415) 555-0184</p>
                        </div>
                        <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] p-5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">Partner 2</p>
                            <p className="text-[15px] font-bold text-[#1E293B] mb-1">Michael Torres</p>
                            <p className="text-[12px] text-[#8C857B] mb-0.5">michael@email.com</p>
                            <p className="text-[12px] text-[#8C857B]">+1 (628) 555-0217</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] py-6 px-4 text-center">
                            <p className="text-2xl font-serif font-bold text-[#C9A84C] mb-1">145</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">Days to go</p>
                        </div>
                        <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] py-6 px-4 text-center">
                            <p className="text-2xl font-serif font-bold text-[#1E293B] mb-1">150</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">Guests</p>
                        </div>
                        <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] py-6 px-4 text-center">
                            <p className="text-2xl font-serif font-bold text-[#5CB883] mb-1 italic">65%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">Budget Used</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] p-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-4">Wedding Details</p>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <p className="text-[11px] text-[#8C857B] mb-1">Date</p>
                                <p className="text-[14px] font-bold text-[#1E293B]">October 24, 2026</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#8C857B] mb-1">Venue</p>
                                <p className="text-[14px] font-bold text-[#1E293B]">The Grand Estate, Napa</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#8C857B] mb-1">Style</p>
                                <p className="text-[14px] font-bold text-[#1E293B]">Classic & Timeless</p>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#8C857B] mb-1">Your AI Assistant</p>
                                <p className="text-[14px] font-bold text-[#1E293B]">VowAi Concierge</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[72px] bg-[#FAF8F5] border-t border-[#E8E3DA] flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#FAF8F5] border border-[#E8E3DA] hover:bg-white rounded-[4px] transition-all">
                        Close
                    </button>
                    <button onClick={() => {}} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                        Edit Profile <Sparkles size={12} className="text-white/70" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const PreferencesModal = ({ onClose }: { onClose: () => void }) => {
    const [tab, setTab] = useState('personal');
    const [toggles, setToggles] = useState({ countdown: true, compact: false, animations: true });

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <User size={18} className="text-[#C9A84C]" /> },
        { id: 'partner2', label: 'Partner 2', icon: <Heart size={18} className="text-[#C9A84C] fill-[#C9A84C]/20" /> },
        { id: 'contact', label: 'Contact', icon: <Phone size={18} className="text-[#C9A84C]" /> },
        { id: 'display', label: 'Display', icon: <Palette size={18} className="text-[#C9A84C]" /> },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[800px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <SettingsIcon size={16} className="text-[#C9A84C]" />
                        </div>
                        <h2 className="text-[20px] font-serif text-[#C9A84C] font-bold italic">
                            Preferences
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#E8E3DA]/50 hover:bg-[#E8E3DA] flex items-center justify-center transition-colors text-[#8C857B]">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[240px] bg-[#FAF8F5] border-r border-[#E8E3DA] py-6 flex flex-col gap-1 shrink-0">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-4 px-6 py-3.5 text-[14px] font-bold transition-colors w-full text-left
                                    ${tab === t.id ? 'bg-[#F3EFE6] text-[#1E293B]' : 'text-[#475569] hover:bg-[#F3EFE6]/50'}
                                `}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white">
                        <div className="p-10">
                            {tab === 'personal' && (
                                <div className="space-y-6">
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Partner 1 — Personal Info</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ModalInput label="First Name" value="Jessica" />
                                        <ModalInput label="Last Name" value="Chen" />
                                    </div>
                                    <ModalInput label="Email" value="jessica@email.com" type="email" />
                                    <ModalInput label="Phone" value="+1 (415) 555-0184" type="tel" />
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Pronouns <span className="text-[#8C857B] font-normal lowercase tracking-normal">(optional)</span></label>
                                        <ModalSelect value="She / Her" options={["She / Her", "He / Him", "They / Them", "Other"]} />
                                    </div>
                                </div>
                            )}

                            {tab === 'partner2' && (
                                <div className="space-y-6">
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Partner 2 — Personal Info</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ModalInput label="First Name" value="Michael" />
                                        <ModalInput label="Last Name" value="Torres" />
                                    </div>
                                    <ModalInput label="Email" value="michael@email.com" type="email" />
                                    <ModalInput label="Phone" value="+1 (628) 555-0217" type="tel" />
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Pronouns <span className="text-[#8C857B] font-normal lowercase tracking-normal">(optional)</span></label>
                                        <ModalSelect value="He / Him" options={["She / Her", "He / Him", "They / Them", "Other"]} />
                                    </div>
                                </div>
                            )}

                            {tab === 'contact' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Contact Preferences</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Primary Contact Method</label>
                                                <ModalSelect value="Email only" options={["Email only", "Phone only", "Text message", "Any method"]} />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Best Time to Reach You</label>
                                                <ModalSelect value="Afternoon (12pm–5pm)" options={["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "Evening (5pm–8pm)"]} />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Timezone</label>
                                                <ModalSelect value="Pacific Time (PT)" options={["Pacific Time (PT)", "Mountain Time (MT)", "Central Time (CT)", "Eastern Time (ET)"]} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Language & Region</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Language</label>
                                                <ModalSelect value="English (US)" options={["English (US)", "English (UK)", "Spanish"]} />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Date Format</label>
                                                <ModalSelect value="Oct 24, 2026" options={["Oct 24, 2026", "24 Oct 2026", "10/24/2026"]} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'display' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Accent Colour</h3>
                                        <div className="flex gap-4">
                                            {['#2C3E50', '#8BA076', '#779BB1', '#C28B84', '#9E85B5', '#6A8A85'].map((color, i) => (
                                                <button key={color} className={`w-10 h-10 rounded-full border-2 ${i===0 ? 'border-[#C9A84C]' : 'border-transparent'}`} style={{backgroundColor: color}}>
                                                    {i === 0 && <span className="text-[10px] text-white font-bold opacity-0">$</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Dashboard Layout</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Show countdown widget</p>
                                                    <p className="text-[12px] text-[#8C857B]">Days-to-wedding ticker in navigation</p>
                                                </div>
                                                <ModalToggle checked={toggles.countdown} onChange={() => setToggles(p => ({...p, countdown: !p.countdown}))} />
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Compact sidebar</p>
                                                    <p className="text-[12px] text-[#8C857B]">Use a narrower sidebar layout</p>
                                                </div>
                                                <ModalToggle checked={toggles.compact} onChange={() => setToggles(p => ({...p, compact: !p.compact}))} />
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Animations & transitions</p>
                                                    <p className="text-[12px] text-[#8C857B]">Subtle motion effects throughout the app</p>
                                                </div>
                                                <ModalToggle checked={toggles.animations} onChange={() => setToggles(p => ({...p, animations: !p.animations}))} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[72px] bg-[#FAF8F5] border-t border-[#E8E3DA] flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#FAF8F5] border border-[#E8E3DA] hover:bg-white rounded-[4px] transition-all">
                        Cancel
                    </button>
                    <button onClick={() => {toast.success('Preferences saved'); onClose()}} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                        Save Changes <Sparkles size={12} className="text-white/70" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const NotificationsModal = ({ onClose }: { onClose: () => void }) => {
    const [toggles, setToggles] = useState({
        task: true, payment: true, planner: true, rsvp: true, weekly: false,
        vowai: true, contract: false, checklist: true
    });

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[600px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <Bell size={16} className="text-[#C9A84C]" />
                        </div>
                        <h2 className="text-[20px] font-serif text-[#C9A84C] font-bold italic">
                            Notifications
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#E8E3DA]/50 hover:bg-[#E8E3DA] flex items-center justify-center transition-colors text-[#8C857B]">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white p-10">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Email Notifications</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'task', title: 'Task reminders', desc: '3 days before a task is due' },
                                    { id: 'payment', title: 'Payment due alerts', desc: '7 days before upcoming vendor payments' },
                                    { id: 'planner', title: 'Assistant messages', desc: 'Email copy when VowAi Concierge sends you a message' },
                                    { id: 'rsvp', title: 'RSVP updates', desc: 'When guests respond to your invitations' },
                                    { id: 'weekly', title: 'Weekly planning digest', desc: 'Summary of progress every Monday morning' }
                                ].map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">{item.title}</p>
                                            <p className="text-[12px] text-[#8C857B]">{item.desc}</p>
                                        </div>
                                        <ModalToggle checked={toggles[item.id as keyof typeof toggles]} onChange={() => setToggles(p => ({...p, [item.id]: !p[item.id as keyof typeof toggles]}))} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Push Notifications</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'vowai', title: 'VowAi insights & suggestions', desc: 'Smart nudges and budget alerts from VowAi' },
                                    { id: 'contract', title: 'Contract status changes', desc: 'When vendors sign or update agreements' },
                                    { id: 'checklist', title: 'Checklist completions', desc: 'Celebrate when milestones are reached' }
                                ].map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">{item.title}</p>
                                            <p className="text-[12px] text-[#8C857B]">{item.desc}</p>
                                        </div>
                                        <ModalToggle checked={toggles[item.id as keyof typeof toggles]} onChange={() => setToggles(p => ({...p, [item.id]: !p[item.id as keyof typeof toggles]}))} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Notification Frequency</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Digest Frequency</label>
                                    <ModalSelect value="Weekly" options={["Daily", "Weekly", "Monthly"]} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Quiet Hours</label>
                                    <ModalSelect value="10pm – 8am" options={["None", "10pm – 8am", "11pm – 7am"]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[72px] bg-[#FAF8F5] border-t border-[#E8E3DA] flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#FAF8F5] border border-[#E8E3DA] hover:bg-white rounded-[4px] transition-all">
                        Cancel
                    </button>
                    <button onClick={() => {toast.success('Notifications saved'); onClose()}} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                        Save Changes <Sparkles size={12} className="text-white/70" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const SharingAccessModal = ({ onClose }: { onClose: () => void }) => {
    const [tab, setTab] = useState('people');
    const [toggles, setToggles] = useState({ budget: false, contracts: false, guests: true, linkActive: true, passcode: false });

    const tabs = [
        { id: 'people', label: 'People', icon: <Users size={18} className="text-[#C9A84C]" /> },
        { id: 'access', label: 'Access Levels', icon: <KeyIcon size={18} className="text-[#C9A84C]" /> },
        { id: 'link', label: 'Share Link', icon: <LinkIcon size={18} className="text-[#C9A84C]" /> },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[800px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <LinkIcon size={16} className="text-[#C9A84C]" />
                        </div>
                        <h2 className="text-[20px] font-serif text-[#1E293B] font-bold">
                            Sharing & <span className="text-[#C9A84C] italic">Access</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#E8E3DA]/50 hover:bg-[#E8E3DA] flex items-center justify-center transition-colors text-[#8C857B]">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[240px] bg-[#FAF8F5] border-r border-[#E8E3DA] py-6 flex flex-col gap-1 shrink-0">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-4 px-6 py-3.5 text-[14px] font-bold transition-colors w-full text-left
                                    ${tab === t.id ? 'bg-[#F3EFE6] text-[#1E293B]' : 'text-[#475569] hover:bg-[#F3EFE6]/50'}
                                `}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white">
                        <div className="p-10">
                            {tab === 'people' && (
                                <div className="space-y-6">
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Currently Shared With</h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-[#C9A84C] bg-[#F3EFE6] flex items-center justify-center text-[12px] font-bold text-[#1E293B]">VA</div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B]">VowAi Concierge</p>
                                                    <p className="text-[12px] text-[#8C857B]">hello@vowai.com</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-[#F3EFE6] text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest rounded-full">Planner</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-[#C9A84C] bg-[#F3EFE6] flex items-center justify-center text-[12px] font-bold text-[#1E293B]">ML</div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B]">Margaret & Luis Chen</p>
                                                    <p className="text-[12px] text-[#8C857B]">m.chen@email.com</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-[#E2E8F0] text-[#475569] text-[10px] font-bold uppercase tracking-widest rounded-full">Viewer</span>
                                                <button className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center text-[#8C857B] hover:bg-white"><X size={14} /></button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-[#C9A84C] bg-[#F3EFE6] flex items-center justify-center text-[12px] font-bold text-[#1E293B]">RT</div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B]">Rosa Torres</p>
                                                    <p className="text-[12px] text-[#8C857B]">rosa.torres@email.com</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-[#E2E8F0] text-[#475569] text-[10px] font-bold uppercase tracking-widest rounded-full">Viewer</span>
                                                <button className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center text-[#8C857B] hover:bg-white"><X size={14} /></button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] opacity-70">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border border-[#C9A84C] bg-[#F3EFE6] flex items-center justify-center text-[12px] font-bold text-[#1E293B]">KP</div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B]">Katie Pham</p>
                                                    <p className="text-[12px] text-[#8C857B]">Invite pending</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-[#FCE8E6] text-[#C44343] text-[10px] font-bold uppercase tracking-widest rounded-full">Pending</span>
                                                <button className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center text-[#8C857B] hover:bg-white"><X size={14} /></button>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full p-6 border border-dashed border-[#C9A84C] rounded-[4px] bg-[#FAF8F5] hover:bg-[#F3EFE6] transition-colors flex flex-col items-center justify-center mt-6">
                                        <p className="text-[14px] font-bold text-[#C9A84C] mb-1">+ Invite someone new</p>
                                        <p className="text-[12px] text-[#8C857B]">Send a view-only link to family or bridal party</p>
                                    </button>
                                </div>
                            )}

                            {tab === 'access' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Default Access for New Invites</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-4 p-4 bg-[#FAF8F5] border border-[#C9A84C] rounded-[4px] cursor-pointer">
                                                <div className="w-5 h-5 rounded-full border-[5px] border-[#C9A84C] bg-white" />
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">View Only</p>
                                                    <p className="text-[12px] text-[#8C857B]">Can see all pages but cannot edit or make changes.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] cursor-pointer opacity-70">
                                                <div className="w-5 h-5 rounded-full border-2 border-[#E8E3DA] bg-white" />
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">View & Comment</p>
                                                    <p className="text-[12px] text-[#8C857B]">Can see all pages and leave comments for the couple or planner.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] cursor-pointer opacity-70">
                                                <div className="w-5 h-5 rounded-full border-2 border-[#E8E3DA] bg-white" />
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Contributor</p>
                                                    <p className="text-[12px] text-[#8C857B]">Can edit specific sections but cannot change financial data.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Visibility Controls</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Show budget to viewers</p>
                                                    <p className="text-[12px] text-[#8C857B]">Family can see your spending breakdown</p>
                                                </div>
                                                <ModalToggle checked={toggles.budget} onChange={() => setToggles(p => ({...p, budget: !p.budget}))} />
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Show vendor contracts</p>
                                                    <p className="text-[12px] text-[#8C857B]">Shared users can view signed agreements</p>
                                                </div>
                                                <ModalToggle checked={toggles.contracts} onChange={() => setToggles(p => ({...p, contracts: !p.contracts}))} />
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Show full guest list</p>
                                                    <p className="text-[12px] text-[#8C857B]">Viewers can see names, RSVPs, and meal choices</p>
                                                </div>
                                                <ModalToggle checked={toggles.guests} onChange={() => setToggles(p => ({...p, guests: !p.guests}))} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'link' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Read-Only Share Link</h3>
                                        <div className="flex gap-3 mb-6">
                                            <input type="text" readOnly value="vowtrack.com/view/jessica-michael-oct26" className="flex-1 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] px-4 py-3 text-[14px] text-[#8C857B]" />
                                            <button onClick={() => toast.success('Link copied')} className="px-6 py-3 bg-[#1A1F36] text-white text-[12px] font-bold uppercase tracking-widest rounded-[4px] hover:bg-[#1A1F36]/90 transition-colors">
                                                Copy
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Link active</p>
                                                    <p className="text-[12px] text-[#8C857B]">Anyone with this link can view your plan</p>
                                                </div>
                                                <ModalToggle checked={toggles.linkActive} onChange={() => setToggles(p => ({...p, linkActive: !p.linkActive}))} />
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Require passcode</p>
                                                    <p className="text-[12px] text-[#8C857B]">Visitors must enter a code to access</p>
                                                </div>
                                                <ModalToggle checked={toggles.passcode} onChange={() => setToggles(p => ({...p, passcode: !p.passcode}))} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Link Expiry</h3>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Expires</label>
                                            <ModalSelect value="After the wedding (Oct 25, 2026)" options={["Never", "In 30 days", "After the wedding (Oct 25, 2026)"]} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[72px] bg-[#FAF8F5] border-t border-[#E8E3DA] flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#FAF8F5] border border-[#E8E3DA] hover:bg-white rounded-[4px] transition-all">
                        Close
                    </button>
                    <button onClick={() => {toast.success('Sharing settings saved'); onClose()}} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                        Save Changes <Sparkles size={12} className="text-white/70" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const WeddingSettingsModal = ({ onClose }: { onClose: () => void }) => {
    const [tab, setTab] = useState('wedding');
    const [toggles, setToggles] = useState({ bridal: true, groom: true, partner: false });

    const tabs = [
        { id: 'wedding', label: 'The Wedding', icon: <Pin size={18} className="text-[#C9A84C]" /> },
        { id: 'style', label: 'Style & Vision', icon: <Sparkles size={18} className="text-[#C9A84C]" /> },
        { id: 'suites', label: 'Suites', icon: <Mail size={18} className="text-[#C9A84C]" /> },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[800px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <Pin size={16} className="text-[#C9A84C]" />
                        </div>
                        <h2 className="text-[20px] font-serif text-[#1E293B] font-bold">
                            Wedding <span className="text-[#C9A84C] italic">Settings</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#E8E3DA]/50 hover:bg-[#E8E3DA] flex items-center justify-center transition-colors text-[#8C857B]">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[240px] bg-[#FAF8F5] border-r border-[#E8E3DA] py-6 flex flex-col gap-1 shrink-0">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-4 px-6 py-3.5 text-[14px] font-bold transition-colors w-full text-left
                                    ${tab === t.id ? 'bg-[#F3EFE6] text-[#1E293B]' : 'text-[#475569] hover:bg-[#F3EFE6]/50'}
                                `}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white">
                        <div className="p-10">
                            {tab === 'wedding' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Core Details</h3>
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Wedding Date</label>
                                                <div className="relative">
                                                    <input type="text" defaultValue="10/24/2026" className="w-full bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] px-4 py-3 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#C9A84C]" />
                                                    <CalendarIcon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C857B] pointer-events-none" />
                                                </div>
                                            </div>
                                            <ModalInput label="Guest Count" value="150" type="number" />
                                        </div>
                                        <div className="mb-6">
                                            <ModalInput label="Venue Name" value="The Grand Estate" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <ModalInput label="Venue Location" value="Napa Valley, CA" />
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Ceremony Setting</label>
                                                <ModalSelect value="Indoor" options={["Indoor", "Outdoor", "Both"]} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Wedding Type</label>
                                            <ModalSelect value="Classic / Traditional" options={["Classic / Traditional", "Modern", "Destination"]} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Budget</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <ModalInput label="Total Budget" value="$85,000" />
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Currency</label>
                                                <ModalSelect value="USD ($)" options={["USD ($)", "EUR (€)", "GBP (£)"]} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'style' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Wedding Aesthetic — Select All That Apply</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { label: "Classic & Timeless", active: true },
                                                { label: "Modern & Minimalist", active: false },
                                                { label: "Bohemian & Romantic", active: false },
                                                { label: "Rustic & Organic", active: false },
                                                { label: "Glamorous & Luxe", active: false },
                                                { label: "Garden & Floral", active: false },
                                                { label: "Destination & Tropical", active: false },
                                                { label: "Black Tie Formal", active: false }
                                            ].map(opt => (
                                                <div key={opt.label} className={`flex items-center gap-3 p-4 border rounded-[4px] cursor-pointer transition-colors ${opt.active ? 'border-[#C9A84C] bg-[#FAF8F5]' : 'border-[#E8E3DA] bg-white'}`}>
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${opt.active ? 'border-[#C9A84C]' : 'border-[#E8E3DA]'}`}>
                                                        {opt.active && <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />}
                                                    </div>
                                                    <span className="text-[14px] font-bold text-[#1E293B]">{opt.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Colour Palette & Vision</h3>
                                        <div className="space-y-6">
                                            <ModalInput label="Colour Palette" value="Ivory, sage green, champagne gold" />
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Vision Notes For Planner</label>
                                                <textarea 
                                                    defaultValue="We want something very intimate and warm. Sunset ceremony preferred. Lots of florals."
                                                    className="w-full h-24 resize-none bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] px-4 py-3 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#C9A84C]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'suites' && (
                                <div className="space-y-6">
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Planning Suites</h3>
                                    <p className="text-[14px] text-[#475569] mb-6 leading-relaxed">
                                        Choose which planning suites are active for your wedding. Each suite unlocks a dedicated planning space.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-5 border border-[#C9A84C] bg-[#FAF8F5] rounded-[4px]">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[24px]">👩</span>
                                                <div>
                                                    <p className="text-[15px] font-bold text-[#1E293B] mb-0.5">Bridal Suite</p>
                                                    <p className="text-[13px] text-[#8C857B]">Attire, beauty & bridal party</p>
                                                </div>
                                            </div>
                                            <ModalToggle checked={toggles.bridal} onChange={() => setToggles(p => ({...p, bridal: !p.bridal}))} />
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-5 border border-[#C9A84C] bg-[#FAF8F5] rounded-[4px]">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[24px]">🦴</span>
                                                <div>
                                                    <p className="text-[15px] font-bold text-[#1E293B] mb-0.5">Groom Suite</p>
                                                    <p className="text-[13px] text-[#8C857B]">Attire, grooming & groomsmen</p>
                                                </div>
                                            </div>
                                            <ModalToggle checked={toggles.groom} onChange={() => setToggles(p => ({...p, groom: !p.groom}))} />
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-5 border border-[#E8E3DA] bg-[#FAF8F5] rounded-[4px] opacity-70">
                                            <div className="flex items-center gap-4">
                                                <span className="text-[24px]">💛</span>
                                                <div>
                                                    <p className="text-[15px] font-bold text-[#1E293B] mb-0.5">Partner Suite</p>
                                                    <p className="text-[13px] text-[#8C857B]">Gender-neutral planning space</p>
                                                </div>
                                            </div>
                                            <ModalToggle checked={toggles.partner} onChange={() => setToggles(p => ({...p, partner: !p.partner}))} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[72px] bg-[#FAF8F5] border-t border-[#E8E3DA] flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#FAF8F5] border border-[#E8E3DA] hover:bg-white rounded-[4px] transition-all">
                        Cancel
                    </button>
                    <button onClick={() => {toast.success('Settings saved'); onClose()}} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                        Save Changes <Sparkles size={12} className="text-white/70" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const AppSettingsModal = ({ onClose }: { onClose: () => void }) => {
    const [tab, setTab] = useState('account');
    const [toggles, setToggles] = useState({ tfa: false, staySigned: true, analytics: true, suggestions: true });

    const tabs = [
        { id: 'account', label: 'Account', icon: <User size={18} className="text-[#C9A84C]" /> },
        { id: 'security', label: 'Security', icon: <KeyIcon size={18} className="text-[#C9A84C]" /> },
        { id: 'data', label: 'Data', icon: <Download size={18} className="text-[#C9A84C]" /> },
        { id: 'billing', label: 'Billing', icon: <CreditCard size={18} className="text-[#C9A84C]" /> },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[800px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <SettingsIcon size={14} className="text-[#C9A84C]" />
                        </div>
                        <h2 className="text-[20px] font-serif text-[#1E293B] font-bold">
                            App <span className="text-[#C9A84C] italic">Settings</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#E8E3DA]/50 hover:bg-[#E8E3DA] flex items-center justify-center transition-colors text-[#8C857B]">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[240px] bg-[#FAF8F5] border-r border-[#E8E3DA] py-6 flex flex-col gap-1 shrink-0">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-4 px-6 py-3.5 text-[14px] font-bold transition-colors w-full text-left
                                    ${tab === t.id ? 'bg-[#F3EFE6] text-[#1E293B]' : 'text-[#475569] hover:bg-[#F3EFE6]/50'}
                                `}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white">
                        <div className="p-10">
                            {tab === 'account' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Login Email</h3>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E293B] mb-2">Current Email</label>
                                            <input type="text" readOnly value="jessica@email.com" className="w-full bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px] px-4 py-3 text-[14px] text-[#1E293B] mb-4" />
                                            <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] hover:bg-[#FAF8F5] transition-colors">Update Email</button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Password</h3>
                                        <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                            <div>
                                                <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Change password</p>
                                                <p className="text-[12px] text-[#8C857B]">Last changed 4 months ago</p>
                                            </div>
                                            <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Reset</button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Connected Accounts</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[24px]">📅</span>
                                                    <div>
                                                        <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Google Calendar</p>
                                                        <p className="text-[12px] text-[#8C857B]">Sync wedding events automatically</p>
                                                    </div>
                                                </div>
                                                <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Connect</button>
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[24px]">📁</span>
                                                    <div>
                                                        <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Google Drive</p>
                                                        <p className="text-[12px] text-[#8C857B]">Backup contracts and documents</p>
                                                    </div>
                                                </div>
                                                <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Connect</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#C44343] border-b border-[#FCE8E6] pb-2 mb-6">Danger Zone</h3>
                                        <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#FCE8E6] rounded-[4px]">
                                            <div>
                                                <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Delete account</p>
                                                <p className="text-[12px] text-[#8C857B]">Permanently removes all data. Cannot be undone.</p>
                                            </div>
                                            <button className="px-6 py-2.5 border border-[#FCE8E6] text-[#C44343] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FCE8E6] transition-colors">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'security' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Two-Factor Authentication</h3>
                                        <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                            <div>
                                                <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Enable 2FA</p>
                                                <p className="text-[12px] text-[#8C857B]">Require a code from your phone when signing in</p>
                                            </div>
                                            <ModalToggle checked={toggles.tfa} onChange={() => setToggles(p => ({...p, tfa: !p.tfa}))} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Session Management</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Active sessions</p>
                                                    <p className="text-[12px] text-[#8C857B]">Signed in on 2 devices</p>
                                                </div>
                                                <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Sign Out All</button>
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Stay signed in</p>
                                                    <p className="text-[12px] text-[#8C857B]">Remember this device for 30 days</p>
                                                </div>
                                                <ModalToggle checked={toggles.staySigned} onChange={() => setToggles(p => ({...p, staySigned: !p.staySigned}))} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Login Activity</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">MacBook Pro — Chrome</p>
                                                    <p className="text-[12px] text-[#8C857B]">San Francisco, CA · Active now</p>
                                                </div>
                                                <span className="text-[12px] font-bold text-[#5CB883] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#5CB883]"></span> Current</span>
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">iPhone 16 — Safari</p>
                                                    <p className="text-[12px] text-[#8C857B]">San Francisco, CA · 2 hours ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'data' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Export Your Data</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Export guest list</p>
                                                    <p className="text-[12px] text-[#8C857B]">Download as CSV — 150 guests</p>
                                                </div>
                                                <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Export CSV</button>
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Export budget report</p>
                                                    <p className="text-[12px] text-[#8C857B]">Full financial breakdown as PDF</p>
                                                </div>
                                                <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Export PDF</button>
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Export full plan archive</p>
                                                    <p className="text-[12px] text-[#8C857B]">All pages, documents, and data</p>
                                                </div>
                                                <button className="px-6 py-2.5 border border-[#E8E3DA] text-[#475569] text-[12px] font-bold uppercase tracking-widest rounded-[4px] bg-white hover:bg-[#FAF8F5] transition-colors">Export All</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Privacy</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Allow analytics</p>
                                                    <p className="text-[12px] text-[#8C857B]">Help improve VowTrack with usage data</p>
                                                </div>
                                                <ModalToggle checked={toggles.analytics} onChange={() => setToggles(p => ({...p, analytics: !p.analytics}))} />
                                            </div>
                                            <div className="flex items-center justify-between p-5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-[4px]">
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#1E293B] mb-0.5">Personalised suggestions</p>
                                                    <p className="text-[12px] text-[#8C857B]">VowAi uses your data to improve recommendations</p>
                                                </div>
                                                <ModalToggle checked={toggles.suggestions} onChange={() => setToggles(p => ({...p, suggestions: !p.suggestions}))} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'billing' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Current Plan</h3>
                                        <div className="p-6 bg-[#FAF8F5] border border-[#C9A84C] rounded-[4px] mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-[20px] font-serif text-[#1E293B] font-bold">VowTrack <span className="text-[#C9A84C] italic">Free</span></h4>
                                                <button className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                                                    Upgrade <Sparkles size={12} className="text-white/70" />
                                                </button>
                                            </div>
                                            <p className="text-[14px] text-[#8C857B]">Core planning features · Up to 100 guests</p>
                                        </div>
                                        <div className="p-6 bg-white border border-[#E8E3DA] rounded-[4px]">
                                            <p className="text-[14px] font-bold text-[#1E293B] mb-4">Premium unlocks:</p>
                                            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> Unlimited guests</p>
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> VowAi Smart Advisor</p>
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> Vendor contract vault</p>
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> Advanced reporting</p>
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> Priority planner access</p>
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> Custom branding</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8C857B] border-b border-[#E8E3DA] pb-2 mb-6">Payment Method</h3>
                                        <div className="p-6 bg-[#FAF8F5] border border-dashed border-[#E8E3DA] rounded-[4px] text-center">
                                            <p className="text-[14px] text-[#8C857B]">No payment method on file — upgrade to add one</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[72px] bg-[#FAF8F5] border-t border-[#E8E3DA] flex items-center justify-end px-6 gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#FAF8F5] border border-[#E8E3DA] hover:bg-white rounded-[4px] transition-all">
                        Close
                    </button>
                    <button onClick={() => {toast.success('App settings saved'); onClose()}} className="px-6 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white bg-[#1A1F36] hover:bg-[#1A1F36]/90 rounded-[4px] flex items-center gap-2 transition-all">
                        Save Changes <Sparkles size={12} className="text-white/70" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// --- Layout Components ---

const NavBar = ({ 
  onLogoClick, 
  onNavigate,
  currentStep,
  onProfileClick,
  accessibility,
  toggleAccessibility,
  onOpenSettings,
  userProfilePic
}: { 
  onLogoClick: () => void, 
  onNavigate: (view: any) => void,
  currentStep: string,
  onProfileClick: (e: React.MouseEvent) => void,
  accessibility: { highContrast: boolean, reduceMotion: boolean, largeText: boolean },
  toggleAccessibility: (key: 'highContrast' | 'reduceMotion' | 'largeText') => void,
  onOpenSettings?: (tab: string) => void,
  userProfilePic?: string | null
}) => {
  const [activeMenu, setActiveMenu] = useState<'accessibility' | 'profile' | 'notifications' | 'messages' | null>(null);
  const [smsSync, setSmsSync] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'guests', label: 'Guests' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'budget', label: 'Finance' },
    { id: 'thoughts', label: 'Journal' },
    { id: 'planner', label: 'The Planner' }
  ];

  return (
    <div className="h-[120px] bg-background flex flex-col items-center justify-between px-12 flex-shrink-0 w-full z-50 relative">
      <div className="w-full flex justify-between items-center pt-10">
         <div className="w-48" /> {/* Spacer */}
         
         <div 
            onClick={onLogoClick}
            className="cursor-pointer hover:opacity-80 transition-opacity text-center"
         >
            <h1 className="text-[40px] font-serif font-bold italic tracking-tight text-navy">VowTrack</h1>
         </div>

         <div className="flex-shrink-0 flex justify-end items-center gap-4 relative">
             {/* Accessibility Button */}
             <button 
                onClick={() => setActiveMenu(activeMenu === 'accessibility' ? null : 'accessibility')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors group relative
                    ${activeMenu === 'accessibility' ? 'ring-2 ring-[#C9A84C] bg-white shadow-md' : 'hover:bg-ivory-dark'}
                `}
             >
                <ImageWithFallback 
                    src={accessibilityIcon} 
                    alt="Accessibility Options" 
                    className={`w-6 h-6 object-contain transition-opacity ${activeMenu === 'accessibility' ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                />
             </button>

             {/* Accessibility Dropdown */}
             <AnimatePresence>
                 {activeMenu === 'accessibility' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-28 w-64 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-ivory-dark p-3 z-[100]"
                    >
                        <div className="px-3 py-2 border-b border-ivory-dark mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-taupe">Accessibility</span>
                        </div>
                        <button onClick={() => toggleAccessibility('highContrast')} className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory rounded-xl transition-colors flex items-center justify-between group">
                            <span>High Contrast</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibility.highContrast ? 'bg-[#C9A84C]' : 'bg-ivory-dark group-hover:bg-taupe/30'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${accessibility.highContrast ? 'left-4' : 'left-0'}`} />
                            </div>
                        </button>
                        <button onClick={() => toggleAccessibility('reduceMotion')} className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory rounded-xl transition-colors flex items-center justify-between group">
                            <span>Reduce Motion</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibility.reduceMotion ? 'bg-[#C9A84C]' : 'bg-ivory-dark group-hover:bg-taupe/30'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${accessibility.reduceMotion ? 'left-4' : 'left-0'}`} />
                            </div>
                        </button>
                        <button onClick={() => toggleAccessibility('largeText')} className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory rounded-xl transition-colors flex items-center justify-between group">
                            <span>Large Text</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibility.largeText ? 'bg-[#C9A84C]' : 'bg-ivory-dark group-hover:bg-taupe/30'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${accessibility.largeText ? 'left-4' : 'left-0'}`} />
                            </div>
                        </button>
                    </motion.div>
                 )}
             </AnimatePresence>

             <button 
                onClick={() => setActiveMenu(activeMenu === 'notifications' ? null : 'notifications')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors relative
                    ${activeMenu === 'notifications' ? 'bg-[#C9A84C] text-white shadow-md' : 'text-taupe hover:bg-ivory-dark hover:text-navy'}
                `}
             >
                <Bell size={24} />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#C44343] rounded-full border-2 border-white"></div>
             </button>

             {/* Messages Button */}
             <button 
                onClick={() => setActiveMenu(activeMenu === 'messages' ? null : 'messages')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors relative
                    ${activeMenu === 'messages' ? 'bg-[#C9A84C] text-white shadow-md' : 'text-taupe hover:bg-ivory-dark hover:text-navy'}
                `}
             >
                <MessageCircle size={24} />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#C44343] rounded-full border-2 border-white"></div>
             </button>

             {/* Messages Dropdown */}
             <AnimatePresence>
                 {activeMenu === 'messages' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-32 w-96 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-ivory-dark p-3 z-[100] flex flex-col"
                    >
                        <div className="px-5 py-4 border-b border-[#F0EBE1] mb-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#C9A84C] flex items-center justify-center text-navy font-serif italic text-lg shadow-sm">
                                    EV
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-navy leading-tight">Elsie Voyette</h3>
                                    <p className="text-[11px] text-[#C9A84C] font-bold uppercase tracking-widest">Lead Wedding Planner</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSmsSync(!smsSync)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${smsSync ? 'bg-[#C9A84C] text-white border-[#C9A84C] shadow-md scale-105' : 'bg-[#FAF8F5] text-[#8C857B] border-[#E8E3DA] hover:bg-[#F3EFE6]'}`}
                                title={smsSync ? "Messages are syncing to your mobile phone via SMS" : "Sync messages to your mobile phone via SMS"}
                            >
                                <Phone size={12} className={smsSync ? 'text-white' : 'text-[#8C857B]'} />
                                <span>{smsSync ? 'Synced to Mobile' : 'Sync to Mobile'}</span>
                            </button>
                        </div>
                        
                        <div className="h-[280px] overflow-y-auto px-4 py-2 flex flex-col gap-4">
                            <div className="flex flex-col gap-1 items-start">
                                <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                                    <p className="text-[13px] text-navy">Hi Jessica! The florist just sent over the revised proposal. Let me know when you have a moment to review.</p>
                                </div>
                                <span className="text-[10px] text-taupe px-1 flex items-center gap-1">
                                    10:42 AM {smsSync && <><span className="w-1 h-1 bg-[#C9A84C] rounded-full"></span> Via SMS</>}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-1 items-end">
                                <div className="bg-navy rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                                    <p className="text-[13px] text-white">I'll look at it on my lunch break! Did they include the dahlias we talked about?</p>
                                </div>
                                <span className="text-[10px] text-taupe px-1 flex items-center gap-1">
                                    {smsSync && <>Via SMS <span className="w-1 h-1 bg-taupe rounded-full"></span></>} 11:15 AM
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 items-start">
                                <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                                    <p className="text-[13px] text-navy">Yes! They added them to the centerpieces. It looks beautiful.</p>
                                </div>
                                <span className="text-[10px] text-taupe px-1 flex items-center gap-1">
                                    11:18 AM {smsSync && <><span className="w-1 h-1 bg-[#C9A84C] rounded-full"></span> Via SMS</>}
                                </span>
                            </div>
                        </div>

                        <div className="mt-2 p-2 pt-3 border-t border-[#F0EBE1]">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Message Elsie..." 
                                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] rounded-full pl-4 pr-12 py-3 text-[13px] text-navy placeholder:text-taupe focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
                                />
                                <button className="absolute right-2 top-1.5 w-8 h-8 rounded-full bg-[#C9A84C] text-white flex items-center justify-center hover:bg-navy transition-colors">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                 )}
             </AnimatePresence>

             {/* Notifications Dropdown */}
             <AnimatePresence>
                 {activeMenu === 'notifications' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-16 w-80 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-ivory-dark p-3 z-[100]"
                    >
                        <div className="px-5 py-4 border-b border-[#F0EBE1] mb-2 flex justify-between items-center">
                            <span className="text-[14px] font-bold text-navy uppercase tracking-widest">Notifications</span>
                            <span className="text-[10px] text-taupe font-bold tracking-widest cursor-pointer hover:text-navy">MARK ALL READ</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {[
                                { title: 'Elsie Voyette sent a new message', time: '10m ago', unread: true },
                                { title: 'Venue payment due tomorrow', time: '2h ago', unread: true },
                                { title: '3 new RSVPs received', time: '5h ago', unread: false },
                                { title: 'Floral contract updated', time: '1d ago', unread: false }
                            ].map((note, i) => (
                                <div key={i} className={`p-4 rounded-2xl mb-1 cursor-pointer transition-colors ${note.unread ? 'bg-[#FAF8F5] hover:bg-[#F3EFE6]' : 'hover:bg-[#FAF8F5]'}`}>
                                    <div className="flex gap-3">
                                        {note.unread && <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-1.5 shrink-0" />}
                                        <div>
                                            <p className={`text-[13px] ${note.unread ? 'font-bold text-navy' : 'text-navy/80'}`}>{note.title}</p>
                                            <p className="text-[11px] text-taupe mt-1">{note.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                 )}
             </AnimatePresence>
             
             {/* Profile Button */}
             <button 
                onClick={(e) => {
                    setActiveMenu(activeMenu === 'profile' ? null : 'profile');
                    onProfileClick(e);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden transition-colors 
                    ${activeMenu === 'profile' ? 'bg-navy text-white ring-2 ring-[#C9A84C] shadow-md' : 'bg-ivory-dark text-navy hover:bg-navy hover:text-white'}
                `}
             >
                {userProfilePic ? (
                    <img src={userProfilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={24} />
                )}
             </button>

             {/* Profile Dropdown */}
             <AnimatePresence>
                 {activeMenu === 'profile' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 right-0 w-64 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-ivory-dark p-3 z-[100]"
                    >
                        <div className="px-5 py-4 border-b border-[#F0EBE1] mb-2 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#1E293B] font-serif italic text-2xl border border-[#E8E3DA] overflow-hidden">
                                {userProfilePic ? (
                                    <img src={userProfilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    "J"
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-[#C9A84C] leading-tight mb-0.5">Jessica & Michael</span>
                                <span className="text-[11px] text-[#8C857B] font-bold uppercase tracking-[0.1em]">Free Plan</span>
                            </div>
                        </div>
                        {[
                            { label: 'View Profile', id: 'profile' },
                            { label: 'Preferences', id: 'preferences' },
                            { label: 'Notifications', id: 'notifications' },
                            { label: 'Sharing & Access', id: 'sharing' },
                            { label: 'Wedding Settings', id: 'wedding' },
                            { label: 'Settings', id: 'settings' },
                        ].map((item) => (
                            <button key={item.id} onClick={() => { setActiveMenu(null); onOpenSettings?.(item.id); }} className={`w-full flex justify-between items-center px-5 py-3 text-[14px] text-[#1E293B] hover:bg-[#FAF8F5] transition-colors font-medium`}>
                                {item.label}
                                <ChevronRight size={16} className="text-[#8C857B] opacity-60" />
                            </button>
                        ))}
                        <div className="my-2 border-b border-[#F0EBE1]" />
                        <button onClick={() => { setActiveMenu(null); toast.success('Signed out'); }} className="w-full text-left px-5 py-3 text-[14px] text-[#8C857B] hover:text-[#1E293B] hover:bg-[#FAF8F5] transition-colors font-bold">
                            Sign Out
                        </button>
                    </motion.div>
                 )}
             </AnimatePresence>
         </div>
      </div>

      <div className="flex gap-12 pb-2">
        {navItems.map((item) => {
            const isActive = 
                currentStep === item.id || 
                (item.id === 'guests' && currentStep === 'registry') ||
                (item.id === 'vendors' && (currentStep === 'search' || currentStep === 'detail'));

            return (
                <button
                    key={item.id}
                    onClick={() => {
                        if (item.id === 'vendors' && currentStep === 'search') onNavigate('search');
                        else onNavigate(item.id);
                    }}
                    className={`
                        text-[13px] font-bold uppercase tracking-[0.15em] py-3 border-b-2 transition-all
                        ${isActive ? 'text-navy border-navy' : 'text-taupe border-transparent hover:text-navy hover:border-ivory-dark'}
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
    <div className="h-16 bg-white border-t border-ivory-dark flex items-center justify-between px-12 z-40 flex-shrink-0 relative">
         <div className="text-[10px] font-bold uppercase tracking-widest text-taupe">
             &copy; 2026 VOWTRACK INC.
         </div>
         <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-taupe">
             <a href="#" className="hover:text-navy transition-colors">Privacy</a>
             <a href="#" className="hover:text-navy transition-colors">Terms</a>
             <a href="#" className="hover:text-navy transition-colors">Legal</a>
         </div>
    </div>
);

// --- Page States ---

const HomepageState = ({ 
  onNavigate,
  accessibility,
  toggleAccessibility
}: { 
  onNavigate: (view: string) => void,
  accessibility: { highContrast: boolean, reduceMotion: boolean, largeText: boolean },
  toggleAccessibility: (key: 'highContrast' | 'reduceMotion' | 'largeText') => void
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
  <div className="w-full h-full relative flex flex-col items-center justify-center text-center overflow-hidden pb-48">
    {/* Floating Accessibility Toggle */}
    <div className="absolute top-8 right-12 z-50">
        <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors group relative bg-white shadow-lg border border-ivory-dark ${showMenu ? 'ring-2 ring-[#C9A84C]' : 'hover:scale-105'}`}
        >
            <ImageWithFallback 
                src={accessibilityIcon} 
                alt="Accessibility Options" 
                className={`w-6 h-6 object-contain transition-opacity ${showMenu ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
            />
        </button>
        <AnimatePresence>
            {showMenu && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 right-0 w-56 bg-white rounded-2xl shadow-xl border border-ivory-dark p-2"
                >
                    <div className="px-3 py-2 border-b border-ivory-dark mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-taupe">Accessibility</span>
                    </div>
                    <button onClick={() => toggleAccessibility('highContrast')} className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory rounded-xl transition-colors flex items-center justify-between group">
                        <span>High Contrast</span>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibility.highContrast ? 'bg-[#C9A84C]' : 'bg-ivory-dark group-hover:bg-taupe/30'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${accessibility.highContrast ? 'left-4' : 'left-0'}`} />
                        </div>
                    </button>
                    <button onClick={() => toggleAccessibility('reduceMotion')} className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory rounded-xl transition-colors flex items-center justify-between group">
                        <span>Reduce Motion</span>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibility.reduceMotion ? 'bg-[#C9A84C]' : 'bg-ivory-dark group-hover:bg-taupe/30'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${accessibility.reduceMotion ? 'left-4' : 'left-0'}`} />
                        </div>
                    </button>
                    <button onClick={() => toggleAccessibility('largeText')} className="w-full text-left px-3 py-2 text-sm text-navy hover:bg-ivory rounded-xl transition-colors flex items-center justify-between group">
                        <span>Large Text</span>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibility.largeText ? 'bg-[#C9A84C]' : 'bg-ivory-dark group-hover:bg-taupe/30'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${accessibility.largeText ? 'left-4' : 'left-0'}`} />
                        </div>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    </div>

    {/* Background Image */}
    <div className="absolute inset-0 z-0">
        <ImageWithFallback 
            src={bgRing}
            alt="Background"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
    </div>

    {/* Content */}
    <div className="z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700 p-8">
        {/* Logo */}
        <div className="w-[640px] mb-2 relative">
             <ImageWithFallback 
                src={logoMain}
                alt="VowTrack Logo"
                className="w-full h-auto object-contain drop-shadow-2xl"
            />
        </div>

        {/* Tagline */}
        <div className="space-y-4 mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-navy drop-shadow-sm tracking-tight">
                Your Big Day Made Simple.
            </h1>
            <h2 className="font-serif text-4xl md:text-5xl italic text-navy/80 drop-shadow-sm">
                Memories Made Forever.
            </h2>
        </div>

        {/* Buttons */}
        <div className="flex gap-6">
            <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onNavigate('new_client_portal')} 
                className="bg-white/80 hover:bg-white text-navy border-2 border-navy/10 backdrop-blur-sm shadow-xl hover:scale-105"
            >
                New Client Portal
            </Button>
            <Button 
                variant="primary" 
                size="lg"
                onClick={() => onNavigate('dashboard')}
                className="bg-navy text-white hover:bg-charcoal shadow-xl hover:scale-105"
            >
                Client Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    </div>

    {/* Footer Text */}
    <div className="absolute bottom-12 left-0 right-0 z-10 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy">
            THE MODERN STANDARD FOR WEDDING PLANNING
        </p>
    </div>
  </div>
  );
};

const NewClientPortalState = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (view: string) => void }) => {
    const [step, setStep] = useState(0);
    const [accessCode, setAccessCode] = useState('');
    const [selectedSuites, setSelectedSuites] = useState<string[]>(['Bridal Suite']);
    const [budget, setBudget] = useState(50000);
    const [plannerRoles, setPlannerRoles] = useState<string[]>([]);
    const [perfectThings, setPerfectThings] = useState<string[]>([]);
    const [aesthetics, setAesthetics] = useState<string[]>([]);

    const handleEnterPortal = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode.trim() !== '') {
            onNavigate('dashboard');
        } else {
            setStep(1);
        }
    };

    const toggleSuite = (suite: string) => {
        setSelectedSuites(prev => prev.includes(suite) ? prev.filter(s => s !== suite) : [...prev, suite]);
    };

    const togglePlannerRole = (role: string) => {
        setPlannerRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
    };

    const togglePerfectThing = (thing: string) => {
        setPerfectThings(prev => prev.includes(thing) ? prev.filter(t => t !== thing) : [...prev, thing]);
    };

    const toggleAesthetic = (style: string) => {
        setAesthetics(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
    };

    if (step === 0) {
        return (
            <div className="w-full min-h-screen py-12 relative flex flex-col items-center justify-center bg-[#FAF7F2] overflow-y-auto">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F2D4CF]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C9DCE8]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <div className="w-full max-w-2xl bg-white border border-[#E2D8C8] shadow-xl rounded-[32px] p-12 relative z-10 animate-in fade-in zoom-in-95 duration-500">
                    <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>

                    <div className="flex flex-col items-center text-center mt-4">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <ImageWithFallback 
                                src={vowAIIcon}
                                alt="VowTrack Logo" 
                                className="h-16 w-16 object-contain p-1 rounded-full border border-[#C9A84C]" 
                            />
                            <span className="font-serif text-[32px] font-bold text-[#C9A84C] tracking-wide">VowTrack</span>
                        </div>
                        <h2 className="text-5xl font-serif text-navy tracking-tight mb-4 italic">Begin Your Journey</h2>
                        <p className="text-taupe font-medium max-w-md mx-auto mb-10 leading-relaxed">
                            Welcome to VowTrack. Please provide your invitation code or enter your details to set up your personalized wedding planning experience.
                        </p>

                        <form className="w-full space-y-6 text-left" onSubmit={handleEnterPortal}>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2 ml-4">Access Code</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. VOW-2026-X89B"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    className="w-full bg-white border border-[#E2D8C8] rounded-full px-6 py-4 text-[15px] text-navy focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
                                />
                            </div>
                            
                            <div className="relative py-4 flex items-center">
                                <div className="flex-grow border-t border-[#E2D8C8]"></div>
                                <span className="flex-shrink-0 mx-4 text-[#8C857B] text-[10px] font-bold uppercase tracking-widest">Or New Client Registration</span>
                                <div className="flex-grow border-t border-[#E2D8C8]"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2 ml-4">Partner 1</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        className="w-full bg-white border border-[#E2D8C8] rounded-full px-6 py-4 text-[15px] text-navy focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2 ml-4">Partner 2</label>
                                    <input 
                                        type="text" 
                                        placeholder="Their Name"
                                        className="w-full bg-white border border-[#E2D8C8] rounded-full px-6 py-4 text-[15px] text-navy focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2 ml-4">Estimated Date</label>
                                <input 
                                    type="text" 
                                    placeholder="mm/dd/yyyy"
                                    className="w-full bg-white border border-[#E2D8C8] rounded-full px-6 py-4 text-[15px] text-navy focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
                                />
                            </div>

                            <div className="pt-6">
                                <Button variant="gold" className="w-full py-6 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
                                    Enter Portal
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const steps = [
        { id: 1, name: 'The Couple' },
        { id: 2, name: 'The Wedding' },
        { id: 3, name: 'About You Two' },
        { id: 4, name: 'Your Style' },
    ];

    return (
        <div className="w-full min-h-screen py-12 relative flex flex-col items-center justify-center bg-[#FAF7F2] overflow-y-auto">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F2D4CF]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C9DCE8]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="w-full max-w-[1000px] h-[1050px] bg-white border border-[#E2D8C8] shadow-2xl rounded-3xl overflow-hidden flex relative z-10 animate-in fade-in zoom-in-95 duration-500">
                {/* Left Sidebar */}
                <div className="w-[320px] bg-[#FAF7F2] p-8 flex flex-col flex-shrink-0 border-r border-[#E2D8C8] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <ImageWithFallback 
                                src={vowAIIcon}
                                alt="VowTrack Logo" 
                                className="h-12 w-12 object-contain p-1 rounded-full border border-[#C9A84C]" 
                            />
                            <span className="font-serif text-[28px] font-bold text-[#C9A84C] tracking-wide">VowTrack</span>
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-3">Client Inquiry</p>
                        <h1 className="font-serif text-[36px] font-bold text-navy tracking-tight mb-2 leading-tight">Let's see if</h1>
                        <h1 className="font-serif text-[36px] font-bold text-navy tracking-tight mb-6 leading-tight">we're a <span className="italic text-[#C9A84C] font-bold">perfect fit.</span></h1>
                    
                    <p className="text-[#5C5C5C] text-[14px] leading-relaxed mb-10 pr-2">
                        Tell us about your big day and yourselves. Your planner will review your inquiry personally before setting up your planning suite.
                    </p>

                    <p className="text-[10px] font-bold uppercase tracking-widest text-navy/60 mb-6">How it works</p>
                    
                    <div className="relative pl-4">
                        <div className="absolute left-[27px] top-4 bottom-8 w-[1px] bg-[#E2D8C8]"></div>
                        
                        <div className="relative z-10 flex gap-5 mb-8">
                            <div className="w-7 h-7 rounded-full bg-[#C9A84C] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                            <div>
                                <p className="text-[14px] font-bold text-navy">Submit your inquiry <span className="font-normal text-[#5C5C5C]">— takes about 3 minutes</span></p>
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex gap-5 mb-8">
                            <div className="w-7 h-7 rounded-full bg-[#E8E2D5] text-navy/40 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                            <div>
                                <p className="text-[14px] font-bold text-navy">Planner reviews <span className="font-normal text-[#5C5C5C]">— usually within 24–48 hours</span></p>
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex gap-5 mb-8">
                            <div className="w-7 h-7 rounded-full bg-[#E8E2D5] text-navy/40 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                            <div>
                                <p className="text-[14px] font-bold text-navy">You get an email <span className="font-normal text-[#5C5C5C]">— with your personalised activation link</span></p>
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex gap-5">
                            <div className="w-7 h-7 rounded-full bg-[#E8E2D5] text-navy/40 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                            <div>
                                <p className="text-[14px] font-bold text-navy">Start planning! <span className="font-normal text-[#5C5C5C]">— your dashboard is pre-configured and ready</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-16">
                    <p className="text-[14px] text-[#5C5C5C]">Already working with us? <button onClick={() => setStep(0)} className="text-[#C9A84C] font-bold hover:underline">Sign in &rarr;</button></p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col h-full bg-white relative">
                {/* Progress Header */}
                <div className="flex items-center gap-4 px-16 py-8 border-b border-[#FAF7F2] sticky top-0 bg-white/95 backdrop-blur-sm z-20">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                                    step > s.id ? 'bg-[#C9A84C] text-white' : 
                                    step === s.id ? 'bg-[#1A1A24] text-white' : 
                                    'bg-[#FAF7F2] text-[#8C857B]'
                                }`}>
                                    {step > s.id ? <Check size={14} strokeWidth={3} /> : s.id}
                                </div>
                                <span className={`text-[12px] font-bold transition-colors ${step >= s.id ? 'text-[#1A1A24]' : 'text-[#8C857B]'}`}>{s.name}</span>
                            </div>
                            {i < steps.length - 1 && <div className={`h-[1px] w-8 transition-colors ${step > s.id ? 'bg-[#C9A84C]' : 'bg-[#E2D8C8]'}`}></div>}
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto px-16 py-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="max-w-2xl mx-auto pb-24">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="font-serif text-4xl font-bold text-navy mb-4 tracking-tight">Tell us about <span className="italic text-[#C9A84C] font-bold">the couple</span></h2>
                                <p className="text-[15px] text-[#5C5C5C] mb-10 leading-relaxed">
                                    Who are we planning for? This personalises your suites and helps your planner address you both correctly from day one.
                                </p>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Partner 1 — First Name <span className="text-[#D32F2F]">*</span></label>
                                            <input type="text" placeholder="e.g. Jessica" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Partner 1 — Last Name <span className="text-[#D32F2F]">*</span></label>
                                            <input type="text" placeholder="e.g. Chen" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Partner 2 — First Name <span className="text-[#D32F2F]">*</span></label>
                                            <input type="text" placeholder="e.g. Michael" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Partner 2 — Last Name <span className="text-[#D32F2F]">*</span></label>
                                            <input type="text" placeholder="e.g. Torres" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Contact Email <span className="text-[#D32F2F]">*</span></label>
                                        <input type="email" placeholder="your@email.com" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        <p className="text-[#8C857B] text-[12px] mt-2">Your approval notification and activation link will be sent here.</p>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-[#E2D8C8] my-10"></div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-4">Select your planning suites <span className="text-[#D32F2F]">*</span></label>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div onClick={() => toggleSuite('Bridal Suite')} className={`border rounded-xl p-6 text-center cursor-pointer transition-all relative ${selectedSuites.includes('Bridal Suite') ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-sm' : 'border-[#E2D8C8] hover:border-[#C9A84C]/50'}`}>
                                            {selectedSuites.includes('Bridal Suite') && <Check size={16} strokeWidth={3} className="absolute top-3 right-3 text-[#C9A84C]" />}
                                            <div className="text-3xl mb-3">👗</div>
                                            <h4 className="font-bold text-navy text-sm mb-1">Bridal Suite</h4>
                                            <p className="text-[11px] text-[#8C857B] leading-tight">Attire, beauty & bridal party</p>
                                        </div>
                                        <div onClick={() => toggleSuite('Groom Suite')} className={`border rounded-xl p-6 text-center cursor-pointer transition-all relative ${selectedSuites.includes('Groom Suite') ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-sm' : 'border-[#E2D8C8] hover:border-[#C9A84C]/50'}`}>
                                            {selectedSuites.includes('Groom Suite') && <Check size={16} strokeWidth={3} className="absolute top-3 right-3 text-[#C9A84C]" />}
                                            <div className="text-3xl mb-3">🤵</div>
                                            <h4 className="font-bold text-navy text-sm mb-1">Groom Suite</h4>
                                            <p className="text-[11px] text-[#8C857B] leading-tight">Attire, grooming & groomsmen</p>
                                        </div>
                                        <div onClick={() => toggleSuite('Partner Suite')} className={`border rounded-xl p-6 text-center cursor-pointer transition-all relative ${selectedSuites.includes('Partner Suite') ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-sm' : 'border-[#E2D8C8] hover:border-[#C9A84C]/50'}`}>
                                            {selectedSuites.includes('Partner Suite') && <Check size={16} strokeWidth={3} className="absolute top-3 right-3 text-[#C9A84C]" />}
                                            <div className="text-3xl mb-3">💛</div>
                                            <h4 className="font-bold text-navy text-sm mb-1">Partner Suite</h4>
                                            <p className="text-[11px] text-[#8C857B] leading-tight">Gender-neutral planning space</p>
                                        </div>
                                    </div>
                                    <p className="text-[13px] text-[#8C857B]">Pick any combination — two Bridal Suites, two Groom Suites, or anything in between. No rules here.</p>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="font-serif text-4xl font-bold text-navy mb-4 tracking-tight">About <span className="italic text-[#C9A84C] font-bold">the wedding</span></h2>
                                <p className="text-[15px] text-[#5C5C5C] mb-10 leading-relaxed">
                                    These details pre-populate your dashboard and timeline — saving your planner hours of setup before your first conversation.
                                </p>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Wedding Date <span className="text-[#D32F2F]">*</span></label>
                                            <div className="relative">
                                                <input type="text" placeholder="10/24/2026" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-navy" size={18} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Wedding Type <span className="text-[#D32F2F]">*</span></label>
                                            <div className="relative">
                                                <select className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all appearance-none">
                                                    <option>Classic / Traditional</option>
                                                    <option>Modern / Minimalist</option>
                                                    <option>Destination / Weekend</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Estimated Guest Count <span className="text-[#D32F2F]">*</span></label>
                                            <div className="relative">
                                                <select className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all appearance-none">
                                                    <option>100–150 guests</option>
                                                    <option>50–100 guests</option>
                                                    <option>150–200 guests</option>
                                                    <option>200+ guests</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Venue Location <span className="text-[#8C857B] normal-case tracking-normal font-normal ml-1">(if known)</span></label>
                                            <input type="text" placeholder="City, State or Country" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Venue Name <span className="text-[#8C857B] normal-case tracking-normal font-normal ml-1">(if already selected)</span></label>
                                        <input type="text" placeholder="e.g. The Grand Estate, Napa Valley" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        <p className="text-[#8C857B] text-[12px] mt-2">Leave blank if still exploring — we can help you find the perfect spot.</p>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-[#E2D8C8] my-10"></div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-4">Estimated Budget <span className="text-[#D32F2F]">*</span></label>
                                    <div className="bg-[#FAF7F2] border border-[#E2D8C8] rounded-md p-6">
                                        <div className="flex justify-between items-end mb-6">
                                            <div>
                                                <div className="font-serif text-4xl font-bold text-navy tracking-tight">${budget.toLocaleString()}</div>
                                                <p className="text-[#8C857B] text-sm">Total wedding budget</p>
                                            </div>
                                            <p className="text-[11px] font-bold text-[#8C857B] uppercase tracking-widest flex items-center gap-1">Drag to adjust &rarr;</p>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <input 
                                                type="range" 
                                                min="5000" 
                                                max="200000" 
                                                step="5000"
                                                value={budget}
                                                onChange={(e) => setBudget(Number(e.target.value))}
                                                className="w-full h-1 bg-[#E2D8C8] rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                                                style={{
                                                    background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${(budget - 5000) / (200000 - 5000) * 100}%, #E2D8C8 ${(budget - 5000) / (200000 - 5000) * 100}%, #E2D8C8 100%)`
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-[#8C857B]">
                                            <span>$5k</span>
                                            <span>$50k</span>
                                            <span>$100k</span>
                                            <span>$150k</span>
                                            <span>$200k+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="font-serif text-4xl font-bold text-navy mb-4 tracking-tight flex items-center gap-3">Now the <span className="italic text-[#C9A84C] font-bold">fun part</span> <Gift className="text-[#C9A84C]" size={28} /></h2>
                                <p className="text-[15px] text-[#5C5C5C] mb-10 leading-relaxed">
                                    Your planner loves getting to know couples before their first meeting. No wrong answers — just be yourselves.
                                </p>

                                <div className="space-y-4">
                                    {/* Question 1 */}
                                    <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E2D8C8]/50">
                                        <div className="flex gap-3 mb-4">
                                            <span className="text-[#C9A84C] mt-0.5"><MessageCircle size={20} /></span>
                                            <div>
                                                <h4 className="font-bold text-navy text-[15px]">How did you two meet?</h4>
                                                <p className="text-[12px] text-[#8C857B]">The full story, the short version, or just the vibe.</p>
                                            </div>
                                        </div>
                                        <textarea 
                                            placeholder="e.g. At a rooftop bar in 2019. He spilled a drink on me. The rest is history."
                                            className="w-full bg-white border border-[#E2D8C8] rounded-md p-4 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] min-h-[100px] resize-none placeholder:text-gray-400 placeholder:italic"
                                        />
                                    </div>

                                    {/* Question 2 */}
                                    <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E2D8C8]/50">
                                        <div className="flex gap-3 mb-4">
                                            <span className="text-[#C9A84C] mt-0.5"><Gem size={20} /></span>
                                            <div>
                                                <h4 className="font-bold text-navy text-[15px]">How did the proposal happen?</h4>
                                                <p className="text-[12px] text-[#8C857B]">Was it a surprise? Did someone cry? Sweep us off our feet.</p>
                                            </div>
                                        </div>
                                        <textarea 
                                            placeholder="e.g. He proposed on a hiking trip. I had absolutely no idea. I cried immediately."
                                            className="w-full bg-white border border-[#E2D8C8] rounded-md p-4 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] min-h-[100px] resize-none placeholder:text-gray-400 placeholder:italic"
                                        />
                                    </div>

                                    {/* Question 3 */}
                                    <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E2D8C8]/50">
                                        <div className="flex gap-3 mb-4">
                                            <span className="text-[#C9A84C] mt-0.5"><Edit3 size={20} /></span>
                                            <div>
                                                <h4 className="font-bold text-navy text-[15px]">Describe your relationship in exactly 3 words.</h4>
                                                <p className="text-[12px] text-[#8C857B]">No more, no less. This one is harder than it sounds.</p>
                                            </div>
                                        </div>
                                        <input 
                                            type="text"
                                            placeholder="e.g. Chaotic, warm, us."
                                            className="w-full bg-white border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Question 4 - Pills */}
                                    <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E2D8C8]/50">
                                        <div className="flex gap-3 mb-4">
                                            <span className="text-[#C9A84C] mt-0.5"><Lightbulb size={20} /></span>
                                            <div>
                                                <h4 className="font-bold text-navy text-[15px]">Who is the planner, and who is the dreamer?</h4>
                                                <p className="text-[12px] text-[#8C857B]">Helps your planner know who to call when a decision needs to be made — fast.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {['Partner 1 plans, Partner 2 dreams', 'Partner 2 plans, Partner 1 dreams', "We're both planners 📋", "We're both dreamers ✨", 'Total chaos, send help 😅'].map(role => (
                                                <button 
                                                    key={role}
                                                    onClick={() => togglePlannerRole(role)}
                                                    className={`px-4 py-2.5 rounded-full border text-[13px] font-medium transition-colors ${plannerRoles.includes(role) ? 'border-[#C9A84C] bg-[#C9A84C] text-white shadow-sm' : 'border-[#E2D8C8] bg-transparent text-[#5C5C5C] hover:border-[#C9A84C]/50 bg-white'}`}
                                                >
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 5 */}
                                    <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E2D8C8]/50">
                                        <div className="flex gap-3 mb-4">
                                            <span className="text-[#C9A84C] mt-0.5"><Heart size={20} /></span>
                                            <div>
                                                <h4 className="font-bold text-navy text-[15px]">What's one thing your partner does that still makes you laugh?</h4>
                                                <p className="text-[12px] text-[#8C857B]">Optional — but your planner will love you for this one.</p>
                                            </div>
                                        </div>
                                        <textarea 
                                            placeholder="e.g. He narrates everything he does in a documentary voice. Every single meal."
                                            className="w-full bg-white border border-[#E2D8C8] rounded-md p-4 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] min-h-[100px] resize-none placeholder:text-gray-400 placeholder:italic"
                                        />
                                    </div>

                                    {/* Question 6 - Pills */}
                                    <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E2D8C8]/50">
                                        <div className="flex gap-3 mb-4">
                                            <span className="text-[#C9A84C] mt-0.5"><Target size={20} /></span>
                                            <div>
                                                <h4 className="font-bold text-navy text-[15px]">What's the one thing that absolutely must be perfect on your day?</h4>
                                                <p className="text-[12px] text-[#8C857B]">The non-negotiable. Your planner will guard it with their life.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {['The food 🍽️', 'The music 🎵', 'The photos 📸', 'The florals 🌸', 'The attire 👗', 'The overall vibe ✨'].map(thing => (
                                                <button 
                                                    key={thing}
                                                    onClick={() => togglePerfectThing(thing)}
                                                    className={`px-5 py-2.5 rounded-full border text-[14px] font-medium transition-colors ${perfectThings.includes(thing) ? 'border-[#C9A84C] bg-[#C9A84C] text-white shadow-sm' : 'border-[#E2D8C8] bg-transparent text-[#5C5C5C] hover:border-[#C9A84C]/50 bg-white'}`}
                                                >
                                                    {thing}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="font-serif text-4xl font-bold text-navy mb-4 tracking-tight">Your wedding <span className="italic text-[#C9A84C] font-bold">style</span></h2>
                                <p className="text-[15px] text-[#5C5C5C] mb-8 leading-relaxed">
                                    This is shared directly with your planner before your first meeting — so they arrive already knowing your vision, not starting from scratch.
                                </p>

                                <div className="bg-[#FAF7F2] border-l-4 border-[#C9A84C] p-6 mb-10">
                                    <p className="text-[14px] text-navy leading-relaxed"><strong className="font-bold">Why we ask:</strong> Your style choices help VowAI curate venue ideas, vendor suggestions, and lookbook inspiration that matches your vision from day one.</p>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-4">Wedding Aesthetic <span className="text-[#D32F2F]">*</span> <span className="text-[#8C857B] normal-case tracking-normal font-normal ml-1">— select all that apply</span></label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                'Classic & Timeless', 'Modern & Minimalist', 'Bohemian & Romantic', 
                                                'Rustic & Organic', 'Glamorous & Luxe', 'Garden & Floral',
                                                'Destination & Tropical', 'Black Tie Formal', 'Still figuring it out!'
                                            ].map(style => (
                                                <div 
                                                    key={style}
                                                    onClick={() => toggleAesthetic(style)}
                                                    className={`border rounded-md p-4 flex items-center gap-4 cursor-pointer transition-all ${aesthetics.includes(style) ? 'border-[#C9A84C] bg-[#FDFBF7]' : 'border-[#E2D8C8] hover:border-[#C9A84C]/50'}`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${aesthetics.includes(style) ? 'border-[#C9A84C]' : 'border-[#E2D8C8]'}`}>
                                                        {aesthetics.includes(style) && <div className="w-2 h-2 rounded-full bg-[#C9A84C]"></div>}
                                                    </div>
                                                    <span className={`text-[14px] font-bold ${aesthetics.includes(style) ? 'text-navy' : 'text-[#1A1A24]'}`}>{style}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Colour Palette <span className="text-[#8C857B] normal-case tracking-normal font-normal ml-1">(optional)</span></label>
                                            <input type="text" placeholder="e.g. Ivory, sage green, gold" className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all placeholder:text-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Ceremony Setting <span className="text-[#D32F2F]">*</span></label>
                                            <div className="relative">
                                                <select className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md px-4 py-3.5 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white transition-all appearance-none">
                                                    <option>Indoor</option>
                                                    <option>Outdoor</option>
                                                    <option>Both</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-widest text-navy mb-2">Anything else your planner should know? <span className="text-[#8C857B] normal-case tracking-normal font-normal ml-1">(optional)</span></label>
                                        <textarea 
                                            placeholder="e.g. We want something very intimate. My partner has mobility needs. We're open to unconventional ideas..."
                                            className="w-full bg-[#FAF7F2] border border-[#E2D8C8] rounded-md p-4 text-[15px] text-navy focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:bg-white min-h-[120px] resize-none transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center text-center py-8">
                                <div className="w-20 h-20 bg-white border-2 border-[#C9A84C] rounded-full flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(201,168,76,0.2)]">
                                    <div className="relative">
                                        <Mail className="text-[#C9A84C]" size={32} />
                                        <div className="absolute inset-0 flex items-center justify-center mt-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                                <Heart size={8} className="text-white fill-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="font-serif text-[42px] font-bold text-navy mb-4 tracking-tight">Inquiry <span className="italic text-[#C9A84C] font-bold">received!</span></h2>
                                <p className="text-[16px] text-[#5C5C5C] mb-2 leading-relaxed max-w-md">
                                    Your planner has been notified and will personally review your inquiry. <span className="font-bold text-navy">Expect to hear back within 24–48 hours.</span>
                                </p>

                                <div className="w-full max-w-xl text-left space-y-3 mt-10">
                                    <div className="bg-[#FAF7F2] border border-[#E2D8C8] rounded-xl p-5 flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-[#F9F4E5] flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={14} className="text-[#C9A84C]" strokeWidth={3} /></div>
                                        <div>
                                            <h4 className="font-bold text-navy text-[15px] mb-0.5">Inquiry submitted</h4>
                                            <p className="text-[13px] text-[#5C5C5C]">Your details are safely with your planner.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-[#FAF7F2] border border-[#E2D8C8] rounded-xl p-5 flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-[#E8E2D5] flex items-center justify-center flex-shrink-0 mt-0.5 text-[12px] font-bold text-navy/60">2</div>
                                        <div>
                                            <h4 className="font-bold text-navy text-[15px] mb-0.5">Planner reviews your inquiry</h4>
                                            <p className="text-[13px] text-[#5C5C5C]">They'll read your story, style, and wedding details personally.</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#FAF7F2] border border-[#E2D8C8] rounded-xl p-5 flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-[#E8E2D5] flex items-center justify-center flex-shrink-0 mt-0.5 text-[12px] font-bold text-navy/60">3</div>
                                        <div>
                                            <h4 className="font-bold text-navy text-[15px] mb-0.5">You receive your activation email</h4>
                                            <p className="text-[13px] text-[#5C5C5C]">A personalised link to activate your VowTrack suite — no password until then.</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#FAF7F2] border border-[#E2D8C8] rounded-xl p-5 flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-[#E8E2D5] flex items-center justify-center flex-shrink-0 mt-0.5 text-[12px] font-bold text-navy/60">4</div>
                                        <div>
                                            <h4 className="font-bold text-navy text-[15px] mb-0.5">Start planning your perfect day</h4>
                                            <p className="text-[13px] text-[#5C5C5C]">Your dashboard will be pre-configured with everything you just shared.</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[12px] text-[#8C857B] mt-10 italic mb-6">
                                    Didn't get a confirmation email? Check your spam or <button onClick={() => setStep(0)} className="text-[#C9A84C] font-bold hover:underline not-italic">contact us here.</button>
                                </p>
                                
                                <Button 
                                    variant="primary" 
                                    className="bg-[#1A1A24] text-white hover:bg-black rounded-full px-10 py-3.5 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
                                    onClick={() => onNavigate('homepage')}
                                >
                                    Return to Homepage
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Bar */}
                {step < 5 && (
                    <div className="border-t border-[#E2D8C8] bg-white px-16 py-6 flex items-center justify-between sticky bottom-0 z-20">
                        <button 
                            onClick={() => step === 1 ? setStep(0) : setStep(s => s - 1)} 
                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#8C857B] hover:text-navy transition-colors px-4 py-2 border border-[#E2D8C8] rounded-md hover:bg-gray-50"
                        >
                            &larr; BACK
                        </button>
                        
                        <div className="flex items-center gap-6">
                            <span className="text-[13px] text-[#8C857B]">Step {step} of 4</span>
                            
                            {step < 4 ? (
                                <Button 
                                    variant="primary" 
                                    className="bg-[#1A1A24] text-white hover:bg-black rounded-sm px-8 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2"
                                    onClick={() => setStep(s => s + 1)}
                                >
                                    CONTINUE &rarr;
                                </Button>
                            ) : (
                                <Button 
                                    variant="gold" 
                                    className="bg-[#C9A84C] text-white hover:bg-[#b09341] border-none rounded-sm px-8 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-md"
                                    onClick={() => setStep(5)}
                                >
                                    SUBMIT INQUIRY <Sparkles size={14} className="ml-1" />
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

const DashboardState = ({ onNavigate, onOpenChat }: { onNavigate: (view: any) => void, onOpenChat: (intent?: string) => void }) => (
  <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-6 bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    {/* Hero Section */}
    <Card className="w-full h-[500px] flex justify-between items-center relative overflow-hidden bg-white !border-[4px] !border-white shadow-xl">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1622520024118-d36d908cdb46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Elegant engaged couple outdoors"
          className="w-full h-full object-cover grayscale opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="z-10 relative flex flex-col justify-center h-full max-w-2xl ml-12">
        <Badge variant="success" className="mb-6 w-fit">On Track</Badge>
        <h2 className="font-serif text-[56px] font-bold text-navy mb-4 leading-[1.1]">Welcome Back,<br/><span className="italic font-normal text-[#C9A84C]">Jessica & Michael</span></h2>
        <p className="font-sans text-[18px] text-muted-foreground mb-10 leading-relaxed max-w-md">
          You have <strong className="text-navy font-semibold border-b border-[#C9A84C]">145 days</strong> until your big day. 
          Everything is moving along perfectly.
        </p>
        <div className="flex gap-4">
            <Button onClick={() => onNavigate('timeline')} variant="gold">
              View Full Timeline
            </Button>
            <Button onClick={() => onNavigate('timeline')} variant="secondary">
              3 Tasks Due Today
            </Button>
        </div>
      </div>
      
      {/* Decorative Circle / Image Placeholder */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border-[4px] border-[#C9A84C] bg-ivory flex items-center justify-center overflow-hidden group shadow-[inset_0_6px_16px_rgba(0,0,0,0.25),0_16px_48px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-full"
        >
          <ImageWithFallback 
            src={coupleRingImage}
            alt="Couple showing engagement ring"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
          />
        </motion.div>
      </div>
    </Card>

    {/* Bottom Section */}
    <div className="flex gap-6 w-full min-h-[280px]">
      {/* Quick Access Grid */}
      <Card className="flex-1 flex flex-col items-center justify-center text-center bg-white border border-ivory-dark relative overflow-hidden">
         <h3 className="font-serif text-3xl text-navy mb-8 relative z-10">
            Plan your <span className="italic">perfect</span> day,<br/>
            <span className="italic">stress-free</span>.
         </h3>
         
         <div className="flex gap-6 relative z-10 w-full px-12 justify-center">
             <Card 
                color="bg-[#FBEAE8]" 
                className="w-full max-w-[200px] h-[160px] flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#FBEAE8] shadow-sm group rounded-[32px]"
                onClick={() => onNavigate('bridal')}
                padding="p-4"
             >
                <TiaraIcon size={44} className="mb-4 text-[#2D2A3E] group-hover:scale-110 transition-all duration-500" />
                <h3 className="font-serif text-[22px] mb-1 text-[#2D2A3E] font-medium tracking-wide">Bridal Suite</h3>
             </Card>
             
             <Card 
                color="bg-[#EEF5F8]" 
                className="w-full max-w-[200px] h-[160px] flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#EEF5F8] shadow-sm group rounded-[32px]"
                onClick={() => onNavigate('groom')}
                padding="p-4"
             >
                <BowtieIcon size={44} className="mb-4 text-[#2D2A3E] group-hover:scale-110 transition-all duration-500" />
                <h3 className="font-serif text-[22px] mb-1 text-[#2D2A3E] font-medium tracking-wide">Groom Suite</h3>
             </Card>
         </div>
      </Card>

      {/* VowAI Concierge Card */}
      <Card 
          onClick={() => onOpenChat()}
          className="flex-1 border-[1.5px] border-[#C9A84C] bg-white relative group cursor-pointer hover:shadow-lg transition-all duration-300"
      >
         <div className="absolute top-0 right-0 bg-[#C9A84C] text-white text-[10px] font-bold px-6 py-2 rounded-bl-[14px] uppercase tracking-widest">
            VowAi Concierge
         </div>
         
         <div className="w-full flex flex-col items-center justify-center h-full max-w-lg mx-auto">
             <div className="text-[24px] font-serif italic font-bold text-navy mb-8 text-center">
              "How can I help you today?"
            </div>
            
            <div className="w-full h-12 bg-ivory border border-ivory-dark rounded-full flex items-center px-6 mb-6 group-hover:border-navy transition-colors">
              <div className="w-2 h-2 bg-navy rounded-full mr-4 animate-pulse"></div>
              <span className="text-taupe text-sm font-medium">Type a command or ask a question...</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Find Venues", variant: 'gold' as const, action: () => onNavigate('search') },
                { label: "Draft Vows", variant: 'outline' as const, action: () => onOpenChat('vows') },
                { label: "Manage Guests", variant: 'outline' as const, action: () => onNavigate('guests') }
              ].map((btn, i) => (
                <Button 
                  key={i}
                  size="sm"
                  variant={btn.variant}
                  onClick={(e) => { e?.stopPropagation(); btn.action(); }}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
         </div>
      </Card>
    </div>
  </div>
);

const SearchResultsState = ({ onSelect, onBack, onOpenChat }: { onSelect: (id: number) => void, onBack: () => void, onOpenChat: (intent?: string) => void }) => {
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedGuestCount, setSelectedGuestCount] = useState<string | null>(null);
    const [appliedFilters, setAppliedFilters] = useState<{ styles: string[], guestCount: string | null }>({ styles: [], guestCount: null });
    
    const toggleStyle = (style: string) => {
        setSelectedStyles(prev => 
            prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
        );
    };

    const applyFilters = () => {
        setAppliedFilters({ styles: selectedStyles, guestCount: selectedGuestCount });
    };

    const filteredVenues = MOCK_VENUES.filter(venue => {
        if (appliedFilters.styles.length > 0) {
            const hasStyle = appliedFilters.styles.some(s => venue.styles.includes(s));
            if (!hasStyle) return false;
        }
        if (appliedFilters.guestCount) {
            if (appliedFilters.guestCount === '50-100' && venue.maxGuests < 50) return false;
            if (appliedFilters.guestCount === '100-200' && venue.maxGuests < 100) return false;
            if (appliedFilters.guestCount === '200+' && venue.maxGuests < 200) return false;
        }
        return true;
    });

    return (
        <div className="px-12 py-8 h-full flex flex-col w-full bg-background overflow-hidden">
             {/* Header */}
             <div className="flex justify-between items-end mb-8 border-b border-ivory-dark pb-6">
                  <div>
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>
                     <h2 className="font-serif text-4xl font-bold text-navy italic mb-2">Premier Venues</h2>
                     <p className="font-sans text-sm text-muted-foreground">Curated luxury locations based on your monochrome aesthetic.</p>
                  </div>
                  <div className="flex gap-3">
                     <Button variant="outline" size="sm">
                         <Map size={14} /> Map View
                     </Button>
                     <Button variant="primary" size="sm">
                         <ListPlus size={14} /> Compare
                     </Button>
                  </div>
             </div>

             <div className="flex gap-8 h-full overflow-hidden">
                 {/* Main Content: Venue Grid */}
                 <div className="flex-1 overflow-y-auto pr-2 pb-[260px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                     <div className="grid grid-cols-2 gap-6">
                         {filteredVenues.map((venue) => (
                             <Card 
                                 key={venue.id} 
                                 onClick={() => onSelect(venue.id)}
                                 padding="p-4"
                                 className="group hover:border-navy transition-all cursor-pointer flex flex-col h-[380px]"
                             >
                                 <div className="w-full h-48 bg-gray-100 rounded-2xl mb-4 relative overflow-hidden">
                                     <ImageWithFallback 
                                         src={venue.image}
                                         alt={venue.name}
                                         className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                     />
                                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-[4px] text-[10px] font-bold shadow-sm text-navy">
                                         Starting at {venue.price}
                                     </div>
                                 </div>
                                 
                                 <div className="flex justify-between items-start mb-2 px-2">
                                     <div>
                                         <h3 className="font-serif text-xl font-bold text-navy">{venue.name}</h3>
                                         <div className="flex items-center gap-1 text-[10px] font-bold text-taupe uppercase tracking-wider mt-1">
                                             <MapPin size={10} /> {venue.location}
                                         </div>
                                     </div>
                                     <Badge variant="neutral" className="bg-ivory border border-ivory-dark">
                                         <Star size={10} fill="currentColor" /> {venue.rating}
                                     </Badge>
                                 </div>
                                 
                                 <p className="px-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-6 font-sans">
                                     A masterpiece of architectural elegance, offering a strict monochrome palette and expansive garden views.
                                 </p>
                                 
                                 <div className="mt-auto pt-4 border-t border-ivory-dark px-2 flex items-center justify-between">
                                     <div className="flex -space-x-2">
                                         {[1,2,3].map(p => <div key={p} className="w-6 h-6 rounded-full bg-ivory-dark border-2 border-white" />)}
                                     </div>
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-navy group-hover:underline decoration-champagne underline-offset-4">View Details</span>
                                 </div>
                             </Card>
                         ))}
                     </div>
                 </div>

                 {/* Sidebar Filter */}
                 <div className="w-80 border-l border-ivory-dark pl-8 flex flex-col pt-2 h-full">
                     <div className="flex justify-between items-center mb-6">
                         <h3 className="text-xs font-bold uppercase text-taupe tracking-widest flex items-center gap-2">
                            <Settings size={14} /> Refine Search
                         </h3>
                     </div>
                     
                     <div className="mb-8">
                        <Button variant="primary" className="w-full" onClick={applyFilters}>Apply Filters</Button>
                     </div>
                     
                     <div className="space-y-8 flex-1">
                         <div>
                             <label className="text-xs font-bold text-navy block mb-3 uppercase tracking-wider">Price Range</label>
                             <div className="h-1 bg-ivory-dark rounded-full overflow-hidden">
                                <div className="h-full w-1/2 bg-navy rounded-full"></div>
                             </div>
                             <div className="flex justify-between mt-2 text-[10px] text-taupe font-bold">
                                <span>$5k</span>
                                <span>$50k+</span>
                             </div>
                         </div>

                         <div>
                             <label className="text-xs font-bold text-navy block mb-3 uppercase tracking-wider">Style</label>
                             <div className="flex flex-wrap gap-2">
                                {['Modern', 'Vintage', 'Rustic', 'Luxury'].map(tag => (
                                    <button 
                                        key={tag} 
                                        onClick={() => toggleStyle(tag)}
                                        className={`px-3 py-1 border rounded-[3px] text-[10px] font-bold transition-colors uppercase ${
                                            selectedStyles.includes(tag) 
                                            ? 'border-navy bg-navy text-white' 
                                            : 'border-ivory-dark text-taupe hover:border-navy hover:text-navy'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                             </div>
                         </div>
                         
                         <div>
                             <label className="text-xs font-bold text-navy block mb-3 uppercase tracking-wider">Guest Count</label>
                             <div className="grid grid-cols-3 gap-2">
                                 {['50-100', '100-200', '200+'].map(count => (
                                     <button 
                                         key={count}
                                         onClick={() => setSelectedGuestCount(count)}
                                         className={`py-2 border rounded-[3px] text-[10px] font-bold transition-colors text-center ${
                                             selectedGuestCount === count
                                             ? 'border-navy bg-navy text-white'
                                             : 'border-ivory-dark text-taupe hover:border-navy hover:text-navy'
                                         }`}
                                     >
                                         {count}
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             {/* VowAI Scout Panel */}
             <div 
                className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-white/50 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
             >
                <div className="flex items-center justify-between mb-6">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                      <Sparkles size={18} className="text-[#5A86A3]" />
                   </div>
                   <div className="bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
                      <span className="text-[10px] font-bold tracking-widest text-[#5A86A3] uppercase">VOWAI SCOUT</span>
                   </div>
                </div>
                
                <div className="mb-6 relative z-10">
                   <h3 className="font-serif text-[26px] font-bold italic text-navy mb-2">Venue Finder</h3>
                   <p className="text-[14px] text-taupe leading-relaxed">
                      Not sure where to start? I can analyze your guest list and style to recommend the perfect spot.
                   </p>
                </div>

                <div className="flex flex-col gap-3 relative z-10 mb-2">
                   <button onClick={() => onOpenChat('venue_finder')} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
                      ASK FOR HELP
                      <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                   </button>
                </div>
             </div>
        </div>
    );
};

const VenueDetailState = ({ venue, onBack, onAction, onOpenChat }: { venue: typeof MOCK_VENUES[0], onBack: () => void, onAction: () => void, onOpenChat: (intent?: string) => void }) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(venue.availableDates[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const [shortlisted, setShortlisted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
        }
    };

    const timeSlots = venue.timeSlots;
    const dates = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, null, null, null, null]
    ];
    
    const availableDates = venue.availableDates;

    return (
        <div className="flex flex-col h-full w-full bg-background overflow-hidden relative">
            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {fullScreenImg && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-8"
                        onClick={() => setFullScreenImg(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors" onClick={() => setFullScreenImg(null)}>
                            <X size={32} />
                        </button>
                        <img src={fullScreenImg} alt="Gallery Full" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header / Top Bar */}
            <div className="flex justify-between items-center px-12 pt-8 pb-4 bg-background flex-shrink-0 z-10 relative">
                 <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] transition-colors tracking-widest">
                     <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                 </button>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setLiked(!liked)}
                        className="w-10 h-10 rounded-full border border-ivory-dark bg-white text-navy flex items-center justify-center hover:scale-105 transition-all shadow-sm group"
                    >
                        <Heart size={18} className={`${liked ? 'fill-red-500 text-red-500' : 'group-hover:text-red-500'} transition-colors`} />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-ivory-dark bg-white text-navy flex items-center justify-center hover:scale-105 transition-all shadow-sm">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                {/* Hero Image Section */}
                <div className="px-12 pb-12">
                    <div className="relative h-[420px] w-full bg-navy rounded-[32px] overflow-hidden shadow-lg group">
                        <ImageWithFallback 
                            src={venue.image} 
                            alt="Venue Hero" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent pointer-events-none h-full w-full" />
                        <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        
                        {/* Title and Info Overlay */}
                        <div className="absolute bottom-12 left-12 text-white z-10">
                            <h1 className="font-serif text-5xl font-bold italic mb-4 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)] tracking-wide">{venue.name}</h1>
                            <div className="flex items-center gap-4">
                                <Badge variant="neutral" className="bg-black/40 backdrop-blur-md border-white/20 text-white shadow-lg px-3 py-1 text-xs">
                                    <Star size={12} className="mr-1.5 fill-champagne text-champagne" /> {venue.rating} Superb
                                </Badge>
                                <span className="text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                                    <MapPin size={14} className="text-champagne" /> {venue.location}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Split (Below Hero Image) */}
                <div className="flex px-12 gap-12 pb-[260px] items-start w-full">
                    
                    {/* Left Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="font-serif text-2xl text-navy mb-4">About the Venue</h2>
                                <p className="text-muted-foreground leading-relaxed font-sans max-w-2xl text-sm">
                                    {venue.about}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-8">
                                <div className="text-3xl font-serif text-navy mb-1">{venue.price}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-taupe">Starting Price</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-12 bg-ivory/50 p-6 rounded-2xl border border-ivory-dark/50">
                            {[
                                { label: "Guest Capacity", value: venue.capacity, icon: Users },
                                { label: "Venue Type", value: venue.type, icon: Briefcase },
                                { label: "Setting", value: venue.setting, icon: Map }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-taupe">
                                        <stat.icon size={14} className="text-champagne" /> {stat.label}
                                    </div>
                                    <div className="text-navy font-bold text-sm pl-6">{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-2xl text-navy">Gallery</h2>
                            <div className="flex gap-2">
                                <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full flex items-center justify-center border border-ivory-dark text-taupe hover:text-navy hover:border-navy transition-colors">
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full flex items-center justify-center border border-ivory-dark text-taupe hover:text-navy hover:border-navy transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {venue.gallery.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setFullScreenImg(img)}
                                    className="w-[300px] h-48 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden snap-center cursor-pointer group relative"
                                >
                                    <ImageWithFallback src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors flex items-center justify-center">
                                        <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar - Booking Calendar */}
                    <div className="w-[480px] flex-shrink-0 sticky top-0">
                        <div className="bg-white border border-ivory-dark rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-navy text-lg">October 2026</h3>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-ivory-dark text-taupe hover:text-navy hover:border-navy transition-colors"><ChevronLeft size={16} /></button>
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-ivory-dark text-taupe hover:text-navy hover:border-navy transition-colors"><ChevronRight size={16} /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-x-2 gap-y-3 mb-8 text-center text-[10px]">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="font-bold text-taupe tracking-widest mb-2">{day}</div>
                            ))}
                            {dates.map((week, weekIdx) => (
                                week.map((day, dayIdx) => {
                                    if (!day) return <div key={`empty-${weekIdx}-${dayIdx}`} className="aspect-square" />;
                                    
                                    const isAvailable = availableDates.includes(day);
                                    const isSelected = selectedDate === day;

                                    return (
                                        <div key={day} className="flex justify-center items-start aspect-square">
                                            <button
                                                onClick={() => isAvailable && setSelectedDate(day)}
                                                disabled={!isAvailable}
                                                className={`
                                                    w-full h-full rounded-xl flex flex-col items-center justify-center transition-all relative
                                                    ${isSelected ? 'bg-navy text-white shadow-md' : ''}
                                                    ${isAvailable && !isSelected ? 'bg-gray-50/50 hover:bg-ivory text-navy font-medium' : ''}
                                                    ${!isAvailable && !isSelected ? 'text-gray-300 cursor-not-allowed' : ''}
                                                `}
                                            >
                                                <span className="text-sm">{day}</span>
                                                {isAvailable && !isSelected && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute bottom-2" />
                                                )}
                                            </button>
                                        </div>
                                    );
                                })
                            ))}
                        </div>

                        <div className="border-t border-ivory-dark pt-6 mb-8">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-taupe mb-4">
                                <Clock size={12} className="text-champagne" /> Available Times
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`
                                            px-4 py-2 border rounded-full text-xs font-bold transition-all
                                            ${selectedTime === time 
                                                ? 'bg-navy border-navy text-white shadow-md' 
                                                : 'border-ivory-dark text-navy bg-white hover:border-navy'
                                            }
                                        `}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isConfirmed ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-xl flex flex-col items-center gap-2 mb-4 shadow-sm"
                            >
                                <CheckCircle2 size={24} className="text-emerald-500" />
                                <span className="font-bold text-sm">Tour Requested Successfully!</span>
                                <span className="text-xs opacity-80">The venue concierge will reach out shortly.</span>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Button 
                                    variant="primary" 
                                    className="w-full py-4 text-sm font-bold" 
                                    onClick={() => setIsConfirmed(true)}
                                    disabled={!selectedDate || !selectedTime}
                                >
                                    Request Tour
                                </Button>
                                <Button 
                                    variant={shortlisted ? "secondary" : "outline"}
                                    className="w-full py-4 text-sm font-bold" 
                                    onClick={() => setShortlisted(!shortlisted)}
                                >
                                    {shortlisted ? (
                                        <span className="flex items-center justify-center gap-2"><Check size={16} /> Shortlisted</span>
                                    ) : 'Add to Shortlist'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>

            {/* VowAI Scout Panel */}
            <div 
               className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-white/50 cursor-pointer"
               style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                     <Sparkles size={18} className="text-[#5A86A3]" />
                  </div>
                  <div className="bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
                     <span className="text-[10px] font-bold tracking-widest text-[#5A86A3] uppercase">VOWAI SCOUT</span>
                  </div>
               </div>
               
               <div className="mb-6 relative z-10">
                  <h3 className="font-serif text-[26px] font-bold italic text-navy mb-2">Venue Concierge</h3>
                  <p className="text-[14px] text-taupe leading-relaxed">
                     I'm here to answer any questions about the venue, capacity, restrictions, and catering options!
                  </p>
               </div>

               <div className="flex flex-col gap-3 relative z-10 mb-2">
                  <button onClick={() => onOpenChat?.('venue_questions')} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
                     ASK A QUESTION
                     <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
               </div>
            </div>
        </div>
    );
};

// --- Bridal Suite Component ---
const BridalSuiteState = ({ onOpenChat, onBack, onNavigate }: { onOpenChat: (intent?: string) => void, onBack: () => void, onNavigate: (view: any) => void }) => {
    const sections = [
        {
            title: "Bridal Attire",
            items: [
                { name: "Wedding Dress", status: "PENDING", type: "neutral", action: "Find Boutiques", icon: Crown },
                { name: "Reception Look", status: "PENDING", type: "neutral", action: "Shop Looks", icon: Sparkles },
                { name: "Rehearsal Outfit", status: "IN PROGRESS", type: "info", action: "Shop Looks", icon: Shirt },
                { name: "Other Occasions", status: "PENDING", type: "neutral", action: "Shop Looks", icon: Camera }
            ]
        },
        {
            title: "Beauty & Wellness",
            items: [
                { name: "Hair & Makeup", status: "BOOKED", type: "warning", action: "View Artists", icon: Scissors },
                { name: "Day-Of Beauty", status: "PENDING", type: "neutral", action: "Find Salons", icon: Heart },
                { name: "Spa & Massage", status: "SCHEDULED", type: "info", action: "Find Spas", icon: Flower2 },
                { name: "Manicure/Pedicure", status: "OVERDUE", type: "error", action: "Find Salons", icon: Sparkles }
            ]
        },
        {
            title: "Accessories",
            items: [
                { name: "Shoes", status: "PENDING", type: "neutral", action: "Shop Shoes", icon: ShoppingBag },
                { name: "Veil & Headpieces", status: "ON TRACK", type: "success", action: "Shop Veils", icon: Crown },
                { name: "Jewelry", status: "PENDING", type: "neutral", action: "Shop Jewelry", icon: Gem },
                { name: "Garter", status: "PENDING", type: "neutral", action: "Shop Accessories", icon: Heart }
            ]
        }
    ];

    return (
        <div className="px-12 pt-8 pb-4 h-full flex flex-col w-full bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-0">
            {/* Soft background accents */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#F2D4CF]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#C9DCE8]/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
            
            <div className="flex justify-between items-end flex-shrink-0 mb-10 pb-6 border-b border-[#C9A84C]/20 relative z-10">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>
                    <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
                        Bridal Suite <Sparkles className="text-[#C9A84C]" size={32} strokeWidth={1.5} />
                    </h2>
                    <p className="text-base text-taupe font-medium">Curate your perfect look, timeline, and party details.</p>
                 </div>
                 <div className="flex gap-4">
                    <Button 
                        variant="outline"
                        className="flex items-center gap-2 relative group bg-[#F2D4CF]/20 border-[#F2D4CF]/50 hover:bg-[#F2D4CF]/40 text-navy"
                        onClick={() => onNavigate('gifts')}
                    >
                        <div className="relative">
                            <Gift size={16} className="text-navy" />
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#F2D4CF] rounded-full border-2 border-white flex items-center justify-center text-[8px] text-navy font-bold">
                                4
                            </div>
                        </div>
                        GIFT REGISTRY
                    </Button>
                    <Button variant="primary" className="bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-white border-none shadow-md" onClick={() => {}}>
                        SHARE LOOKBOOK
                    </Button>
                 </div>
            </div>
            
            <div className="flex gap-10 relative z-10 pb-[260px]">
                {/* Main Content */}
                <div className="flex-1 flex flex-col pr-4">
                    <div className="grid grid-cols-3 gap-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-navy border-b-[1.5px] border-[#C9A84C]/40 pb-3 mb-2 font-serif italic">{section.title}</h3>
                                {section.items.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="group p-5 bg-white/80 backdrop-blur-sm border border-[#F2D4CF]/40 rounded-xl hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col gap-4"
                                        onClick={() => {
                                            if (item.name === "Wedding Dress") {
                                                onNavigate('wedding_dress_boutiques');
                                            }
                                        }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#F2D4CF]/20 text-[#C9A84C] flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:text-white transition-colors">
                                                    {item.icon && <item.icon size={14} />}
                                                </div>
                                                <span className="text-base font-bold text-navy group-hover:text-[#C9A84C] transition-colors">{item.name}</span>
                                            </div>
                                            <div className="w-5 h-5 border-[1.5px] border-[#C9A84C]/50 rounded-full group-hover:bg-[#C9A84C]/20 group-hover:border-[#C9A84C] transition-colors flex items-center justify-center" />
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <Badge variant={item.type as any}>{item.status}</Badge>
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-taupe group-hover:text-[#C9A84C] transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                                {item.action} <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Bridesmaids Section */}
                    <div className="mt-12 border-t border-[#C9A84C]/20 pt-8">
                        <div className="flex justify-between items-center border-b-[1.5px] border-[#C9A84C]/40 pb-3 mb-6">
                            <h3 className="text-xl font-bold text-navy font-serif italic">Bridesmaids & Party</h3>
                            <button className="text-xs font-bold text-[#C9A84C] hover:text-navy transition-colors uppercase tracking-widest flex items-center gap-1">
                                Manage Party <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {[
                                { name: "Sarah Jenkins", role: "Maid of Honor", status: "DRESS FITTED", img: "https://images.unsplash.com/photo-1767256483388-f45e3e6dff29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdCUyMHNvZnQlMjBsaWdodCUyMGZvcm1hbHxlbnwxfHx8fDE3NzI2NjYyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080", highlight: true },
                                { name: "Emily Chen", role: "Bridesmaid", status: "ORDERED", img: "https://images.unsplash.com/photo-1739301674010-661ffe2ef4db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwYmVhdXRpZnVsJTIwd29tYW4lMjBwb3J0cmFpdCUyMG91dGRvb3JzJTIwbGlnaHR8ZW58MXx8fHwxNzcyNjY2MjczfDA&ixlib=rb-4.1.0&q=80&w=1080" },
                                { name: "Jessica Taylor", role: "Bridesmaid", status: "NEEDS FITTING", img: "https://images.unsplash.com/photo-1763455302890-ba9f62d4af92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVhdXRpZnVsJTIwd29tYW4lMjBwb3J0cmFpdCUyMHNtaWxpbmclMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzcyNjY2MjczfDA&ixlib=rb-4.1.0&q=80&w=1080", alert: true },
                                { name: "Amanda Ross", role: "Bridesmaid", status: "ORDERED", img: "https://images.unsplash.com/photo-1679486479476-5ff4ee182334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBlbGVnYW50JTIwZHJlc3N8ZW58MXx8fHwxNzcyNjY2Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080" }
                            ].map((bm, idx) => (
                                <div key={idx} className={`group relative p-5 bg-white/80 backdrop-blur-sm border rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center cursor-pointer ${bm.highlight ? 'border-[#C9A84C]' : 'border-[#F2D4CF]/40 hover:border-[#F2D4CF]'}`}>
                                    {bm.highlight && (
                                        <div className="absolute -top-3 bg-[#C9A84C] text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-10">
                                            Maid of Honor
                                        </div>
                                    )}
                                    <div className="relative mb-4 mt-2">
                                        <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${bm.highlight ? 'border-[#C9A84C]' : 'border-transparent'} p-[2px]`}>
                                            <div className="w-full h-full rounded-full overflow-hidden">
                                                <ImageWithFallback src={bm.img} alt={bm.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        </div>
                                        {bm.alert && (
                                            <div className="absolute top-0 right-0 w-4 h-4 bg-error rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                    <div className="text-base font-bold text-navy mb-1">{bm.name}</div>
                                    <div className="text-[10px] text-taupe font-serif italic mb-3">{bm.role}</div>
                                    
                                    <div className={`w-full py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-colors ${
                                        bm.alert 
                                            ? 'bg-error/10 text-error' 
                                            : bm.status === 'DRESS FITTED' 
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-[#C9DCE8]/30 text-navy'
                                    }`}>
                                        {bm.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Logistics Sidebar */}
                <div className="w-[320px] pl-8 flex flex-col border-l border-[#C9A84C]/20">
                    <h3 className="text-xs font-bold uppercase text-[#C9A84C] tracking-widest mb-8 flex items-center gap-2">
                        <Clock size={14} /> Personal Timeline
                    </h3>
                    <div className="space-y-8 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#C9A84C]/30" />
                        {[
                            { time: "09:00 AM", event: "Hair & Makeup" },
                            { time: "11:30 AM", event: "Dress Fitting" },
                            { time: "02:00 PM", event: "Photography" },
                            { time: "04:30 PM", event: "Ceremony Start" }
                        ].map((t, i) => (
                            <div key={i} className="flex gap-6 relative">
                                <div className="w-4 h-4 rounded-full bg-[#C9A84C] border-[3px] border-white shadow-sm shrink-0 z-10" />
                                <div className="-mt-1">
                                    <div className="text-sm font-bold text-navy">{t.time}</div>
                                    <div className="text-sm text-taupe">{t.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VowAI Style Assistant Panel */}
            <div 
               className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-white/50 cursor-pointer"
               style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                     <Sparkles size={18} className="text-[#5A86A3]" />
                  </div>
                  <div className="bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
                     <span className="text-[10px] font-bold tracking-widest text-[#5A86A3] uppercase">VOWAI CONCIERGE</span>
                  </div>
               </div>
               
               <div className="mb-6 relative z-10">
                  <h3 className="font-serif text-[26px] font-bold italic text-navy mb-2">Style Assistant</h3>
                  <p className="text-[14px] text-taupe leading-relaxed">
                     I can help coordinate your palette with the bridal party looks. Shall we start?
                  </p>
               </div>

               <div className="flex flex-col gap-3 relative z-10 mb-2">
                  <button onClick={() => onOpenChat?.('style_assistant')} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
                     COORDINATE COLORS
                     <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
               </div>
            </div>
        </div>
    );
};

// --- Groom Suite Component ---
const GroomSuiteState = ({ onOpenChat, onBack, onNavigate }: { onOpenChat: (intent?: string) => void, onBack: () => void, onNavigate: (view: any) => void }) => {
    const sections = [
        {
            title: "Groom Attire",
            items: [
                { name: "Wedding Tuxedo", status: "FITTED", type: "success", action: "View Tailor", icon: Crown },
                { name: "Reception Jacket", status: "PENDING", type: "neutral", action: "Shop Looks", icon: Sparkles },
                { name: "Rehearsal Suit", status: "IN PROGRESS", type: "info", action: "Shop Looks", icon: Shirt },
                { name: "Dress Shoes", status: "ORDERED", type: "info", action: "Track Order", icon: ShoppingBag }
            ]
        },
        {
            title: "Grooming & Prep",
            items: [
                { name: "Haircut & Styling", status: "BOOKED", type: "warning", action: "View Barber", icon: Scissors },
                { name: "Hot Towel Shave", status: "PENDING", type: "neutral", action: "Find Barbers", icon: Sparkles },
                { name: "Skin Routine", status: "ON TRACK", type: "success", action: "View Details", icon: Heart },
                { name: "Tailor Final Fitting", status: "OVERDUE", type: "error", action: "Book Now", icon: Scissors }
            ]
        },
        {
            title: "Accessories",
            items: [
                { name: "Luxury Watch", status: "PENDING", type: "neutral", action: "Shop Watches", icon: Watch },
                { name: "Cufflinks & Tie Bar", status: "ON TRACK", type: "success", action: "View Items", icon: Gem },
                { name: "Tie or Bowtie", status: "PENDING", type: "neutral", action: "Shop Ties", icon: Shirt },
                { name: "Dress Socks", status: "PENDING", type: "neutral", action: "Shop Accessories", icon: ShoppingBag }
            ]
        }
    ];

    return (
        <div className="px-12 py-8 h-full flex flex-col w-full bg-background overflow-hidden relative z-0">
            {/* Soft background accents tailored for the groom */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#94A3B8]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/15 rounded-full blur-[80px] -z-10 pointer-events-none" />
            
            <div className="flex justify-between items-end mb-10 pb-6 border-b border-[#C9A84C]/20 relative z-10">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>
                    <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
                        Groom Suite <Sparkles className="text-[#C9A84C]" size={32} strokeWidth={1.5} />
                    </h2>
                    <p className="text-base text-taupe font-medium">Curate your perfect look, timeline, and party details.</p>
                 </div>
                 <div className="flex gap-4">
                    <Button 
                        variant="outline"
                        className="flex items-center gap-2 relative group bg-[#94A3B8]/10 border-[#94A3B8]/30 hover:bg-[#94A3B8]/20 text-navy"
                        onClick={() => onNavigate('gifts')}
                    >
                        <div className="relative">
                            <Gift size={16} className="text-navy" />
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#94A3B8] rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                                3
                            </div>
                        </div>
                        GIFT REGISTRY
                    </Button>
                    <Button variant="primary" className="bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-white border-none shadow-md" onClick={() => {}}>
                        SHARE LOOKBOOK
                    </Button>
                 </div>
            </div>
            
            <div className="flex gap-10 h-full overflow-hidden relative z-10">
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4 pb-[260px]">
                    <div className="grid grid-cols-3 gap-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-navy border-b-[1.5px] border-[#C9A84C]/40 pb-3 mb-2 font-serif italic">{section.title}</h3>
                                {section.items.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="group p-5 bg-white/80 backdrop-blur-sm border border-[#94A3B8]/30 rounded-xl hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col gap-4"
                                        onClick={() => {
                                            if (item.name === "Rehearsal Suit") {
                                                onNavigate('rehearsal_suit_shops');
                                            }
                                        }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#C9DCE8]/20 text-[#5a86a3] flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:text-white transition-colors">
                                                    {item.icon && <item.icon size={14} />}
                                                </div>
                                                <span className="text-base font-bold text-navy group-hover:text-[#C9A84C] transition-colors">{item.name}</span>
                                            </div>
                                            <div className="w-5 h-5 border-[1.5px] border-[#C9A84C]/50 rounded-full group-hover:bg-[#C9A84C]/20 group-hover:border-[#C9A84C] transition-colors flex items-center justify-center" />
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <Badge variant={item.type as any}>{item.status}</Badge>
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-taupe group-hover:text-[#C9A84C] transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                                {item.action} <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Groomsmen Section */}
                    <div className="mt-12 border-t border-[#C9A84C]/20 pt-8">
                        <div className="flex justify-between items-center border-b-[1.5px] border-[#C9A84C]/40 pb-3 mb-6">
                            <h3 className="text-xl font-bold text-navy font-serif italic">Groomsmen & Party</h3>
                            <button className="text-xs font-bold text-[#C9A84C] hover:text-navy transition-colors uppercase tracking-widest flex items-center gap-1">
                                Manage Party <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {[
                                { name: "Marcus Reed", role: "Best Man", status: "SUIT FITTED", img: "https://images.unsplash.com/photo-1768809249126-d5a6230d0d67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIweW91bmclMjBtYW4lMjBwb3J0cmFpdCUyMGZvcm1hbCUyMHdlYXJ8ZW58MXx8fHwxNzcyNjY2NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080", highlight: true },
                                { name: "David Chen", role: "Groomsman", status: "ORDERED", img: "https://images.unsplash.com/photo-1676278746103-c5a62b7faab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc29tZSUyMG1hbiUyMHN1aXQlMjBwb3J0cmFpdCUyMGVsZWdhbnQlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzcyNjY2NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
                                { name: "James Wilson", role: "Groomsman", status: "NEEDS FITTING", img: "https://images.unsplash.com/photo-1529635229076-82fefed713c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwd2VkZGluZyUyMHN1aXQlMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc3MjY2NjcwOXww&ixlib=rb-4.1.0&q=80&w=1080", alert: true },
                                { name: "Alex Thompson", role: "Groomsman", status: "ORDERED", img: "https://images.unsplash.com/photo-1691580424120-b7973081a64b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB0dXhlZG8lMjBwb3J0cmFpdCUyMGx1eHVyeXxlbnwxfHx8fDE3NzI2NjY3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080" }
                            ].map((gm, idx) => (
                                <div key={idx} className={`group relative p-5 bg-white/80 backdrop-blur-sm border rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center cursor-pointer ${gm.highlight ? 'border-[#C9A84C]' : 'border-[#94A3B8]/30 hover:border-[#94A3B8]'}`}>
                                    {gm.highlight && (
                                        <div className="absolute -top-3 bg-[#C9A84C] text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-10">
                                            Best Man
                                        </div>
                                    )}
                                    <div className="relative mb-4 mt-2">
                                        <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${gm.highlight ? 'border-[#C9A84C]' : 'border-transparent'} p-[2px]`}>
                                            <div className="w-full h-full rounded-full overflow-hidden">
                                                <ImageWithFallback src={gm.img} alt={gm.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        </div>
                                        {gm.alert && (
                                            <div className="absolute top-0 right-0 w-4 h-4 bg-error rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                    <div className="text-base font-bold text-navy mb-1">{gm.name}</div>
                                    <div className="text-[10px] text-taupe font-serif italic mb-3">{gm.role}</div>
                                    
                                    <div className={`w-full py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-colors ${
                                        gm.alert 
                                            ? 'bg-error/10 text-error' 
                                            : gm.status === 'SUIT FITTED' 
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-[#94A3B8]/10 text-navy'
                                    }`}>
                                        {gm.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Logistics Sidebar */}
                <div className="w-[320px] pl-8 flex flex-col border-l border-[#C9A84C]/20">
                    <h3 className="text-xs font-bold uppercase text-[#C9A84C] tracking-widest mb-8 flex items-center gap-2">
                        <Clock size={14} /> Personal Timeline
                    </h3>
                    <div className="space-y-8 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#C9A84C]/30" />
                        {[
                            { time: "10:00 AM", event: "Barber & Grooming" },
                            { time: "12:30 PM", event: "Suit Up" },
                            { time: "02:00 PM", event: "Photography" },
                            { time: "04:30 PM", event: "Ceremony Start" }
                        ].map((t, i) => (
                            <div key={i} className="flex gap-6 relative">
                                <div className="w-4 h-4 rounded-full bg-[#C9A84C] border-[3px] border-white shadow-sm shrink-0 z-10" />
                                <div className="-mt-1">
                                    <div className="text-sm font-bold text-navy">{t.time}</div>
                                    <div className="text-sm text-taupe">{t.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VowAI Tailoring Expert Panel */}
            <div 
               className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-white/50 cursor-pointer"
               style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                     <Sparkles size={18} className="text-[#5A86A3]" />
                  </div>
                  <div className="bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
                     <span className="text-[10px] font-bold tracking-widest text-[#5A86A3] uppercase">VOWAI CONCIERGE</span>
                  </div>
               </div>
               
               <div className="mb-6 relative z-10">
                  <h3 className="font-serif text-[26px] font-bold italic text-navy mb-2">Tailoring Expert</h3>
                  <p className="text-[14px] text-taupe leading-relaxed">
                     I can help coordinate your groomsmen's attire and accessories. Ready to suit up?
                  </p>
               </div>

               <div className="flex flex-col gap-3 relative z-10 mb-2">
                  <button onClick={() => onOpenChat?.('groom_style')} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
                     COORDINATE LOOK
                     <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
               </div>
            </div>
        </div>
    );
};

// --- Rehearsal Suit Shops State ---
const RehearsalSuitShopsState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: (intent?: string) => void }) => {
    const shops = [
        { id: 1, name: "Sartorial Bespoke", location: "Financial District, NY", rating: "4.9 (210 reviews)", img: "https://images.unsplash.com/photo-1738229114998-e7599e9e6610?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zd2VhciUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNTc2ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Bespoke", "Made-to-Measure"] },
        { id: 2, name: "The Modern Gent", location: "Soho, NY", rating: "4.8 (145 reviews)", img: "https://images.unsplash.com/photo-1771249271337-1b603d1d353e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBzdWl0JTIwYm91dGlxdWUlMjBlbGVnYW50fGVufDF8fHx8MTc3MjY2Njg5NXww&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Modern Fit", "Designer"] },
        { id: 3, name: "Heritage Tailors", location: "Midtown, NY", rating: "4.9 (320 reviews)", img: "https://images.unsplash.com/photo-1633655442017-3b2a701ec705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBzaG9wJTIwc3VpdCUyMG1lbiUyMGx1eHVyeXxlbnwxfHx8fDE3NzI2NjY4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Classic Tuxedo", "Vintage"] },
        { id: 4, name: "Atlas Custom", location: "Williamsburg, NY", rating: "4.7 (98 reviews)", img: "https://images.unsplash.com/photo-1763054761278-38579ad7225e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB0dXhlZG8lMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNjY2ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Linen/Summer", "Made-to-Measure"] }
    ];

    const [selectedFilter, setSelectedFilter] = useState("All Styles");

    return (
        <div className="px-12 py-8 h-full flex flex-col w-full bg-background overflow-hidden relative z-0">
            {/* Background ambiance */}
            <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-[#94A3B8]/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
            
            {/* Header */}
            <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#C9A84C]/20 relative z-10 shrink-0">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>
                    <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
                        Curated Tailors
                    </h2>
                    <p className="text-base text-taupe font-medium">Discover your perfect fit from our selection of luxury menswear boutiques.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe/60" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or style..." 
                            className="w-full pl-11 pr-4 py-3 bg-white/80 border border-[#94A3B8]/30 rounded-full text-sm focus:outline-none focus:border-[#C9A84C] transition-colors shadow-sm"
                        />
                    </div>
                 </div>
            </div>

            <div className="flex gap-10 h-full overflow-hidden relative z-10 pb-6">
                {/* Sidebar Filters */}
                <div className="w-[240px] shrink-0 border-r border-[#C9A84C]/20 pr-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-navy mb-6">Style Filters</h3>
                    <div className="space-y-2">
                        {["All Styles", "Bespoke", "Made-to-Measure", "Designer", "Classic Tuxedo", "Modern Fit", "Linen/Summer", "Vintage"].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                                    selectedFilter === filter 
                                    ? 'bg-[#94A3B8]/15 text-navy font-bold border border-[#94A3B8]/40' 
                                    : 'text-taupe hover:bg-white hover:text-navy border border-transparent'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#C9A84C]/20">
                        <Card 
                            className="cursor-pointer group hover:shadow-lg transition-all bg-gradient-to-br from-white to-[#94A3B8]/10 border-[1.5px] border-[#94A3B8]/30 relative overflow-hidden"
                            onClick={() => onOpenChat('find_suit')}
                            padding="p-5"
                        >
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#94A3B8]/20 rounded-full blur-xl group-hover:bg-[#94A3B8]/40 transition-colors" />
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#94A3B8]/40 text-[#475569] flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform relative z-10">
                                <Sparkles size={18} />
                            </div>
                            <h4 className="text-lg font-serif italic text-navy mb-2 relative z-10">Groom Stylist</h4>
                            <p className="text-[11px] text-taupe leading-relaxed mb-4 relative z-10">
                                Unsure where to start? Let me recommend tailors based on your wedding vibe.
                            </p>
                            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1 relative z-10">
                                Find My Look <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Card>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4">
                    <div className="grid grid-cols-2 gap-6 pb-20">
                        {shops.map((shop) => (
                            <div key={shop.id} className="group bg-white/80 backdrop-blur-sm border border-[#94A3B8]/30 rounded-2xl overflow-hidden hover:border-[#C9A84C] hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="h-56 relative overflow-hidden">
                                    <ImageWithFallback src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-taupe hover:text-[#C9A84C] hover:bg-white transition-colors shadow-sm">
                                        <Heart size={14} />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-serif text-navy italic">{shop.name}</h3>
                                        <div className="flex items-center gap-1 text-[11px] font-bold text-navy bg-ivory px-2 py-1 rounded-md">
                                            <Star size={10} className="text-[#C9A84C] fill-current" />
                                            {shop.rating.split(' ')[0]}
                                        </div>
                                    </div>
                                    <p className="text-sm text-taupe flex items-center gap-1.5 mb-4">
                                        <MapPin size={14} className="text-[#94A3B8]" /> {shop.location}
                                    </p>
                                    <div className="flex gap-2 mb-6">
                                        {shop.styles.map(style => (
                                            <span key={style} className="px-3 py-1 bg-[#94A3B8]/10 text-navy text-[10px] uppercase tracking-widest font-bold rounded-full border border-[#94A3B8]/30">
                                                {style}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-[#94A3B8]/15 flex gap-3">
                                        <Button variant="outline" className="flex-1 h-10 text-[10px] border-[#94A3B8]/30 hover:border-navy hover:text-navy text-taupe">
                                            View Details
                                        </Button>
                                        <Button variant="primary" className="flex-1 h-10 text-[10px] bg-navy hover:bg-[#C9A84C] border-none shadow-md">
                                            Book Fitting
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Wedding Dress Boutique Finder State ---
const WeddingDressBoutiquesState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: (intent?: string) => void }) => {
    const boutiques = [
        { id: 1, name: "Lumière Bridal", location: "Downtown Elegance, NY", rating: "4.9 (120 reviews)", img: "https://images.unsplash.com/photo-1735712954543-67a25a6998c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwZHJlc3MlMjBib3V0aXF1ZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MjY2NjUyNnww&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Haute Couture", "Modern"] },
        { id: 2, name: "The Ivory Thread", location: "Soho District, NY", rating: "4.8 (85 reviews)", img: "https://images.unsplash.com/photo-1698582468284-fd9161f4176b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYnJpZGFsJTIwc2Fsb24lMjBpbnRlcmlvciUyMGRyZXNzZXN8ZW58MXx8fHwxNzcyNjY2NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Minimalist", "Romantic"] },
        { id: 3, name: "Silk & Grace", location: "Upper East Side, NY", rating: "4.9 (200 reviews)", img: "https://images.unsplash.com/photo-1689091243226-8516e29c8815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBib3V0aXF1ZSUyMHJhY2slMjBkcmVzc2VzJTIwc29mdCUyMGxpZ2h0fGVufDF8fHx8MTc3MjY2NjUyN3ww&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Classic", "A-Line"] },
        { id: 4, name: "Blush Boutique", location: "West Village, NY", rating: "4.7 (94 reviews)", img: "https://images.unsplash.com/photo-1759893362613-8bb8bb057af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBtYW5uZXF1aW4lMjBlbGVnYW50fGVufDF8fHx8MTc3MjY2NjUzMXww&ixlib=rb-4.1.0&q=80&w=1080", styles: ["Bohemian", "Vintage"] }
    ];

    const [selectedFilter, setSelectedFilter] = useState("All Styles");

    return (
        <div className="px-12 py-8 h-full flex flex-col w-full bg-background overflow-hidden relative z-0">
            {/* Background ambiance */}
            <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#C9A84C]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            
            {/* Header */}
            <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#C9A84C]/20 relative z-10 shrink-0">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>
                    <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
                        Curated Boutiques
                    </h2>
                    <p className="text-base text-taupe font-medium">Discover your perfect gown from our selection of luxury bridal salons.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe/60" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or style..." 
                            className="w-full pl-11 pr-4 py-3 bg-white/80 border border-[#F2D4CF]/50 rounded-full text-sm focus:outline-none focus:border-[#C9A84C] transition-colors shadow-sm"
                        />
                    </div>
                 </div>
            </div>

            <div className="flex gap-10 h-full overflow-hidden relative z-10 pb-6">
                {/* Sidebar Filters */}
                <div className="w-[240px] shrink-0 border-r border-[#C9A84C]/20 pr-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-navy mb-6">Style Filters</h3>
                    <div className="space-y-2">
                        {["All Styles", "Haute Couture", "Classic", "Modern", "Minimalist", "Romantic", "Bohemian", "Vintage"].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                                    selectedFilter === filter 
                                    ? 'bg-[#C9A84C]/10 text-[#C9A84C] font-bold border border-[#C9A84C]/30' 
                                    : 'text-taupe hover:bg-white hover:text-navy border border-transparent'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#C9A84C]/20">
                        <Card 
                            className="cursor-pointer group hover:shadow-lg transition-all bg-gradient-to-br from-white to-[#F2D4CF]/10 border-[1.5px] border-[#F2D4CF]/40 relative overflow-hidden"
                            onClick={() => onOpenChat('find_dress')}
                            padding="p-5"
                        >
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#F2D4CF]/30 rounded-full blur-xl group-hover:bg-[#F2D4CF]/50 transition-colors" />
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#F2D4CF]/50 text-[#C9A84C] flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform relative z-10">
                                <Sparkles size={18} />
                            </div>
                            <h4 className="text-lg font-serif italic text-navy mb-2 relative z-10">VowAi Stylist</h4>
                            <p className="text-[11px] text-taupe leading-relaxed mb-4 relative z-10">
                                Unsure where to start? Let me recommend boutiques based on your vision board.
                            </p>
                            <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider flex items-center gap-1 relative z-10">
                                Find My Style <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Card>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4">
                    <div className="grid grid-cols-2 gap-6 pb-20">
                        {boutiques.map((boutique) => (
                            <div key={boutique.id} className="group bg-white/80 backdrop-blur-sm border border-[#C9DCE8]/40 rounded-2xl overflow-hidden hover:border-[#C9A84C] hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="h-56 relative overflow-hidden">
                                    <ImageWithFallback src={boutique.img} alt={boutique.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-taupe hover:text-error hover:bg-white transition-colors shadow-sm">
                                        <Heart size={14} />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-serif text-navy italic">{boutique.name}</h3>
                                        <div className="flex items-center gap-1 text-[11px] font-bold text-navy bg-ivory px-2 py-1 rounded-md">
                                            <Star size={10} className="text-[#C9A84C] fill-current" />
                                            {boutique.rating.split(' ')[0]}
                                        </div>
                                    </div>
                                    <p className="text-sm text-taupe flex items-center gap-1.5 mb-4">
                                        <MapPin size={14} className="text-[#C9A84C]" /> {boutique.location}
                                    </p>
                                    <div className="flex gap-2 mb-6">
                                        {boutique.styles.map(style => (
                                            <span key={style} className="px-3 py-1 bg-[#C9DCE8]/20 text-navy text-[10px] uppercase tracking-widest font-bold rounded-full border border-[#C9DCE8]/50">
                                                {style}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-ivory flex gap-3">
                                        <Button variant="outline" className="flex-1 h-10 text-[10px]">
                                            View Details
                                        </Button>
                                        <Button variant="primary" className="flex-1 h-10 text-[10px] bg-[#C9A84C] hover:bg-[#b09140] border-none shadow-md">
                                            Book Appointment
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Gift Registry State ---
const GiftRegistryState = ({ onBack }: { onBack: () => void }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="px-12 py-8 h-full flex flex-col w-full bg-background overflow-hidden relative z-0">
            {/* Background ambiance */}
            <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#C9A84C]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-[#94A3B8]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#C9A84C]/20 relative z-10 shrink-0">
                 <div>
                    <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
                        <ChevronLeft size={14} strokeWidth={2.5} /> BACK
                    </button>
                    <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic">
                        Gift Registry
                    </h2>
                    <p className="text-base text-taupe font-medium">Curate your wishlist and manage contributions.</p>
                 </div>
                 <div className="flex gap-4">
                    <Button variant="outline" className="border-ivory-dark hover:border-[#C9A84C] hover:text-[#C9A84C] text-taupe font-bold text-xs tracking-widest uppercase">
                        SHARE LINK
                    </Button>
                    <Button variant="primary" className="bg-navy hover:bg-[#1A2530] text-white font-bold text-xs tracking-widest uppercase flex items-center gap-2">
                        <Plus size={16} /> ADD ITEM
                    </Button>
                 </div>
            </div>

            <div className="flex gap-10 h-full overflow-hidden relative z-10 pb-6">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4">
                    
                    {/* Linked Stores */}
                    <div className="mb-10 shrink-0 relative group/stores">
                        <div className="flex justify-between items-end mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-navy">Linked Stores</h3>
                            <div className="flex gap-2 opacity-0 group-hover/stores:opacity-100 transition-opacity duration-300">
                                <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-[#C9DCE8]/50 flex items-center justify-center text-navy hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors bg-white shadow-sm">
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-[#C9DCE8]/50 flex items-center justify-center text-navy hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors bg-white shadow-sm">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {[
                                { initial: 'A', name: 'Amazon', status: 'CONNECTED' },
                                { initial: 'C', name: 'Crate & Barrel', status: 'CONNECTED' },
                                { initial: 'T', name: 'Target', status: 'CONNECTED' },
                                { initial: 'W', name: 'Williams Sonoma', status: 'CONNECTED' }
                            ].map((store, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 border border-[#C9DCE8]/40 rounded-xl bg-white/80 backdrop-blur-sm min-w-[220px] shadow-sm hover:border-[#C9A84C] transition-colors cursor-pointer group shrink-0">
                                    <div className="w-10 h-10 rounded-full border border-[#C9DCE8]/50 flex items-center justify-center font-serif italic text-navy font-bold text-lg bg-white group-hover:border-[#C9A84C] transition-colors">
                                        {store.initial}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-navy">{store.name}</div>
                                        <div className="text-[9px] font-bold text-[#7A8B76] uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                            <CheckCircle2 size={10} /> {store.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Add More Stores Button */}
                            <div className="flex items-center justify-center gap-3 p-4 border border-dashed border-[#C9DCE8] rounded-xl bg-transparent min-w-[220px] hover:border-[#C9A84C] hover:bg-white/50 transition-colors cursor-pointer group shrink-0">
                                <div className="w-10 h-10 rounded-full border border-dashed border-[#C9DCE8] flex items-center justify-center text-[#94A3B8] group-hover:text-[#C9A84C] group-hover:border-[#C9A84C] transition-colors bg-white/50">
                                    <Plus size={20} />
                                </div>
                                <div className="text-sm font-bold text-taupe group-hover:text-navy transition-colors">Link Store</div>
                            </div>
                        </div>
                    </div>

                    {/* Your Wishlist */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-navy mb-4">Your Wishlist</h3>
                        <div className="grid grid-cols-3 gap-6 pb-20">
                            {[
                                { name: 'KitchenAid Stand Mixer', price: '$450', funded: 67, type: 'GROUP GIFT', img: 'https://images.unsplash.com/photo-1758565810987-ca8d617ea7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
                                { name: 'Dyson V15 Detect', price: '$750', funded: 20, type: 'GROUP GIFT', img: 'https://images.unsplash.com/photo-1722710070534-e31f0290d8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
                                { name: 'Le Creuset Dutch Oven', price: '$420', funded: 100, type: 'FULFILLED', img: 'https://images.unsplash.com/photo-1695088224596-11649459b191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
                                { name: 'Nespresso Vertuo', price: '$220', funded: 100, type: 'FULFILLED', img: 'https://images.unsplash.com/photo-1670185534697-e1fdd532c855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
                                { name: 'Sheet Set', price: '$150', funded: 100, type: 'FULFILLED', img: '' },
                                { name: 'Smart Home Hub', price: '$250', funded: 0, type: 'GROUP GIFT', img: '' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/80 backdrop-blur-sm border border-[#C9DCE8]/40 rounded-2xl p-4 flex flex-col hover:shadow-xl hover:border-[#C9A84C] transition-all duration-300 group">
                                    <div className="w-full h-48 bg-ivory rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                                        {item.img ? (
                                            <ImageWithFallback src={item.img} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <Gift size={48} className="text-[#C9DCE8]/60" />
                                        )}
                                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm backdrop-blur-md ${
                                            item.type === 'FULFILLED' ? 'bg-[#7A8B76] text-white' : 'bg-navy text-white'
                                        }`}>
                                            {item.type === 'GROUP GIFT' && <Users size={10} />}
                                            {item.type}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-navy mb-1 leading-tight">{item.name}</h4>
                                    
                                    <div className="flex justify-between items-end mb-3 mt-auto pt-2">
                                        <span className="text-sm text-taupe font-medium">{item.price}</span>
                                        {item.type === 'GROUP GIFT' && (
                                            <span className="text-xs font-bold text-[#C9A84C]">{item.funded}% Funded</span>
                                        )}
                                    </div>
                                    
                                    {item.type === 'GROUP GIFT' && (
                                        <div className="w-full h-2 bg-[#C9DCE8]/30 rounded-full mb-4 overflow-hidden">
                                            <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${item.funded}%` }} />
                                        </div>
                                    )}

                                    <Button variant={item.type === 'FULFILLED' ? "outline" : "primary"} className={`w-full mt-auto text-[10px] ${item.type === 'FULFILLED' ? 'border-[#C9DCE8]/50 text-navy hover:bg-ivory/50 bg-white' : 'bg-navy text-white hover:bg-[#1A2530] border-none shadow-md'}`}>
                                        VIEW DETAILS
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-[320px] shrink-0 flex flex-col border-l border-[#C9A84C]/20 pl-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-navy mb-6 flex items-center gap-2">
                        <Clock size={14} className="text-[#C9A84C]" /> Recent Activity
                    </h3>
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2 relative">
                        <div className="absolute left-[19px] top-2 bottom-0 w-[2px] bg-[#C9DCE8]/30" />
                        <div className="space-y-6">
                            {[
                                { user: 'Aunt Sharon', action: 'contributed $100 to', item: 'KitchenAid Mixer', time: '2H AGO' },
                                { user: 'Mike & Sarah', action: 'purchased to', item: 'Sheet Set', time: '5H AGO' },
                                { user: 'Grandma', action: 'contributed $50 to', item: 'Dyson V15', time: '1D AGO' },
                                { user: 'The Millers', action: 'contributed $200 to', item: 'KitchenAid Mixer', time: '1D AGO' },
                                { user: 'Chris P.', action: 'purchased to', item: 'Nespresso Vertuo', time: '2D AGO' }
                            ].map((activity, idx) => (
                                <div key={idx} className="flex gap-4 relative z-10 group">
                                    <div className="w-10 h-10 rounded-full bg-white border-4 border-background shadow-sm flex-shrink-0 flex items-center justify-center text-[#94A3B8] group-hover:border-[#C9A84C]/20 group-hover:text-[#C9A84C] transition-colors">
                                        <User size={16} />
                                    </div>
                                    <div className="pt-1 text-sm leading-snug">
                                        <span className="font-bold text-navy">{activity.user}</span>{' '}
                                        <span className="text-taupe">{activity.action}</span>{' '}
                                        <span className="font-bold text-navy">{activity.item}</span>
                                        <div className="text-[9px] font-bold text-taupe/70 uppercase tracking-widest mt-1">
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="mt-6 pt-6 border-t border-[#C9A84C]/20">
                        <div className="bg-gradient-to-br from-white to-[#C9DCE8]/10 border border-[#C9DCE8]/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 bg-navy text-white rounded-xl flex items-center justify-center shadow-md">
                                    <Gift size={20} />
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C]">
                                    Registry Stats
                                </span>
                            </div>
                            <h4 className="text-lg font-serif italic text-navy mb-2">Registry Overview</h4>
                            <p className="text-xs text-taupe leading-relaxed mb-6">
                                Total: <strong className="text-navy">$3,450</strong> funded across 12 items. 4 new contributions this week.
                            </p>
                            <button className="w-full py-3 px-4 border border-[#C9DCE8]/50 hover:border-navy text-xs font-bold text-navy uppercase tracking-widest rounded-xl transition-colors flex justify-between items-center group bg-white">
                                Manage Settings
                                <ArrowRight size={14} className="text-[#C9A84C] transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getVowAIContext = (view?: string, intent?: string) => {
    if (intent === 'vows') {
        return {
            title: "Vow Writer",
            icon: "✍️",
            greeting: "I see you want to work on your vows! It's one of the most special parts of the day. Who am I writing these for?",
            promptTitle: "Choose your role to get started:",
            prompts: ["I'm the Bride", "I'm the Groom", "Just give me tips"]
        };
    }
    
    if (intent === 'contract_review') {
        return {
            title: "Contract Analyst",
            icon: "⚖️",
            greeting: "I notice you have vendors in the 'Reviewing Contract' stage. I can help analyze their contracts for hidden fees, cancellation policies, and required deliverables.",
            promptTitle: "What would you like me to check?",
            prompts: ["Scan for Hidden Fees", "Check Cancellation Terms", "Summarize Deliverables"]
        };
    }
    
    if (intent === 'interview_prep') {
        return {
            title: "Interview Coach",
            icon: "🎙️",
            greeting: "You have upcoming vendor interviews! I can generate a list of essential questions tailored to each vendor's specific role to ensure you find the perfect fit.",
            promptTitle: "Which vendor type are you interviewing?",
            prompts: ["Photographer Questions", "Florist Questions", "DJ/Music Questions"]
        };
    }
    
    switch (view) {
        case 'bridal':
        case 'groom':
        case 'wedding_dress_boutiques':
        case 'rehearsal_suit_shops':
            return {
                title: "Style Concierge",
                icon: "💄",
                greeting: "Hello! I'm your Style Concierge. How can I help you perfect your wedding day look?",
                promptTitle: "I can help with styling! How would you like to start?",
                prompts: ["Find a Dress", "Suit Measurements", "Color Palettes"]
            };
        case 'vendors':
        case 'search':
        case 'detail':
            return {
                title: "Contract Expert",
                icon: "📋",
                greeting: "Hello! I'm your Contract Expert. Let's make sure your vendor agreements are ironclad.",
                promptTitle: "I can help with vendors! How would you like to start?",
                prompts: ["Review Contract", "Compare Quotes", "Payment Terms"]
            };
        case 'budget':
            return {
                title: "Smart Ledger",
                icon: "💰",
                greeting: "Hello! I'm Smart Ledger. Let's keep your wedding finances on track.",
                promptTitle: "I can help with your budget! How would you like to start?",
                prompts: ["Log Expense", "Payment Reminder", "Cost Saving Tips"]
            };
        case 'guests':
            return {
                title: "Invitation Bot",
                icon: "✉️",
                greeting: "Hello! I'm the Invitation Bot. Ready to manage your guest list?",
                promptTitle: "I can help with guests! How would you like to start?",
                prompts: ["Draft Invites", "Track RSVPs", "Seating Chart"]
            };
        case 'logistics':
            return {
                title: "Logistics Command",
                icon: "🗺️",
                greeting: "Hello! Logistics Command online. Let's build a flawless timeline.",
                promptTitle: "I can help with logistics! How would you like to start?",
                prompts: ["Day-of Timeline", "Vendor Arrival", "Transportation"]
            };
        default:
            return {
                title: "VowAI Concierge",
                icon: "✨",
                greeting: "Hello! I'm VowAI, your personal wedding concierge. How can I help you plan your big day?",
                promptTitle: "Here are a few things I can help with:",
                prompts: ["Draft Vows", "Plan Timeline", "Bridal Suite Help", "Find Vendors"]
            };
    }
};

const TimelineState = ({ onBack, onOpenChat, onNavigate }: { onBack: () => void, onOpenChat: (intent?: string) => void, onNavigate?: (view: string) => void }) => {
    const [activeTab, setActiveTab] = useState<'rehearsal' | 'events' | 'day-of'>('day-of');
    const [emergencyTab, setEmergencyTab] = useState<'kits' | 'contacts'>('kits');

    return (
        <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-8 bg-background overflow-hidden relative z-0">
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
                    <div className="w-[600px] shrink-0 flex flex-col">
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
                            {activeTab === 'rehearsal' && (
                                <div>
                                    <div className="flex justify-between items-baseline mb-6 border-b border-[#E2D8C8] pb-4">
                                        <h3 className="font-serif text-[28px] text-navy font-bold">Rehearsal <span className="italic">Dinner</span></h3>
                                        <span className="text-[12px] font-bold text-navy">Confirmed</span>
                                    </div>
                                    <div className="grid grid-cols-2 border border-[#E2D8C8] bg-white rounded-2xl overflow-hidden mb-8">
                                        <div className="p-5 border-b border-r border-[#E2D8C8]">
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1">DATE & TIME</div>
                                            <div className="text-[14px] font-bold text-navy">Friday, Oct 23 · 6:00 PM</div>
                                        </div>
                                        <div className="p-5 border-b border-[#E2D8C8]">
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1">VENUE</div>
                                            <div className="text-[14px] font-bold text-navy">The Bistro Downtown</div>
                                        </div>
                                        <div className="p-5 border-b border-r border-[#E2D8C8]">
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1">GUESTS</div>
                                            <div className="text-[14px] font-bold text-navy">35 confirmed</div>
                                        </div>
                                        <div className="p-5 border-b border-[#E2D8C8]">
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1">MENU</div>
                                            <div className="text-[14px] font-bold text-navy">3-course · Finalised</div>
                                        </div>
                                        <div className="p-5 border-r border-[#E2D8C8]">
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1">DRESS CODE</div>
                                            <div className="text-[14px] font-bold text-navy">Smart Casual</div>
                                        </div>
                                        <div className="p-5">
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1">DURATION</div>
                                            <div className="text-[14px] font-bold text-navy">6:00 PM – 10:00 PM</div>
                                        </div>
                                    </div>

                                    <h4 className="font-serif text-[20px] text-navy font-bold mb-4">Speeches & Order of Events</h4>
                                    <div className="space-y-3">
                                        <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] bg-[#FAF7F2] rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-[12px] font-bold shrink-0">1</div>
                                            <div>
                                                <div className="text-[14px] font-bold text-navy">Welcome Toast</div>
                                                <div className="text-[12px] text-taupe">Father of Bride · 3 mins</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] bg-[#FAF7F2] rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-[12px] font-bold shrink-0">2</div>
                                            <div>
                                                <div className="text-[14px] font-bold text-navy">Best Man Speech</div>
                                                <div className="text-[12px] text-taupe">James Rivera · 5 mins</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] bg-[#FAF7F2] rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-[12px] font-bold shrink-0">3</div>
                                            <div>
                                                <div className="text-[14px] font-bold text-navy">Mother of Groom</div>
                                                <div className="text-[12px] text-taupe">Maria Torres · 4 mins</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center p-4 border border-[#E2D8C8] border-dashed rounded-xl bg-white text-taupe cursor-pointer hover:border-[#C9A84C] transition-colors">
                                            <div className="w-8 h-8 rounded-full border border-dashed border-[#C9A84C] flex items-center justify-center text-[#C9A84C] text-[12px] shrink-0"><Plus size={14}/></div>
                                            <div className="italic text-[13px]">Add another speech...</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'events' && (
                                <div>
                                    <div className="flex justify-between items-baseline mb-6 border-b border-[#E2D8C8] pb-4">
                                        <h3 className="font-serif text-[28px] text-navy font-bold">All <span className="italic">Events</span></h3>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">6 EVENTS PLANNED</span>
                                    </div>
                                    
                                    <div className="border border-[#E2D8C8] bg-white rounded-2xl flex flex-col overflow-hidden">
                                        
                                        <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-[20px] font-serif font-bold text-navy leading-none">12</span>
                                                    <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">SEP</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-serif font-bold text-navy mb-1">Bachelor/Bachelorette Party</h4>
                                                    <div className="text-[12px] text-taupe">Saturday · Weekend Getaway · 15 guests</div>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-[#E8F0F4] text-[#5A7E9D] text-[10px] font-bold rounded-full">Planning</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-[20px] font-serif font-bold text-navy leading-none">15</span>
                                                    <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-serif font-bold text-navy mb-1">Marriage License Registration</h4>
                                                    <div className="text-[12px] text-taupe">Thursday · 10:00 AM · City Hall · 2 guests</div>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-[#FAF7F2] text-[#A68735] text-[10px] font-bold rounded-full">Coming Up</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-[20px] font-serif font-bold text-navy leading-none">22</span>
                                                    <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-serif font-bold text-navy mb-1">Welcome Drinks</h4>
                                                    <div className="text-[12px] text-taupe">Thursday · 8:00 PM · Hotel Lobby Bar · 28 guests</div>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-[#FAF7F2] text-[#A68735] text-[10px] font-bold rounded-full">Coming Up</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-[20px] font-serif font-bold text-navy leading-none">23</span>
                                                    <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-serif font-bold text-navy mb-1">Rehearsal Dinner</h4>
                                                    <div className="text-[12px] text-taupe">Friday · 6:00 PM · The Bistro Downtown · 35 guests</div>
                                                </div>
                                            </div>
                                            <span className="text-[11px] font-bold text-navy">Confirmed</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6 border-b border-[#E2D8C8]/50 bg-[#C9A84C]/5">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-xl bg-[#C9A84C] text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                                                    <span className="text-[20px] font-serif font-bold leading-none">24</span>
                                                    <span className="text-[9px] font-bold tracking-widest uppercase mt-1 opacity-90">OCT</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-serif font-bold text-navy mb-1 flex items-center gap-2">The Wedding ✦</h4>
                                                    <div className="text-[12px] text-taupe">Saturday · 5:00 PM · The Grand Estate · 150 guests</div>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-[#C9A84C] text-white text-[10px] font-bold rounded-full">Main Event</span>
                                        </div>

                                        <div className="flex items-center justify-between p-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border border-[#E2D8C8] flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-[20px] font-serif font-bold text-navy leading-none">25</span>
                                                    <span className="text-[9px] font-bold tracking-widest uppercase text-taupe mt-1">OCT</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-serif font-bold text-navy mb-1">Farewell Brunch</h4>
                                                    <div className="text-[12px] text-taupe">Sunday · 10:00 AM · Garden Terrace · ~40 guests</div>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-[#E8F0F4] text-[#5A7E9D] text-[10px] font-bold rounded-full">Planning</span>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {activeTab === 'day-of' && (() => {
                                const dayOfEvents = [
                                    { time: "9:00", period: "AM", title: "Bridal Party Hair & Makeup", location: "Bridal Suite", duration: "2.5 hrs", people: "Bridesmaids", color: "bg-[#C4D7E2]" },
                                    { time: "11:00", period: "AM", title: "Vendor Arrival & Setup", location: "Main Hall", duration: "2 hrs", people: "All Vendors", color: "bg-[#D9CBE4]" },
                                    { time: "1:00", period: "PM", title: "First Look Photos", location: "Garden", duration: "1.5 hrs", people: "Couple", color: "bg-[#E9CFCB]" },
                                    { time: "2:30", period: "PM", title: "Wedding Party Photos", location: "Estate Grounds", duration: "2 hrs", people: "Wedding Party", color: "bg-[#E9CFCB]" },
                                    { time: "4:30", period: "PM", title: "Guests Arrive", location: "Courtyard", duration: "30 mins", people: "All Guests", color: "bg-[#E2DED5]" },
                                    { time: "5:00", period: "PM", title: "Ceremony Begins", location: "Chapel", duration: "45 mins", people: "Everyone", color: "bg-[#C1A44A]", tag: "✦ MAIN" },
                                    { time: "6:00", period: "PM", title: "Cocktail Hour", location: "Terrace", duration: "1.5 hrs", people: "All Guests", color: "bg-[#BCD2BA]" },
                                    { time: "7:30", period: "PM", title: "Dinner Served", location: "Ballroom", duration: "1 hr", people: "All Guests", color: "bg-[#DEC29B]" },
                                    { time: "8:30", period: "PM", title: "Toasts & First Dance", location: "Ballroom", duration: "45 mins", people: "Everyone", color: "bg-[#C1A44A]", tag: "✦ MAIN" },
                                    { time: "10:30", period: "PM", title: "Cake Cutting", location: "Dance Floor", duration: "15 mins", people: "Everyone", color: "bg-[#DEC29B]" },
                                    { time: "11:45", period: "PM", title: "Grand Exit", location: "Front Gate", duration: "15 mins", people: "Everyone", color: "bg-[#C1A44A]", tag: "✦ FINAL" }
                                ];
                                return (
                                <div>
                                    <div className="flex justify-between items-baseline mb-6 border-b border-[#E2D8C8] pb-4">
                                        <h3 className="font-serif text-[28px] text-navy font-bold">Saturday, Oct 24 — <span className="italic">Run of Show</span></h3>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C]">11 EVENTS · THE GRAND ESTATE</span>
                                    </div>
                                    <div className="relative before:absolute before:inset-y-0 before:left-[97px] before:w-px before:bg-[#E2D8C8] before:z-0 py-2">
                                        {dayOfEvents.map((evt, idx) => (
                                            <div key={idx} className="relative flex gap-5 mb-6 group">
                                                <div className="w-[70px] text-right mt-1 shrink-0 z-10">
                                                    <span className="text-[14px] font-bold text-navy whitespace-nowrap">{evt.time} <span className="text-[10px] font-bold">{evt.period}</span></span>
                                                </div>
                                                <div className="relative mt-2 shrink-0 z-10 flex flex-col items-center">
                                                    <div className={`w-3.5 h-3.5 rounded-full ${evt.color} border-[2px] border-white ring-1 ring-[#E2D8C8]`} />
                                                </div>
                                                <div className="flex-1 bg-white border border-[#E2D8C8] rounded-2xl p-5 shadow-sm group-hover:border-navy/30 transition-colors z-10 ml-2">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="font-serif text-[18px] text-navy font-bold leading-tight">{evt.title}</h4>
                                                        {evt.tag && (
                                                            <span className="inline-block px-2 py-0.5 rounded-full bg-[#F9F4E5] text-[#A2842E] text-[8px] font-bold uppercase tracking-widest">
                                                                {evt.tag}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E2D8C8]/80 text-[10px] font-bold uppercase tracking-widest text-taupe">
                                                            <MapPin size={10} className="text-[#C44343]" /> {evt.location}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E2D8C8]/80 text-[10px] font-bold uppercase tracking-widest text-taupe">
                                                            <Clock size={10} className="text-[#5A7E9D]" /> {evt.duration}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F4F8] border border-[#C4D7E2] text-[10px] font-bold uppercase tracking-widest text-[#2A4D6B]">
                                                            <Users size={10} className="text-[#2A4D6B]" /> {evt.people}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Floor Plan & Checklist */}
                    <div className="flex-1 flex flex-col gap-8 h-full pb-10">
                        {/* Floor Plan */}
                        <div>
                            <div className="flex justify-between items-baseline mb-4 border-b border-[#E2D8C8] pb-3">
                                <h3 className="font-serif text-[18px] text-navy font-bold">Floor Plan</h3>
                                <button onClick={() => onNavigate?.('seating')} className="text-[10px] font-bold tracking-widest uppercase text-[#C9A84C] hover:text-navy transition-colors">
                                    EDIT →
                                </button>
                            </div>
                            
                            <div className="flex border border-[#E2D8C8] rounded-2xl bg-white overflow-hidden">
                                <div className="flex-1 text-center border-r border-[#E2D8C8] p-4">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-taupe mb-2">SEATS</div>
                                    <div className="text-[22px] font-serif font-bold text-navy leading-none">145<span className="text-[12px] font-sans font-normal text-taupe">/150</span></div>
                                </div>
                                <div className="flex-1 text-center border-r border-[#E2D8C8] p-4">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-taupe mb-2">TABLES</div>
                                    <div className="text-[22px] font-serif font-bold text-navy leading-none">20</div>
                                </div>
                                <div className="flex-1 text-center p-4">
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-taupe mb-2">FILL</div>
                                    <div className="text-[22px] font-serif font-bold text-[#2B8B5B] leading-none">97%</div>
                                </div>
                            </div>
                        </div>

                        {/* Master Checklist */}
                        <div>
                            <div className="flex justify-between items-baseline mb-4 border-b border-[#E2D8C8] pb-3">
                                <h3 className="font-serif text-[18px] text-navy font-bold">Master Checklist</h3>
                                <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest">1 / 11 done</span>
                            </div>

                            <div className="border border-[#E2D8C8] rounded-2xl bg-white overflow-hidden">
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Finalise Seating Chart</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#C44343]">Today</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Confirm Vendor Meals</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#C44343]">Tomorrow</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Pack Honeymoon Bags</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 3 days</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Pick up Dress</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 1 week</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 bg-[#FAF7F2] opacity-70">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] bg-[#424242] text-white flex items-center justify-center flex-shrink-0">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        <span className="text-[13px] text-navy font-medium line-through">Write Vows</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">Completed</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Pay Final Balances</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 2 weeks</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Finalise Guest Gifts</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 3 weeks</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Prepare Tip Envelopes</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 3 weeks</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Send Playlist to DJ</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 1 month</span>
                                </div>
                                <div className="flex justify-between items-center p-4 border-b border-[#E2D8C8]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Confirm Photo List</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 1 month</span>
                                </div>
                                <div className="flex justify-between items-center p-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-[4px] border border-[#E2D8C8] bg-white flex-shrink-0" />
                                        <span className="text-[13px] text-navy font-medium">Break in Shoes</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-taupe">In 1 month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of LEFT CONTENT */}
                </div>

                {/* RIGHT SIDEBAR */}
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

                        {/* Emergency Kit */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <h3 className="font-serif text-[18px] text-navy font-bold mb-4 flex items-center gap-2 tracking-wide uppercase shrink-0"><Briefcase size={16} className="text-[#8B5A2B]" /> Day-Of Essentials</h3>
                            <div className="bg-white border border-[#E2D8C8] rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
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
                                
                                <div className="px-4 pb-4 pt-2 flex-1">
                                    {emergencyTab === 'kits' ? (
                                        <div className="space-y-0">
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <span className="text-[13px] font-serif text-navy">Sewing Kit</span>
                                                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F3EE] text-[#2B8B5B] text-[9px] font-bold">Packed</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <span className="text-[13px] font-serif text-navy">Pain Relief</span>
                                                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F3EE] text-[#2B8B5B] text-[9px] font-bold">Packed</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <span className="text-[13px] font-serif text-navy">Extra Shoes</span>
                                                <span className="px-2 py-0.5 rounded-[4px] bg-[#FAEEEE] text-[#C44343] text-[9px] font-bold">Missing</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <span className="text-[13px] font-serif text-navy">Touch-up Makeup</span>
                                                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F3EE] text-[#2B8B5B] text-[9px] font-bold">Packed</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <span className="text-[13px] font-serif text-navy">Stain Remover</span>
                                                <span className="px-2 py-0.5 rounded-[4px] bg-[#FAEEEE] text-[#C44343] text-[9px] font-bold">Missing</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-[#E2D8C8]/50">
                                                <span className="text-[13px] font-serif text-navy">Wedding Rings</span>
                                                <span className="px-2 py-0.5 rounded-[4px] bg-[#FDF2E9] text-[#A68735] text-[9px] font-bold flex items-center gap-1">✓ Confirmed</span>
                                            </div>
                                            <button className="w-full mt-3 text-center text-taupe font-bold text-[10px] uppercase tracking-widest py-2 border border-[#E2D8C8] rounded-xl hover:border-[#C9A84C] hover:text-navy transition-colors">
                                                + ADD ITEM
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-0">
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <div>
                                                    <div className="text-[13px] font-serif text-navy mb-0.5">Maid of Honour</div>
                                                    <div className="text-[11px] text-taupe">Emma Chen</div>
                                                </div>
                                                <span className="text-[11px] font-bold text-[#A68735]">555-0112</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <div>
                                                    <div className="text-[13px] font-serif text-navy mb-0.5">Best Man</div>
                                                    <div className="text-[11px] text-taupe">James Rivera</div>
                                                </div>
                                                <span className="text-[11px] font-bold text-[#A68735]">555-0138</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <div>
                                                    <div className="text-[13px] font-serif text-navy mb-0.5">Mother of Bride</div>
                                                    <div className="text-[11px] text-taupe">Linda Chen</div>
                                                </div>
                                                <span className="text-[11px] font-bold text-[#A68735]">555-0155</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <div>
                                                    <div className="text-[13px] font-serif text-navy mb-0.5">AI Assistant</div>
                                                    <div className="text-[11px] text-taupe">VowAi Concierge</div>
                                                </div>
                                                <span className="text-[11px] font-bold text-[#A68735]">555-0182</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <div>
                                                    <div className="text-[13px] font-serif text-navy mb-0.5">Officiant</div>
                                                    <div className="text-[11px] text-taupe">Rev. Daniel Park</div>
                                                </div>
                                                <span className="text-[11px] font-bold text-[#A68735]">555-0219</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#E2D8C8]/50 py-3">
                                                <div>
                                                    <div className="text-[13px] font-serif text-navy mb-0.5">Venue Manager</div>
                                                    <div className="text-[11px] text-taupe">The Grand Estate</div>
                                                </div>
                                                <span className="text-[11px] font-bold text-[#A68735]">555-0193</span>
                                            </div>
                                            <button className="w-full mt-3 text-center text-taupe font-bold text-[10px] uppercase tracking-widest py-2 border border-[#E2D8C8] rounded-xl hover:border-[#C9A84C] hover:text-navy transition-colors">
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
            
            {/* VowAI Concierge - Timeline Assistant (Pinned to footer) */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.5 }}
               className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-blue-50/80"
               style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
            >
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-[36px] h-[36px] rounded-xl bg-white flex items-center justify-center border border-blue-50 shadow-sm group-hover:scale-110 transition-transform">
                            <Sparkles size={16} className="text-[#5A7E9D]" />
                        </div>
                        <span className="px-3 py-1 rounded-[4px] border border-blue-100 text-[#5A7E9D] text-[8px] font-bold uppercase tracking-widest bg-white/50 shadow-sm">
                            VOWAI CONCIERGE
                        </span>
                    </div>
                    
                    <h3 className="text-[24px] font-serif italic text-navy font-bold leading-tight mb-2">Timeline Assistant</h3>
                    <p className="text-[11px] text-taupe leading-relaxed mb-4">
                        Need help with logistics? I can draft your run of show or review vendor arrival times for you.
                    </p>

                    <div className="flex flex-col gap-2 relative z-10">
                        <button onClick={() => onOpenChat('timeline')} className="w-full bg-white border border-[#E2D8C8] rounded-xl py-3 px-4 text-left hover:border-[#5A7E9D]/30 hover:shadow-sm transition-all flex items-center justify-between group">
                            <span className="text-[10px] font-bold text-navy uppercase tracking-widest">DRAFT RUN OF SHOW</span>
                            <ArrowRight size={14} className="text-[#5A7E9D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                        <button onClick={() => onOpenChat('timeline')} className="w-full bg-white border border-[#E2D8C8] rounded-xl py-3 px-4 text-left hover:border-[#5A7E9D]/30 hover:shadow-sm transition-all flex items-center justify-between group">
                            <span className="text-[10px] font-bold text-navy uppercase tracking-widest">VENDOR ARRIVALS</span>
                            <ArrowRight size={14} className="text-[#5A7E9D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- VowAI Chat Overlay Component ---
interface VowAIMessage {
    sender: 'ai' | 'user';
    text: string;
    prompts?: string[];
    promptTitle?: string;
    widget?: 'vow_draft' | 'timeline' | 'venue_card' | 'checklist' | 'weather';
    widgetData?: any;
}

const VowAIChatOverlay = ({ isOpen, onClose, intent, currentView }: { isOpen: boolean, onClose: () => void, intent?: string, currentView?: string }) => {
    const [messages, setMessages] = useState<VowAIMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const contextConfig = getVowAIContext(currentView, intent);
    
    const lastIntentRef = React.useRef(intent);
    const lastViewRef = React.useRef(currentView);

    useEffect(() => {
        if (isOpen) {
            let initialMsg = contextConfig.greeting;
            if (intent === 'venue_finder') initialMsg = "I'd love to help you find the perfect venue. What kind of vibe and guest count are you looking for?";
            if (intent === 'groom_style') initialMsg = "Let's get you and your groomsmen looking sharp! Are we thinking classic tuxedos, modern suits, or something more casual?";
            if (intent === 'find_suit') initialMsg = "I can help you find the best tailors in your area. Are you looking for bespoke, made-to-measure, or ready-to-wear?";
            if (intent === 'style_assistant') initialMsg = "Hello! I'm your Style Concierge. How can I help you perfect your wedding day look?";
            if (intent === 'vows') initialMsg = "I see you want to work on your vows! It's one of the most special parts of the day. Who am I writing these for?";
            
            setMessages(prev => {
                if (prev.length === 0) {
                    return [{ 
                        sender: 'ai', 
                        text: initialMsg,
                        prompts: contextConfig.prompts,
                        promptTitle: contextConfig.promptTitle
                    }];
                }
                
                // Add a new contextual message if intent/view changed while already having messages
                if (intent !== lastIntentRef.current || currentView !== lastViewRef.current) {
                    lastIntentRef.current = intent;
                    lastViewRef.current = currentView;
                    
                    // Don't duplicate if it's the exact same message
                    if (prev[prev.length - 1].text === initialMsg) return prev;
                    
                    return [...prev, {
                        sender: 'ai',
                        text: `*Switched to ${contextConfig.title}* \n\n${initialMsg}`,
                        prompts: contextConfig.prompts,
                        promptTitle: contextConfig.promptTitle
                    }];
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
        
        // Remove prompts from the previous AI message when user replies
        const updatedMessages = messages.map((m, idx) => 
            idx === messages.length - 1 && m.sender === 'ai' 
                ? { ...m, prompts: undefined, promptTitle: undefined } 
                : m
        );

        const newMessages = [...updatedMessages, { sender: 'user' as const, text: textToSend }];
        setMessages(newMessages);
        if (typeof overrideText !== 'string') setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            
            let aiResponse = "I want to make sure I'm giving you the best advice possible! Could you tell me a little more about what you need? Whether it's managing tricky family dynamics, picking out colors, looking at budgets, or just venting about the process—I'm here for you.";
            let nextPrompts: string[] | undefined = ["Budget Help", "Managing Guests", "Stress Relief"];
            let nextPromptTitle: string | undefined = "Some things we can tackle together:";
            let widgetType: 'vow_draft' | 'timeline' | 'venue_card' | 'checklist' | 'weather' | undefined = undefined;
            let widgetData: any = undefined;
            
            const lowerText = textToSend.toLowerCase();
            const matches = (...keywords: string[]) => keywords.some(k => lowerText.includes(k));

            // Vows Flow
            if (matches("draft vows", "write vows", "help with vows", "speech")) {
                aiResponse = "Oh, I *love* helping with vows! They are truly the heart of your entire day. To make sure we capture your unique voice, are we writing these for the bride or the groom?";
                nextPromptTitle = "Choose your role:";
                nextPrompts = ["I'm the Bride", "I'm the Groom", "Just give me tips"];
            } else if ((matches("bride") && matches("vow")) || lowerText === "i'm the bride") {
                aiResponse = "How exciting! Let's start with something sweet and heartfelt to get the inspiration flowing:\n\n\"From the moment we met, you have been my greatest adventure. I promise to be your biggest supporter, to laugh with you in the good times, and to hold your hand through the challenging ones. I choose you today, tomorrow, and for all the days to come.\"\n\nHow does this feel to you? We can sprinkle in some humor, make it more traditional, or start entirely from scratch with your own memories!";
                nextPromptTitle = "Adjust the tone:";
                nextPrompts = ["Make it Humorous", "Make it Traditional", "Let's Write Custom"];
            } else if ((matches("groom") && matches("vow")) || lowerText === "i'm the groom") {
                aiResponse = "That's wonderful! Let's start with a heartfelt baseline to see what resonates with you:\n\n\"You are my best friend and my greatest blessing. I promise to encourage your dreams, to stand by your side no matter what life brings, and to love you unconditionally. Today I give you my heart, completely and forever.\"\n\nDoes this feel close to your style, or would you like it a bit more humorous, traditional, or completely customized to your story?";
                nextPromptTitle = "Adjust the tone:";
                nextPrompts = ["Make it Humorous", "Make it Traditional", "Let's Write Custom"];
            } else if (matches("humorous", "funny", "laugh")) {
                aiResponse = "I love a little laughter during a ceremony! How about something like this:\n\n\"I promise to love you even when you're hangry, to always share my fries even when I said I didn't want any, and to keep laughing with you until we're old and gray. You are my favorite person to do absolutely nothing with.\"\n\nDoes this capture your playful side?";
                nextPromptTitle = "What do you think?";
                nextPrompts = ["Perfect, save it!", "Make it Traditional", "Let's Write Custom"];
            } else if (matches("traditional", "classic")) {
                aiResponse = "There's something so powerful about classic vows. Here is a beautiful, timeless version:\n\n\"I take you to be my wedded partner. To have and to hold, from this day forward, for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, till death do us part.\"\n\nDoes this have the timeless feel you're looking for?";
                nextPromptTitle = "What do you think?";
                nextPrompts = ["Perfect, save it!", "Make it Humorous", "Let's Write Custom"];
            } else if (matches("custom", "own story", "personal")) {
                aiResponse = "My favorite! Personal vows are so incredibly special. Let's ground this in your story. What is a core memory you share, or a specific quirk you absolutely adore about them?";
                nextPromptTitle = "Pick a starting point:";
                nextPrompts = ["How we first met", "Their sense of humor", "Our first big trip"];
            } else if (matches("perfect, save it", "perfect", "love it", "save it")) {
                aiResponse = "Consider it done! I've tucked those away safely in your Vows document so you can come back to them whenever you're ready. What part of the day should we dream up next?";
                nextPromptTitle = "Keep planning:";
                nextPrompts = ["Plan Timeline", "Bridal Suite Help", "Find Vendors"];
            } else if (matches("how we first met", "sense of humor", "first big trip", "first date", "memory")) {
                aiResponse = "Oh, that is such a beautiful place to start. Grounding your vows in a shared experience makes everyone in the room feel the magic. Would you like me to take a pass at weaving that into a full draft for you?";
                nextPromptTitle = "Ready for a draft?";
                nextPrompts = ["Yes, write draft", "Let's add more details"];
            } else if (matches("write draft", "generate draft", "yes, draft")) {
                 aiResponse = "I've put together a first draft for you. Remember, this is just a starting point—feel free to edit it directly until it feels exactly like *you*.";
                 widgetType = 'vow_draft';
                 widgetData = { text: "From the moment of our first spark, I knew my life was about to change beautifully. Your spirit lights up my world. I promise to cherish our memories, to always support your dreams, and to choose you every single day." };
                 nextPromptTitle = "Adjustments?";
                 nextPrompts = ["Perfect, save it!", "Make it longer", "Make it sweeter"];
            
            // Timeline & Logistics Flow
            } else if (matches("timeline", "schedule", "order of events")) {
                aiResponse = "The timeline! This is where the magic becomes a reality. Don't worry, we're going to make sure the day flows beautifully and without rush. To give us a foundation, would you like me to build a gentle 8-hour starting timeline?";
                nextPromptTitle = "Would you like a draft?";
                nextPrompts = ["Yes, Draft Timeline", "No, I have specific times"];
            } else if (matches("draft timeline", "yes, draft timeline", "8-hour", "8 hour")) {
                aiResponse = "Here is a gentle, spacious 8-hour outline. I've built in little buffers so you can actually *breathe* and enjoy the moments. You can drag these around to see how they feel!";
                widgetType = 'timeline';
                widgetData = { events: [
                    { time: '2:00 PM', title: 'Hair & Makeup finishes' },
                    { time: '3:00 PM', title: 'First Look & Photos' },
                    { time: '4:30 PM', title: 'Ceremony begins' },
                    { time: '5:00 PM', title: 'Cocktail Hour' },
                    { time: '6:00 PM', title: 'Dinner & Reception' },
                    { time: '10:00 PM', title: 'Grand Send-off' },
                ]};
                nextPromptTitle = "Actions:";
                nextPrompts = ["Add to Logistics", "Adjust times"];
            } else if (matches("add to logistics", "save timeline")) {
                aiResponse = "All set! I've woven this into your main logistics board. Your vendor team will automatically see these gentle milestones so everyone is beautifully synced. How are you feeling? Do you need a hand with anything else?";
                nextPromptTitle = "What's next?";
                nextPrompts = ["Bridal Suite Help", "Draft Vows", "Review Budget"];
            
            // Bridal Suite / Hair & Makeup Flow
            } else if (matches("bridal suite", "getting ready")) {
                aiResponse = "The bridal suite is your sanctuary before the beautiful chaos begins! It should feel incredibly calm and joyful. I'd love to help you prep—shall we start with a little morning-of checklist, or would you like some tips on hair and makeup flow?";
                nextPromptTitle = "Next steps:";
                nextPrompts = ["Start Checklist", "Hair & Makeup Tips"];
            } else if (matches("hair", "makeup", "mua", "beauty")) {
                aiResponse = "I'd love to help with this! Hair and makeup usually takes about 45 minutes per bridesmaid and 90 minutes for the bride. A pro tip: have your stylists set up near natural window light, and ask your bridal party to wear zip-up or button-down shirts so no one ruins their hair when changing! Also, schedule yourself to be finished *second to last*—that way you're fresh, but you aren't rushing at the very end. Would you like me to add these timings to your timeline?";
                nextPromptTitle = "What do you think?";
                nextPrompts = ["Yes, add to timeline", "Start Checklist", "Back to Home"];
            } else if (matches("checklist", "pack list", "what to bring")) {
                aiResponse = "I've started a little morning sanctuary checklist for you. These are the little things that make a big difference:";
                widgetType = 'checklist';
                widgetData = { items: [
                    { label: "Steamer for dresses", checked: false },
                    { label: "Emergency sewing kit", checked: true },
                    { label: "Champagne & glasses", checked: false },
                    { label: "Bluetooth speaker", checked: false },
                    { label: "Button-down shirts", checked: false }
                ]};
                nextPromptTitle = "Modify checklist:";
                nextPrompts = ["Add specific snacks", "Looks good!", "Share with Maid of Honor"];

            // Budget Flow
            } else if (matches("budget", "money", "cost", "expensive", "pay", "finance")) {
                aiResponse = "Money can definitely be one of the most stressful parts of wedding planning, but we've got this! A great rule of thumb is to allocate 50% to your venue and catering. Would you like me to pull up your current budget breakdown, or look for some clever cost-saving ideas?";
                nextPromptTitle = "Budget Options:";
                nextPrompts = ["Cost-Saving Tips", "Track Expenses", "Vendor Negotiations"];
            } else if (matches("cost-saving", "save money", "cheap", "save", "saving")) {
                aiResponse = "Absolutely! Some of the best ways to save without sacrificing your stunning aesthetic: \n\n1. Repurpose ceremony florals for your reception sweetheart table.\n2. Skip the champagne toast and let guests toast with their own drinks.\n3. Choose beautiful in-season, local flowers.\n\nWould you like me to add a 'Budget Review' block to your planning timeline?";
                nextPromptTitle = "Next Steps:";
                nextPrompts = ["Yes, add to timeline", "More budget tips", "Back to Home"];

            // Guests & RSVP Flow
            } else if (matches("guest", "rsvp", "seating", "invite", "aunt", "family", "friends", "plus one")) {
                aiResponse = "Managing the guest list is notoriously tricky, and family dynamics can be a lot! Don't worry about pleasing absolutely everyone. Would you like me to draft a polite but firm message for guests who haven't RSVP'd yet, or do you need help organizing a drama-free seating chart?";
                nextPromptTitle = "Guest Management:";
                nextPrompts = ["Draft RSVP Reminder", "Seating Chart Help", "Plus-One Etiquette"];
            } else if (matches("rsvp reminder", "polite message", "late rsvp", "haven't rsvp", "did not rsvp")) {
                aiResponse = "Here is a gentle but firm text you can send to late responders:\n\n\"Hi [Name]! We are finalizing our numbers for the wedding and need to give our caterer a final headcount by [Date]. Please let us know if you'll be able to celebrate with us! If we don't hear from you by then, we will unfortunately have to mark you as unable to attend. We hope to see you!\"\n\nHow does that sound?";
                nextPromptTitle = "What do you think?";
                nextPrompts = ["Perfect, copy that", "Make it softer", "Back to Home"];

            // Vendors Flow
            } else if (matches("vendor", "photograph", "cater", "dj", "band", "music", "video", "florist")) {
                aiResponse = "Your vendor team is so important! For example, when interviewing photographers, always ask to see a *full* wedding gallery, not just the highlights. It proves they capture every moment consistently! Would you like me to generate a checklist of important questions to ask during your vendor interviews?";
                nextPromptTitle = "Vendor Prep:";
                nextPrompts = ["Interview Checklist", "Find Local Vendors", "Review Contracts"];
            } else if (matches("interview checklist", "vendor questions", "questions to ask")) {
                aiResponse = "Here's a highly requested checklist for interviewing vendors to make sure you're fully protected:";
                widgetType = 'checklist';
                widgetData = { items: [
                    { label: "Have you worked at our venue before?", checked: false },
                    { label: "What is your backup plan for emergencies/illness?", checked: true },
                    { label: "Are there any hidden travel or breakdown fees?", checked: false },
                    { label: "Can we see a full, completed wedding gallery/video?", checked: false },
                    { label: "Do you carry liability insurance?", checked: false }
                ]};
                nextPromptTitle = "Need help with anything else?";
                nextPrompts = ["Draft Vows", "Bridal Suite Help", "Plan Timeline"];

            // Venue Flow
            } else if (matches("venue", "location", "place", "where", "tour")) {
                aiResponse = "Finding the perfect venue sets the entire tone for your day! Are you dreaming of something outdoors and romantic, an elegant indoor ballroom, or maybe something completely unique like an industrial loft or a greenhouse?";
                nextPromptTitle = "Venue Vibe:";
                nextPrompts = ["Outdoor/Romantic", "Indoor/Elegant", "Unique/Modern"];
            } else if (matches("outdoor", "elegant", "unique", "modern", "ballroom", "loft", "greenhouse")) {
                aiResponse = "I love that vision! I'll update your 'Venue Vibe' preferences in your profile. When touring these venues, make sure to ask about their rain backup plan and if they have exclusive catering lists. Want me to pull up some top-rated venues in your area that match this aesthetic?";
                nextPromptTitle = "Venue Next Steps:";
                nextPrompts = ["Show Venues", "Questions to Ask", "Weather Prep"];
                
            // Weather & Dates Flow
            } else if (matches("weather", "rain", "sun", "season", "date", "month", "forecast", "spring", "summer", "fall", "autumn", "winter")) {
                aiResponse = "Weather is such an important factor, especially if you're dreaming of an outdoor ceremony! To give you the best advice, what month and location are you considering?";
                nextPromptTitle = "Let's check the forecast:";
                nextPrompts = ["Spring in California", "Autumn in New York", "Summer in Tuscany"];
            } else if (matches("spring in california", "california", "napa")) {
                aiResponse = "Spring in California is absolutely gorgeous—think blooming wildflowers and crisp, sunny days! However, evenings can still be a bit chilly, so having a cozy wrap or renting some chic patio heaters is a wonderful touch. Here's a historical look at what you can expect:";
                widgetType = 'weather';
                widgetData = { location: "Napa Valley, CA", month: "May", temp: "72°F / 50°F", condition: "Sunny", chanceOfRain: "10%" };
                nextPromptTitle = "Does this sound good?";
                nextPrompts = ["Yes, let's look at venues", "What about Autumn?", "Start over"];
            } else if (matches("autumn in new york", "new york", "hudson")) {
                aiResponse = "Fall in New York is iconic! You'll get stunning foliage and crisp, romantic air. Since late fall can be unpredictable, a clear top tent is a perfect backup plan so you don't lose the view if it drizzles. Here's what the weather typically looks like:";
                widgetType = 'weather';
                widgetData = { location: "Hudson Valley, NY", month: "October", temp: "62°F / 45°F", condition: "Partly Cloudy", chanceOfRain: "25%" };
                nextPromptTitle = "Does this sound good?";
                nextPrompts = ["Yes, let's look at venues", "What about Summer?", "Start over"];
            } else if (matches("summer in tuscany", "tuscany", "italy")) {
                aiResponse = "Summer in Tuscany is a dream—endless golden hours and warm, magical evenings! Because the mid-day sun can be intense, consider pushing your ceremony to 5:00 PM or later to keep your guests comfortable. Here's a quick forecast snapshot:";
                widgetType = 'weather';
                widgetData = { location: "Tuscany, Italy", month: "July", temp: "88°F / 65°F", condition: "Hot & Sunny", chanceOfRain: "5%" };
                nextPromptTitle = "Does this sound good?";
                nextPrompts = ["Yes, let's look at venues", "What about Spring?", "Start over"];

            // Stress & Emotional Support Flow
            } else if (matches("stress", "overwhelm", "panick", "anxiet", "too much", "tired", "exhaust", "help", "freak")) {
                aiResponse = "Please, take a deep breath. It is *completely* normal to feel overwhelmed right now—you are planning a massive, highly emotional event! Remember that at the end of the day, all that truly matters is you and your partner celebrating your love. Do you want to take a break from the big stuff and just look at something fun and low-pressure, like cake flavors or honeymoon spots?";
                nextPromptTitle = "Let's take a breath:";
                nextPrompts = ["Look at Cakes", "Honeymoon Ideas", "I feel better"];

            // Groom & Styling Flow
            } else if (matches("groom", "suit", "tux", "groomsmen", "tie")) {
                aiResponse = "Let's get you and your party looking incredibly sharp! Are we thinking classic black tuxedos, modern colorful suits, or something more casual and breezy? I can help you coordinate measurements and rental timelines so no one is scrambling at the last minute.";
                nextPromptTitle = "Groom Style:";
                nextPrompts = ["Classic Tuxedos", "Modern Suits", "Measurement Tracker"];
            } else if (matches("dress", "gown", "veil", "alteration", "fitting")) {
                aiResponse = "Dress shopping is so magical! A quick tip from industry pros: wear nude undergarments to your appointments, and don't bring too many people—too many opinions can quickly become overwhelming. Have you started looking at silhouettes, or are you just starting out?";
                nextPromptTitle = "Dress Shopping:";
                nextPrompts = ["Browse Silhouettes", "Boutique Prep", "Timeline Help"];

            // General Acknowledgements
            } else if (matches("looks good", "thanks", "thank you", "good", "yes, add to timeline", "perfect, copy that", "i feel better")) {
                aiResponse = "You are doing such an incredible job navigating all of this. Take a deep breath—your day is going to be absolutely stunning. I'm right here in your pocket whenever you need me! What shall we cross off the list next?";
                nextPromptTitle = "I'm here if you need me:";
                nextPrompts = ["Draft Vows", "Plan Timeline", "Budget Help"];
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
                        className="absolute bottom-24 right-12 w-[380px] h-[600px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E2D8C8] flex flex-col overflow-hidden pointer-events-auto"
                        style={{ cursor: 'auto' }}
                    >
                        {/* Drag Handle & Header */}
                        <div className="h-[90px] bg-[#F4F0E8] border-b border-[#E2D8C8] text-navy flex flex-col px-6 flex-shrink-0 relative cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 bg-[#E2D8C8] rounded-full mx-auto mt-3 mb-2" />
                            <div className="flex items-center justify-between flex-1 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-lg shadow-inner border border-[#C9A84C]/80">
                                        {contextConfig.icon === '✨' ? (
                                            <Sparkles size={18} className="text-white" />
                                        ) : (
                                            <span>{contextConfig.icon}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg italic font-bold leading-tight">{contextConfig.title}</h3>
                                        <p className="text-[9px] text-taupe font-bold uppercase tracking-widest flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B76] animate-pulse" /> Always Online
                                        </p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="text-taupe hover:text-navy transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E2D8C8]/50">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex-1 p-5 bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-5">
                            {messages.map((msg, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-sm whitespace-pre-wrap leading-relaxed ${
                                            msg.sender === 'user' 
                                                ? 'bg-navy text-white rounded-tr-none' 
                                                : 'bg-[#F4F0E8] border border-[#E2D8C8] text-navy rounded-tl-none'
                                        }`}>
                                            {msg.text}
                                            
                                            {/* Rich Widgets */}
                                            {msg.widget === 'vow_draft' && msg.widgetData && (
                                                <div className="mt-4 bg-white border border-[#C9A84C]/40 rounded-xl p-4 font-serif italic text-navy text-sm shadow-inner relative group text-left">
                                                    <div className="absolute -top-3 -right-2 bg-white rounded-full p-1.5 shadow border border-[#E2D8C8] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[#C9A84C] hover:bg-[#F4F0E8]">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                                    </div>
                                                    "{msg.widgetData.text}"
                                                </div>
                                            )}
                                            
                                            {msg.widget === 'timeline' && msg.widgetData && (
                                                <div className="mt-4 bg-white rounded-xl shadow-sm border border-[#E2D8C8] overflow-hidden text-left">
                                                    <div className="bg-navy px-3 py-2 text-white text-xs font-bold tracking-widest uppercase flex justify-between items-center">
                                                        Day-of Timeline
                                                        <Clock size={12} />
                                                    </div>
                                                    <div className="p-2 flex flex-col gap-1">
                                                        {msg.widgetData.events.map((event: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F4F0E8] transition-colors cursor-pointer group">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                                                                <span className="text-xs font-bold text-navy w-16 shrink-0">{event.time}</span>
                                                                <span className="text-xs text-taupe truncate flex-1">{event.title}</span>
                                                                <div className="opacity-0 group-hover:opacity-100 text-[#C9A84C]">
                                                                    <List size={12} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {msg.widget === 'checklist' && msg.widgetData && (
                                                <div className="mt-4 bg-white rounded-xl shadow-sm border border-[#E2D8C8] p-3 text-left flex flex-col gap-2">
                                                    {msg.widgetData.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-3 p-1.5 hover:bg-[#F4F0E8] rounded-md transition-colors cursor-pointer">
                                                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${item.checked ? 'bg-[#C9A84C] border-[#C9A84C] text-white' : 'border-[#E2D8C8] bg-white'}`}>
                                                                {item.checked && <Check size={10} strokeWidth={3} />}
                                                            </div>
                                                            <span className={`text-xs ${item.checked ? 'text-taupe line-through' : 'text-navy font-medium'}`}>{item.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {msg.widget === 'weather' && msg.widgetData && (
                                                <div className="mt-4 bg-gradient-to-br from-white to-[#F9F7F3] rounded-xl shadow-sm border border-[#E2D8C8] overflow-hidden text-left relative">
                                                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                                        {msg.widgetData.condition.includes('Sun') ? <Sun size={64} /> : msg.widgetData.condition.includes('Rain') ? <CloudRain size={64} /> : <CloudSun size={64} />}
                                                    </div>
                                                    <div className="p-4 relative z-10 flex flex-col gap-3">
                                                        <div>
                                                            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold">{msg.widgetData.month} Historical Average</p>
                                                            <p className="text-sm font-serif font-medium text-navy">{msg.widgetData.location}</p>
                                                        </div>
                                                        <div className="flex items-center justify-between border-t border-b border-[#E2D8C8]/50 py-3">
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-1.5 text-navy">
                                                                    <Thermometer size={14} className="text-[#C9A84C]" />
                                                                    <span className="text-lg font-light tracking-tight">{msg.widgetData.temp}</span>
                                                                </div>
                                                                <span className="text-[10px] text-taupe uppercase tracking-wider ml-5">High / Low</span>
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <div className="flex items-center gap-1.5 text-navy">
                                                                    <span className="text-sm font-medium">{msg.widgetData.condition}</span>
                                                                    {msg.widgetData.condition.includes('Sun') ? <Sun size={14} className="text-[#C9A84C]" /> : msg.widgetData.condition.includes('Rain') ? <CloudRain size={14} className="text-[#C9A84C]" /> : <CloudSun size={14} className="text-[#C9A84C]" />}
                                                                </div>
                                                                <span className="text-[10px] text-taupe uppercase tracking-wider">{msg.widgetData.chanceOfRain} Rain Chance</span>
                                                            </div>
                                                        </div>
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
                                                        className="px-3.5 py-2 bg-white border border-[#E2D8C8] hover:border-navy hover:text-navy rounded-full text-[11px] font-bold text-taupe transition-all hover:shadow-md hover:-translate-y-0.5"
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
                                    <div className="bg-[#F4F0E8] border border-[#E2D8C8] p-4 rounded-2xl rounded-tl-none flex gap-1 shadow-sm items-center h-[48px]">
                                        <span className="w-1.5 h-1.5 bg-taupe/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-taupe/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-taupe/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <div className="p-4 bg-white border-t border-[#E2D8C8] flex flex-col gap-3 relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Message VowAI..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    className="w-full bg-[#F4F0E8] border border-[#E2D8C8] rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:bg-white transition-all text-navy placeholder:text-taupe shadow-inner"
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C9A84C] transition-colors shadow-md"
                                >
                                    <Send size={14} className="ml-0.5" />
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <button 
                                    onClick={onClose} 
                                    className="text-[10px] uppercase tracking-widest font-bold text-taupe hover:text-navy transition-colors pb-1"
                                >
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

// --- GUEST LIST & SEATING CHART ---
const GUEST_DATA = [
  // Table 1 (8/8)
  { id: '1', name: 'Eleanor Roosevelt', status: 'attending', dietary: 'Vegetarian', table: 1 },
  { id: '3', name: 'Marie Curie', status: 'attending', dietary: 'Gluten-Free', table: 1 },
  { id: '5', name: 'Frida Kahlo', status: 'attending', dietary: 'Vegan', table: 1 },
  { id: '8', name: 'Franklin Roosevelt', status: 'attending', dietary: 'None', table: 1 },
  { id: '9', name: 'Pierre Curie', status: 'attending', dietary: 'None', table: 1 },
  { id: '10', name: 'Diego Rivera', status: 'attending', dietary: 'None', table: 1 },
  { id: '11', name: 'Rosa Parks', status: 'attending', dietary: 'None', table: 1 },
  { id: '12', name: 'Harriet Tubman', status: 'attending', dietary: 'None', table: 1 },

  // Table 2 (8/8)
  { id: '6', name: 'Isaac Newton', status: 'attending', dietary: 'None', table: 2 },
  { id: '13', name: 'Galileo Galilei', status: 'attending', dietary: 'Vegetarian', table: 2 },
  { id: '14', name: 'Nikola Tesla', status: 'attending', dietary: 'None', table: 2 },
  { id: '15', name: 'Thomas Edison', status: 'attending', dietary: 'None', table: 2 },
  { id: '16', name: 'Charles Darwin', status: 'attending', dietary: 'None', table: 2 },
  { id: '17', name: 'Stephen Hawking', status: 'attending', dietary: 'Vegan', table: 2 },
  { id: '18', name: 'Carl Sagan', status: 'attending', dietary: 'None', table: 2 },
  { id: '19', name: 'Richard Feynman', status: 'attending', dietary: 'None', table: 2 },

  // Table 3 (8/8)
  { id: '20', name: 'Jane Austen', status: 'attending', dietary: 'None', table: 3 },
  { id: '21', name: 'Virginia Woolf', status: 'attending', dietary: 'Pescatarian', table: 3 },
  { id: '22', name: 'Emily Dickinson', status: 'attending', dietary: 'None', table: 3 },
  { id: '23', name: 'Mary Shelley', status: 'attending', dietary: 'None', table: 3 },
  { id: '24', name: 'Sylvia Plath', status: 'attending', dietary: 'None', table: 3 },
  { id: '25', name: 'Agatha Christie', status: 'attending', dietary: 'None', table: 3 },
  { id: '26', name: 'Maya Angelou', status: 'attending', dietary: 'Gluten-Free', table: 3 },
  { id: '27', name: 'Toni Morrison', status: 'attending', dietary: 'None', table: 3 },

  // Table 4 (6/8)
  { id: '28', name: 'Leonardo da Vinci', status: 'attending', dietary: 'None', table: 4 },
  { id: '29', name: 'Michelangelo', status: 'attending', dietary: 'Vegetarian', table: 4 },
  { id: '30', name: 'Vincent van Gogh', status: 'attending', dietary: 'None', table: 4 },
  { id: '31', name: 'Pablo Picasso', status: 'attending', dietary: 'None', table: 4 },
  { id: '32', name: 'Claude Monet', status: 'attending', dietary: 'None', table: 4 },
  { id: '33', name: 'Salvador Dali', status: 'attending', dietary: 'Dairy-Free', table: 4 },

  // Family - Bride (Table 5)
  { id: 'f1', name: 'Mother of Bride', status: 'attending', dietary: 'None', table: 5 },
  { id: 'f2', name: 'Father of Bride', status: 'attending', dietary: 'None', table: 5 },
  { id: 'f3', name: 'Sister of Bride', status: 'attending', dietary: 'Vegan', table: 5 },
  { id: 'f4', name: 'Brother of Bride', status: 'attending', dietary: 'None', table: 5 },

  // Family - Groom (Table 6)
  { id: 'f5', name: 'Mother of Groom', status: 'attending', dietary: 'Gluten-Free', table: 6 },
  { id: 'f6', name: 'Father of Groom', status: 'attending', dietary: 'None', table: 6 },
  { id: 'f7', name: 'Sister of Groom', status: 'attending', dietary: 'None', table: 6 },
  { id: 'f8', name: 'Brother of Groom', status: 'attending', dietary: 'Vegetarian', table: 6 },

  // Unassigned / Pending / Declined
  { id: '2', name: 'Winston Churchill', status: 'pending', dietary: 'None', table: null },
  { id: '4', name: 'Albert Einstein', status: 'declined', dietary: 'None', table: null },
  { id: '7', name: 'Ada Lovelace', status: 'pending', dietary: 'Vegetarian', table: null },
  { id: '34', name: 'Alan Turing', status: 'attending', dietary: 'None', table: null },
  { id: '35', name: 'Grace Hopper', status: 'attending', dietary: 'None', table: null },
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
      className={`py-2 px-2 bg-white border-b border-[#E2D8C8]/40 last:border-0 cursor-grab hover:bg-[#FDFBF7] transition-all flex items-center justify-between relative group ${isDragging ? 'opacity-40 scale-95' : ''}`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex items-center gap-2 pl-1">
        <GripVertical size={12} className="text-taupe/30 group-hover:text-[#C9A84C] transition-colors" />
        <div>
          <p className="text-xs font-serif font-bold text-navy leading-tight">{guest.name}</p>
          {guest.dietary !== 'None' && <span className="text-[8px] text-[#C9A84C] uppercase tracking-wider font-bold mt-0.5 inline-block">{guest.dietary}</span>}
        </div>
      </div>
      <Badge variant={guest.status === 'attending' ? 'success' : guest.status === 'declined' ? 'error' : 'neutral'} className="text-[8px] uppercase font-bold tracking-widest px-2 py-0.5">
        {guest.status === 'attending' ? 'Yes' : guest.status === 'declined' ? 'No' : 'Wait'}
      </Badge>
    </div>
  );
};

const DraggableSeatedGuest = ({ guest, x, y, chairStyles }: { guest: any, x: number, y: number, chairStyles: string }) => {
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
      className={`absolute z-10 hover:z-50 flex items-center justify-center group cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
      style={{ 
         left: `calc(50% + ${x}px)`, 
         top: `calc(50% + ${y}px)`,
         transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        className={`w-12 h-12 ${chairStyles} rounded-full flex items-center justify-center shadow-md group-hover:scale-[1.25] group-hover:-translate-y-1 transition-all duration-300 ease-out border-[1.5px] group-hover:shadow-[0_8px_30px_rgb(201,168,76,0.3)] relative`}
      >
        <div className={`absolute inset-[3px] rounded-full border ${guest.dietary !== 'None' ? 'border-[#C9A84C]/30' : 'border-[#E2D8C8]/30'} pointer-events-none`}></div>
        <span className="text-xs font-serif font-bold">
           {guest.name.split(' ').map((n: string)=>n[0]).join('')}
        </span>
        
        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[10px] px-3 py-1.5 rounded-sm whitespace-nowrap shadow-xl z-[100] pointer-events-none font-bold tracking-wide">
           {guest.name} {guest.dietary !== 'None' && `(${guest.dietary})`}
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

const SeatingTable = ({ tableId, guests, onDropGuest }: { tableId: number, guests: any[], onDropGuest: (guestId: string, tableId: number | null) => void }) => {
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
      className={`relative w-48 h-48 rounded-full transition-all duration-300 hover:z-50 ${isOver ? 'scale-105 shadow-2xl ring-4 ring-[#C9A84C]/30' : 'shadow-xl'} flex items-center justify-center group/table`}
    >
      <div className={`absolute inset-0 rounded-full border-4 ${isOver ? 'border-[#C9A84C]' : 'border-[#E2D8C8]'} bg-gradient-to-br from-white to-[#F9F7F3] shadow-inner`}></div>
      <div className="absolute inset-2 rounded-full border border-[#E2D8C8]/50 bg-white/50"></div>
      
      <div className="text-center relative z-10 flex flex-col items-center justify-center">
        <div className="text-[#C9A84C] mb-1 opacity-70">
           <Flower2 size={18} />
        </div>
        <span className="text-xl font-serif text-navy font-bold">Table {tableId}</span>
        <span className="text-[10px] text-taupe mt-1 font-bold uppercase tracking-widest">{guests.length} / 8 Seats</span>
      </div>
      
      {guests.map((g, i) => {
        const angle = (i * (360 / Math.max(guests.length, 1))) * (Math.PI / 180);
        const radius = 110;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const chairStyles = g.dietary !== 'None' 
          ? 'bg-white border-[#C9A84C] text-[#C9A84C]' 
          : 'bg-white border-[#E2D8C8] text-navy';
        
        return (
          <DraggableSeatedGuest key={g.id} guest={g} x={x} y={y} chairStyles={chairStyles} />
        );
      })}
    </div>
  );
};

// --- THOUGHTS / JOURNAL ---
const MOCK_THOUGHTS = [
  { id: 1, title: 'Vibe for the Reception', content: 'Thinking about having lots of candlelight and low music during dinner, then a massive switch in energy for dancing. Maybe a saxophonist?', date: 'Oct 12', tag: 'Vibe' },
  { id: 2, title: 'Mother-in-law ideas', content: 'Need to find a way to include her in the dress shopping without letting her take over the narrative. Maybe give her a specific task?', date: 'Oct 14', tag: 'Family' },
  { id: 3, title: 'Late night snack', content: 'What if we did a french fry bar instead of pizza? Or maybe both. Definitely need something salty.', date: 'Oct 15', tag: 'Catering' },
  { id: 4, title: 'Vow snippets', content: '"I promise to always keep the house stocked with your favorite coffee." Add something about the trip to Italy.', date: 'Oct 18', tag: 'Vows' },
  { id: 5, title: 'Colors', content: 'Obsessed with the deep emerald greens I saw on Pinterest. Need to ask the florist if we can incorporate that into the centerpieces.', date: 'Oct 20', tag: 'Decor' },
  { id: 6, title: 'Maid of Honor Duties', content: 'Need to sync with Sarah about her speech. Want to make sure it is not too long, but definitely want her to mention our college days.', date: 'Oct 22', tag: 'Bridal Party' },
  { id: 7, title: 'Best Man Gift Ideas', content: 'What do we get for Mike? He loves whiskey and golf. Maybe a personalized flask or custom golf balls? Need to run this by the fiance.', date: 'Oct 25', tag: 'Gifts' },
  { id: 8, title: 'Parents Anniversary Dance', content: 'Both our parents have been married for over 30 years. It would be sweet to do a special anniversary dance for them right after our first dance.', date: 'Oct 28', tag: 'Family' },
  { id: 9, title: 'Sibling Roles', content: 'Want to make sure my brother feels included even if he is not a groomsman. Maybe he can do a reading during the ceremony?', date: 'Nov 1', tag: 'Family' },
  { id: 10, title: 'Friends Seating Chart', content: 'Need to make sure the college group is seated together, but definitely need to separate John and Mark after what happened at the last party.', date: 'Nov 3', tag: 'Planning' }
];

const ThoughtItemTypes = { THOUGHT: 'thought' };

const DraggableThought = ({ thought, index, moveThought, stickyColor }: { thought: any, index: number, moveThought: (dragIndex: number, hoverIndex: number) => void, stickyColor: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('vowtrack_boardItems');
      const items = saved ? JSON.parse(saved) : [];
      // check if already pinned
      if (items.find((item: any) => item.id === `thought-${thought.id}`)) {
        toast.info('Already pinned to Suite Design moodboard');
        return;
      }
      items.push({
        id: `thought-${thought.id}`,
        type: 'text',
        text: thought.content,
        x: 100 + Math.random() * 50,
        y: 100 + Math.random() * 50
      });
      localStorage.setItem('vowtrack_boardItems', JSON.stringify(items));
      toast.success('Pinned to Suite Design moodboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to pin');
    }
  };

  const [{ handlerId }, drop] = useDrop({
    accept: ThoughtItemTypes.THOUGHT,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      moveThought(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ThoughtItemTypes.THOUGHT,
    item: () => {
      return { id: thought.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref}
      data-handler-id={handlerId}
      className={`p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all relative group cursor-grab active:cursor-grabbing border border-black/5 hover:-translate-y-1 ${isDragging ? 'opacity-40 scale-95' : 'opacity-100'}`}
      style={{ backgroundColor: stickyColor }}
    >
        <div className="flex justify-between items-start mb-4">
           <span className="text-[10px] font-bold uppercase tracking-widest bg-white/50 px-2 py-1 rounded text-black/70">{thought.tag}</span>
           <span className="text-xs text-black/50 font-medium">{thought.date}</span>
        </div>
        <h3 className="font-script text-3xl text-black/90 mb-3 leading-tight">{thought.title}</h3>
        <p className="text-sm font-medium text-black/80 leading-relaxed">
           {thought.content}
        </p>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button 
              onClick={handlePin}
              className="text-black/60 hover:text-navy bg-white/80 p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"
              title="Pin to Suite Design"
            >
              <Pin size={12} />
            </button>
            <button className="text-black/60 hover:text-black bg-white/80 p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"><Edit2 size={12} /></button>
            <button className="text-black/60 hover:text-[#C44343] bg-white/80 p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"><Trash2 size={12} /></button>
        </div>
        {/* Folded corner illusion */}
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-xl rounded-br-2xl" />
    </div>
  );
};

const ThoughtsStateContent = ({ onBack }: { onBack: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thoughts, setThoughts] = useState(MOCK_THOUGHTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('');

  // Use the brand colors from InvitationSuiteDesign but lighter for sticky notes
  const stickyColors = [
    '#F4EFE6', // Light Champagne
    '#FDF6F7', // Light Floral/Blush
    '#EAF0EB', // Botanical Sage
    '#F2D4CF', // Blush
    '#FAF7F2', // Ivory
    '#F9F7F3', // Classic
  ];

  const moveThought = useCallback((dragIndex: number, hoverIndex: number) => {
    setThoughts((prevThoughts) => {
      const newThoughts = [...prevThoughts];
      const draggedThought = newThoughts[dragIndex];
      newThoughts.splice(dragIndex, 1);
      newThoughts.splice(hoverIndex, 0, draggedThought);
      return newThoughts;
    });
  }, []);

  const handleSave = () => {
     if (newTitle && newContent) {
        setThoughts([{
           id: thoughts.length + 1,
           title: newTitle,
           content: newContent,
           tag: newTag || 'Note',
           date: 'Today'
        }, ...thoughts]);
        setIsModalOpen(false);
        setNewTitle('');
        setNewContent('');
        setNewTag('');
     }
  };

  return (
    <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-6 bg-[#FAF7F2] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] transition-colors tracking-widest">
            <ChevronLeft size={14} strokeWidth={2.5} /> BACK
          </button>
          <div className="ml-4">
            <h2 className="font-serif text-4xl font-bold text-navy">Journal & Ideas</h2>
            <p className="text-sm text-taupe mt-1">Capture your late-night thoughts and inspiration</p>
          </div>
        </div>
        <Button variant="gold" onClick={() => setIsModalOpen(true)} className="rounded-full shadow-md"><Plus size={16} /> New Entry</Button>
      </div>
      
      <div className="flex-1 min-h-0 w-full overflow-y-auto pr-4 pb-12 custom-scrollbar">
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}>
           <Masonry gutter="24px">
             {thoughts.map((thought, i) => (
                <DraggableThought
                  key={thought.id}
                  thought={thought}
                  index={i}
                  moveThought={moveThought}
                  stickyColor={stickyColors[i % stickyColors.length]}
                />
             ))}
           </Masonry>
        </ResponsiveMasonry>
      </div>

      <AnimatePresence>
         {isModalOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-12"
               onClick={() => setIsModalOpen(false)}
            >
               <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E2D8C8]"
                  onClick={e => e.stopPropagation()}
               >
                  <div className="p-6 border-b border-[#E2D8C8] flex justify-between items-center bg-[#F9F7F3]">
                     <h3 className="font-serif text-2xl text-navy font-bold">New Journal Entry</h3>
                     <button onClick={() => setIsModalOpen(false)} className="text-taupe hover:text-navy transition-colors">
                        <X size={20} />
                     </button>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest text-navy uppercase">Title</label>
                        <input 
                           type="text" 
                           value={newTitle}
                           onChange={e => setNewTitle(e.target.value)}
                           className="w-full p-3 border border-[#E2D8C8] rounded-md text-sm focus:outline-none focus:border-[#C9A84C]"
                           placeholder="What's on your mind?"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest text-navy uppercase">Tag (Optional)</label>
                        <input 
                           type="text" 
                           value={newTag}
                           onChange={e => setNewTag(e.target.value)}
                           className="w-full p-3 border border-[#E2D8C8] rounded-md text-sm focus:outline-none focus:border-[#C9A84C]"
                           placeholder="e.g. Vows, Inspiration, To-do"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest text-navy uppercase">Content</label>
                        <textarea 
                           value={newContent}
                           onChange={e => setNewContent(e.target.value)}
                           className="w-full p-3 border border-[#E2D8C8] rounded-md text-sm focus:outline-none focus:border-[#C9A84C] min-h-[150px] resize-none"
                           placeholder="Write down your thoughts, ideas, or notes..."
                        />
                     </div>
                  </div>
                  <div className="p-6 border-t border-[#E2D8C8] flex justify-end gap-3 bg-[#F9F7F3]">
                     <Button variant="outline" className="bg-white" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                     <Button variant="gold" className="bg-navy text-white hover:bg-navy/90 border-navy" onClick={handleSave}>Save Entry</Button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

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

const ThoughtsState = ({ onBack }: { onBack: () => void }) => {
  return (
    <>
      <ThoughtsStateContent onBack={onBack} />
    </>
  );
};

const GUEST_CHECKLIST = [
  {
    category: "Invitations & Stationery",
    image: "https://images.unsplash.com/photo-1721176487015-5408ae0e9bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbnMlMjBmbGF0bGF5fGVufDF8fHx8MTc3MjgyMjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Invitation Suite Design", status: "IN PROGRESS", link: "suite_design" },
      { name: "Printing & Production", status: "BOOKED" },
      { name: "Guest Addressing", status: "REQUESTED" },
      { name: "Calligraphy & Signage", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Save the Dates",
    image: "https://images.unsplash.com/photo-1644254341580-dc3a0cf57515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBlbmdhZ2VtZW50JTIwcGhvdG98ZW58MXx8fHwxNzcyODIyMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Wedding Website", status: "DONE" },
      { name: "Digital Save the Dates", status: "IN PROGRESS" },
      { name: "Physical Cards", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Dietary & Menu",
    image: "https://images.unsplash.com/photo-1665072464126-b53f4bd0e465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZm9vZCUyMGNhdGVyaW5nfGVufDF8fHx8MTc3MjgyMjEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Menu Selection", status: "IN PROGRESS" },
      { name: "Allergy Tracking", status: "IN PROGRESS" },
      { name: "Specialty Meals", status: "NOT BOOKED" },
      { name: "Vendor Meals", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Travel & Hotels",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzcyNzY4ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Hotel Room Blocks", status: "DONE" },
      { name: "Shuttle Service", status: "NOT BOOKED" },
      { name: "Travel Guide for Guests", status: "IN PROGRESS" }
    ]
  },
  {
    category: "Welcome & Gifts",
    image: "https://images.unsplash.com/photo-1673257042276-47eb29945293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwd2VsY29tZSUyMGJhZ3MlMjBnaWZ0c3xlbnwxfHx8fDE3NzI4MjIxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Gift Registry Setup", status: "DONE" },
      { name: "Welcome Bags", status: "NOT BOOKED" },
      { name: "Wedding Favors", status: "IN PROGRESS" },
      { name: "Thank You Cards", status: "NOT BOOKED" }
    ]
  },
  {
    category: "RSVPs & Seating",
    image: "https://images.unsplash.com/photo-1629744418692-345355518e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2VhdGluZyUyMGNoYXJ0JTIwYm9hcmR8ZW58MXx8fHwxNzcyODIyMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "RSVP Tracking", status: "IN PROGRESS" },
      { name: "Seating Chart", status: "IN PROGRESS" },
      { name: "Place Cards", status: "NOT BOOKED" },
      { name: "Floor Plan Layout", status: "NOT BOOKED" }
    ]
  }
];

const GuestManagementDashboard = ({ 
  onSwitchView,
  onOpenChat,
  onNavigate
}: { 
  onSwitchView: () => void,
  onOpenChat?: (intent?: string) => void,
  onNavigate?: (view: string) => void
}) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [activeRsvpTab, setActiveRsvpTab] = useState('All');
  const [selectedRsvpGuest, setSelectedRsvpGuest] = useState<any>(null);

  const rsvpData = [
     { 
        name: 'Aunt Sharon & Tom', party: 2, status: 'Confirmed', dietary: 'None', time: '2h ago', 
        image: 'https://images.unsplash.com/photo-1767917638707-74d77bfecd58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwY291cGxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyODIyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        email: 'sharon.tom@family.com',
        events: ['Rehearsal Dinner', 'Wedding Ceremony', 'Reception'],
        address: '123 Cherry Lane, Springfield'
     },
     { 
        name: 'Mike & Chloe Reyes', party: 2, status: 'Confirmed', dietary: 'Gluten Free (1)', time: '5h ago', 
        image: 'https://images.unsplash.com/photo-1626975211633-def18ee06140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGZhbWlseSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjgyMjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        email: 'reyes.fam@example.com',
        events: ['Wedding Ceremony', 'Reception'],
        address: '456 Oak Ave, Metropolis'
     },
     { 
        name: 'Grandma Rose', party: 1, status: 'Confirmed', dietary: 'None', time: '1d ago', 
        image: 'https://images.unsplash.com/photo-1547199315-ddabe87428ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4MjIzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        email: 'rose.grandma@family.com',
        events: ['Welcome Party', 'Rehearsal Dinner', 'Wedding Ceremony', 'Reception', 'Farewell Brunch'],
        address: '789 Pine St, Hometown'
     },
     { 
        name: 'Ben & Laura Kim', party: 4, status: 'Declined', dietary: '—', time: '1d ago', 
        image: 'https://images.unsplash.com/photo-1726751151542-1c578a3b68ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwY291cGxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyODIyMzg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        email: 'ben.laura@example.com',
        events: [],
        address: '321 Elm St, Cityville'
     },
     { 
        name: 'Dr. & Mrs. Patel', party: 2, status: 'Awaiting RSVP', dietary: '—', time: '3d ago', 
        image: 'https://images.unsplash.com/photo-1649110337619-e234ea7d4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXN0aW5ndWlzaGVkJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyODIyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        email: 'dr.patel@medical.com',
        events: [],
        address: '654 Maple Dr, Suburbia'
     }
  ];

  const filteredRsvps = rsvpData.filter(g => {
     if (activeRsvpTab === 'All') return true;
     if (activeRsvpTab === 'Attending') return g.status === 'Confirmed';
     if (activeRsvpTab === 'Dietary Needs') return g.dietary !== 'None' && g.dietary !== '—';
     return true;
  });

  const toggleCategory = (idx: number) => {
    setExpandedCategories(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex-1 flex gap-10 w-full overflow-hidden relative z-10">
      {/* Left Scrolling Content */}
      <div className="flex-1 flex flex-col gap-8 overflow-y-auto pl-2 pr-4 pb-[200px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Main Columns */}
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-end">
            <h3 className="font-serif text-2xl text-navy font-bold flex items-center gap-2">
              <Briefcase size={24} className="text-[#C9A84C]" />
              Guest Journey Experience
            </h3>
            <span className="text-xs text-taupe italic">Click any category to expand and manage details</span>
          </div>

          <div className="grid grid-cols-3 gap-6 items-start w-full">
            {GUEST_CHECKLIST.map((cat, idx) => {
              const isExpanded = expandedCategories.includes(idx);
              return (
                <div
                  key={idx}
                  className="relative aspect-square bg-white rounded-[24px] border border-[#E2D8C8] shadow-sm hover:shadow-[0_12px_30px_rgb(201,168,76,0.15)] overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() => toggleCategory(idx)}
                >
                  {/* Image Section (Base Layer) */}
                  <div className="absolute inset-0 z-0">
                    <ImageWithFallback src={cat.image} alt={cat.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-90"></div>
                    <div className={`absolute inset-0 bg-navy/60 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute inset-0 bg-navy/60 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>

                  {/* Category Title - Always visible but moves up when expanded */}
                  <div className={`absolute left-6 right-6 flex justify-between items-end transition-all duration-500 z-30 ${isExpanded ? 'top-6' : 'bottom-6'}`}>
                     <h4 className={`font-serif text-2xl font-bold leading-tight ${isExpanded ? 'text-[#C9A84C] drop-shadow-md' : 'text-white'}`}>{cat.category}</h4>
                     <div className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'bg-[#C9A84C] text-white hover:bg-[#B8860B] shadow-md' : 'bg-white/20 border border-white/30 text-white'}`}>
                       {isExpanded ? <X size={16} /> : <Plus size={16} />}
                     </div>
                  </div>

                  {/* Expandable Content (Checklist Overlay sliding up) */}
                  <div 
                    className={`absolute inset-x-0 bottom-0 bg-white transition-all duration-500 ease-in-out z-20 flex flex-col overflow-hidden ${isExpanded ? 'h-[calc(100%-80px)] opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                     <div className="p-4 border-b border-[#E2D8C8]/50 flex items-center justify-between z-10 bg-white relative shrink-0">
                       <div>
                         <h5 className="font-serif text-lg text-navy font-bold">Status</h5>
                       </div>
                     </div>
                     
                     {/* Scroll Up Indicator */}
                     <div className="absolute top-[64px] left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 flex justify-center pointer-events-none opacity-80 transition-opacity">
                        <ChevronUp size={14} className="text-taupe/60 mt-1" />
                     </div>

                     <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                       {cat.items.map((item, iIdx) => (
                         <div 
                           key={iIdx} 
                           onClick={(e) => {
                             if (item.link) {
                               e.stopPropagation();
                               if (onNavigate) onNavigate(item.link);
                             }
                           }}
                           className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer group/item ${item.link ? 'border border-[#C9A84C] bg-white shadow-sm hover:shadow-md' : 'border border-transparent hover:border-[#E2D8C8] hover:bg-[#F4F0E8]/50'}`}
                         >
                            <div className="flex items-center gap-4">
                              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.status === 'NOT BOOKED' ? 'bg-[#D1D1D1]' : item.status === 'IN PROGRESS' ? 'bg-[#C9A84C]' : item.status === 'REQUESTED' ? 'bg-[#B8860B]' : 'bg-[#2B8B5B]'}`} />
                              <div className="flex flex-col min-w-0">
                                <span className={`text-sm font-bold truncate ${item.status === 'NOT BOOKED' ? 'text-navy/70 group-hover/item:text-navy' : 'text-navy'}`}>{item.name}</span>
                                <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${item.status === 'NOT BOOKED' ? 'text-taupe' : item.status === 'IN PROGRESS' ? 'text-[#C9A84C]' : item.status === 'REQUESTED' ? 'text-[#B8860B]' : 'text-[#2B8B5B]'}`}>{item.status}</span>
                              </div>
                            </div>
                            {item.link ? (
                              <div className="w-7 h-7 rounded-full bg-white border border-[#C9A84C] flex items-center justify-center text-[#C9A84C] shadow-sm transition-transform group-hover/item:scale-110 shrink-0">
                                <ArrowRight size={14} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center text-taupe group-hover/item:text-[#C9A84C] group-hover/item:border-[#C9A84C] group-hover/item:shadow-sm transition-all -translate-x-2 group-hover/item:translate-x-0 opacity-0 group-hover/item:opacity-100 shrink-0">
                                <ArrowRight size={14} strokeWidth={2.5} />
                              </div>
                            )}
                         </div>
                       ))}
                     </div>
                     
                     {/* Scroll Down Indicator */}
                     <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex items-end justify-center pb-2 pointer-events-none transition-opacity">
                        <ChevronDown size={14} className="text-taupe/60" />
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent RSVPs Table Redesigned as Luxury RSVP Cards */}
          <div className="mt-8 flex flex-col gap-4">
             <div className="flex justify-between items-end border-b-[1.5px] border-[#C9A84C]/40 pb-3">
                <div className="flex flex-col gap-2">
                   <h3 className="text-xl font-bold text-navy font-serif italic flex items-center gap-2">
                      <Users size={20} className="text-[#C9A84C]" /> Recent RSVPs
                   </h3>
                   <div className="flex items-center gap-2 mt-2">
                      {['All', 'Attending', 'Dietary Needs'].map((tab) => (
                         <button
                            key={tab}
                            onClick={() => setActiveRsvpTab(tab)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                               activeRsvpTab === tab
                                  ? 'bg-[#C9A84C] text-white shadow-md shadow-[#C9A84C]/20'
                                  : 'bg-white border border-[#E2D8C8] text-taupe hover:border-[#C9A84C]/50 hover:text-navy'
                            }`}
                         >
                            {tab}
                         </button>
                      ))}
                   </div>
                </div>
                <button className="text-[10px] font-bold text-navy uppercase tracking-wider flex items-center gap-1 hover:text-[#C9A84C] transition-colors mb-1">
                   VIEW ALL GUESTS <ArrowRight size={14}/>
                </button>
             </div>
             
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-2 items-start">
                <AnimatePresence>
                   {filteredRsvps.map((row, i) => (
                      <motion.div 
                         layout
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         transition={{ duration: 0.3 }}
                         key={row.name} 
                         onClick={() => setSelectedRsvpGuest(selectedRsvpGuest?.name === row.name ? null : row)}
                         className="relative bg-white border border-[#C9A84C]/20 rounded-[20px] p-4 flex flex-col items-center gap-4 shadow-[0_2px_10px_rgba(201,168,76,0.05)] hover:shadow-[0_4px_16px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/40 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden cursor-pointer"
                      >
                         {/* Subtle decorative background pattern / watermark */}
                         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F2D4CF]/20 to-transparent pointer-events-none" />
                         
                         {/* Main Row Content */}
                         <div className="flex flex-col sm:flex-row items-center w-full gap-4 relative z-10">
                             {/* Avatar and Info Row */}
                             <div className="flex items-center gap-4 w-full">
                            {/* Avatar */}
                            <div className="relative w-14 h-14 shrink-0">
                                <div className="absolute inset-0 bg-[#C9A84C] rounded-full rotate-3 group-hover:rotate-12 transition-transform duration-500 opacity-20 scale-105" />
                                <img src={row.image} className="w-full h-full object-cover rounded-full border-2 border-white relative z-10 shadow-sm" alt={row.name} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col mb-1.5">
                                    <h4 className="text-base font-serif italic text-navy truncate group-hover:text-[#C9A84C] transition-colors">{row.name}</h4>
                                    <span className="text-[10px] text-taupe uppercase tracking-widest font-bold">Party of {row.party}</span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-xs font-bold text-navy/70">
                                    {row.dietary !== '—' && row.dietary !== 'None' ? (
                                        <div className="flex items-center gap-1 shrink-0">
                                            <Utensils size={12} className="text-[#C44343]" />
                                            <span className="truncate max-w-[80px]">{row.dietary}</span>
                                        </div>
                                    ) : null}
                                    <div className="flex items-center gap-1 text-taupe text-[9px] uppercase tracking-wider shrink-0">
                                        <Clock size={10} />
                                        {row.time}
                                    </div>
                                </div>
                            </div>
                         </div>

                         {/* Status Stamp - Moved to side or bottom based on flex */}
                         <div className="shrink-0 flex items-center justify-end w-full sm:w-auto mt-2 sm:mt-0 relative z-10 border-t border-[#F2D4CF]/20 sm:border-0 pt-3 sm:pt-0">
                             {row.status === 'Confirmed' ? (
                                 <div className="bg-gradient-to-r from-[#E2EBE7] to-[#E2EBE7]/50 text-[#2B8B5B] px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-[#2B8B5B]/20 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                                     <Check size={12} strokeWidth={3} /> Joyfully Accept
                                 </div>
                             ) : row.status === 'Declined' ? (
                                 <div className="bg-gradient-to-r from-[#FBEAE8] to-[#FBEAE8]/50 text-[#C44343] px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-[#C44343]/20 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                                     <X size={12} strokeWidth={3} /> Regretfully Decline
                                 </div>
                             ) : (
                                 <div className="bg-gradient-to-r from-[#F3F4F6] to-[#F3F4F6]/50 text-taupe px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-taupe/20 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                                     <Mail size={12} strokeWidth={2.5} /> Awaiting Reply
                                 </div>
                             )}
                         </div>
                         </div>

                         {/* Expanded Details */}
                         <AnimatePresence>
                           {selectedRsvpGuest?.name === row.name && (
                             <motion.div
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               transition={{ duration: 0.3, ease: 'easeInOut' }}
                               className="w-full overflow-hidden"
                             >
                               <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E2D8C8]/80 to-transparent my-4"></div>
                               <div className="flex flex-col sm:flex-row gap-6 p-2 relative z-10">
                                  {/* Contact Info */}
                                  <div className="flex-1 flex flex-col gap-3">
                                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Contact Details</h4>
                                      <div className="space-y-3">
                                          <div className="flex items-center gap-3 text-xs text-navy font-medium">
                                              <div className="w-7 h-7 rounded-full bg-[#F4F0E8] flex items-center justify-center text-taupe shrink-0"><Mail size={12}/></div>
                                              <span className="truncate">{row.email}</span>
                                          </div>
                                          <div className="flex items-center gap-3 text-xs text-navy font-medium">
                                              <div className="w-7 h-7 rounded-full bg-[#F4F0E8] flex items-center justify-center text-taupe shrink-0"><MapPin size={12}/></div>
                                              <span className="truncate">{row.address}</span>
                                          </div>
                                      </div>
                                  </div>
                                  
                                  {/* Preferences */}
                                  <div className="flex-1 flex flex-col gap-3">
                                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Preferences & Events</h4>
                                      <div className="space-y-3">
                                          <div>
                                              <div className="text-[9px] font-bold uppercase tracking-widest text-taupe mb-1">Dietary</div>
                                              <div className="font-bold text-navy text-xs flex items-center gap-2">
                                                  <Utensils size={12} className={row.dietary !== 'None' && row.dietary !== '—' ? 'text-[#C44343]' : 'text-taupe'} />
                                                  {row.dietary}
                                              </div>
                                          </div>
                                          {row.events?.length > 0 && (
                                              <div>
                                                  <div className="text-[9px] font-bold uppercase tracking-widest text-taupe mb-1.5">Events</div>
                                                  <div className="flex flex-wrap gap-1.5">
                                                      {row.events.map((evt: string, i: number) => (
                                                          <span key={i} className="px-2 py-1 bg-white border border-[#E2D8C8] rounded-md shadow-sm text-[9px] font-bold uppercase tracking-wider text-navy">
                                                              {evt}
                                                          </span>
                                                      ))}
                                                  </div>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                               </div>
                             </motion.div>
                           )}
                         </AnimatePresence>
                      </motion.div>
                   ))}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>

        {/* Right Sidebar */}
        <div className="w-[320px] flex flex-col gap-4 flex-shrink-0 border-l border-[#C9A84C]/20 pl-8 pb-[200px] relative z-10">
           
           {/* RSVP TIMELINE */}
           <div className="flex flex-col gap-3 relative">
              <h3 className="text-xs font-bold uppercase text-[#C9A84C] tracking-widest mb-4 flex items-center gap-2">
                 <Clock size={14}/> RSVP TIMELINE
              </h3>
              
              <div className="space-y-6 relative">
                 <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#C9A84C]/30" />
                 
                 {[
                     { time: "Aug 12, 2025", event: "Save the Dates Sent" },
                     { time: "Sep 1, 2026", event: "Send Formal Invites" },
                     { time: "Sep 24, 2026", event: "RSVP Deadline" },
                     { time: "Oct 10, 2026", event: "Final Headcount" }
                 ].map((t, i) => (
                     <div key={i} className="flex gap-6 relative">
                         <div className="w-4 h-4 rounded-full bg-[#C9A84C] border-[3px] border-white shadow-sm shrink-0 z-10" />
                         <div className="-mt-1">
                             <div className="text-sm font-bold text-navy">{t.time}</div>
                             <div className="text-sm text-taupe">{t.event}</div>
                         </div>
                     </div>
                 ))}
              </div>
           </div>
        </div>

    </div>
  );
};

const UnassignedGuestList = ({ unassignedGuests, onDropGuest }: { unassignedGuests: any[], onDropGuest: (guestId: string, tableId: number | null) => void }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'GUEST',
    drop: (item: { id: string }) => onDropGuest(item.id, null),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={dropRef as any} className={`p-3 flex-1 overflow-y-auto transition-colors ${isOver ? 'bg-[#F2D4CF]/10' : 'bg-white'}`}>
      {unassignedGuests.map(g => (
        <DraggableGuest key={g.id} guest={g} />
      ))}
      {unassignedGuests.length === 0 && (
        <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
           <div className="w-12 h-12 bg-[#F4F0E8] rounded-full flex items-center justify-center text-[#C9A84C] mb-2">
              <Check size={20} />
           </div>
           <p className="text-navy font-bold">All Guests Seated</p>
           <p className="text-taupe text-xs">Great job arranging everyone!</p>
        </div>
      )}
    </div>
  );
};

const GuestsState = ({ onBack, onOpenChat, onNavigate, initialView = 'dashboard' }: { onBack: () => void, onOpenChat?: (intent?: string) => void, onNavigate?: (view: string) => void, initialView?: 'dashboard' | 'seating' }) => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'seating'>(initialView);
  const [guests, setGuests] = useState(GUEST_DATA);
  const [filter, setFilter] = useState('');
  const [tables, setTables] = useState([5, 6, 1, 2, 3, 4]);

  const handleDropGuest = (guestId: string, tableId: number | null) => {
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, table: tableId } : g));
  };

  const handleAddTable = () => {
    setTables(prev => [...prev, prev.length > 0 ? Math.max(...prev) + 1 : 1]);
  };

  const unassignedGuests = guests.filter(g => g.table === null && g.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="px-12 pt-6 pb-4 h-full w-full bg-background overflow-y-auto relative z-0 flex flex-col">
      {/* Soft background accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#F2D4CF]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#C9DCE8]/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="flex flex-col gap-4 flex-shrink-0 relative z-10">
        <div className="flex justify-between items-end mb-2 pb-4 border-b border-[#C9A84C]/20">
          <div>
            <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
              <ChevronLeft size={14} strokeWidth={2.5} /> BACK
            </button>
            <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
              <Users className="text-[#C9A84C]" size={40} strokeWidth={1.5} /> Guest Management
            </h2>
            <p className="text-base text-taupe font-medium">Manage Invitations, RSVPs, and guest details.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => onNavigate && onNavigate('gifts')} className="flex items-center gap-2 bg-[#F2D4CF]/20 border-[#F2D4CF]/50 hover:bg-[#F2D4CF]/40 text-navy"><Gift size={16} /> Gift Registry</Button>
            <Button variant="outline" className="flex items-center gap-2 bg-[#C9DCE8]/20 border-[#C9DCE8]/50 hover:bg-[#C9DCE8]/40 text-navy"><ArrowRightLeft size={16} /> Import / Export</Button>
            <Button variant="gold" className="bg-navy text-white hover:bg-navy/90 border-navy shadow-md"><Plus size={16} /> Add Guest</Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="flex justify-between items-center py-2 w-full max-w-[600px] mb-2">
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-navy font-bold leading-none mb-1">150</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Total Invited</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-[#2B8B5B] font-bold leading-none mb-1">82</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Confirmed</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-[#C44343] font-bold leading-none mb-1">12</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Declined</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-[#9CA3AF] font-bold leading-none mb-1">56</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Pending</span>
           </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex gap-4 mb-4 relative z-10">
           <button 
             onClick={() => setViewMode('dashboard')}
             className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${viewMode === 'dashboard' ? 'bg-navy text-white shadow-md' : 'bg-white/50 text-taupe hover:bg-white hover:text-navy'}`}
           >
             Overview
           </button>
           <button 
             onClick={() => setViewMode('seating')}
             className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${viewMode === 'seating' ? 'bg-navy text-white shadow-md' : 'bg-white/50 text-taupe hover:bg-white hover:text-navy'}`}
           >
             Seating Chart
           </button>
        </div>
      </div>

      {viewMode === 'dashboard' ? (
         <GuestManagementDashboard onSwitchView={() => setViewMode('seating')} onOpenChat={onOpenChat} onNavigate={onNavigate} />
      ) : (
         <>
         {/* Removed DndProvider here as it will be moved to root to fix IframeMessageAbortError */}
            <div className="grid grid-cols-12 gap-8 flex-1 pb-[260px]">
              <Card className="col-span-8 bg-[#FDFBF7] shadow-inner border border-[#E2D8C8] rounded-2xl relative flex flex-col min-h-[1200px]">
                 {/* Floor texture/pattern overlay */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                 
                 <div className="flex justify-between items-center p-6 border-b border-[#E2D8C8]/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                       <div className="flex items-center gap-1.5 text-xs font-bold text-navy uppercase tracking-widest bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#E2D8C8]">
                          <span className="w-2 h-2 rounded-full bg-white border border-[#E2D8C8]"></span> Standard
                       </div>
                       <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A84C] uppercase tracking-widest bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#C9A84C]">
                          <span className="w-2 h-2 rounded-full bg-white border border-[#C9A84C]"></span> Dietary Reqs
                       </div>
                    </div>
                    <Button variant="outline" onClick={handleAddTable} className="bg-white text-xs h-8"><Plus size={14} className="mr-1"/> Add Table</Button>
                 </div>

                 <div className="p-12 flex flex-col items-center gap-16 relative z-10">
                   {/* Stage / Band Area */}
                   <div className="w-[400px] h-[100px] bg-gradient-to-b from-[#1a2530] to-navy rounded-lg shadow-xl border-4 border-navy flex flex-col items-center justify-center relative overflow-hidden group">
                     {/* Stage Lighting effect */}
                     <div className="absolute top-0 left-1/4 w-12 h-32 bg-white/10 blur-xl rotate-12 transform origin-top"></div>
                     <div className="absolute top-0 right-1/4 w-12 h-32 bg-white/10 blur-xl -rotate-12 transform origin-top"></div>
                     
                     <div className="flex items-center gap-4 text-[#C9A84C]">
                        <Music size={28} />
                        <h3 className="font-serif text-2xl font-bold tracking-widest text-white uppercase">Stage & Band</h3>
                        <Speaker size={28} />
                     </div>
                     <div className="absolute bottom-2 w-full flex justify-center gap-12 text-white/30">
                        <div className="w-4 h-4 rounded-full bg-black/50 border border-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-black/50 border border-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-black/50 border border-white/20"></div>
                     </div>
                   </div>

                   {/* Dance Floor */}
                   <div className="w-[500px] h-[300px] border-4 border-dashed border-[#C9A84C]/40 rounded-3xl bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center relative shadow-inner">
                      {/* Dance floor pattern */}
                      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }}></div>
                      
                      <Sparkles size={40} className="text-[#C9A84C]/50 mb-2" />
                      <h3 className="font-serif text-3xl font-bold text-navy/40 uppercase tracking-[0.2em]">Dance Floor</h3>
                   </div>

                   <div className="flex justify-between w-full max-w-[800px] items-center px-12">
                     {/* Cake Table */}
                     <div className="w-[120px] h-[120px] border-4 border-[#E2D8C8] rounded-full bg-white/80 backdrop-blur-sm shadow-md flex flex-col items-center justify-center relative">
                        <Cake size={24} className="text-[#C9A84C] mb-1" />
                        <span className="text-[10px] font-bold text-taupe uppercase tracking-widest">Cake</span>
                     </div>

                     {/* Placeholder to balance the layout */}
                     <div className="w-[120px]"></div>

                     {/* Sweetheart Table */}
                     <div className="w-[240px] h-[100px] border-4 border-[#C9A84C] rounded-[50px] bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgb(201,168,76,0.15)] flex flex-col items-center justify-center relative">
                        <h4 className="font-serif text-lg font-bold text-navy uppercase tracking-widest">Bride & Groom</h4>
                        <div className="flex gap-2 mt-2">
                           <div className="w-6 h-6 rounded-full bg-white border border-[#C9A84C] flex items-center justify-center shadow-sm">
                             <Heart size={10} className="text-[#C44343]" />
                           </div>
                           <div className="w-6 h-6 rounded-full bg-white border border-[#C9A84C] flex items-center justify-center shadow-sm">
                             <Heart size={10} className="text-[#C44343]" />
                           </div>
                        </div>
                     </div>
                   </div>

                   {/* Tables Grid */}
                   <div className="grid grid-cols-2 gap-x-24 gap-y-28 pt-8 place-items-center w-full max-w-[800px]">
                     {tables.map(t => (
                       <SeatingTable 
                          key={t} 
                          tableId={t} 
                          guests={guests.filter(g => g.table === t)} 
                          onDropGuest={handleDropGuest} 
                       />
                     ))}
                   </div>
                 </div>
              </Card>

              <div className="col-span-4 relative">
                <div className="sticky top-4 h-[calc(100vh-320px)] min-h-[500px]">
                  <Card className="flex flex-col bg-white overflow-hidden shadow-[0_8px_30px_rgb(201,168,76,0.08)] border border-[#C9A84C]/20 rounded-2xl h-full">
                    <div className="p-4 border-b border-[#E2D8C8] bg-white relative overflow-hidden flex-shrink-0">
                      <h3 className="font-serif text-xl text-black mb-3 relative z-10 flex items-center justify-between">
                        <span>Guest List</span>
                        <Badge variant="neutral" className="bg-[#FDFBF7] text-taupe">{unassignedGuests.length} Unseated</Badge>
                      </h3>
                      <div className="relative z-10">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
                        <input 
                          type="text" 
                          placeholder="Search guests..." 
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 border border-[#E2D8C8] rounded-md text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] bg-white shadow-sm transition-shadow"
                        />
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-white">
                      <UnassignedGuestList unassignedGuests={unassignedGuests} onDropGuest={handleDropGuest} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
         </>
      )}
      {/* End seating view container */}

      {/* VowAI Concierge - Guest Assistant (Pinned to footer) */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 0.5 }}
         className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-[#C9DCE8]/40"
         style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
      >
          <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#C9DCE8]/50 text-[#5a86a3] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Sparkles size={18} />
              </div>
              <div className="px-3 py-1 bg-white border border-[#C9DCE8]/50 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#5a86a3]">
                  VowAi Concierge
              </div>
          </div>
          
          <div className="space-y-1 mb-5 relative z-10">
              <h4 className="text-2xl font-serif italic text-navy font-bold">Wording Assistant</h4>
              <p className="text-[14px] text-taupe leading-relaxed">
                  Need help with wording? I can draft formal or modern invitation text for you.
              </p>
          </div>
          
          <div className="flex flex-col gap-3 relative z-10">
              <button onClick={() => onOpenChat?.('draft-invitation')} className="w-full bg-white/90 backdrop-blur-sm border border-[#C9DCE8]/40 py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#5a86a3] transition-colors shadow-sm group flex justify-between items-center">
                  DRAFT WORDING
                  <ArrowRight size={14} className="text-[#5a86a3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
              
              <button onClick={(e) => { e.stopPropagation(); onOpenChat?.('thank-you-notes'); }} className="w-full bg-white/90 backdrop-blur-sm border border-[#C9DCE8]/40 py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#5a86a3] transition-colors shadow-sm group flex justify-between items-center">
                  THANK YOU NOTES
                  <ArrowRight size={14} className="text-[#5a86a3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
          </div>
      </motion.div>
    </div>
  );
};

// --- VENDOR MANAGEMENT BOARD ---
const INITIAL_VENDOR_DATA = [
  // Hired
  { id: 1, role: 'Photography', name: 'Photo & Team', status: 'Hired', paid: 2500, total: 5000, nextPayment: 'Oct 15', image: "https://images.unsplash.com/photo-1604502035661-f0d7c1652c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwd2VkZGluZyUyMHRhYmxlfGVufDF8fHx8MTc3Mjc3NjE2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, role: 'Florist', name: 'Bouquet & Boutonnieres', status: 'Hired', paid: 0, total: 3200, nextPayment: '-', image: "https://images.unsplash.com/photo-1710587384936-b6d796c0eb58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMGJvdXRvbm5pZXJlfGVufDF8fHx8MTc3Mjc3Njg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, role: 'Catering', name: 'Menu Tasting', status: 'Hired', paid: 5000, total: 15000, nextPayment: 'Nov 01', image: "https://images.unsplash.com/photo-1630300727308-fe49b6ae8a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbWVudSUyMHRhc3RpbmclMjBmb29kfGVufDF8fHx8MTc3Mjc3Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, role: 'Cake & Desserts', name: 'Cake Design', status: 'Hired', paid: 800, total: 1500, nextPayment: 'Dec 01', image: "https://images.unsplash.com/photo-1696238262163-46a0ae2bc2d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3NzY4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  
  // In Progress
  { id: 5, role: 'Décor & Florals', name: 'Ceremony Arch', status: 'In Progress', paid: 0, total: 1200, nextPayment: '-', image: "https://images.unsplash.com/photo-1641834916652-c7436fd6f99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBhcmNofGVufDF8fHx8MTc3MjY1Njc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 6, role: 'Bar & Mixology', name: 'Bar Package', status: 'In Progress', paid: 0, total: 2500, nextPayment: '-', image: "https://images.unsplash.com/photo-1618106547744-68915223cdbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYmFyJTIwcGFja2FnZSUyMGNvY2t0YWlsc3xlbnwxfHx8fDE3NzI3NzY4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 7, role: 'Videography', name: 'Videography', status: 'In Progress', paid: 0, total: 3000, nextPayment: '-', image: "https://images.unsplash.com/photo-1735817558469-5a87e5994d35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2FtZXJhJTIwd2VkZGluZyUyMHRhYmxlfGVufDF8fHx8MTc3Mjc3NjE4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 8, role: 'Planning', name: 'Short List & Mood Board', status: 'In Progress', paid: 0, total: 0, nextPayment: '-', image: "https://images.unsplash.com/photo-1596352536485-85b79a7ea8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbW9vZCUyMGJvYXJkfGVufDF8fHx8MTc3Mjc3Njg1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },

  // Interviewing & Reviewing Contract
  { id: 9, role: 'Florist', name: 'Petals & Co.', status: 'Reviewing Contract', paid: 0, total: 3200, nextPayment: '-', image: "https://images.unsplash.com/photo-1560678628-e680e6722496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmlzdCUyMGJvdXF1ZXR8ZW58MXx8fHwxNzcyNzcwODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 10, role: 'Music / DJ', name: 'SoundWave', status: 'Interviewing', paid: 0, total: 1800, nextPayment: '-', image: "https://images.unsplash.com/photo-1618107095181-e3ba0f53ee59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGolMjBtdXNpY3xlbnwxfHx8fDE3NzI3NzA4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 11, role: 'Bar & Mixology', name: 'Crafted Cocktails', status: 'Interviewing', paid: 0, total: 2500, nextPayment: '-', image: "https://images.unsplash.com/photo-1622069426157-2a3011f27920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYmFyJTIwY29ja3RhaWx8ZW58MXx8fHwxNzcyNzc1ODE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
];

const DraggableVendorCard = ({ vendor }: { vendor: any }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'VENDOR',
    item: { id: vendor.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragRef} className={`opacity-${isDragging ? '50' : '100'} cursor-grab active:cursor-grabbing`}>
      <Card className="p-0 border border-[#E2D8C8] hover:shadow-md hover:border-[#C9A84C] transition-all bg-white flex flex-col group overflow-hidden">
        {vendor.image && (
          <div className="h-24 w-full relative overflow-hidden">
            <ImageWithFallback src={vendor.image} alt={vendor.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-3">
               <span className="text-[9px] font-bold text-white uppercase tracking-wider block">{vendor.role}</span>
            </div>
          </div>
        )}
        <div className={`p-4 flex flex-col gap-3 ${!vendor.image ? 'pt-5' : ''}`}>
          <div className="flex justify-between items-start">
            <div>
              {!vendor.image && <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider mb-1 block bg-[#C9A84C]/10 w-fit px-2 py-0.5 rounded-sm">{vendor.role}</span>}
              <h4 className="font-serif text-lg text-navy leading-tight mt-1">{vendor.name}</h4>
            </div>
            <button className="text-taupe hover:text-navy opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={16} />
            </button>
          </div>
          
          {vendor.status === 'Hired' && (
            <div className="mt-1 bg-[#F4F0E8]/50 p-3 rounded-md border border-[#E2D8C8]/50">
              <div className="flex justify-between text-[10px] text-navy mb-2 font-bold uppercase tracking-wider">
                <span>Booking Confirmed</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-taupe font-bold uppercase tracking-widest border-t border-[#E2D8C8] pt-2">
                <Calendar size={12} className="text-[#C9A84C]" /> Next Meeting: {vendor.nextPayment || "TBD"}
              </div>
            </div>
          )}

          {vendor.status !== 'Hired' && (
            <div className="flex items-center gap-2 text-[10px] text-taupe mt-1 font-bold uppercase tracking-widest bg-[#F4F0E8]/50 p-2 rounded-md border border-[#E2D8C8]/50">
              <CheckSquare size={12} className="text-[#C9A84C]" />
              <span>Next step pending</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

const DroppableVendorColumn = ({ status, vendors, onDropVendor }: { status: string, vendors: any[], onDropVendor: (id: number, status: string) => void }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'VENDOR',
    drop: (item: { id: number }) => onDropVendor(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={dropRef} className={`flex flex-col gap-4 bg-[#F4F0E8]/50 p-4 rounded-xl border border-[#E2D8C8] transition-colors ${isOver ? 'bg-[#E8F0F4] border-navy/20' : ''} min-w-[280px] h-fit`}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-navy text-sm uppercase tracking-widest">{status}</span>
        <Badge variant={status === 'Hired' ? 'success' : 'default'} className="bg-white">
          {vendors.length}
        </Badge>
      </div>
      
      <div className="flex flex-col gap-4">
        {vendors.map(vendor => (
          <DraggableVendorCard key={vendor.id} vendor={vendor} />
        ))}
        {vendors.length === 0 && (
          <div className="text-center py-8 text-taupe text-sm border-2 border-dashed border-[#E2D8C8] rounded-xl">
            Drop vendor here
          </div>
        )}
      </div>
    </div>
  );
};

const VENDOR_CHECKLIST = [
  {
    category: "Décor & Florals",
    image: "https://images.unsplash.com/photo-1738025276367-31c6ad519c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjBmbG9yYWxzfGVufDF8fHx8MTc3Mjc3MTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Ceremony Arch", status: "IN PROGRESS", link: "ceremony_arch_ideas" },
      { name: "Bouquets and Boutonniers", status: "HIRED" },
      { name: "Table Centerpieces", status: "NOT BOOKED" },
      { name: "Installation Art", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Catering & Bar Menu",
    image: "https://images.unsplash.com/photo-1767050190883-29d644fa5b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBtZW51fGVufDF8fHx8MTc3Mjc3MTU3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Menu Tasting", status: "HIRED" },
      { name: "Bar Package", status: "IN PROGRESS" },
      { name: "Service Staff", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Photography & Videography",
    image: "https://images.unsplash.com/photo-1769812343322-f4a6e73c8aa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBvbiUyMHdlZGRpbmclMjByZWNlcHRpb24lMjB0YWJsZXxlbnwxfHx8fDE3NzI3NzYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Photographer and team", status: "HIRED" },
      { name: "Videography", status: "IN PROGRESS" },
      { name: "Short list and Mood Board", status: "IN PROGRESS" },
      { name: "Wedding Prep", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Cake & Desserts",
    image: "https://images.unsplash.com/photo-1613067532415-90df85362423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGRlc3NlcnRzfGVufDF8fHx8MTc3Mjc3MTU3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Cake Design", status: "HIRED" },
      { name: "Tasting", status: "HIRED" },
      { name: "Dessert Table", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Music Band & DJ",
    image: "https://images.unsplash.com/photo-1764592019571-ea7da62b5b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGolMjBsaXZlJTIwYmFuZCUyMG11c2ljfGVufDF8fHx8MTc3Mjc3MTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Ceremony Music", status: "NOT BOOKED" },
      { name: "Cocktail Hour Playlist", status: "NOT BOOKED" },
      { name: "Reception Band/DJ", status: "IN PROGRESS" },
      { name: "Do not Play List", status: "NOT BOOKED" }
    ]
  },
  {
    category: "Lighting and Production",
    image: "https://images.unsplash.com/photo-1748260526938-4fa5472eb796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbGlnaHRpbmclMjByZWNlcHRpb258ZW58MXx8fHwxNzcyNzcxNTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: [
      { name: "Uplighting", status: "NOT BOOKED" },
      { name: "Dance Floor Lighting", status: "NOT BOOKED" },
      { name: "Sound System", status: "NOT BOOKED" }
    ]
  }
];

const VENDOR_TIMELINE = [
  { time: "11:00 AM", title: "Florist Setup Begins" },
  { time: "01:00 PM", title: "Catering Arrival" },
  { time: "02:00 PM", title: "Photographer On-Site" },
  { time: "03:30 PM", title: "Band Soundcheck" },
  { time: "09:00 PM", title: "Late Night Snack" }
];

const CEREMONY_ARCH_CATEGORIES = [
  {
    id: 'classic',
    title: 'Classic Floral Arch',
    description: 'Timeless structural backdrops organically wrapped in fresh greenery and blooms.',
    ideas: [
      { id: 'c1', title: 'White Peony Arch', image: 'https://images.unsplash.com/photo-1765854638026-8abcd72c75c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGZsb3JhbCUyMHdlZGRpbmclMjBhcmNofGVufDF8fHx8MTc3Mjc3Mzg1NXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Romantic' },
      { id: 'c2', title: 'Garden Rose Bower', image: 'https://images.unsplash.com/photo-1530211880599-888c156159e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB3ZWRkaW5nJTIwYXJjaHxlbnwxfHx8fDE3NzI3NzM4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Natural' },
      { id: 'c3', title: 'Elegant Cathedral Arch', image: 'https://images.unsplash.com/photo-1767986012547-3fc29b18339f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGFyY2h8ZW58MXx8fHwxNzcyNzczODU1fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Timeless' },
      { id: 'c4', title: 'Lush Greenery Canopy', image: 'https://images.unsplash.com/photo-1769812344191-91994886e4a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmVyeSUyMHdlZGRpbmclMjBhcmNofGVufDF8fHx8MTc3Mjc3Mzg1NXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Organic' },
      { id: 'c5', title: 'Beachside Driftwood', image: 'https://images.unsplash.com/photo-1700304096367-dae5ae5e5401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBhcmNofGVufDF8fHx8MTc3Mjc3Mzg1NXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Coastal' },
      { id: 'c6', title: 'Romantic Blossom Arch', image: 'https://images.unsplash.com/photo-1765854638617-222822b7ed0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBhcmNofGVufDF8fHx8MTc3Mjc3Mzg1NXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Soft' }
    ]
  },
  {
    id: 'mandap',
    title: 'Traditional Mandap',
    description: 'Elegant Hindu mandaps featuring ornate structural pillars, draped fabrics, and vibrant florals.',
    ideas: [
      { id: 'm1', title: 'Red & Gold Royal Mandap', image: 'https://images.unsplash.com/photo-1710498689566-868b93f934c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHdlZGRpbmclMjBtYW5kYXAlMjBmbG9yYWx8ZW58MXx8fHwxNzcyNzczODU2fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Regal' },
      { id: 'm2', title: 'Pastel Floral Mandap', image: 'https://images.unsplash.com/photo-1726068449701-4e11c5d64b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwbWFuZGFwfGVufDF8fHx8MTc3Mjc3MzIwMXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Elegant' },
      { id: 'm3', title: 'Traditional Open-Air Mandap', image: 'https://images.unsplash.com/photo-1698879977208-c70a8741430c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1hbmRhcCUyMGRlY29yfGVufDF8fHx8MTc3Mjc3Mzg1Nnww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Cultural' },
      { id: 'm4', title: 'Modern Lotus Mandap', image: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwbWFuZGFwJTIwbW9kZXJufGVufDF8fHx8MTc3Mjc3NDYxNHww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Modern' },
      { id: 'm5', title: 'Beachside Mandap', image: 'https://images.unsplash.com/photo-1543359905-c5d15c3a23dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBtYW5kYXB8ZW58MXx8fHwxNzcyNzc0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Tropical' },
      { id: 'm6', title: 'Garden Oasis Mandap', image: 'https://images.unsplash.com/photo-1692493775702-25b58ad72b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBvdXRkb29yJTIwbWFuZGFwfGVufDF8fHx8MTc3Mjc3NDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Natural' }
    ]
  },
  {
    id: 'nikah',
    title: 'Nikah Floral Stage',
    description: 'Sophisticated stage setups with soft drapery, plush seating, and abundant floral accents.',
    ideas: [
      { id: 'n1', title: 'Ivory & Champagne Stage', image: 'https://images.unsplash.com/photo-1707097702231-f0b98d7c2703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHN0YWdlfGVufDF8fHx8MTc3Mjc3Mzg1OHww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Sophisticated' },
      { id: 'n2', title: 'Rose Garden Backdrop', image: 'https://images.unsplash.com/photo-1762709118823-7fe9c9afa8ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmFsJTIwc3RhZ2V8ZW58MXx8fHwxNzcyNzczODU3fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Romantic' },
      { id: 'n3', title: 'Luxury Draped Stage', image: 'https://images.unsplash.com/photo-1710587384936-b6d796c0eb58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJhcGVyeSUyMG5pa2FofGVufDF8fHx8MTc3Mjc3NDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Luxurious' },
      { id: 'n4', title: 'Modern Minimalist Nikah', image: 'https://images.unsplash.com/photo-1647695878806-f629ac174a0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbmlrYWglMjBkZWNvcnxlbnwxfHx8fDE3NzI3NzQ2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Modern' },
      { id: 'n5', title: 'Royal Floral Stage', image: 'https://images.unsplash.com/photo-1759718061732-be9e1a104b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3lhbCUyMGx1eHVyeSUyMG5pa2FoJTIwc3RhZ2V8ZW58MXx8fHwxNzcyNzc0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Grand' },
      { id: 'n6', title: 'Soft Pastel Stage', image: 'https://images.unsplash.com/photo-1747115275646-49725fb5a003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjB3ZWRkaW5nJTIwc3RhZ2V8ZW58MXx8fHwxNzcyNzc0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Soft' }
    ]
  },
  {
    id: 'east_asian',
    title: 'East Asian Ceremonies',
    description: 'Decor ideas blending modern aesthetics with traditional Chinese, Korean, and Japanese elements.',
    ideas: [
      { id: 'ea1', title: 'Classic Double Happiness', image: 'https://images.unsplash.com/photo-1521202344400-232862605599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3ZWRkaW5nJTIwZGVjb3J8ZW58MXx8fHwxNzcyNzczODU5fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Traditional' },
      { id: 'ea2', title: 'Modern Tea Ceremony', image: 'https://images.unsplash.com/photo-1770717584500-c7535abed015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBjZXJlbW9ueSUyMGRlY29yfGVufDF8fHx8MTc3Mjc3Mzg1OXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Contemporary' },
      { id: 'ea3', title: 'Red & Gold Floral Arch', image: 'https://images.unsplash.com/photo-1614387353593-98a17f87bcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwd2VkZGluZyUyMGRlY29yfGVufDF8fHx8MTc3Mjc3Mzg1OXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Vibrant' },
      { id: 'ea4', title: 'Korean Paebaek Backdrop', image: 'https://images.unsplash.com/photo-1700580446340-1bd00129863d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB3ZWRkaW5nJTIwZGVjb3J8ZW58MXx8fHwxNzcyNzczODYwfDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Cultural' },
      { id: 'ea5', title: 'Japanese Zen Garden Altar', image: 'https://images.unsplash.com/photo-1772093977510-a816ae50d491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHdlZGRpbmclMjBkZWNvcnxlbnwxfHx8fDE3NzI3NzM4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Minimalist' },
      { id: 'ea6', title: 'Cherry Blossom Arch', image: 'https://images.unsplash.com/photo-1765862880759-68d99d491fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjBibG9zc29tJTIwd2VkZGluZyUyMGFyY2h8ZW58MXx8fHwxNzcyNzc0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Romantic' }
    ]
  },
  {
    id: 'chuppah',
    title: 'Jewish Chuppah',
    description: 'Beautifully draped canopies symbolizing the home the couple will build together.',
    ideas: [
      { id: 'j1', title: 'Lush Floral Chuppah', image: 'https://images.unsplash.com/photo-1549155026-1c77380c1cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBjaHVwcGFofGVufDF8fHx8MTc3Mjc3Mzg2MXww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Opulent' },
      { id: 'j2', title: 'Garden Birch Chuppah', image: 'https://images.unsplash.com/photo-1652010570939-6f8b53410331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBjaHVwcGFofGVufDF8fHx8MTc3Mjc3Mzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Rustic' },
      { id: 'j3', title: 'Traditional Tallit Canopy', image: 'https://images.unsplash.com/photo-1699800709647-649643a39de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNodXBwYWh8ZW58MXx8fHwxNzcyNzczODYyfDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Traditional' },
      { id: 'j4', title: 'Beachside Bamboo Chuppah', image: 'https://images.unsplash.com/photo-1672567004357-7dd4f4ed8663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNodXBwYWh8ZW58MXx8fHwxNzcyNzczODYyfDA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Coastal' },
      { id: 'j5', title: 'Modern Lucite Chuppah', image: 'https://images.unsplash.com/photo-1745541200157-c9dcb4e15871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdWNpdGUlMjB3ZWRkaW5nJTIwY2h1cHBhaHxlbnwxfHx8fDE3NzI3NzQ2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Modern' },
      { id: 'j6', title: 'Romantic Rose Chuppah', image: 'https://images.unsplash.com/photo-1715934095723-deb12411b6df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwZmxvcmFsJTIwY2h1cHBhaHxlbnwxfHx8fDE3NzI3NzQ2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Romantic' }
    ]
  },
  {
    id: 'sofreh_aghd',
    title: 'Persian Sofreh Aghd',
    description: 'Intricate ceremonial spreads featuring symbolic elements and luxurious floral arrangements.',
    ideas: [
      { id: 'p1', title: 'Luxury Sofreh Spread', image: 'https://images.unsplash.com/photo-1739047597300-437d7bef0fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJzaWFuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NzI3NzM4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Luxurious' },
      { id: 'p2', title: 'Traditional Mirror & Candles', image: 'https://images.unsplash.com/photo-1621252610314-6d1208e90ec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2ZyZWglMjBhZ2hkJTIwbWlycm9yfGVufDF8fHx8MTc3Mjc3Mzg2M3ww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Traditional' },
      { id: 'p3', title: 'Modern Minimalist Sofreh', image: 'https://images.unsplash.com/photo-1696736034255-6227f4525cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2ZyZWglMjBkZWNvcnxlbnwxfHx8fDE3NzI3NzM4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Modern' },
      { id: 'p4', title: 'Floral Sofreh Aghd', image: 'https://images.unsplash.com/photo-1749731894795-4eae105fa60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3Mjc3Mzg2NHww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Romantic' },
      { id: 'p5', title: 'Elegant Palace Sofreh', image: 'https://images.unsplash.com/photo-1739047598160-b7004af1595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwd2VkZGluZyUyMGRlY29yfGVufDF8fHx8MTc3Mjc3Mzg2M3ww&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Regal' },
      { id: 'p6', title: 'Outdoor Garden Sofreh', image: 'https://images.unsplash.com/photo-1649447775080-da9b8e8fbdee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwc29mcmVoJTIwYWdoZHxlbnwxfHx8fDE3NzI3NzQ2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080', vibe: 'Natural' }
    ]
  }
];

const CeremonyArchIdeasState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: (intent?: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState(CEREMONY_ARCH_CATEGORIES[0].id);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`category-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-8 bg-background overflow-y-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] transition-colors tracking-widest">
            <ChevronLeft size={14} strokeWidth={2.5} /> BACK
          </button>
          <div className="flex flex-col ml-4">
             <h2 className="font-serif text-4xl font-bold text-navy">Ceremony Decor Concepts</h2>
             <p className="text-sm text-taupe font-medium mt-1">Discover structural backdrops and cultural setups for your vows</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => onOpenChat('floral_designer')} className="flex items-center gap-2 bg-[#E8F0F4]/20 border-[#E8F0F4]/50 hover:bg-[#E8F0F4]/40 text-navy">
             <MessageSquareText size={16} /> Consult Decorator
          </Button>
          <Button variant="gold" className="bg-navy text-white hover:bg-navy/90 border-navy shadow-md">
             <Heart size={16} /> Save to Mood Board
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
        {/* Sidebar Options */}
        <div className="w-full md:w-64 flex flex-col gap-2 overflow-y-auto pr-2 pb-8 flex-shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <h3 className="font-serif text-xl text-navy font-bold italic mb-2">Cultural Styles</h3>
          {CEREMONY_ARCH_CATEGORIES.map(cat => (
            <div 
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm flex items-center gap-3 ${
                activeCategory === cat.id 
                  ? 'bg-navy text-white shadow-md' 
                  : 'bg-white border border-[#E2D8C8] text-navy hover:bg-[#F4F0E8] hover:shadow-sm'
              }`}
            >
              {activeCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />}
              {cat.title}
            </div>
          ))}
        </div>

        {/* Main Display Area (Scrollable Sections) */}
        <div 
          className="flex-1 overflow-y-auto pr-4 pb-12 flex flex-col gap-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E2D8C8] [&::-webkit-scrollbar-thumb]:rounded-full"
          onScroll={(e) => {
            // Optional: Update active category based on scroll position
            const target = e.target as HTMLDivElement;
            const scrollPos = target.scrollTop;
            let currentId = CEREMONY_ARCH_CATEGORIES[0].id;
            for (const cat of CEREMONY_ARCH_CATEGORIES) {
              const el = document.getElementById(`category-${cat.id}`);
              if (el && el.offsetTop <= scrollPos + 200) {
                currentId = cat.id;
              }
            }
            if (activeCategory !== currentId) setActiveCategory(currentId);
          }}
        >
          {CEREMONY_ARCH_CATEGORIES.map(cat => (
            <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-8 flex flex-col gap-6">
              <div className="border-b border-[#E2D8C8] pb-4">
                <h3 className="font-serif text-3xl font-bold text-navy mb-2">{cat.title}</h3>
                <p className="text-taupe leading-relaxed max-w-3xl">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cat.ideas.map(idea => (
                  <div key={idea.id} className="group flex flex-col gap-3">
                    <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative border border-[#E2D8C8] shadow-sm">
                      <ImageWithFallback src={idea.image} alt={idea.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Hover Actions */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                           <Share2 size={16} />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center text-[#C9A84C] hover:bg-[#F4F0E8] transition-colors">
                           <Heart size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-navy leading-tight">{idea.title}</h4>
                      <p className="text-[10px] text-taupe uppercase tracking-widest font-bold mt-1">{idea.vibe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorsState = ({ onBack, onNavigate, onOpenChat }: { onBack: () => void, onNavigate: (view: string) => void, onOpenChat: (intent?: string) => void }) => {
  const [vendors, setVendors] = useState(INITIAL_VENDOR_DATA);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (idx: number) => {
    setExpandedCategories(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleDropVendor = (id: number, newStatus: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const hiredCount = vendors.filter(v => v.status === 'Hired').length;
  const inProgressCount = vendors.filter(v => ['In Progress', 'Interviewing', 'Reviewing Contract'].includes(v.status)).length;

  return (
    <div className="mt-[1px] px-12 py-8 h-full flex flex-col w-full gap-8 bg-background overflow-hidden">
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
            <ChevronLeft size={14} strokeWidth={2.5} /> BACK
          </button>
          <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
            <Briefcase className="text-[#C9A84C]" size={40} strokeWidth={1.5} /> Vendor Team
          </h2>
          <p className="text-base text-taupe font-medium">Curate and coordinate your wedding professionals.</p>
        </div>
        <div className="flex gap-4 items-end pb-2">
          <Button variant="outline" className="flex items-center gap-2 bg-[#E8F0F4]/20 border-[#E8F0F4]/50 hover:bg-[#E8F0F4]/40 text-navy hover:-translate-y-1 transition-transform"><Printer size={16} /> Export Contacts</Button>
          <Button variant="gold" className="bg-navy text-white hover:bg-navy/90 border-navy shadow-md hover:-translate-y-1 transition-transform"><Plus size={16} /> Add Vendor</Button>
        </div>
      </div>

      <div className="flex gap-10 h-full overflow-hidden relative z-10">
        <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-4 pb-10">
      {/* Top Stats */}
      <div className="flex gap-12 py-2 flex-shrink-0 border-b border-[#E2D8C8]/50 pb-6">
         <div className="flex flex-col">
            <span className="text-[36px] font-serif text-navy font-bold leading-none mb-1">{vendors.length}</span>
            <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Total Vendors</span>
         </div>
         <div className="flex flex-col">
            <span className="text-[36px] font-serif text-[#2B8B5B] font-bold leading-none mb-1">{hiredCount}</span>
            <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Hired</span>
         </div>
         <div className="flex flex-col">
            <span className="text-[36px] font-serif text-navy font-bold leading-none mb-1">{inProgressCount}</span>
            <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">In Progress</span>
         </div>
      </div>

      {/* Vendor Vision & Categories (3x2 Grid) */}
      <div className="flex flex-col gap-4 flex-shrink-0">
        <h3 className="font-serif text-2xl text-navy font-bold italic">Vendor Vision</h3>
        <div className="grid grid-cols-3 gap-6 pb-4 w-full">
          {VENDOR_CHECKLIST.map((cat, idx) => {
            const isExpanded = expandedCategories.includes(idx);
            return (
              <div
                key={idx}
                className="relative aspect-square bg-white rounded-[24px] border border-[#E2D8C8] shadow-sm hover:shadow-[0_12px_30px_rgb(201,168,76,0.15)] overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => toggleCategory(idx)}
              >
                {/* Image Section (Base Layer) */}
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback src={cat.image} alt={cat.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-90"></div>
                  <div className={`absolute inset-0 bg-navy/60 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Category Title - Always visible but moves up when expanded */}
                <div className={`absolute left-6 right-6 flex justify-between items-end transition-all duration-500 z-30 ${isExpanded ? 'top-6' : 'bottom-6'}`}>
                   <h4 className={`font-serif text-2xl font-bold leading-tight ${isExpanded ? 'text-[#C9A84C] drop-shadow-md' : 'text-white'}`}>{cat.category}</h4>
                   <div className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'bg-[#C9A84C] text-white hover:bg-[#B8860B] shadow-md' : 'bg-white/20 border border-white/30 text-white'}`}>
                     {isExpanded ? <X size={16} /> : <Plus size={16} />}
                   </div>
                </div>

                {/* Expandable Content (Checklist Overlay sliding up) */}
                <div 
                  className={`absolute inset-x-0 bottom-0 bg-white transition-all duration-500 ease-in-out z-20 flex flex-col overflow-hidden ${isExpanded ? 'h-[calc(100%-80px)] opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}
                  onClick={(e) => { e.stopPropagation(); }}
                >
                   <div className="p-4 border-b border-[#E2D8C8]/50 flex items-center justify-between z-10 bg-white relative shrink-0">
                     <div>
                       <h5 className="font-serif text-lg text-navy font-bold">Booking Status</h5>
                     </div>
                   </div>
                   
                   {/* Scroll Up Indicator */}
                   <div className="absolute top-[64px] left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 flex justify-center pointer-events-none opacity-80 transition-opacity">
                      <ChevronUp size={14} className="text-taupe/60 mt-1" />
                   </div>

                   <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                     {cat.items.map((item, iIdx) => (
                       <div 
                         key={iIdx} 
                         onClick={(e) => {
                           if (item.link) {
                             e.stopPropagation();
                             onNavigate(item.link);
                           }
                         }}
                         className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer group/item ${item.link ? 'border border-[#C9A84C] bg-white shadow-sm hover:shadow-md' : 'border border-transparent hover:border-[#E2D8C8] hover:bg-[#F4F0E8]/50'}`}
                       >
                          <div className="flex items-center gap-4">
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.status === 'NOT BOOKED' ? 'bg-[#D1D1D1]' : item.status === 'IN PROGRESS' ? 'bg-[#C9A84C]' : 'bg-[#2B8B5B]'}`} />
                            <div className="flex flex-col min-w-0">
                              <span className={`text-sm font-bold truncate ${item.status === 'NOT BOOKED' ? 'text-navy/70 group-hover/item:text-navy' : 'text-navy'}`}>{item.name}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${item.status === 'NOT BOOKED' ? 'text-taupe' : item.status === 'IN PROGRESS' ? 'text-[#C9A84C]' : 'text-[#2B8B5B]'}`}>{item.status}</span>
                            </div>
                          </div>
                          {item.link ? (
                            <div className="w-7 h-7 rounded-full bg-white border border-[#C9A84C] flex items-center justify-center text-[#C9A84C] shadow-sm transition-transform group-hover/item:scale-110 shrink-0">
                              <ArrowRight size={14} strokeWidth={2.5} />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-white border border-[#E2D8C8] flex items-center justify-center text-taupe group-hover/item:text-[#C9A84C] group-hover/item:border-[#C9A84C] group-hover/item:shadow-sm transition-all -translate-x-2 group-hover/item:translate-x-0 opacity-0 group-hover/item:opacity-100 shrink-0">
                              <ArrowRight size={14} strokeWidth={2.5} />
                            </div>
                          )}
                       </div>
                     ))}
                   </div>
                   
                   {/* Scroll Down Indicator */}
                   <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex items-end justify-center pb-2 pointer-events-none transition-opacity">
                      <ChevronDown size={14} className="text-taupe/60" />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Pipeline (Kanban) */}
      <div className="flex flex-col gap-5 flex-shrink-0">
         <div className="flex justify-between items-end">
            <h3 className="font-serif text-2xl text-navy font-bold italic">Active Pipeline</h3>
         </div>
         
         <div className="flex gap-6 flex-1 overflow-x-auto pb-4">
           {['In Progress', 'Interviewing', 'Reviewing Contract', 'Hired'].map(columnStatus => (
             <DroppableVendorColumn 
               key={columnStatus} 
               status={columnStatus} 
               vendors={vendors.filter(v => v.status === columnStatus)} 
               onDropVendor={handleDropVendor} 
             />
           ))}
         </div>
      </div>
      
        </div>

        {/* Timeline Sidebar */}
        <div className="w-[320px] pl-8 flex flex-col border-l border-[#E2D8C8]/50 pb-[200px] flex-shrink-0">
            <h3 className="text-xs font-bold uppercase text-[#C9A84C] tracking-widest mb-8 flex items-center gap-2">
                <Clock size={14} /> Vendor Setup Timeline
            </h3>
            <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#E2D8C8]" />
                {VENDOR_TIMELINE.map((t, i) => (
                    <div key={i} className="flex gap-6 relative">
                        <div className="w-4 h-4 rounded-full bg-[#C9A84C] border-[3px] border-white shadow-sm shrink-0 z-10" />
                        <div className="-mt-1">
                            <div className="text-sm font-bold text-navy">{t.time}</div>
                            <div className="text-sm text-taupe">{t.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* VowAI Concierge - Vendor Agent (Pinned to footer) */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 0.5 }}
         className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-white/50"
         style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
      >
          {(() => {
              const interviewingVendors = vendors.filter(v => v.status === 'Interviewing');
              const reviewingVendors = vendors.filter(v => v.status === 'Reviewing Contract');
              
              let aiTitle = "Vendor Agent";
              let aiDescription = "I can help draft emails, compare quotes, and review contracts.";
              let aiAction = "Review Contracts";
              let aiIntent = "vendor_negotiation";
              
              if (reviewingVendors.length > 0) {
                  aiTitle = "Contract Review";
                  aiDescription = `You have ${reviewingVendors.length} contract${reviewingVendors.length > 1 ? 's' : ''} under review. I can scan for hidden fees and missing clauses before you sign.`;
                  aiAction = `Review ${reviewingVendors[0].role} Contract`;
                  aiIntent = "contract_review";
              } else if (interviewingVendors.length > 0) {
                  aiTitle = "Interview Prep";
                  aiDescription = `You are currently interviewing for ${interviewingVendors[0].role}. Need me to generate a list of essential questions to ask?`;
                  aiAction = "Generate Questions";
                  aiIntent = "interview_prep";
              }
              
              return (
                 <>
                  <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                         <Sparkles size={18} className="text-[#5A86A3]" />
                      </div>
                      <div className="bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
                         <span className="text-[10px] font-bold tracking-widest text-[#5A86A3] uppercase">VOWAI CONCIERGE</span>
                      </div>
                  </div>
                  
                  <div className="mb-6 relative z-10">
                      <h3 className="font-serif text-[26px] font-bold italic text-navy mb-2">{aiTitle}</h3>
                      <p className="text-[14px] text-taupe leading-relaxed">
                          {aiDescription}
                      </p>
                  </div>

                  <div className="flex flex-col gap-3 relative z-10 mb-2">
                      <button onClick={() => onOpenChat(aiIntent)} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
                         {aiAction}
                         <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                  </div>
                 </>
              );
          })()}
      </motion.div>

    </div>
  );
};

// --- BUDGET TRACKER ---
const INITIAL_BUDGET_CATEGORIES = [
  { id: 'venue', name: 'Venue', color: '#4CAF7C' },
  { id: 'catering', name: 'Catering', color: '#C9A84C' },
  { id: 'photo', name: 'Photography', color: '#F2D4CF' },
  { id: 'florals', name: 'Florals', color: '#4CB5AE' },
  { id: 'music', name: 'Music & Entertainment', color: '#B39DDB' },
  { id: 'other', name: 'Other', color: '#D1D5DB' },
];

const INITIAL_EXPENSES = [
  { id: 1, categoryId: 'venue', name: 'Venue Final Payment', actual: 0, estimated: 12000, date: 'Nov 01, 2026', vendor: 'THE GRAND ESTATE', status: 'PENDING' },
  { id: 2, categoryId: 'catering', name: 'Catering Deposit', actual: 0, estimated: 5000, date: 'Oct 20, 2026', vendor: 'FEAST & FABLE', status: 'OVERDUE' },
  { id: 3, categoryId: 'music', name: 'Band Booking', actual: 3500, estimated: 3500, date: 'Sep 15, 2026', vendor: 'THE MIDNIGHT SOUL', status: 'PAID' },
  { id: 4, categoryId: 'decor', name: 'Cake Design', actual: 800, estimated: 800, date: 'Sep 10, 2026', vendor: 'SWEET LAYERS', status: 'PAID' },
  { id: 5, categoryId: 'photo', name: 'Photography', actual: 6500, estimated: 6500, date: 'Oct 01, 2026', vendor: 'STUDIO LUMIÈRE', status: 'PAID' },
  { id: 6, categoryId: 'venue', name: 'Transportation', actual: 0, estimated: 1200, date: 'Jan 15, 2027', vendor: 'LUXE LIMO', status: 'SCHEDULED' },
  { id: 7, categoryId: 'florals', name: 'Florals Final', actual: 0, estimated: 4200, date: 'Nov 10, 2026', vendor: 'BLOOM & WILD', status: 'SCHEDULED' },
];

const MOCK_RENTALS = [
  { id: 1, name: "Chiavari Chairs", vendor: "LUXE RENTALS", qty: 150, price: 1125, active: true },
  { id: 2, name: "Table Linens", vendor: "SILK & SATIN", qty: 20, price: 400, active: false },
  { id: 3, name: "Dance Floor", vendor: "PARTY KINGS", qty: 1, price: 850, active: false },
  { id: 4, name: "Gold Flatware", vendor: "LUXE RENTALS", qty: 160, price: 320, active: false },
  { id: 5, name: "Candelabras", vendor: "EVENT GLOW", qty: 12, price: 240, active: false },
  { id: 6, name: "Lounge Furniture", vendor: "VELVET & CO", qty: 1, price: 680, active: false },
];

const MOCK_CONTRACTS = [
  { id: 1, name: "Venue Agreement", vendor: "The Grand Estate", date: "Signed Mar 12, 2025", status: "SIGNED" },
  { id: 2, name: "Photography Contract", vendor: "Studio Lumière", date: "Signed Apr 3, 2025", status: "SIGNED" },
  { id: 3, name: "Catering Agreement", vendor: "Feast & Fable", date: "Awaiting signature", status: "PENDING" },
  { id: 4, name: "Band Performance Contract", vendor: "The Midnight Soul", date: "Under review", status: "REVIEW" },
  { id: 5, name: "Florist Agreement", vendor: "Bloom & Wild", date: "Signed Jun 20, 2025", status: "SIGNED" },
];

const BudgetState = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat: (intent?: string) => void }) => {
  const [totalBudget, setTotalBudget] = useState(85000);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expandedExpenseId, setExpandedExpenseId] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newExpense, setNewExpense] = useState({ name: '', estimated: '', actual: '', categoryId: 'venue', status: 'Upcoming' });
  const [activeTab, setActiveTab] = useState<'schedule' | 'rentals' | 'contracts'>('schedule');

  const totalActual = expenses.reduce((sum, item) => sum + item.actual, 0);
  const totalPending = expenses.reduce((sum, item) => sum + (item.status !== 'PAID' ? item.estimated : 0), 0);
  const remaining = Math.max(0, totalBudget - totalActual);
  const totalEst = expenses.reduce((sum, item) => sum + item.estimated, 0);
  
  const chartData = INITIAL_BUDGET_CATEGORIES.map(cat => {
    const catExpenses = expenses.filter(e => e.categoryId === cat.id);
    return {
      name: cat.name,
      actual: catExpenses.reduce((sum, e) => sum + e.actual, 0),
      estimated: catExpenses.reduce((sum, e) => sum + e.estimated, 0),
      color: cat.color
    };
  });
  
  const pieData = chartData.filter(d => d.actual > 0).map(d => ({ name: d.name, value: d.actual, color: d.color }));

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.categoryId) {
      setExpenses([{
        id: Date.now(),
        categoryId: newExpense.categoryId,
        name: newExpense.name,
        actual: Number(newExpense.actual) || 0,
        estimated: Number(newExpense.estimated) || 0,
        status: newExpense.status
      }, ...expenses]);
      setIsExpenseModalOpen(false);
      setNewExpense({ name: '', estimated: '', actual: '', categoryId: 'venue', status: 'Upcoming' });
      toast.success('Expense added successfully!');
    }
  };

  return (
    <div className="px-12 pt-8 pb-4 h-full flex flex-col w-full bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-0">
      {/* Soft background accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#F2D4CF]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#C9DCE8]/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="flex flex-col gap-4 flex-shrink-0 relative z-10">
        <div className="flex justify-between items-end mb-2 pb-4 border-b border-[#C9A84C]/20">
          <div>
            <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] mb-4 transition-colors tracking-widest">
              <ChevronLeft size={14} strokeWidth={2.5} /> BACK
            </button>
            <h2 className="text-5xl font-serif text-navy tracking-tight mb-2 italic flex items-center gap-4">
              <DollarSign className="text-[#C9A84C]" size={40} strokeWidth={1.5} /> Budget & Finance
            </h2>
            <p className="text-base text-taupe font-medium">Manage your wedding investment and payment milestones.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2 bg-[#C9DCE8]/20 border-[#C9DCE8]/50 hover:bg-[#C9DCE8]/40 text-navy"><ArrowUpRight size={16} /> Export Report</Button>
            <Button variant="gold" onClick={() => setIsExpenseModalOpen(true)} className="bg-navy text-white hover:bg-navy/90 border-navy shadow-md"><Plus size={16} /> Add Expense</Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="flex justify-between items-center py-2 w-full max-w-[800px] mb-2">
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-navy font-bold leading-none mb-1">${totalBudget.toLocaleString()}</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Total Budget</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-[#2B8B5B] font-bold leading-none mb-1">${totalActual.toLocaleString()}</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Paid to Date</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-[#9CA3AF] font-bold leading-none mb-1">${totalPending.toLocaleString()}</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Pending</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[40px] font-serif text-[#C9A84C] font-bold leading-none mb-1">${remaining.toLocaleString()}</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Remaining</span>
           </div>
        </div>
      </div>

      {/* Dashboard Widgets Row */}
      <div className="grid grid-cols-12 gap-6 mb-6 relative z-10 mt-4">
        <Card className="col-span-4 p-6 bg-white border border-[#E2D8C8] flex flex-col shadow-sm rounded-[32px]">
          <h3 className="text-[10px] tracking-[0.15em] font-bold text-taupe uppercase flex items-center gap-2 mb-6"><Calendar size={14} /> Upcoming Payments</h3>
          <div className="space-y-4">
             {[
                { id: 1, name: 'Florals Deposit', dateText: 'DUE IN 5 DAYS', amount: 2500, highlight: true },
                { id: 2, name: 'Venue Installment', dateText: 'NOV 01', amount: 12000, highlight: false },
                { id: 3, name: 'Band Final', dateText: 'NOV 15', amount: 3500, highlight: false },
                { id: 4, name: 'Florals Final', dateText: 'NOV 10', amount: 4200, highlight: false },
             ].map(payment => (
                <div key={payment.id} className="flex justify-between items-start border-b border-[#E2D8C8]/50 pb-4 last:border-0 last:pb-0 group">
                   <div className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${payment.highlight ? 'bg-[#C9564C]' : 'bg-[#1D2B36]'}`}></div>
                      <div>
                         <p className="font-serif font-bold text-navy text-[15px] leading-tight group-hover:text-[#C9A84C] transition-colors">{payment.name}</p>
                         <p className={`text-[9px] font-bold tracking-[0.15em] uppercase mt-1 ${payment.highlight ? 'text-[#C9564C]' : 'text-taupe'}`}>{payment.dateText}</p>
                      </div>
                   </div>
                   <p className="font-serif font-bold text-navy text-base mt-0.5">${payment.amount.toLocaleString()}</p>
                </div>
             ))}
          </div>
        </Card>

        <Card className="col-span-8 p-6 bg-white border border-[#E2D8C8] flex flex-col shadow-sm rounded-[32px]">
          <h3 className="text-[10px] tracking-[0.15em] font-bold text-taupe uppercase flex items-center gap-2 mb-6"><PieChartIcon size={14} /> By Category</h3>
          <div className="flex gap-x-8 items-start w-full">
             {[0, 1].map(colIndex => (
                <div key={colIndex} className="flex-1 flex flex-col gap-y-5">
                   {INITIAL_BUDGET_CATEGORIES.filter((_, i) => i % 2 === colIndex).map(cat => {
                      const catExpenses = expenses.filter(e => e.categoryId === cat.id);
                      const catEst = catExpenses.reduce((sum, e) => sum + (e.actual > 0 ? e.actual : e.estimated), 0);
                      const percent = Math.min(100, Math.round((catEst / totalBudget) * 100));
                      const isExpanded = expandedCategories.includes(cat.id);

                      return (
                         <div key={cat.id} className="group flex flex-col">
                            <div 
                               className="cursor-pointer"
                               onClick={() => setExpandedCategories(prev => prev.includes(cat.id) ? prev.filter(id => id !== cat.id) : [...prev, cat.id])}
                            >
                               <div className="flex justify-between items-end mb-2">
                                  <div className="flex items-center gap-1.5">
                                     <ChevronDown size={14} className={`text-taupe transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                     <p className="font-serif font-bold text-navy text-[13px] group-hover:text-[#C9A84C] transition-colors">{cat.name}</p>
                                  </div>
                                  <p className="text-[10px] font-bold tracking-widest text-taupe">${catEst.toLocaleString()}</p>
                               </div>
                               <div className="w-full bg-[#F4F0E8] h-1.5 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-500 ease-out group-hover:opacity-80" style={{ width: `${percent}%`, backgroundColor: cat.color }}></div>
                               </div>
                            </div>

                            <AnimatePresence>
                               {isExpanded && (
                                  <motion.div
                                     initial={{ height: 0, opacity: 0 }}
                                     animate={{ height: "auto", opacity: 1 }}
                                     exit={{ height: 0, opacity: 0 }}
                                     transition={{ duration: 0.3, ease: "easeInOut" }}
                                     className="overflow-hidden"
                                  >
                                     <div className="pt-4 pb-2 pl-5 space-y-3 border-l-2 border-[#E2D8C8]/50 ml-1.5 mt-2">
                                        {catExpenses.length > 0 ? catExpenses.map(exp => (
                                           <div key={exp.id} className="flex justify-between items-center">
                                              <div className="flex flex-col">
                                                 <span className="text-[12px] text-navy font-bold">{exp.name}</span>
                                                 <span className="text-[9px] font-bold tracking-widest text-taupe uppercase mt-0.5">{exp.vendor}</span>
                                              </div>
                                              <span className="text-[12px] font-bold text-navy">${(exp.actual > 0 ? exp.actual : exp.estimated).toLocaleString()}</span>
                                           </div>
                                        )) : (
                                           <div className="text-[11px] text-taupe italic py-1">
                                              No expenses logged in this category.
                                           </div>
                                        )}
                                     </div>
                                  </motion.div>
                               )}
                            </AnimatePresence>
                         </div>
                      );
                   })}
                </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="flex-1 pb-[260px] relative z-10">
        <Card className="w-full bg-white border border-ivory-dark flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full rounded-[32px] p-0 mb-8">
          <div className="flex border-b border-[#E2D8C8] bg-white pt-2 px-2 shrink-0">
             <button onClick={() => setActiveTab('schedule')} className={`px-6 py-4 text-[10px] font-bold tracking-[0.15em] uppercase border-b-2 transition-colors ${activeTab === 'schedule' ? 'text-navy border-navy' : 'text-taupe border-transparent hover:text-navy'}`}>Payment Schedule</button>
             <button onClick={() => setActiveTab('rentals')} className={`px-6 py-4 text-[10px] font-bold tracking-[0.15em] uppercase border-b-2 transition-colors ${activeTab === 'rentals' ? 'text-navy border-navy' : 'text-taupe border-transparent hover:text-navy'}`}>Rentals & Inventory</button>
             <button onClick={() => setActiveTab('contracts')} className={`px-6 py-4 text-[10px] font-bold tracking-[0.15em] uppercase border-b-2 transition-colors ${activeTab === 'contracts' ? 'text-navy border-navy' : 'text-taupe border-transparent hover:text-navy'}`}>Legal & Contracts</button>
          </div>
          
          <div className="flex-1 overflow-auto p-6 bg-white">
            {activeTab === 'schedule' && (
             <table className="w-full text-left">
               <thead className="sticky top-0 bg-white z-10">
                 <tr className="border-b border-[#E2D8C8]">
                   <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-taupe uppercase bg-white">Expense Item</th>
                   <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-taupe uppercase bg-white">Due Date</th>
                   <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-taupe uppercase bg-white">Amount</th>
                   <th className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] text-taupe uppercase bg-white">Status</th>
                 </tr>
               </thead>
               {expenses.map(exp => (
                 <tbody key={exp.id} className="border-b border-[#E2D8C8]/50 last:border-0">
                   <tr className="hover:bg-[#F9F7F3] transition-colors group cursor-pointer" onClick={() => setExpandedExpenseId(expandedExpenseId === exp.id ? null : exp.id)}>
                     <td className="px-6 py-5">
                       <div className="flex items-center gap-3">
                         <ChevronDown size={16} className={`text-taupe transition-transform duration-300 ${expandedExpenseId === exp.id ? 'rotate-180' : ''}`} />
                         <div>
                           <p className="font-serif font-bold text-navy text-base group-hover:text-[#C9A84C] transition-colors">{exp.name}</p>
                           <p className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase mt-1">{exp.vendor}</p>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-5">
                       <p className={`text-sm font-medium ${exp.status === 'OVERDUE' ? 'text-[#C9564C]' : 'text-navy'}`}>{exp.date}</p>
                     </td>
                     <td className="px-6 py-5">
                       <p className="font-serif font-bold text-navy text-lg">${(exp.actual > 0 ? exp.actual : exp.estimated).toLocaleString()}</p>
                     </td>
                     <td className="px-6 py-5">
                       <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block ${
                         exp.status === 'PAID' ? 'bg-[#EAF0EB] text-[#4CAF7C]' : 
                         exp.status === 'OVERDUE' ? 'bg-[#F9EAEA] text-[#C9564C]' : 
                         exp.status === 'PENDING' ? 'bg-[#F4F0E8] text-taupe' : 
                         'bg-[#FDF8E8] text-[#C9A84C]'
                       }`}>
                         {exp.status}
                       </span>
                     </td>
                   </tr>
                   <AnimatePresence>
                     {expandedExpenseId === exp.id && (
                       <tr>
                         <td colSpan={4} className="p-0 border-0 bg-[#F9F7F3]/50">
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             className="overflow-hidden"
                           >
                             <div className="px-6 pb-6 pt-2 mx-10 border-t border-[#E2D8C8]/50 flex gap-12 mt-2">
                               <div className="flex flex-col gap-1">
                                 <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Total Amount</span>
                                 <span className="font-serif text-xl font-bold text-navy">${exp.estimated.toLocaleString()}</span>
                               </div>
                               <div className="flex flex-col gap-1">
                                 <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Paid / Downpayment</span>
                                 <span className="font-serif text-xl font-bold text-[#2B8B5B]">${exp.actual.toLocaleString()}</span>
                               </div>
                               <div className="flex flex-col gap-1">
                                 <span className="text-[10px] font-bold tracking-[0.15em] text-taupe uppercase">Amount Due</span>
                                 <span className="font-serif text-xl font-bold text-[#C9A84C]">${Math.max(0, exp.estimated - exp.actual).toLocaleString()}</span>
                               </div>
                             </div>
                           </motion.div>
                         </td>
                       </tr>
                     )}
                   </AnimatePresence>
                 </tbody>
               ))}
             </table>
            )}

            {activeTab === 'rentals' && (
              <div className="grid grid-cols-2 gap-4">
                {MOCK_RENTALS.map(item => (
                  <div key={item.id} className={`p-5 rounded-md border ${item.active ? 'border-navy bg-[#FDFBF7]' : 'border-[#E2D8C8]/50 bg-[#FDFBF7]/80 hover:bg-[#FDFBF7] hover:border-[#E2D8C8]'} transition-colors flex justify-between items-center`}>
                     <div>
                        <h4 className="font-serif text-lg font-bold text-navy mb-1">{item.name}</h4>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-taupe">
                           {item.vendor} &middot; QTY: {item.qty}
                        </p>
                     </div>
                     <div className="font-serif text-2xl font-bold text-navy">
                        ${item.price.toLocaleString()}
                     </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="flex flex-col gap-4">
                {MOCK_CONTRACTS.map(contract => (
                  <div key={contract.id} className="p-5 rounded-md border border-[#E2D8C8]/50 bg-[#FDFBF7] hover:border-[#E2D8C8] transition-colors flex justify-between items-center">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-md border border-[#E2D8C8] flex items-center justify-center text-taupe shadow-sm shrink-0">
                           <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#D6CFD4" stroke="#D6CFD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2V8H20" stroke="#D6CFD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 13H8" stroke="#9B8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 17H8" stroke="#9B8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10 9H9H8" stroke="#9B8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                        <div>
                           <h4 className="font-serif text-[17px] font-bold text-navy mb-1">{contract.name}</h4>
                           <p className="text-[12px] text-taupe">
                              {contract.vendor} &middot; {contract.date}
                           </p>
                        </div>
                     </div>
                     <div>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block ${
                           contract.status === 'SIGNED' ? 'bg-[#EAF0EB] text-[#4CAF7C]' : 
                           contract.status === 'REVIEW' ? 'bg-[#FDF8E8] text-[#C9A84C]' : 
                           'bg-[#F4F0E8] text-taupe'
                        }`}>
                           {contract.status}
                        </span>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* VowAI Advisor Panel */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 0.5 }}
         className="fixed bottom-8 right-8 z-50 w-[340px] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col border border-white/50"
         style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F4F7F9 50%, #E8F0F4 100%)' }}
      >
         <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm">
               <Sparkles size={18} className="text-[#5A86A3]" />
            </div>
            <div className="bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
               <span className="text-[10px] font-bold tracking-widest text-[#5A86A3] uppercase">VOWAI CONCIERGE</span>
            </div>
         </div>
         
         <div className="mb-6 relative z-10">
            <h3 className="font-serif text-[26px] font-bold italic text-navy mb-2">Budget Advisor</h3>
            <p className="text-[14px] text-taupe leading-relaxed">
               I've analysed your floral contract. There's a potential $500 saving on the peony order.
            </p>
         </div>

         <div className="flex flex-col gap-3 relative z-10 mb-2">
            <button onClick={() => onOpenChat('insights')} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
               VIEW INSIGHTS
               <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
            <button onClick={() => onOpenChat('optimise')} className="w-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] py-3.5 px-6 rounded-full text-[11px] font-bold text-navy uppercase tracking-widest text-left hover:border-[#CBD5E1] transition-colors shadow-sm group flex justify-between items-center">
               OPTIMIZE BUDGET
               <ArrowRight size={14} className="text-[#5A86A3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </motion.div>

      <AnimatePresence>
         {isExpenseModalOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-12"
               onClick={() => setIsExpenseModalOpen(false)}
            >
               <motion.div 
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden border border-[#E2D8C8]"
                  onClick={e => e.stopPropagation()}
               >
                  <div className="p-6 border-b border-[#E2D8C8] flex justify-between items-center bg-[#F9F7F3]">
                     <h3 className="font-serif text-2xl text-navy font-bold">New Expense</h3>
                     <button onClick={() => setIsExpenseModalOpen(false)} className="text-taupe hover:text-navy transition-colors">
                        <X size={20} />
                     </button>
                  </div>
                  <div className="p-6 flex flex-col gap-5">
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest text-navy uppercase">Expense Name</label>
                        <input 
                           type="text" 
                           value={newExpense.name}
                           onChange={e => setNewExpense({...newExpense, name: e.target.value})}
                           className="w-full p-3 border border-[#E2D8C8] rounded-xl text-sm focus:outline-none focus:border-[#C9A84C]"
                           placeholder="e.g. Photography Deposit"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest text-navy uppercase">Category</label>
                        <select 
                           value={newExpense.categoryId}
                           onChange={e => setNewExpense({...newExpense, categoryId: e.target.value})}
                           className="w-full p-3 border border-[#E2D8C8] rounded-xl text-sm focus:outline-none focus:border-[#C9A84C] bg-white appearance-none"
                        >
                          {INITIAL_BUDGET_CATEGORIES.map(cat => (
                             <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold tracking-widest text-navy uppercase">Estimated ($)</label>
                          <input 
                             type="number" 
                             value={newExpense.estimated}
                             onChange={e => setNewExpense({...newExpense, estimated: e.target.value})}
                             className="w-full p-3 border border-[#E2D8C8] rounded-xl text-sm focus:outline-none focus:border-[#C9A84C]"
                             placeholder="0"
                          />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold tracking-widest text-navy uppercase">Actual Paid ($)</label>
                          <input 
                             type="number" 
                             value={newExpense.actual}
                             onChange={e => setNewExpense({...newExpense, actual: e.target.value})}
                             className="w-full p-3 border border-[#E2D8C8] rounded-xl text-sm focus:outline-none focus:border-[#C9A84C]"
                             placeholder="0"
                          />
                       </div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-widest text-navy uppercase">Status</label>
                        <div className="flex gap-4">
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                 type="radio" 
                                 name="status" 
                                 value="Paid"
                                 checked={newExpense.status === 'Paid'}
                                 onChange={e => setNewExpense({...newExpense, status: e.target.value})}
                                 className="accent-[#C9A84C]"
                              />
                              <span className="text-sm font-medium text-navy">Paid</span>
                           </label>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                 type="radio" 
                                 name="status" 
                                 value="Upcoming"
                                 checked={newExpense.status === 'Upcoming'}
                                 onChange={e => setNewExpense({...newExpense, status: e.target.value})}
                                 className="accent-[#C9A84C]"
                              />
                              <span className="text-sm font-medium text-navy">Upcoming</span>
                           </label>
                        </div>
                     </div>
                  </div>
                  <div className="p-6 border-t border-[#E2D8C8] flex justify-end gap-3 bg-[#F9F7F3]">
                     <Button variant="outline" className="bg-white rounded-full" onClick={() => setIsExpenseModalOpen(false)}>Cancel</Button>
                     <Button variant="gold" className="rounded-full" onClick={handleAddExpense}>Save Expense</Button>
                  </div>
               </motion.div>
            </motion.div>
         )}

      </AnimatePresence>
    </div>
  );
};

// --- Main App Component ---

export const HighFiPrototype = () => {
  const [currentView, setCurrentView] = useState('homepage'); // Default to homepage
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatIntent, setChatIntent] = useState<string | undefined>(undefined);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [userProfilePic, setUserProfilePic] = useState<string | null>("https://images.unsplash.com/photo-1706565029539-a6dd5496ee30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwY291cGxlJTIwc21pbGluZyUyMHRvZ2V0aGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjU0NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
  
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    reduceMotion: false,
    largeText: false
  });

  const toggleAccessibility = (key: 'highContrast' | 'reduceMotion' | 'largeText') => {
    setAccessibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const html = document.documentElement;
    
    // High Contrast
    if (accessibility.highContrast) {
      html.classList.add('contrast-125', 'saturate-150');
    } else {
      html.classList.remove('contrast-125', 'saturate-150');
    }

    // Reduce Motion
    if (accessibility.reduceMotion) {
      html.classList.add('[&_*]:!transition-none', '[&_*]:!animate-none', '[&_*]:!duration-0');
    } else {
      html.classList.remove('[&_*]:!transition-none', '[&_*]:!animate-none', '[&_*]:!duration-0');
    }

    // Large Text
    if (accessibility.largeText) {
      // Use standard fontSize for rem-based elements
      html.style.fontSize = '18px';
      // Use zoom as a fallback/enhancement for px-based elements in supported browsers
      (html.style as any).zoom = '1.1';
    } else {
      html.style.fontSize = '';
      (html.style as any).zoom = '';
    }
  }, [accessibility]);

  const handleNavigate = (view: string, venueId?: number) => {
    setCurrentView(view);
    if (venueId !== undefined) {
        setSelectedVenueId(venueId);
    }
    // Reset scroll to top
    window.scrollTo(0,0);
  };

  const handleOpenChat = (intent?: string) => {
    setChatIntent(intent);
    setIsChatOpen(true);
  };

  const isHomepage = currentView === 'homepage' || currentView === 'new_client_portal';
  const isSuiteDesign = currentView === 'suite_design';

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground font-sans selection:bg-champagne selection:text-white">
      <AnimatePresence initial={false}>
        {!isHomepage && !isSuiteDesign && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 120, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full flex-shrink-0 z-50 relative"
            >
              <NavBar 
                currentStep={currentView} 
                onNavigate={handleNavigate}
                onLogoClick={() => {
                  if (currentView === 'dashboard') {
                    handleNavigate('homepage');
                  } else {
                    handleNavigate('dashboard');
                  }
                }}
                onProfileClick={() => {}}
                accessibility={accessibility}
                toggleAccessibility={toggleAccessibility}
                onOpenSettings={setActiveModal}
                userProfilePic={userProfilePic}
              />
            </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full"
          >
            {currentView === 'homepage' && (
                <HomepageState onNavigate={handleNavigate} accessibility={accessibility} toggleAccessibility={toggleAccessibility} />
            )}
            {currentView === 'new_client_portal' && (
                <NewClientPortalState onBack={() => handleNavigate('homepage')} onNavigate={handleNavigate} />
            )}
            {currentView === 'dashboard' && (
              <DashboardState onNavigate={handleNavigate} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'planner' && (
              <PlannerProfile onBack={() => handleNavigate('dashboard')} />
            )}
            {currentView === 'guests' && (
              <GuestsState onBack={() => handleNavigate('dashboard')} onOpenChat={handleOpenChat} onNavigate={handleNavigate} />
            )}
            {currentView === 'seating' && (
              <GuestsState onBack={() => handleNavigate('guests')} onOpenChat={handleOpenChat} onNavigate={handleNavigate} initialView="seating" />
            )}
            {currentView === 'suite_design' && (
              <InvitationSuiteDesign onBack={() => handleNavigate('guests')} />
            )}
            {currentView === 'vendors' && (
              <VendorsState onBack={() => handleNavigate('dashboard')} onNavigate={handleNavigate} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'ceremony_arch_ideas' && (
              <CeremonyArchIdeasState onBack={() => handleNavigate('vendors')} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'budget' && (
              <BudgetState onBack={() => handleNavigate('dashboard')} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'thoughts' && (
              <ThoughtsState onBack={() => handleNavigate('dashboard')} />
            )}
            {currentView === 'search' && (
              <SearchResultsState onSelect={(id) => handleNavigate('detail', id)} onBack={() => handleNavigate('dashboard')} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'detail' && selectedVenueId && (
              <VenueDetailState venue={MOCK_VENUES.find(v => v.id === selectedVenueId)!} onBack={() => handleNavigate('search')} onAction={() => handleNavigate('dashboard')} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'bridal' && (
              <BridalSuiteState onBack={() => handleNavigate('dashboard')} onNavigate={handleNavigate} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'groom' && (
              <GroomSuiteState onBack={() => handleNavigate('dashboard')} onNavigate={handleNavigate} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'wedding_dress_boutiques' && (
              <WeddingDressBoutiquesState onBack={() => handleNavigate('bridal')} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'rehearsal_suit_shops' && (
              <RehearsalSuitShopsState onBack={() => handleNavigate('groom')} onOpenChat={handleOpenChat} />
            )}
            {currentView === 'gifts' && (
              <GiftRegistryState onBack={() => handleNavigate('dashboard')} />
            )}
            {currentView === 'timeline' && (
              <TimeAndLogistics onBack={() => handleNavigate('dashboard')} onOpenChat={handleOpenChat} onNavigate={handleNavigate} />
            )}
            {/* Fallback for other views */}
            {!['dashboard', 'guests', 'seating', 'vendors', 'budget', 'search', 'homepage', 'detail', 'bridal', 'groom', 'wedding_dress_boutiques', 'rehearsal_suit_shops', 'gifts', 'planner', 'timeline', 'suite_design', 'ceremony_arch_ideas', 'thoughts'].includes(currentView) && (
              <div className="p-12 flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-ivory rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="text-champagne" size={32} />
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy mb-4">Coming Soon</h2>
                <p className="text-muted-foreground mb-8">The {currentView} interface is currently being designed.</p>
                <Button onClick={() => handleNavigate('dashboard')} variant="outline">Return Home</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Global Modals */}
        <AnimatePresence mode="wait">
          {(() => {
            switch(activeModal) {
              case 'profile': return <ViewProfileModal key="modal-profile" onClose={() => setActiveModal(null)} userProfilePic={userProfilePic} setUserProfilePic={setUserProfilePic} />;
              case 'preferences': return <PreferencesModal key="modal-preferences" onClose={() => setActiveModal(null)} />;
              case 'notifications': return <NotificationsModal key="modal-notifications" onClose={() => setActiveModal(null)} />;
              case 'sharing': return <SharingAccessModal key="modal-sharing" onClose={() => setActiveModal(null)} />;
              case 'wedding': return <WeddingSettingsModal key="modal-wedding" onClose={() => setActiveModal(null)} />;
              case 'settings': return <AppSettingsModal key="modal-settings" onClose={() => setActiveModal(null)} />;
              default: return null;
            }
          })()}
        </AnimatePresence>

        {/* Floating Chat Button (only show if chat is closed and not on homepage) */}
        {!isChatOpen && !isHomepage && (
            <button 
                onClick={() => handleOpenChat()}
                className="absolute bottom-6 right-12 z-50 flex flex-col items-center gap-1 group"
            >
                <div className="w-16 h-16 bg-white rounded-full shadow-xl border border-ivory-dark flex items-center justify-center relative hover:scale-105 transition-transform">
                    <div className="absolute inset-0 rounded-full border border-champagne animate-pulse opacity-50"></div>
                    <ImageWithFallback 
                        src={vowAIIcon} 
                        alt="VowAi"
                        className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-navy bg-white/90 px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm border border-ivory-dark/50 mt-1">
                    VowAi
                </span>
            </button>
        )}

        {/* Chat Overlay */}
        <VowAiChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} intent={chatIntent} currentView={currentView} />

      </div>
      
      <AnimatePresence initial={false}>
        {!isHomepage && (
          <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 64, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full flex-shrink-0 z-50 overflow-hidden"
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
