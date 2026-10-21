const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('./../models/blacklist.model');
async function authUser(req,res,next)
{   
    const token  = req.cookies.token;
    if(!token) return res.status(401).json({message : "Token not provided"});

    // Check if the token is blacklisted

    const isBlacklisted = await tokenBlacklistModel.findOne({token});
    if(isBlacklisted) return res.status(401).json({message : "Token is Invalid"});

    try {
        const decoded  = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded; // User saved
        next();
    } catch (error) {
        return res.status(401).json({message : "Invalid Token"});
    }
    

}
module.exports = {authUser};