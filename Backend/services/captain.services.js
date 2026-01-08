const captainModel = require("../models/captain.model")
module.exports.createCaptain = async ({
    firstName,lastName, email, password,
    color, plate, capacity, vehicleType
})=>{
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All Fields required");
    }
    const captain = captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            capacity,
            plate,
            vehicleType
        }
    })
    return captain;
}

