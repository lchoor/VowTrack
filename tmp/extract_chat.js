const fs = require('fs');

const sourcePath = './src/app/components/HighFiPrototype.tsx';
let content = fs.readFileSync(sourcePath, 'utf8');

const startIndex = content.indexOf('// --- VowAI Chat Overlay Component ---');
const endIndex = content.indexOf('// --- GUEST LIST & SEATING CHART ---');

let chatCode = content.substring(startIndex, endIndex);

// Replace VowAI with Elsie Voyette
chatCode = chatCode.replace(/VowAI/g, 'Elsie');
chatCode = chatCode.replace(/vowai/g, 'elsie');
chatCode = chatCode.replace(/VOWAI/g, 'ELSIE');
chatCode = chatCode.replace(/Message Elsie\.\.\./g, 'Message Elsie Voyette...');

// We will also import necessary icons at the top
const fullFile = \`import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Sun, CloudRain, CloudSun, Thermometer, List, CreditCard, Clock, Calendar as CalendarIcon, Edit2, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

// Helper
const getElsieContext = (view?: string, intent?: string) => {
    switch(view) {
        case 'timeline': return { title: 'Timeline Planning', greeting: "Let's make sure your day flows perfectly. I've been reviewing the run of show—are we feeling good about the 5:00 PM ceremony time?", prompts: ["Draft Timeline", "Adjust Times", "Vendor Arrivals"], promptTitle: "Timeline Focus:" };
        case 'budget': return { title: 'Budget Review', greeting: "I'm looking at the latest vendor quotes. We're slightly under budget on florals, which is fantastic! Should we allocate that to the band or save it?", prompts: ["Save the extra", "Upgrade music", "Review breakdown"], promptTitle: "Budget Actions:" };
        case 'vendors': return { title: 'Vendor Management', greeting: "Your vendor team is shaping up beautifully! I have the latest proposal from the florist. Would you like to review it?", prompts: ["View Proposal", "Next Steps", "Contact Vendor"], promptTitle: "Vendor Actions:" };
        case 'guests': return { title: 'Guest Management', greeting: "We have 145 confirmed guests! I noticed a few haven't selected their meals. Would you like me to draft a gentle follow-up?", prompts: ["Draft Follow-up", "Seating Chart", "Dietary Needs"], promptTitle: "Guest Tasks:" };
        default: return { title: 'Wedding Planning', greeting: "Hello! I'm Elsie Voyette, your dedicated wedding planner. What shall we focus on today? We can refine the timeline, review vendor proposals, or finalize those beautiful design details.", prompts: ["Review Timeline", "Vendor Proposals", "Design Decisions"], promptTitle: "What's on your mind?" };
    }
};

\` + chatCode;

fs.writeFileSync('/tmp/elsie_base.tsx', fullFile);
console.log('Done');
