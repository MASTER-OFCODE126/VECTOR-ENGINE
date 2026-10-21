import React, { useState, useRef } from 'react';
import {
  Upload,
  FileCheck2,
  XCircle,
  Sparkles,
  Cpu,
  UserCheck,
  Target,
  CheckCircle2,
  MessageSquareCode,
  AlertOctagon,
  ShieldAlert,
  Zap,
  ShieldCheck,
  Award,
  Star,
  Rocket,
  Calendar,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function App() {
  // Form State Management
  const [file, setFile] = useState(null);
  const [selfDesc, setSelfDesc] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // UX Interaction States
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formError, setFormError] = useState('');

  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);
  const formRef = useRef(null);

  // File Handling
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      setFormError('Please upload a valid PDF document.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setFormError('File size exceeds the 10MB limit.');
      return;
    }
    setFormError('');
    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form Submission Simulator
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!file) {
  //     setFormError('Please attach your PDF Resume before submitting.');
  //     return;
  //   }
  //   if (!selfDesc.trim()) {
  //     setFormError('Please provide a brief self-description/profile.');
  //     return;
  //   }
  //   if (!jobDesc.trim()) {
  //     setFormError('Please provide the target job description.');
  //     return;
  //   }

  //   setFormError('');
  //   setLoading(true);

  //   // Simulate AI synthesis & vector parsing pipeline
  //   setTimeout(() => {
  //     setLoading(false);
  //     setShowResults(true);
  //     setTimeout(() => {
  //       resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  //     }, 100);
  //   }, 2000);
  // };

  const scrollToStudio = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d111a] text-slate-900 font-sans selection:bg-[#E11D48] selection:text-white antialiased">

      {/* Inject Google Fonts & Tailwind Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');

        .font-display { font-family: 'Syne', sans-serif; }
        .font-serifDisplay { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .glass-panel-light {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 30px 80px -15px rgba(0, 82, 255, 0.12),
                      0 0 30px -10px rgba(225, 29, 72, 0.08);
        }

        .glass-card-dark {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card-dark:hover {
          border-color: rgba(225, 29, 72, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(225, 29, 72, 0.25);
        }

        .glass-card-light {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card-light:hover {
          border-color: rgba(0, 82, 255, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(0, 82, 255, 0.15);
        }

        .gradient-text-hero {
          background: linear-gradient(135deg, #ffffff 10%, #93c5fd 50%, #f43f5e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .bg-grid-pattern-dark {
          background-size: 60px 60px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }

        .bg-grid-pattern-light {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
        }
      `}</style>

      {/* ==========================================
           1. HERO SECTION (DARK CYBERPUNK THEME)
           ========================================== */}
      <section className="relative bg-slate-950 text-white md:my-12 my-6 pt-16 pb-28 overflow-hidden z-10 border-b-2 border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark pointer-events-none z-0"></div>

        {/* Abstract Background Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mx-auto">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2400&q=80"
            alt="Technical Canvas Background"
            className="w-full h-full object-cover opacity-20 scale-105 filter blur-[2px] animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
        </div>

        {/* Dynamic Glow Orbs */}
        <div className="absolute top-10 -left-20 w-[500px] h-[500px] bg-[#0052FF]/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#E11D48]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-slate-900 border border-[#E11D48]/40 text-xs font-mono tracking-widest text-white mb-8 shadow-[0_0_20px_rgba(225,29,72,0.25)]">
            <span className="w-2 h-2 bg-[#E11D48] animate-ping"></span>
            <span className="text-[#E11D48] font-bold">GEN-AI.CORE v2.7</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">TACTICAL INTERVIEW ENGINE</span>
          </div>

          {/* Bold Display Headline */}
          <div className="flex flex-col items-center text-center font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] text-white uppercase mb-8 w-full">
            <h1>DOMINATE YOUR</h1>
            <span className="font-display italic tracking-tight text-[#E11D48] drop-shadow-[0_0_35px_rgba(225,29,72,0.4)]">
              TECHNICAL
            </span>
            <span className="font-display tracking-tight text-white">
              INTERVIEWS
            </span>
          </div>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed mb-10">
            Convert your resume and target job requirements into high-probability technical questions, critical gap analysis, and tailored strategy briefs in seconds.
          </p>

          {/* Action Trigger */}
          <div className="mb-14 flex justify-center">
            <Link to={'/interview'} className="inline-block">
              <button
                className="px-6 py-3.5 bg-gradient-to-r from-[#0052FF] via-blue-600 to-[#E11D48] hover:from-blue-700 hover:to-rose-700 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_25px_rgba(0,82,255,0.4)] hover:shadow-[0_12px_35px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                LAUNCH AI EVALUATION
              </button>
            </Link>
          </div>

          {/* Metric Counter Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 p-6 text-left border-l-4 border-l-[#0052FF]">
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-1">ACCURACY</p>
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-white">99.2%</p>
              <p className="text-[11px] text-[#0052FF] font-semibold mt-1">FAANG Vector Alignment</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 text-left border-l-4 border-l-[#E11D48]">
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-1">PARSER SPEED</p>
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#E11D48]">&lt; 0.5s</p>
              <p className="text-[11px] text-slate-300 font-semibold mt-1">Real-time PDF AST</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 text-left border-l-4 border-l-[#0052FF]">
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-1">REPORTS BUILT</p>
              <p className="font-display font-extrabold text-3xl sm:text-5xl text-white">190k+</p>
              <p className="text-[11px] text-[#0052FF] font-semibold mt-1">Helped Engineers</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 text-left border-l-4 border-l-[#E11D48]">
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-1">COMPENSATION</p>
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#E11D48]">+$25K</p>
              <p className="text-[11px] text-slate-300 font-semibold mt-1">Avg Salary Boost</p>
            </div>
          </div>

        </div>
      </section>


      {/* ==========================================
           2. ASSESSMENT STUDIO GLIMPSE
           ========================================== */}
      <section className="relative bg-slate-950 py-20 px-6 border-b-2 border-slate-800 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0052FF]/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E11D48]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF] font-mono text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 bg-[#0052FF] animate-pulse"></span>
              LIVE PLATFORM PREVIEW
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              INSIDE THE <span className="text-[#0052FF]">EVALUATION STUDIO</span>
            </h2>
            <p className="mt-4 text-slate-400 font-mono text-sm leading-relaxed">
              Experience the ultra-responsive cyberpunk tactical workspace where your resumes transform into actionable interview briefs.
            </p>
          </div>

          {/* Product Viewport Mockup / Container */}
          <div className="relative bg-slate-900 border-2 border-slate-700 shadow-[0_0_50px_rgba(0,82,255,0.2)] overflow-hidden">

            {/* Terminal Top Bar */}
            <div className="bg-slate-950 border-b-2 border-slate-800 px-4 py-3 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 bg-emerald-500 inline-block"></span>
                <span className="ml-4 text-slate-400 font-bold uppercase">GEN-AI.CORE // WORKSPACE_PREVIEW.jsx</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-slate-400">
                <span className="text-emerald-400 font-bold">● SYSTEM SECURE</span>
                <span>LATENCY: 14MS</span>
              </div>
            </div>

            {/* Product Viewport Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 p-6 md:p-8 gap-6 items-center bg-slate-950/80">

              {/* Left Column: Feature Highlights */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[#0052FF] font-mono text-xs font-bold tracking-wider">01 // AST RESUME PARSER</span>
                  <h3 className="text-white font-display font-bold text-xl uppercase tracking-tight">Instant Skill Matrix Extraction</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                    Upload your resume and job description to instantly map competency deficits and high-probability challenge vectors.
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-4">
                  <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider">02 // ADAPTIVE ROADMAPS</span>
                  <h3 className="text-white font-display font-bold text-xl uppercase tracking-tight">5-Day Execution Timeline</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                    Follow an ambient laser-tracked preparation schedule designed to bridge critical skill gaps before zero hour.
                  </p>
                </div>

                <div className="pt-2">
                  <Link to="/interview" className="inline-flex items-center gap-2 px-5 py-3 bg-[#0052FF] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-[0_0_15px_rgba(0,82,255,0.4)]">
                    <span>ENTER STUDIO</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High-Tech UI Interface Preview Box */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-700 p-5 md:p-6 shadow-inner relative">

                {/* Decorative Corner Brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#0052FF]"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#0052FF]"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#0052FF]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#0052FF]"></div>

                {/* Simulated App Screen Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0052FF]/20 border border-[#0052FF] flex items-center justify-center text-[#0052FF] font-bold text-xs">AI</div>
                    <div>
                      <p className="text-white font-display font-black text-sm uppercase">Full-Stack Assessment Brief</p>
                      <p className="text-slate-400 font-mono text-[10px]">Target: Senior React / Node Engineer</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">85% MATCH</span>
                </div>

                {/* Simulated Tabs */}
                <div className="grid grid-cols-4 gap-2 mb-4 font-mono text-[10px] text-center font-bold">
                  <div className="py-2 bg-[#0052FF]/20 text-[#0052FF] border border-[#0052FF]/40">01. TECH</div>
                  <div className="py-2 bg-slate-950 text-slate-400 border border-slate-800">02. BEH</div>
                  <div className="py-2 bg-slate-950 text-slate-400 border border-slate-800">03. GAPS</div>
                  <div className="py-2 bg-slate-950 text-slate-400 border border-slate-800">04. ROADMAP</div>
                </div>

                {/* Simulated Question Card */}
                <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-[#0052FF]">QUESTION 01</span>
                    <span className="text-slate-400">INTENTION: STATE ARCHITECTURE</span>
                  </div>
                  <p className="text-white text-xs md:text-sm font-bold font-sans">
                    "Explain how state management works in React and when you would use Context API versus Redux Toolkit?"
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-sans">
                    <span className="text-slate-400 font-mono block text-[10px] uppercase mb-0.5">Strategy Brief:</span>
                    Discuss local state with useState, lifting state up, and avoiding prop drilling for medium-scale apps...
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
      <section className="relative bg-[#0d111a] text-white py-24 z-10 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern-dark pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E11D48]/20 border border-[#E11D48]/40 text-[#E11D48] font-mono text-xs mb-3 font-bold">
              <ShieldAlert className="w-4 h-4" />
              THE ARCHITECTURE
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              FOUR PILLARS OF PREPMIND
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="glass-card-dark p-8 rounded-3xl relative">
              <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/20 text-[#0052FF] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF] font-mono text-[10px] uppercase font-bold">PILLAR 01</span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">Resume Match Analysis</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Deconstructs your experience against target Job Descriptions using multidimensional vector embeddings.
              </p>
            </div>

            <div className="glass-card-dark p-8 rounded-3xl relative">
              <div className="w-12 h-12 rounded-2xl bg-[#E11D48]/20 text-[#E11D48] flex items-center justify-center mb-6">
                <MessageSquareCode className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] font-mono text-[10px] uppercase font-bold">PILLAR 02</span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">AI Question Generator</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Synthesizes exact technical coding, system design, and behavioral questions tailored to company loops.
              </p>
            </div>

            <div className="glass-card-dark p-8 rounded-3xl relative">
              <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/20 text-[#0052FF] flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF] font-mono text-[10px] uppercase font-bold">PILLAR 03</span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">Skill Gap Finder</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Flags dangerous blindspots in system design, algorithms, or infrastructure before interviewers do.
              </p>
            </div>

            <div className="glass-card-dark p-8 rounded-3xl relative">
              <div className="w-12 h-12 rounded-2xl bg-[#E11D48]/20 text-[#E11D48] flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] font-mono text-[10px] uppercase font-bold">PILLAR 04</span>
              <h3 className="font-display font-bold text-xl text-white mt-3 mb-2">5-Day Action Plan</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Builds a daily tactical sprint roadmap to eliminate weaknesses prior to interview day.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ==========================================
           4. SOCIAL PROOF / METRICS (LIGHT THEME #f1f5f9)
           ========================================== */}
      <section className="relative bg-[#f1f5f9] text-slate-900 py-24 z-10 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF] font-mono text-xs mb-3 font-bold">
              <Award className="w-4 h-4" />
              PROVEN RESULTS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-slate-900 uppercase tracking-tight">
              TRUSTED BY TOP ENGINEERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="glass-card-light p-8 rounded-3xl relative">
              <div className="flex items-center gap-1 text-[#E11D48] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-base italic leading-relaxed mb-6">
                "PrepMind predicted 4 out of 5 exact architecture questions in my Meta Senior Staff loop. The gap analysis saved me weeks of unnecessary grinding."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-[#0052FF] text-white font-bold flex items-center justify-center font-mono text-sm">
                  AR
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Alex Rivera</p>
                  <p className="text-xs text-slate-500 font-mono">Senior Backend Engineer @ Meta</p>
                </div>
              </div>
            </div>

            <div className="glass-card-light p-8 rounded-3xl relative">
              <div className="flex items-center gap-1 text-[#E11D48] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-base italic leading-relaxed mb-6">
                "The PDF resume AST parser matched my background against Google's job description flawlessly. Negotiated an extra $55k total comp."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-[#E11D48] text-white font-bold flex items-center justify-center font-mono text-sm">
                  SL
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Sarah Lin</p>
                  <p className="text-xs text-slate-500 font-mono">L6 Staff Software Engineer @ Google</p>
                </div>
              </div>
            </div>

            <div className="glass-card-light p-8 rounded-3xl relative md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-1 text-[#E11D48] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-base italic leading-relaxed mb-6">
                "I went from getting rejected at round 1 to clearing 3 offers simultaneously. The tactical question probability score is unmatched."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center font-mono text-sm">
                  MK
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Marcus Chen</p>
                  <p className="text-xs text-slate-500 font-mono">Full Stack Lead @ Stripe</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==========================================
           5. CTA & FOOTER (MEDIUM-DARK THEME #0d111a)
           ========================================== */}
      <section className="relative bg-[#0d111a] text-white py-24 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight mb-6">
            READY TO LAND YOUR <span className="text-[#E11D48]">DREAM ROLE?</span>
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Run your first AI assessment brief in less than 30 seconds.
          </p>
          <Link to={'/pricing'} className="inline-block">
            <button
              className="inline-flex items-center gap-2 sm:gap-3 py-4 sm:py-5 px-8 sm:px-10 bg-gradient-to-r from-[#0052FF] via-blue-600 to-[#E11D48] hover:from-blue-700 hover:to-rose-700 text-white font-display font-black text-xs sm:text-sm md:text-base uppercase tracking-widest border-2 border-slate-700 shadow-[0_0_30px_rgba(0,82,255,0.5)] hover:shadow-[0_0_45px_rgba(225,29,72,0.7)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer whitespace-nowrap"
            >
              <Rocket className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>VIEW PRICING</span>
            </button>
          </Link>
        </div>
      </section>

      {/* ==========================================
           FOOTER (DARK CYBERPUNK THEME)
           ========================================== */}
      <footer className="border-t-2 border-slate-800 py-10 relative z-10 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E11D48] shadow-[0_0_10px_#E11D48]"></span>
            <span className="text-white font-bold tracking-wider">GEN-AI.CORE</span>
            <span>— TACTICAL CAREER ENGINE</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-emerald-400 font-bold">● SYSTEM OPERATIONAL</span>
            <p>© 2026 ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}