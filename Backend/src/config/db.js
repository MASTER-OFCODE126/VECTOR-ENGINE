const mongoose = require('mongoose');

async function connectDB(){
    try {
        let res = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
        // console.log("Database Name : ",res.connection.name);
    } catch (error) {
        console.log('Error connecting to database:', error);
    }

}

module.exports = connectDB;