const { validationResult } = require("express-validator")
const captainModel = require("../models/captain.model")
const captainServices = require("../services/captain.services")
module.exports.registerCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullName, email, password, vehicle} = req.body;
    const isCaptainAlreadyExits = await captainModel.findOne({email});
    if(isCaptainAlreadyExits){
        return res.status(400).json({message: "Captain Already Exist"});
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainServices.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain})

}