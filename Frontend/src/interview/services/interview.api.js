import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true,
});

/**
 * @description Service to generate interview report 
 */

export const generateInterviewReport = async ({resumeFile, selfDescription, jobDescription}) => {
    const formData = new FormData();
    // console.log(formData);
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post('/api/interview', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

/**
 * @description Service to get the interview report by Id 
 */

export const getInterviewReportByTd = async (interviewId) => {
    const response =  await api.get(`api/interview/report/${interviewId}`);
    return response.data;
};

/**
 * @description Service to get all intervie reports
 */

export const getAllInterviewReports = async () => {
    const response = await api.get('/api/interview');
    return response.data;
};