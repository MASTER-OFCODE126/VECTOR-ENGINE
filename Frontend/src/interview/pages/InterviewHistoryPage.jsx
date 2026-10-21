import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Cpu,
    User,
    ChevronRight,
    AlertOctagon,
    Sparkles,
    ArrowLeft,
    Layers,
    Clock
} from 'lucide-react';
import { getAllInterviewReports } from '../services/interview.api';

const InterviewHistoryPage = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Client-side cache to keep track of fetched report IDs
    const [cachedIds, setCachedIds] = useState([]);

    useEffect(() => {
        const fetchAllReports = async () => {
            try {
                setLoading(true);
                const response = await getAllInterviewReports();

                // Set reports and username from API response
                const fetchedReports = response?.InterviewReports || [];
                setReports(fetchedReports);
                setUsername(response?.user || 'COMMANDER');

                // Pre-populate cached IDs array
                const ids = fetchedReports.map(r => r._id);
                setCachedIds(ids);
            } catch (err) {
                console.error("Failed to fetch interview history:", err);
                setError(err?.response?.data?.message || "Failed to load report history.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllReports();
    }, []);

    const handleViewFullReport = (reportId) => {
        // ID is already present in cachedIds array, proceed straight to route navigation
        if (!cachedIds.includes(reportId)) {
            setCachedIds(prev => [...prev, reportId]);
        }
        navigate(`/interview/report/${reportId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-slate-400 gap-3">
                <div className="w-8 h-8 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin"></div>
                <span className="tracking-widest uppercase font-bold text-[#0052FF]">QUERYING REPORT ARCHIVES...</span>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Embedded Brutalist Fonts & Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');
                .font-display { font-family: 'Syne', sans-serif; }
                .font-sans { font-family: 'Space Grotesk', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }
                .bg-grid-dark {
                    background-size: 40px 40px;
                    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                }
            `}</style>

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-grid-dark pointer-events-none"></div>

            {/* Ambient High-Contrast Glowing Orbs */}
            <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-[#0052FF]/15 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[#E11D48]/15 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto w-full relative z-10 space-y-10">

                {/* HEADER BAR WITH USER IDENTITY */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-slate-700 text-[#0052FF] font-mono text-xs font-bold mb-3 tracking-widest uppercase">
                            <Layers className="w-4 h-4 text-[#0052FF]" />
                            HISTORICAL EVALUATION ARCHIVE
                        </div>
                        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                            TACTICAL REPORT INDEX
                        </h1>
                    </div>

                    {/* USER PROFILE BADGE */}
                    <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl p-3.5 px-5 rounded-2xl border border-slate-700 shadow-xl self-start md:self-auto">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#E11D48] p-[1px] flex items-center justify-center">
                            <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-white">
                                <User className="w-5 h-5 text-[#0052FF]" />
                            </div>
                        </div>
                        <div className="font-mono">
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">AUTHENTICATED OPERATOR</p>
                            <p className="text-sm font-bold text-white uppercase tracking-wider">{username}</p>
                        </div>
                    </div>
                </div>

                {/* ERROR STATE */}
                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-semibold flex items-center gap-3">
                        <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* EMPTY STATE */}
                {!loading && reports.length === 0 && !error && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                        <Cpu className="w-12 h-12 text-slate-600 mx-auto" />
                        <h3 className="font-display font-bold text-xl text-white uppercase">NO REPORTS FOUND</h3>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">
                            No evaluation briefs found in your database archive. Run a new assessment to populate metrics.
                        </p>
                        <button
                            onClick={() => navigate('/interview')}
                            className="px-6 py-3 bg-[#0052FF] text-white font-mono text-xs font-bold rounded-xl hover:bg-blue-600 transition-all uppercase tracking-widest inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" /> LAUNCH NEW RUNNER
                        </button>
                    </div>
                )}

                {/* REPORTS GRID / CARDS */}
                <div className="grid grid-cols-1 gap-6">
                    {reports.map((report, idx) => {
                        const gaps = report?.skillgaps || report?.skillGaps || [];

                        return (
                            <div
                                key={report._id || idx}
                                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,82,255,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
                            >
                                {/* LEFT COLUMN: REPORT DETAILS & MATCH SCORE */}
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="px-3 py-1 rounded-full bg-[#0052FF]/15 border border-[#0052FF]/30 text-[#0052FF] font-mono text-xs font-bold flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            MATCH MATRIX: {report.matchScore}%
                                        </div>

                                        {/* 🕒 FORMATTED DAY, TIME (HRS & MINS) */}
                                        <div className="text-slate-400 font-mono text-xs flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/60">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span>
                                                {(() => {
                                                    const d = new Date(report.createdAt || report.date || Date.now());
                                                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                                                    const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                                                    return `${dayName} • ${timeStr}`;
                                                })()}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight group-hover:text-[#0052FF] transition-colors">
                                            {report.title || `Tactical Assessment Brief #${idx + 1}`}
                                        </h3>
                                        <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
                                            Synthesized skill evaluation profile generated for target position criteria.
                                        </p>
                                    </div>

                                    {/* SKILL GAPS PREVIEW BADGES */}
                                    {gaps.length > 0 && (
                                        <div className="pt-2">
                                            <p className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">
                                                DETECTED SKILL GAPS ({gaps.length})
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {gaps.slice(0, 3).map((gap, gIdx) => (
                                                    <span
                                                        key={gIdx}
                                                        className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border ${gap.severity === 'high'
                                                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                            }`}
                                                    >
                                                        {gap.skill}
                                                    </span>
                                                ))}
                                                {gaps.length > 3 && (
                                                    <span className="px-2.5 py-1 rounded-md font-mono text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                                                        +{gaps.length - 3} MORE
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT COLUMN: ACTION BUTTON */}
                                <div className="shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800 flex items-center justify-end">
                                    <button
                                        onClick={() => handleViewFullReport(report._id)}
                                        className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-display font-extrabold text-xs uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <span>VIEW FULL REPORT</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* BOTTOM BACK NAVIGATION */}
                <div className="pt-6">
                    <button
                        onClick={() => navigate('/interview')}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> BACK TO AI ASSESSMENT STUDIO
                    </button>
                </div>

            </div>
        </section>
    );
};

export default InterviewHistoryPage;