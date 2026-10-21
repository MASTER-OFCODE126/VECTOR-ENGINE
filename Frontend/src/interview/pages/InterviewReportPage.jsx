// src/features/interview/pages/InterviewReportPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReportView from '../components/ReportView';
import { getInterviewReportByTd } from '../services/interview.api'; // or from useInterview hook
import Loading from '../../features/components/Loading';

const InterviewReportPage = () => {
    const { interviewId } = useParams();
    const navigate = useNavigate();
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const res = await getInterviewReportByTd(interviewId);
                // Adjust depending on if backend wraps in { interviewReport: ... } or returns directly
                setReportData(res?.interviewReport || res);
            } catch (err) {
                console.error("Failed to fetch interview report:", err);
                setError(err?.response?.data?.message || 'Report not found or unavailable.');
            } finally {
                setLoading(false);
            }
        };

        if (interviewId) {
            fetchReport();
        }
    }, [interviewId]);

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
                    <h3 className="font-display text-xl font-bold text-rose-600 mb-2">Error Loading Report</h3>
                    <p className="text-slate-600 text-sm mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/interview')}
                        className="w-full py-3 bg-[#0052FF] text-white font-mono text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        RETURN TO STUDIO
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-5xl mx-auto w-full">
                <ReportView 
                    assessmentData={reportData} 
                    onNewRun={() => navigate('/interview')} 
                />
            </div>
        </section>
    );
};

export default InterviewReportPage;