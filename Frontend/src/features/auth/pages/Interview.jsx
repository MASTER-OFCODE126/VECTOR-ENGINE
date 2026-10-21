import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import {
    Upload,
    FileCheck2,
    XCircle,
    Sparkles,
    Cpu,
    UserCheck,
    Target,
    AlertOctagon
} from 'lucide-react';
import { useInterview } from '../../../interview/hooks/useInterview';

const Interview = () => {
    const navigate = useNavigate(); // 2. Initialize hook

    // Form State Management
    const [file, setFile] = useState(null);
    const [selfDesc, setSelfDesc] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // UX Interaction States
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const fileInputRef = useRef(null);
    const formRef = useRef(null);
    const { generateReport } = useInterview();

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
        if (selectedFile.size > 10 * 1024 * 1024) {
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

    // Form Submission Handler with Route Navigation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setFormError('Please attach your PDF Resume before submitting.');
            return;
        }
        if (!selfDesc.trim()) {
            setFormError('Please provide a brief self-description/profile.');
            return;
        }
        if (!jobDesc.trim()) {
            setFormError('Please provide the target job description.');
            return;
        }

        setFormError('');
        setLoading(true);

        try {
            const assessmentResult = await generateReport({
                resumeFile: file,
                selfDescription: selfDesc,
                jobDescription: jobDesc
            });

            // Extract MongoDB document ID from response
            const reportId = assessmentResult?._id || assessmentResult?.interviewReport?._id;

            if (reportId) {
                // 🚀 Redirect to the dynamic route page (which fetches from database)
                navigate(`/interview/report/${reportId}`);
            } else {
                setFormError('Report generated, but ID was missing.');
            }
        } catch (error) {
            console.error("Failed to generate assessment report:", error);
            setFormError(error.response?.data?.message || "Failed to generate interview report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section ref={formRef} id="studio" className="relative min-h-screen bg-slate-100 text-slate-900 py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden border-b border-slate-200">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');

                .font-display { font-family: 'Syne', sans-serif; }
                .font-sans { font-family: 'Space Grotesk', sans-serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }

                .bg-grid-pattern-light {
                  background-size: 50px 50px;
                  background-image: linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
                }

                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>

            <div className="absolute inset-0 bg-grid-pattern-light pointer-events-none"></div>

            {/* Ambient Glowing Orbs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#0052FF]/20 to-[#E11D48]/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto w-full relative z-10 my-auto">
                {/* VIEW 1: ASSESSMENT FORM STUDIO ONLY */}
                <div className="max-w-4xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF] font-mono text-xs mb-3 font-bold">
                            <Cpu className="w-4 h-4" />
                            AI ASSESSMENT STUDIO
                        </div>
                        <h2 className="font-display font-black text-4xl sm:text-6xl text-slate-900 uppercase tracking-tight">
                            LAUNCH EVALUATION RUNNER
                        </h2>
                        <p className="text-slate-600 max-w-xl mx-auto text-base mt-2">
                            Upload your credentials and target position to generate a tactical strategy brief.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-2xl border border-white/80 p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,82,255,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)]">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0052FF] via-blue-500 to-[#E11D48]"></div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            {formError && (
                                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-sm font-semibold flex items-center gap-3 backdrop-blur-md">
                                    <AlertOctagon className="w-5 h-5 text-rose-600 flex-shrink-0" />
                                    <span>{formError}</span>
                                </div>
                            )}

                            {/* INPUT 1: PDF RESUME UPLOAD */}
                            <div>
                                <label className="block font-mono text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-[#E11D48]" />
                                        01. UPLOAD RESUME (PDF)
                                    </span>
                                    <span className="text-[11px] text-slate-600 font-semibold">MAX SIZE 10MB</span>
                                </label>

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group relative backdrop-blur-xl ${isDragging
                                        ? 'border-[#0052FF] bg-[#0052FF]/15 shadow-lg'
                                        : 'border-slate-400/40 hover:border-[#0052FF] bg-white/10 hover:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                    {!file ? (
                                        <div className="space-y-3">
                                            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0052FF]/15 border border-[#0052FF]/30 flex items-center justify-center text-[#0052FF] group-hover:scale-110 group-hover:bg-[#E11D48]/15 group-hover:border-[#E11D48]/40 group-hover:text-[#E11D48] transition-all duration-300 shadow-sm">
                                                <Upload className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-slate-900">
                                                    Drag & drop your resume PDF here or <span className="text-[#0052FF] underline underline-offset-4 font-bold">Browse Files</span>
                                                </p>
                                                <p className="font-mono text-xs text-slate-600 font-medium mt-1">Automatic AST vector extraction & skill indexer</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-md border border-[#0052FF]/40 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded-lg bg-[#0052FF]/20 text-[#0052FF] flex items-center justify-center flex-shrink-0">
                                                    <FileCheck2 className="w-6 h-6" />
                                                </div>
                                                <div className="text-left truncate">
                                                    <p className="font-mono text-sm font-bold text-slate-900 truncate">{file.name}</p>
                                                    <p className="font-mono text-xs text-[#0052FF] font-semibold">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button type="button" onClick={handleRemoveFile} className="p-2 text-slate-500 hover:text-[#E11D48] transition-colors">
                                                <XCircle className="w-6 h-6" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* INPUT 2: SELF DESCRIPTION */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label htmlFor="selfDesc" className="font-mono text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <UserCheck className="w-4 h-4 text-[#0052FF]" />
                                        02. CANDIDATE PROFILE & TARGETS
                                    </label>
                                    <span className="font-mono text-[11px] text-slate-600 font-semibold">{selfDesc.length} / 500</span>
                                </div>
                                <textarea
                                    id="selfDesc"
                                    rows={3}
                                    maxLength={500}
                                    value={selfDesc}
                                    onChange={(e) => setSelfDesc(e.target.value)}
                                    placeholder="Describe your background, years of experience, primary tech stack strengths, and target career trajectory..."
                                    className="w-full bg-white/10 backdrop-blur-xl border border-slate-400/40 rounded-xl p-4 text-slate-900 text-sm focus:ring-2 focus:ring-[#0052FF] outline-none transition-all resize-none placeholder:text-slate-500 font-sans shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                                />
                            </div>

                            {/* INPUT 3: JOB DESCRIPTION */}
                            <div>
                                <label htmlFor="jobDesc" className="font-mono text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[#E11D48]" />
                                    03. TARGET JOB DESCRIPTION
                                </label>
                                <textarea
                                    id="jobDesc"
                                    rows={4}
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                    placeholder="Paste the target job description requirements, key responsibilities, and technical stack details here..."
                                    className="w-full bg-white/10 backdrop-blur-xl border border-slate-400/40 rounded-xl p-4 text-slate-900 text-sm focus:ring-2 focus:ring-[#E11D48] outline-none transition-all resize-none placeholder:text-slate-500 font-sans shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                                />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0052FF] via-blue-600 to-[#E11D48] hover:from-blue-700 hover:to-rose-700 text-white font-display font-black text-xs sm:text-sm md:text-base uppercase tracking-tighter sm:tracking-widest shadow-[0_10px_30px_rgba(0,82,255,0.4)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 
                                cursor-pointer disabled:opacity-70 border border-white/20 outline-neutral-100"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full shrink-0"></div>
                                        <span className="shrink-0">
                                            <span className="inline sm:hidden">PARSING MATRIX...</span>
                                            <span className="hidden sm:inline">PARSING VECTOR MATRIX...</span>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                                        <span className="shrink-0">
                                            <span className="inline sm:hidden">GENERATE REPORT</span>
                                            <span className="hidden sm:inline">GENERATE TACTICAL REPORT</span>
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interview;