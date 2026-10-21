// src/features/interview/components/ReportView.jsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Cpu,
    CheckCircle2,
    MessageSquareCode,
    UserCheck,
    AlertOctagon,
    Calendar,
    ArrowLeft
} from 'lucide-react';

const ReportView = ({ assessmentData, onNewRun, onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('technical');
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollContainerRef = useRef(null);

    // Safely normalize data structure
    const techQuestions = assessmentData?.technicalQuestions || assessmentData?.technicalQuestion || [];
    const behQuestions = assessmentData?.behaviouralQuestions || assessmentData?.behaviouralQuestion || [];
    const gaps = assessmentData?.skillgaps || assessmentData?.skillGaps || [];
    const prepPlan = assessmentData?.preparationPlan || [];

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const totalScroll = scrollHeight - clientHeight;
        if (totalScroll > 0) {
            setScrollProgress((scrollTop / totalScroll) * 100);
        }
    };

    return (
        <div className="wrapper h-screen w-full  flex items-center justify-center ">
            <div className="w-full max-w-6xl mx-auto   bg-slate-950 border-2 border-slate-800 relative shadow-[0_0_80px_rgba(0,82,255,0.2)] flex flex-col h-[88vh] overflow-hidden">

                {/* AMBIENT BACKGROUND GLOW DEPTH ELEMENTS */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0052FF]/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#06B6D4]/15 rounded-full blur-[120px] pointer-events-none" />

                {/* CYBERPUNK HUD CORNER BRACKETS */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#06B6D4] z-20 pointer-events-none"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#06B6D4] z-20 pointer-events-none"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#06B6D4] z-20 pointer-events-none"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#06B6D4] z-20 pointer-events-none"></div>

                {/* 1. REFINED HEADER BAR */}
                <div className="bg-slate-950/90  backdrop-blur-xl border-b-2 border-slate-800 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 relative z-10">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-12 h-12 bg-[#0052FF]/15 border border-[#0052FF]/60 flex items-center justify-center text-[#0052FF] shadow-[0_0_20px_rgba(0,82,255,0.4)] shrink-0">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> SYNTHESIS SUCCESSFUL
                            </div>
                            <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight truncate">
                                {assessmentData?.title || 'SENIOR FULL-STACK REACT & NODE.JS ENGINEER'}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 border border-slate-800">
                            <span className="font-display font-black text-2xl text-[#06B6D4]">
                                {assessmentData?.matchScore || 75}%
                            </span>
                            <div className="text-left font-mono text-[10px] leading-tight">
                                <p className="text-slate-400 uppercase font-bold">MATCH MATRIX</p>
                                <p className="text-[#E11D48] font-black">HIGH FIT</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 font-mono text-xs font-bold">
                            <button
                                onClick={() => (onBack ? onBack() : navigate(-1))}
                                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4 text-slate-400" />
                                <span>BACK</span>
                            </button>

                            {onNewRun && (
                                <button
                                    onClick={onNewRun}
                                    className="px-5 py-2.5 bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-black tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(0,82,255,0.5)]"
                                >
                                    NEW RUN
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. NAVIGATION TABS MENU */}
                <div className="bg-slate-950/90 backdrop-blur-xl border-b-2 border-slate-800 grid grid-cols-2 md:grid-cols-4 shrink-0 font-mono text-xs font-bold relative z-10">
                    <button
                        onClick={() => setActiveTab('technical')}
                        className={`py-4 px-4 border-r border-slate-800 transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase ${activeTab === 'technical'
                                ? 'bg-[#0052FF]/20 text-[#0052FF] border-b-4 border-b-[#0052FF] font-black'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                    >
                        <MessageSquareCode className="w-4 h-4 shrink-0" />
                        <span className="truncate">01. TECHNICAL ({techQuestions.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('behavioral')}
                        className={`py-4 px-4 border-r border-slate-800 transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase ${activeTab === 'behavioral'
                                ? 'bg-emerald-500/20 text-emerald-400 border-b-4 border-b-emerald-500 font-black'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                    >
                        <UserCheck className="w-4 h-4 shrink-0" />
                        <span className="truncate">02. BEHAVIORAL ({behQuestions.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('gaps')}
                        className={`py-4 px-4 border-r border-slate-800 transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase ${activeTab === 'gaps'
                                ? 'bg-[#E11D48]/20 text-[#E11D48] border-b-4 border-b-[#E11D48] font-black'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                    >
                        <AlertOctagon className="w-4 h-4 shrink-0" />
                        <span className="truncate">03. SKILL GAPS ({gaps.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('plan')}
                        className={`py-4 px-4 transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase ${activeTab === 'plan'
                                ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-b-4 border-b-[#06B6D4] font-black'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                    >
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span className="truncate">04. 4 DAY ROADMAP</span>
                    </button>
                </div>

                {/* 3. SCROLLABLE CONTENT AREA WITH HIGH-CONTRAST FROSTED CARDS */}
                <div
                    onScroll={handleScroll}
                    ref={scrollContainerRef}
                    className="p-6 md:p-8 overflow-y-auto flex-1 bg-slate-900/60 backdrop-blur-md relative z-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700"
                >

                    {/* TAB 1: TECHNICAL */}
                    {activeTab === 'technical' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <div className="mb-2">
                                <h4 className="font-mono text-xs text-[#06B6D4] uppercase font-bold tracking-widest">HIGH-PROBABILITY TECHNICAL VECTORS</h4>
                                <p className="text-slate-300 text-sm mt-1 font-mono">Targeted technical challenge questions extracted from target position criteria.</p>
                            </div>
                            {techQuestions.map((item, idx) => (
                                <div key={idx} className="bg-slate-950/90 border border-slate-800 p-6 sm:p-7 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                                        <span className="text-[#0052FF] font-mono text-xs font-bold tracking-wider uppercase">
                                            QUESTION 0{idx + 1}
                                        </span>
                                        <span className="px-3 py-1 bg-[#0052FF]/15 text-[#0052FF] text-[11px] font-mono font-bold border border-[#0052FF]/30">
                                            INTENTION: {item.intention}
                                        </span>
                                    </div>
                                    <p className="text-white text-base sm:text-lg font-bold font-sans leading-snug">
                                        "{item.question}"
                                    </p>
                                    <div className="pt-3 border-t border-slate-800/80">
                                        <p className="font-mono text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">
                                            RECOMMENDED RESPONSE STRATEGY:
                                        </p>
                                        <p className="text-slate-300 text-sm leading-relaxed font-sans">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB 2: BEHAVIORAL */}
                    {activeTab === 'behavioral' && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <div className="mb-2">
                                <h4 className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest">BEHAVIORAL &amp; SITUATIONAL VECTORS</h4>
                                <p className="text-slate-300 text-sm mt-1 font-mono">Scenarios designed to test leadership, collaboration, and engineering resilience.</p>
                            </div>
                            {behQuestions.map((item, idx) => (
                                <div key={idx} className="bg-slate-950/90 border border-emerald-950/60 p-6 sm:p-7 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                                        <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase">
                                            BEHAVIORAL Q0{idx + 1}
                                        </span>
                                        <span className="px-3 py-1 bg-emerald-500/15 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/30">
                                            {item.intention}
                                        </span>
                                    </div>
                                    <p className="text-white text-base sm:text-lg font-bold font-sans leading-snug">
                                        "{item.question}"
                                    </p>
                                    <div className="pt-3 border-t border-slate-800/80">
                                        <p className="font-mono text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">
                                            FRAMEWORK GUIDE:
                                        </p>
                                        <p className="text-slate-300 text-sm leading-relaxed font-sans">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB 3: SKILL GAPS */}
                    {activeTab === 'gaps' && (
                        <div className="space-y-4 max-w-5xl mx-auto">
                            <div className="mb-2">
                                <h4 className="font-mono text-xs text-[#E11D48] uppercase font-bold tracking-widest">DETECTED SKILL GAPS &amp; VULNERABILITIES</h4>
                                <p className="text-slate-300 text-sm mt-1 font-mono">Critical competencies identified for remediation prior to deployment.</p>
                            </div>
                            <div className="space-y-3 font-mono text-xs">
                                {gaps.map((gap, idx) => (
                                    <div key={idx} className="p-5 bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                                        <div>
                                            <span className="text-white font-extrabold text-base font-sans block mb-1">{gap.skill}</span>
                                            <span className="text-slate-400 text-xs">Identified variance from target job description index.</span>
                                        </div>
                                        <span className={`px-3 py-1.5 rounded font-black text-xs uppercase self-start sm:self-auto shrink-0 border ${gap.severity === 'high' ? 'bg-[#E11D48]/20 text-[#E11D48] border-[#E11D48]/40' :
                                                gap.severity === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                                    'bg-[#0052FF]/20 text-[#0052FF] border-[#0052FF]/40'
                                            }`}>
                                            {gap.severity} SEVERITY
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: ROADMAP */}
                    {activeTab === 'plan' && (
                        <div className="space-y-8 max-w-5xl mx-auto py-2">
                            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <h4 className="font-mono text-xs text-[#06B6D4] uppercase font-bold tracking-widest flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shadow-[0_0_12px_#06B6D4] animate-pulse"></span>
                                        SEQUENTIAL EXECUTION ROADMAP
                                    </h4>
                                    <p className="text-slate-300 text-sm mt-1 font-mono">
                                        Systematic daily vector milestones to bridge skill gaps before evaluation.
                                    </p>
                                </div>
                                <div className="px-4 py-1.5 bg-[#06B6D4]/15 border border-[#06B6D4]/40 text-[#06B6D4] font-mono text-xs font-bold shrink-0">
                                    TIMELINE PROGRESS: {Math.round(scrollProgress)}%
                                </div>
                            </div>

                            <div className="relative pl-12 sm:pl-16 space-y-8">
                                <div className="absolute left-[23px] sm:left-[31px] top-6 bottom-6 w-1 bg-slate-800 -translate-x-1/2 pointer-events-none"></div>
                                <div
                                    className="absolute left-[23px] sm:left-[31px] top-6 w-1 -translate-x-1/2 bg-gradient-to-b from-[#0052FF] via-[#06B6D4] to-[#E11D48] shadow-[0_0_15px_#06B6D4] pointer-events-none transition-all duration-150 ease-out"
                                    style={{ height: `${Math.max(scrollProgress, 5)}%` }}
                                ></div>

                                {prepPlan.map((plan, idx) => {
                                    const threshold = prepPlan.length > 1 ? (idx / (prepPlan.length - 1)) * 80 : 0;
                                    const isActive = scrollProgress >= threshold;

                                    return (
                                        <div key={idx} className="relative group">
                                            <div
                                                className={`absolute -left-[35px] sm:-left-[44px] top-6 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 flex items-center justify-center z-20 transition-all duration-300 ${isActive
                                                        ? 'bg-[#0052FF] border-2 border-white shadow-[0_0_20px_#0052FF]'
                                                        : 'bg-slate-900 border-2 border-slate-700'
                                                    }`}
                                            >
                                                <span className="-rotate-45 font-mono text-xs font-black text-white">
                                                    0{plan.day}
                                                </span>
                                            </div>

                                            <div className={`bg-slate-950/95 border p-6 sm:p-7 transition-all duration-300 relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${isActive
                                                    ? 'border-[#0052FF] shadow-[0_0_25px_rgba(0,82,255,0.25)]'
                                                    : 'border-slate-800 opacity-90 hover:opacity-100'
                                                }`}>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-3 py-1 bg-[#0052FF] text-white font-display font-black text-xs uppercase tracking-wider">
                                                            DAY 0{plan.day}
                                                        </span>
                                                        <h5 className="font-display font-black text-white text-base uppercase tracking-tight">{plan.focus}</h5>
                                                    </div>
                                                    <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest bg-slate-900 px-3 py-1 border border-slate-800">
                                                        PHASE 0{plan.day} / 05
                                                    </span>
                                                </div>

                                                <ul className="space-y-3">
                                                    {(plan.tasks || []).map((task, tIdx) => (
                                                        <li key={tIdx} className="text-sm text-slate-300 flex items-start gap-3 font-sans">
                                                            <span className="w-2 h-2 rounded-full bg-[#0052FF] mt-1.5 shrink-0 shadow-[0_0_8px_#0052FF]"></span>
                                                            <span className="leading-relaxed font-medium">{task}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportView;