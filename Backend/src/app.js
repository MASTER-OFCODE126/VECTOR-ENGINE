const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin : `${process.env.FRONTEND_URL}`,
    origin : 'http://localhost:5173',
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

module.exports = app;
