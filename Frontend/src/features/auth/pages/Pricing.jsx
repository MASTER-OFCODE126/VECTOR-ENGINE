// src/pages/Pricing.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, CheckCircle2, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            id: 'recon',
            name: 'STARTER RECON',
            badge: 'BASIC VECTOR',
            priceMonthly: '$0',
            priceAnnual: '$0',
            period: 'FREE FOREVER',
            description: 'Essential interview parsing for early-stage career operators and students.',
            accentColor: 'border-slate-800 hover:border-slate-700',
            badgeBg: 'bg-slate-900 border-slate-700 text-slate-300',
            buttonStyle: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700',
            popular: false,
            features: [
                '3 AI Interview Runs / Month',
                'Basic Resume AST Parser',
                'Top 5 Technical Questions Generator',
                '3-Day Preparation Roadmap',
                'Standard Evaluation Latency (< 2.0s)'
            ]
        },
        {
            id: 'pro',
            name: 'TACTICAL PRO',
            badge: 'MOST POPULAR',
            priceMonthly: '$29',
            priceAnnual: '$22',
            period: '/ MONTH',
            description: 'Unrestricted evaluation engine designed for active job hunters targeting FAANG / Tier-1 roles.',
            accentColor: 'border-[#0052FF] shadow-[0_0_35px_rgba(0,82,255,0.25)]',
            badgeBg: 'bg-[#0052FF]/20 border-[#0052FF]/50 text-[#0052FF]',
            buttonStyle: 'bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white shadow-[0_0_20px_rgba(0,82,255,0.4)]',
            popular: true,
            features: [
                'Unlimited AI Interview Runs',
                'Deep Resume vs JD AST Match Index',
                'Full 15+ Tech & Behavioral Questions',
                'Critical Skill Gap Matrix & Vulnerability Alert',
                'Complete 5-Day Sequential Roadmap',
                'Sub-Second Realtime Generation (< 0.5s)',
                'Priority Cached History Tracking'
            ]
        },
        {
            id: 'enterprise',
            name: 'ENTERPRISE CORE',
            badge: 'MAXIMUM IMPACT',
            priceMonthly: '$92',
            priceAnnual: '$71',
            period: '/ MONTH',
            description: 'Dedicated high-throughput pipeline for bootcamps, agencies, and career coaches.',
            accentColor: 'border-slate-800 hover:border-[#E11D48]/60',
            badgeBg: 'bg-[#E11D48]/20 border-[#E11D48]/50 text-[#E11D48]',
            buttonStyle: 'bg-[#E11D48] hover:bg-rose-700 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]',
            popular: false,
            features: [
                'Multi-Seat Operator Licenses (Up to 10)',
                'Custom Vector Training & Job Role Models',
                'Export Detailed PDF Strategy Briefs',
                'API Access for Automated Parsing',
                'Dedicated SLA & 1-on-1 Strategy Coach',
                'Infinite History Caching & Analytics'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#0052FF] selection:text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Background Grid Pattern & Glowing Ambient Orbs */}
            <div className="absolute inset-0 bg-grid-pattern-dark pointer-events-none opacity-40 z-0"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0052FF]/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#E11D48]/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-900 border border-[#0052FF]/40 text-[#0052FF] font-mono text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-3.5 h-3.5 text-[#0052FF]" /> TACTICAL DEPLOYMENT TIERS
                    </div>
                    
                    <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-tight">
                        TRANSPARENT <span className="text-[#0052FF] drop-shadow-[0_0_25px_rgba(0,82,255,0.5)]">COMPUTE</span> PRICING
                    </h1>

                    <p className="mt-4 text-slate-400 font-mono text-sm leading-relaxed sm:text-base">
                        Select your operational capacity. Upgrade or adjust your tactical vector subscriptions anytime.
                    </p>

                    {/* Billing Toggle Switch */}
                    <div className="mt-8 inline-flex items-center gap-3 bg-slate-900 p-1.5 border border-slate-800">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-5 py-2 font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                                !isAnnual 
                                    ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            MONTHLY BILLING
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-5 py-2 font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
                                isAnnual 
                                    ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.4)]' 
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <span>ANNUAL BILLING</span>
                            <span className="px-1.5 py-0.5 bg-[#E11D48] text-white text-[9px] font-black">
                                SAVE 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
                    {plans.map((plan) => {
                        const currentPrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;

                        return (
                            <div
                                key={plan.id}
                                className={`bg-slate-900/90 border-2 ${plan.accentColor} p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                                    plan.popular ? 'scale-[1.02] z-20 bg-slate-900' : 'z-10'
                                }`}
                            >
                                {/* Top Banner for Popular Plan */}
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0052FF] via-cyan-400 to-blue-600"></div>
                                )}

                                <div>
                                    {/* Header & Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                                            {plan.name}
                                        </h3>
                                        <span className={`px-2.5 py-1 font-mono text-[10px] font-bold border uppercase tracking-wider ${plan.badgeBg}`}>
                                            {plan.badge}
                                        </span>
                                    </div>

                                    {/* Price Display */}
                                    <div className="flex items-baseline gap-2 mb-4 border-b border-slate-800 pb-6">
                                        <span className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                                            {currentPrice}
                                        </span>
                                        <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {plan.period}
                                        </span>
                                    </div>

                                    {/* Plan Description */}
                                    <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                                        {plan.description}
                                    </p>

                                    {/* Feature Checklist */}
                                    <div className="space-y-3 font-mono text-xs mb-8">
                                        <p className="text-[#0052FF] font-bold uppercase tracking-wider mb-3">INCLUDED CAPABILITIES:</p>
                                        {plan.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-3 text-slate-200">
                                                <CheckCircle2 className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                                                <span className="leading-tight">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Action Button */}
                                <div>
                                    <Link to="/interview">
                                        <button
                                            className={`w-full py-4 font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${plan.buttonStyle}`}
                                        >
                                            <span>DEPLOY {plan.name}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enterprise Custom Banner */}
                <div className="bg-slate-900 border-2 border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div className="space-y-2 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs font-bold uppercase">
                            <Shield className="w-4 h-4" /> INSTITUTIONAL DEPLOYMENTS
                        </div>
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                            NEED CUSTOM API ACCESS OR BULK SEATS?
                        </h3>
                        <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-2xl">
                            We offer custom rate limits, localized LLM fine-tuning, and dedicated enterprise SLA support for recruitment agencies.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider border border-slate-700 transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
                    >
                        CONTACT ENTERPRISE DESK
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Pricing;