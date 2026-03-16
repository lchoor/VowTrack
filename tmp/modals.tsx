const WeddingSettingsModal = ({ onClose }: { onClose: () => void }) => {
    const [tab, setTab] = useState('wedding');
    const [toggles, setToggles] = useState({ bridal: true, groom: true, partner: false });

    const tabs = [
        { id: 'wedding', label: 'The Wedding', icon: <span className="text-[16px]">🏠</span> },
        { id: 'style', label: 'Style & Vision', icon: <span className="text-[16px]">🌟</span> },
        { id: 'suites', label: 'Suites', icon: <span className="text-[16px]">💌</span> },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[800px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <span className="text-[14px]">💍</span>
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
        { id: 'account', label: 'Account', icon: <span className="text-[16px]">🔒</span> },
        { id: 'security', label: 'Security', icon: <span className="text-[16px]">🛡️</span> },
        { id: 'data', label: 'Data', icon: <span className="text-[16px]">📦</span> },
        { id: 'billing', label: 'Billing', icon: <span className="text-[16px]">💳</span> },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-[800px] bg-[#FAF8F5] flex flex-col overflow-hidden relative shadow-2xl rounded-[32px] my-auto shrink-0">
                {/* Header */}
                <div className="h-[72px] bg-[#FAF8F5] border-b border-[#E8E3DA] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#E8E3DA] flex items-center justify-center bg-[#F3EFE6]">
                            <SettingsIcon size={14} className="text-[#1E293B]" />
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
                                                    <p className="text-[12px] text-[#8C857B]">VowAI uses your data to improve recommendations</p>
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
                                                <p className="text-[14px] text-[#475569] flex items-center gap-2"><Sparkles size={14} className="text-[#8C857B] shrink-0" /> VowAI Smart Advisor</p>
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
