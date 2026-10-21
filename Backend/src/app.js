const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin : [
        'http://localhost:5173',
        process.env.FRONTEND_URL,
        'https://gen-ai-frontend.vercel.app' // Add your exact live frontend URL here as well
    ].filter(Boolean), // Removes undefined if FRONTEND_URL isn't set yet
    credentials:true
}))


/* require all the routes Here*/
const authRouter = require('./routes/auth.route')
const interviewRouter = require('./routes/interview.routes')

/* using all the routes */
app.use('/api/auth',authRouter);
app.use('/api/interview',interviewRouter)

app.get('/', (req, res) => {
  res.status(200).json({ status: 'GEN-AI Core Tactical Engine Backend Online' });
});
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}
module.exports = app;
