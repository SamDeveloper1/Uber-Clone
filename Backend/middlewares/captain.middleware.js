const captainModel = require("../models/captain.model");
const blacklistToken = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");
module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies["captain-token"] || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    const isBlackListed = await blacklistToken.findOne({token: token});
    if(isBlackListed){
         return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain
        return next();

        
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}
