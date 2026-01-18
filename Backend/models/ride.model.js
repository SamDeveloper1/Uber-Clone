const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const rideSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain"
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type: String,
        enum: ["pending","ongoing","completed","cancelled"],
        default:"pending"
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    paymentId:{
        type: String,
    },
    orderId:{
        type: String,
    },
    signature:{
        type: String,
    },
    otp:{
        type: String,
        select:false,
        required: true
    }

})
module.exports = mongoose.model("ride",rideSchema)