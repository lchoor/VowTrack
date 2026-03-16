import React from 'react';
import { MapPin, Instagram, Mail, Globe, Star, ChevronRight, ChevronLeft, Award, Quote, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const PlannerProfile = ({ onBack, onOpenChat }: { onBack: () => void, onOpenChat?: () => void }) => {
  return (
    <div className="h-full w-full flex flex-col bg-[#FAF7F2] overflow-y-auto custom-scrollbar">
      
      {/* Top Header */}
      <div className="px-12 pt-8 pb-2 flex justify-between items-center shrink-0 w-full max-w-[1400px] mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#8C857B] hover:text-[#C9A84C] transition-colors tracking-widest"
        >
          <ChevronLeft size={14} strokeWidth={2.5} /> BACK
        </button>

        {/* Top Right Actions */}
        <div className="flex gap-4">
          <button className="h-11 px-6 bg-[#C9A84C] hover:bg-[#B3933B] text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors shadow-md flex items-center gap-2">
            <Mail size={16} /> Message Elsie
          </button>
          <button className="w-11 h-11 bg-white hover:bg-[#FAF7F2] text-navy rounded-full flex items-center justify-center transition-colors border border-ivory-dark shadow-sm">
            <Instagram size={18} />
          </button>
        </div>
      </div>

      {/* Main Profile Area */}
      <div className="flex-1 px-12 py-16 mx-auto max-w-[1400px] w-full flex flex-col gap-16">
        
        {/* Profile Info - Left Image, Right Description */}
        <div className="flex gap-16 items-center">
          {/* Left: Large Portrait */}
          <div className="w-[500px] shrink-0 rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-white">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1696960181436-1b6d9576354e?q=80&w=1080" 
              alt="Elsie Voyette" 
              className="w-full aspect-[4/5] object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white text-xs font-bold uppercase tracking-widest bg-[#C9A84C] px-3 py-1 rounded-full shadow-sm">
                Lead Planner
              </span>
              <div className="flex text-[#C9A84C] bg-white px-3 py-1 rounded-full border border-[#E2D8C8] shadow-sm items-center">
                <Star size={14} fill="currentColor" />
                <span className="ml-1.5 text-navy font-bold text-xs">4.92 Rating</span>
              </div>
            </div>

            <h1 className="text-6xl font-serif italic text-navy mb-4 tracking-tight">Elsie Voyette</h1>
            <p className="text-taupe text-lg flex items-center gap-2 mb-8 font-medium">
              <MapPin size={18} className="text-[#C9A84C]" /> Global Wedding & Event Designer
            </p>

            <div className="prose prose-lg text-charcoal leading-relaxed mb-10">
              <p className="mb-4">
                With a deep appreciation for diverse cultures and boundless creativity, I specialize in crafting unforgettable celebrations tailored precisely to your unique story. From grandiose, vibrant <strong>multi-day celebrations</strong> and elegantly structured <strong>traditional ceremonies</strong> to timeless, classic <strong>weddings</strong> and intimate <strong>engagement dinners</strong>, I approach every event with the same meticulous care, embracing a wide range of religious and cultural styles.
              </p>
              <p>
                My philosophy is simple: your dream wedding should not be bound by rigid constraints. I am incredibly flexible with budgets, ensuring your vision is realized beautifully, whether it’s a lavish multi-day festival or a small, poignant gathering. Alongside my dedicated team, we handle absolutely everything from beginning to end—so you can simply enjoy the magic of the moment.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E2D8C8] shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C9A84C]">
                  <Award size={24} />
                </div>
                <h4 className="text-3xl font-serif text-navy mb-1">200+</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-taupe">Weddings Planned</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#E2D8C8] shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C9A84C]">
                  <Globe size={24} />
                </div>
                <h4 className="text-3xl font-serif text-navy mb-1">15</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-taupe">Countries</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#E2D8C8] shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C9A84C]">
                  <Star size={24} />
                </div>
                <h4 className="text-3xl font-serif text-navy mb-1">4.92</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-taupe">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E2D8C8] to-transparent my-4"></div>

        {/* Portfolio Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif italic text-navy mb-2">Diverse Expertise</h2>
              <p className="text-taupe text-sm">A glimpse into the diverse cultural celebrations and events we bring to life.</p>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] hover:text-navy flex items-center gap-1 transition-colors bg-white px-4 py-2 rounded-full border border-[#E2D8C8] shadow-sm">
              View Full Gallery <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
               <ImageWithFallback src="https://images.unsplash.com/photo-1605553426886-c0a99033fda0?q=80&w=800" alt="Cultural Celebrations" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-white font-serif text-2xl block mb-1">Cultural</span>
                    <span className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold">Celebrations</span>
                  </div>
               </div>
            </div>
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
               <ImageWithFallback src="https://images.unsplash.com/photo-1772241824154-ce6e7c985ff9?q=80&w=800" alt="Traditional Ceremonies" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-white font-serif text-2xl block mb-1">Traditional</span>
                    <span className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold">Ceremonies</span>
                  </div>
               </div>
            </div>
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
               <ImageWithFallback src="https://images.unsplash.com/photo-1769868800959-533a3f907d60?q=80&w=800" alt="Classic Weddings" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-white font-serif text-2xl block mb-1">Classic</span>
                    <span className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold">Weddings</span>
                  </div>
               </div>
            </div>
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
               <ImageWithFallback src="https://images.unsplash.com/photo-1571397947597-7f9f37baa76e?q=80&w=800" alt="Engagement Dinner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-white font-serif text-2xl block mb-1">Intimate</span>
                    <span className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold">Engagements</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* The Team Section */}
        <section className="bg-white rounded-[32px] p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#E2D8C8] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-serif italic text-navy mb-4">The Dedicated Team</h2>
              <p className="text-taupe leading-relaxed">
                My carefully curated team of experts ensures that no matter how big or small your celebration is, we have the resources to handle it from beginning to end. From keeping strict budgets in line to coordinating dozens of vendors on the day of, our synergistic approach makes the planning journey effortless.
              </p>
          </div>
          
          <div className="grid grid-cols-6 gap-6 mb-12">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg relative border-4 border-white ring-1 ring-[#E2D8C8] group-hover:ring-[#C9A84C] group-hover:-translate-y-1 transition-all duration-300">
                <ImageWithFallback src="https://images.unsplash.com/photo-1763598461615-610264129bea?q=80&w=400" alt="Finance" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-serif text-navy font-bold">Arthur</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mt-1 px-2">Finance & Budget</p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg relative border-4 border-white ring-1 ring-[#E2D8C8] group-hover:ring-[#C9A84C] group-hover:-translate-y-1 transition-all duration-300">
                <ImageWithFallback src="https://images.unsplash.com/photo-1759334928681-dc7ad674138e?q=80&w=400" alt="Vendor Relations" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-serif text-navy font-bold">Julian</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mt-1 px-2">Vendor Manager</p>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg relative border-4 border-white ring-1 ring-[#E2D8C8] group-hover:ring-[#C9A84C] group-hover:-translate-y-1 transition-all duration-300">
                <ImageWithFallback src="https://images.unsplash.com/photo-1634033682496-94b2659f35bd?q=80&w=400" alt="Styling" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-serif text-navy font-bold">Chloe</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mt-1 px-2">Lead Stylist</p>
            </div>

            {/* Team Member 4 */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg relative border-4 border-white ring-1 ring-[#E2D8C8] group-hover:ring-[#C9A84C] group-hover:-translate-y-1 transition-all duration-300">
                <ImageWithFallback src="https://images.unsplash.com/photo-1679745776849-99c231c9b27d?q=80&w=400" alt="Coordinator" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-serif text-navy font-bold">Maya</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mt-1 px-2">Day-of Coordinator</p>
            </div>

            {/* Team Member 5 */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg relative border-4 border-white ring-1 ring-[#E2D8C8] group-hover:ring-[#C9A84C] group-hover:-translate-y-1 transition-all duration-300">
                <ImageWithFallback src="https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?q=80&w=400" alt="Logistics" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-serif text-navy font-bold">Sam</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mt-1 px-2">Logistics Manager</p>
            </div>

            {/* Team Member 6 */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg relative border-4 border-white ring-1 ring-[#E2D8C8] group-hover:ring-[#C9A84C] group-hover:-translate-y-1 transition-all duration-300">
                <ImageWithFallback src="https://images.unsplash.com/photo-1667035533110-7964092f44a6?q=80&w=400" alt="Assistant" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-serif text-navy font-bold">Sophie</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mt-1 px-2">Executive Assistant</p>
            </div>
          </div>

          <div className="bg-[#FAF7F2] rounded-[24px] p-8 border border-[#E2D8C8] flex items-center gap-8 shadow-inner">
            <div className="w-24 h-24 shrink-0 rounded-full bg-navy flex items-center justify-center text-[#C9A84C] shadow-lg">
              <Star size={36} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-2xl font-serif italic text-navy mb-2">VowAi Concierge (Your AI Assistant)</h3>
              <p className="text-taupe leading-relaxed">
                As your Lead Planner, I personally oversee all the creative and high-level logistics, but our team is supercharged by <strong>VowAi Concierge</strong>—your always-on AI Assistant. VowAi lives right in your dashboard (bottom right corner) and is ready 24/7 to answer quick questions, draft emails, sort out seating charts, track budget updates, and seamlessly sync data directly to me and my team so we stay completely aligned without missing a beat.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-navy rounded-[32px] p-12 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mb-12">
          <Quote className="absolute top-8 left-8 text-white/5" size={120} />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="flex gap-1 text-[#C9A84C] mb-8 justify-center">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-white/90 text-2xl font-serif italic leading-relaxed mb-10">
              "Elsie managed to fuse our dual heritage into one breathtaking weekend. From keeping our budget strictly on track to the flawless day-of coordination, every detail was nothing short of perfection. Having her expertise alongside the incredible VowAi tool gave us the greatest gift: the ability to be truly present."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-serif italic text-xl shadow-inner">
                R&A
              </div>
              <div className="text-left">
                <h5 className="text-white font-bold tracking-wide">Rohan & Aisha</h5>
                <p className="text-[#C9A84C] text-xs mt-1 uppercase tracking-widest font-bold">3-Day Fusion Wedding</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
