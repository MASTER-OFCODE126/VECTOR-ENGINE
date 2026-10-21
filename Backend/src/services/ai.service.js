const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Define the schema natively using Google's Type system
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "A score between 0 to 100 indicating candidate fit"
        },
        technicalQuestion: {
            type: Type.ARRAY,
            description: "List of technical questions",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question" },
                    intention: { type: Type.STRING, description: "The interviewer's intention" },
                    answer: { type: Type.STRING, description: "How to answer the question, points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behaviouralQuestion: {
            type: Type.ARRAY,
            description: "List of behavioural questions",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioural question" },
                    intention: { type: Type.STRING, description: "The interviewer's intention" },
                    answer: { type: Type.STRING, description: "How to answer the question" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps identified between resume and job description",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The missing skill" },
                    severity: { type: Type.STRING, description: "Must be low, medium, or high" }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "Day-wise preparation plan",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "Day number starting from 1" },
                    focus: { type: Type.STRING, description: "Main focus of the day" },
                    tasks: {
                        type: Type.ARRAY,
                        description: "List of tasks to accomplish",
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: Type.STRING,
            description: "The title of the Job for which the interview Report is generated"
        }
    },
    required: [
        "matchScore",
        "technicalQuestion",
        "behaviouralQuestion",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `Analyze the candidate details and generate a comprehensive JSON interview report following the required schema precisely. Do not leave arrays empty.
        
        Resume Text:
        ${resume}

        Candidate Self Description:
        ${selfDescription}

        Target Job Description:
        ${jobDescription}`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite", // Use a valid active model version (e.g. gemini-2.5-flash or gemini-flash-lite depending on your environment availability)
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema,
                temperature: 0.2 
            }
        });

        if (!response.text) {
            throw new Error("Model returned an empty text response.");
        }

        const report = JSON.parse(response.text);
        // console.log("RAW AI RESPONSE:", JSON.stringify(report, null, 2));
        return report;

    } catch (error) {
        console.error("AI API error: ", error);
        throw error;
    }
}

module.exports = generateInterviewReport;