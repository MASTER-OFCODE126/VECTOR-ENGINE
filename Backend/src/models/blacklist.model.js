const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true,"token is required to be added"],
    },
    
},{timestamps : true});

const tokenBlacklistModel = mongoose.model('blacklistToken',blackListSchema);
module.exports = tokenBlacklistModel;