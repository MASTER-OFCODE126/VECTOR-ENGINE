const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');
const { report } = require('../routes/interview.routes');
/**
 * @description Controller to generate interview report based on user self description, resume and job description.
*/

async function generateInterviewReportController(req, res) {

    if (!req.file) return res.status(400).json({
        message: "Please upload your File"
    });

    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        // Use `interViewReportByAi` to read values returned from Gemini
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            matchScore: interViewReportByAi.matchScore,
            title: interViewReportByAi.title,
            technicalQuestions: interViewReportByAi.technicalQuestion,       // Map singular -> plural
            behaviouralQuestions: interViewReportByAi.behaviouralQuestion,   // Map singular -> plural
            skillgaps: interViewReportByAi.skillGaps,                        // Map skillGaps -> skillgaps
            preparationPlan: interViewReportByAi.preparationPlan
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.log("Interview controller error : ", error);
        return res.status(500).json({
            message: "Internal Server error",
            error: error.message
        });
    }
}

/**
 * @description Controller to get Interview report by Interview id.
*/

async function getInterviewReportById(req, res) {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report Not Found"
        });


    }
    // console.log(interviewReport)
    return res.status(200).json({
        message: "Report found successfully",
        interviewReport
    })
}
/**
 * @description Get all Interview reports by user
 * @access private
 */

async function getAllInterviewReports(req, res) {
    const InterviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan");
    if (!InterviewReports) return res.status(500).json({
        message: "No reports found",
        id: req.user.id
    })
    return res.status(200).json({
        message: "Interview Reports Fetched Successfully",
        user: req.user.username,
        InterviewReports
    });

}
module.exports = { generateInterviewReportController, getInterviewReportById, getAllInterviewReports };