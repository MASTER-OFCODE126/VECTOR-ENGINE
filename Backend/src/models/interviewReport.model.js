const mongoose = require('mongoose');

/**
 *  - job description : String
 *  - resume text : String
 *  - Self description : STring
 * 
 *  - Matchscore : Number
 * 
 *  - Technical questions : [{
 *              question : "",
 *              intention : " ",
 *              answer : " "
 *              }]
 *  - Behavioural  question : [{
 *              question : "",
 *              intention : " ",
 *              answer : " "
 *                  }]
 *  - Skill gaps : [{
 *                  skill : "",
 *                   severity : {
 *                      type : "",
 *                      enum : ["low","High","medium"]        
 *                      }
 *                  }]
 *  - preparation plan : [{
 *                      day : Number,
 *                      focus : STring,
 *                      tasks : [String]
 *                       }]
 * 
 */

const preparationPlanSechema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true,"Day is required"]
    },
    focus : {
        type: String,
        required : [true,"focus is required"]
    },
    tasks : [{
        type : String,
        required : [true,"Task is required"]
    }]
})

const skillGapSchema = new mongoose.Schema({
    skill:  {
        type : String,
        required : [true,"Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required : [true,"Severity is required"]
    }
},{
    id : false
});

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    },
}, {
    _id: false
})

const behaviouralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    },
}, {
    id: false
})

const InterviewReportSchema = new mongoose.Schema({


    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String
    },
    selfDescription:
    {
        type: String
    },
    matchScore: {
        type: Number
    },
    technicalQuestions : [technicalQuestionSchema],
    behaviouralQuestions : [behaviouralQuestionsSchema],
    skillgaps : [skillGapSchema],
    preparationPlan : [preparationPlanSechema],
    user:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    title : {
        type : String
       
}}, {timestamps : true});
const interviewReportModel = mongoose.model('Interviewreport',InterviewReportSchema);
 module.exports = interviewReportModel;