const axios = require("axios");
const { Error } = require("mongoose");
const captainModel = require("../models/captain.model")
module.exports.getAddressCoordinates =async (address)=>{
    const API_KEY = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        if(response.data.status==="OK"){
            const location = response.data.results[0].geometry.location;
            return{
                ltd:location.lat,
                lng:location.lng
            };
        } else{
            throw new Error("Unable to fetch coordinates")
        }
        
    } catch (error) {
        console.error(error);
        throw error;
        
    }

}
module.exports.getDistanceTime = async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error("Origin and Destination are required");
    }
    const API_KEY = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        if(response.data.status==="OK"){
            if(response.data.rows[0].elements[0].status==="ZERO_RESULTS"){
                throw new Error("No routes found");
            }
            return response.data.rows[0].elements[0];
        } else{
            throw new Error("Unable to fetch distance and time")
        }

        
    } catch (error) {
        console.error(error);
        throw error;
        
    }

    
}
module.exports.getSuggestions = async(input)=>{
    if(!input){
        throw new Error("query is required");
    }
    const API_KEY = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        if(response.data.status==="OK"){
            return response.data.predictions.map(prediction=>prediction.description).filter(value=>value)
        } else{
            throw new Error("Unable to fetch suggestions");
        }
        
    } catch (error) {
        console.error(error);
        throw  error
    }

}
module.exports.getCaptainsInTheRadius = async (lat, lng, radiusInKm) => {
    const radiusInRadians = radiusInKm / 6371; // earth radius

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radiusInRadians]
            }
        }
    });

    return captains;
};
