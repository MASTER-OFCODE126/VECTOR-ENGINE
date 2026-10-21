const express = require('express');
const interviewRouter = express.Router();
const interviewController = require('../controllers/interview.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/file.middleware');

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description resume pdf and job description
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET/api/interview//:interviewId
 * @description Interview report by Interview id
 */

interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterviewReportById);

/**
 * @route GET/api/interview
 * @description Get all Interview reports by user
 * @access
 */

interviewRouter.get('/',authMiddleware.authUser,interviewController.getAllInterviewReports);

module.exports = interviewRouter;