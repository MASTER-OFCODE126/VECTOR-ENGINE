// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Cpu, Terminal, History, Tag, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/auth';

const Navbar = ({ username = 'COMMANDER' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, handleLogout } = useAuth();
    
    if (user) username = user.username;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isActive = (path) => location.pathname === path;

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onLogoutClick = async () => {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
        await handleLogout();
        navigate('/login');
    };

    return (
        <nav className="w-full bg-slate-950/90 backdrop-blur-2xl border-b-2 border-slate-800 fixed top-0 z-50 px-4 sm:px-8 py-3.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* BRAND LOGO & TITLE */}
                <div 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-[#0052FF]/15 border border-[#0052FF]/40 flex items-center justify-center text-[#0052FF] shadow-[0_0_15px_rgba(0,82,255,0.3)] transition-transform group-hover:scale-105">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#0052FF] font-bold tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] animate-pulse"></span>
                            TACTICAL INTERVIEW ENGINE
                        </div>
                        <h2 className="font-display font-black text-white text-base sm:text-lg uppercase tracking-tight">
                            GEN-AI<span className="text-[#0052FF]">.CORE</span>
                        </h2>
                    </div>
                </div>

                {/* DESKTOP NAV LINKS */}
                <div className="hidden md:flex items-center gap-3 font-mono text-xs font-bold">
                    <button
                        onClick={() => navigate('/interview')}
                        className={`px-4 py-2 transition-all flex items-center gap-2 cursor-pointer ${
                            isActive('/interview')
                                ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                        }`}
                    >
                        <Terminal className="w-4 h-4" />
                        <span>STUDIO RUNNER</span>
                    </button>

                    <button
                        onClick={() => navigate('/interview/history')}
                        className={`px-4 py-2 transition-all flex items-center gap-2 cursor-pointer ${
                            isActive('/interview/history')
                                ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                        }`}
                    >
                        <History className="w-4 h-4" />
                        <span>HISTORY ARCHIVE</span>
                    </button>

                    <Link
                        to="/pricing"
                        className={`px-4 py-2 transition-all flex items-center gap-2 cursor-pointer ${
                            isActive('/pricing')
                                ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                        }`}
                    >
                        <Tag className="w-4 h-4" />
                        <span>PRICING MATRIX</span>
                    </Link>
                </div>

                {/* USER BADGE WITH DROPDOWN MENU & MOBILE TOGGLE */}
                <div className="flex items-center gap-3">
                    
                    {/* DESKTOP USER DROPDOWN MENU */}
                    <div className="hidden sm:relative sm:block" ref={dropdownRef}>
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800/80 px-3.5 py-1.5 border border-slate-800 font-mono cursor-pointer transition-colors"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]"></div>
                            <span className="text-[11px] text-slate-300 font-bold uppercase">{username}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* DESKTOP DROPDOWN MENU PANEL */}
                        {userDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-950 border-2 border-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-50 font-mono text-xs">
                                <div className="p-3 border-b border-slate-800 bg-slate-900/50">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">OPERATOR ID</div>
                                    <div className="text-white font-bold truncate uppercase">{username}</div>
                                </div>
                                <button
                                    onClick={onLogoutClick}
                                    className="w-full text-left px-3.5 py-2.5 text-[#E11D48] hover:bg-[#E11D48]/10 hover:text-rose-400 flex items-center gap-2 font-bold cursor-pointer transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>ABORT SESSION</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 bg-slate-900 text-slate-300 border border-slate-800 hover:text-white cursor-pointer"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {mobileMenuOpen && (
                <div className="md:hidden pt-4 pb-2 border-t border-slate-800 mt-3 flex flex-col gap-2 font-mono text-xs font-bold animate-fadeIn">
                    <div className="px-3 py-2 bg-slate-900/60 border border-slate-800/80 mb-1 flex items-center justify-between text-slate-400">
                        <span>OPERATOR:</span>
                        <span className="text-white uppercase">{username}</span>
                    </div>

                    <button
                        onClick={() => { navigate('/interview'); setMobileMenuOpen(false); }}
                        className={`w-full py-3 px-4 transition-all flex items-center gap-2.5 ${
                            isActive('/interview')
                                ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                                : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                    >
                        <Terminal className="w-4 h-4" />
                        <span>STUDIO RUNNER</span>
                    </button>

                    <button
                        onClick={() => { navigate('/interview/history'); setMobileMenuOpen(false); }}
                        className={`w-full py-3 px-4 transition-all flex items-center gap-2.5 ${
                            isActive('/interview/history')
                                ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                                : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                    >
                        <History className="w-4 h-4" />
                        <span>HISTORY ARCHIVE</span>
                    </button>

                    <Link
                        to="/pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full py-3 px-4 transition-all flex items-center gap-2.5 ${
                            isActive('/pricing')
                                ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                                : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                    >
                        <Tag className="w-4 h-4" />
                        <span>PRICING MATRIX</span>
                    </Link>

                    {/* MOBILE LOGOUT BUTTON */}
                    <button
                        onClick={onLogoutClick}
                        className="w-full py-3 px-4 bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/40 hover:bg-[#E11D48]/20 flex items-center gap-2.5 mt-2 transition-all cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>ABORT SESSION // LOGOUT</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;