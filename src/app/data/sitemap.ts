import { 
  Heart, 
  Shirt, 
  CalendarCheck, 
  Package, 
  BookOpen, 
  UserCircle, 
  Scale, 
  Home,
  LucideIcon
} from 'lucide-react';

export type SitemapItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  items?: SitemapItem[];
  colorTheme?: {
    bg: string;
    border: string;
    text: string;
    lightBg: string;
  };
};

export const sitemapData: SitemapItem = {
  id: 'root',
  label: 'Homepage',
  icon: Home,
  colorTheme: {
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    text: 'text-white',
    lightBg: 'bg-blue-50',
  },
  items: [
    {
      id: 'bridal-suite',
      label: 'Bridal Suite',
      icon: Heart,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-purple-50',
      },
      items: [
        { 
          id: 'b-1', 
          label: 'Bridal Attire',
          items: [
            { id: 'b-1-1', label: 'Wedding Dress' },
            { id: 'b-1-2', label: 'Reception Look' },
            { id: 'b-1-3', label: 'Rehearsal Outfit' },
          ]
        },
        { 
          id: 'b-2', 
          label: 'Beauty & Wellness',
          items: [
            { id: 'b-2-1', label: 'Hair & Makeup Trials' },
            { id: 'b-2-2', label: 'Day-of Beauty' },
            { id: 'b-2-3', label: 'Spa & Massage' },
            { id: 'b-2-4', label: 'Manicure/Pedicure' },
          ]
        },
        { 
          id: 'b-3', 
          label: 'Accessories',
          items: [
            { id: 'b-3-1', label: 'Shoes' },
            { id: 'b-3-2', label: 'Veil & Headpieces' },
            { id: 'b-3-3', label: 'Jewelry' },
            { id: 'b-3-4', label: 'Garter' },
          ]
        },
        { id: 'b-4', label: 'Bridesmaids & Party' },
        { id: 'b-5', label: "Bride's Personal Timeline" },
      ],
    },
    {
      id: 'groom-suite',
      label: 'Groom Suite',
      icon: Shirt,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-gray-100',
      },
      items: [
        { 
          id: 'g-1', 
          label: "Groom's Attire",
          items: [
            { id: 'g-1-1', label: 'Tuxedo/Suit' },
            { id: 'g-1-2', label: 'Reception Look' },
            { id: 'g-1-3', label: 'Rehearsal Outfit' },
          ]
        },
        { 
          id: 'g-2', 
          label: 'Grooming & Wellness',
          items: [
            { id: 'g-2-1', label: 'Haircut & Shave' },
            { id: 'g-2-2', label: 'Skincare Prep' },
            { id: 'g-2-3', label: 'Teeth Whitening' },
            { id: 'g-2-4', label: 'Massage Therapy' },
            { id: 'g-2-5', label: 'Manicure' },
          ]
        },
        { 
          id: 'g-3', 
          label: 'Accessories',
          items: [
            { id: 'g-3-1', label: 'Cufflinks & Watch' },
            { id: 'g-3-2', label: 'Shoes & Socks' },
            { id: 'g-3-3', label: 'Ties/Bowties' },
            { id: 'g-3-4', label: 'Belts/Suspenders' },
          ]
        },
        { id: 'g-4', label: 'Groomsmen & Party' },
        { id: 'g-5', label: "Groom's Personal Timeline" },
      ],
    },
    {
      id: 'planning-hub',
      label: 'Planning Hub',
      icon: CalendarCheck,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-orange-50',
      },
      items: [
        { 
          id: 'p-1', 
          label: 'Guest List Management',
          items: [
            { id: 'p-9', label: 'Wedding Invites' },
            { id: 'p-1-2', label: 'Save the Dates & Announcements' },
            { id: 'p-1-3', label: 'RSVP Tracking' },
            { id: 'p-1-4', label: 'Dietary Restrictions' },
          ]
        },
        { 
          id: 'p-2', 
          label: 'Venue & Reception',
          items: [
            { id: 'p-2-1', label: 'Cake & Desserts' },
            { id: 'p-3', label: 'Decor & Florals' },
            { id: 'p-5', label: 'Catering & Bar Menu' },
            { id: 'p-2-4', label: 'Music, Band & DJ' },
            { id: 'p-2-5', label: 'Lighting & Production' },
          ]
        },
        { 
          id: 'p-10', 
          label: 'Photography & Videography',
          items: [
            { id: 'p-10-1', label: 'Photographer & Team' },
            { id: 'p-10-2', label: 'Videography Coverage' },
            { id: 'p-10-3', label: 'Shot List & Mood Board' },
            { id: 'p-10-4', label: 'Engagement Session' },
          ]
        },
        { 
          id: 'p-8', 
          label: 'Ceremony Planning',
          items: [
            { id: 'p-8-1', label: 'Vows' },
            { id: 'p-8-2', label: 'Readings & Officiant' },
            { id: 'p-8-3', label: 'Processional Order' },
          ]
        },
        { id: 'p-4', label: 'Gift Registry' },
        { id: 'p-7', label: 'Guest Transportation & Hotels' },
      ],
    },
    {
      id: 'logistics',
      label: 'Logistics & Operations',
      icon: Package,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-green-50',
      },
      items: [
        { 
          id: 'l-1', 
          label: 'Budget & Payments',
          items: [
            { id: 'l-1-1', label: 'Payment Schedule' },
            { id: 'l-4', label: 'Rentals & Contracts' },
            { id: 'l-1-2', label: 'Vendor List & Contacts' },
          ]
        },
        { 
          id: 'l-2', 
          label: 'Timelines & Run of Show',
          items: [
            { id: 'l-3', label: 'Master Checklist' },
            { id: 'l-5', label: 'Floor Plan & Seating' },
            { id: 'p-6', label: 'Rehearsal Dinner Logistics' },
            { id: 'l-2-4', label: 'Day-of Itinerary' },
          ]
        },
        { id: 'l-6', label: 'Emergency Kit & Contacts' },
      ],
    },
    {
      id: 'resources',
      label: 'Resources & Tools',
      icon: BookOpen,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-yellow-50',
      },
      items: [
        { id: 'r-1', label: 'Website Builder' },
        { id: 'r-2', label: 'DIY Projects' },
        { id: 'r-3', label: 'Honeymoon Planner' },
        { id: 'r-4', label: 'Printable Templates' },
        { id: 'r-5', label: 'Seating Chart Tool' },
        { id: 'r-6', label: 'Legal Requirements' },
      ],
    },
    {
      id: 'account',
      label: 'Account & Team',
      icon: UserCircle,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-stone-100',
      },
      items: [
        { id: 'a-1', label: 'User Profiles' },
        { id: 'a-2', label: 'Collaborators' },
        { id: 'a-3', label: 'Notifications' },
        { id: 'a-5', label: 'App Settings' },
        { id: 'a-6', label: 'Help Center' },
      ],
    },
    {
      id: 'footer',
      label: 'Legal',
      icon: Scale,
      colorTheme: {
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
        text: 'text-white',
        lightBg: 'bg-pink-50',
      },
      items: [
        { id: 'f-1', label: 'Privacy Policy' },
        { id: 'f-2', label: 'Terms of Service' },
        { id: 'f-3', label: 'Contact Support' },
      ],
    },
  ],
};
