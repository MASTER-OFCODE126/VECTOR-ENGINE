import { InterviewContext } from '../Interview.context';
import { getAllInterviewReports, generateInterviewReport, getInterviewReportByTd } from '../services/interview.api';
import { useContext } from 'react';

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ resumeFile, selfDescription, jobDescription }) => {
        setLoading(true);
        try {
            const res = await generateInterviewReport({ resumeFile, selfDescription, jobDescription });
            if (res && res.interviewReport) {
                setReport(res.interviewReport);
                return res.interviewReport;
            }
        } catch (error) {
            console.log("useInterview genReport Error: ", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const res = await getInterviewReportByTd(interviewId);
            setReport(res.interviewReport);
            return res.interviewReport;
        } catch (error) {
            console.log("useInterview getReportById Error: ", error);
        } finally {
            setLoading(false); // ✅ Fixed: was setLoading(true)
        }
    };

    const getReports = async () => {
        setLoading(true);
        try {
            const res = await getAllInterviewReports(); // ✅ Fixed: added await
            setReports(res.interviewReports);
        } catch (error) {
            console.log("useInterview getAllReports Error: ", error);    
        } finally {
            setLoading(false);
        }
    };

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports 
    };
};