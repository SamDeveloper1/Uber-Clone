const express = require("express");
const rideController = require("../controllers/ride.controller")
const router = express.Router();
const authMiddleware = require("../middlewares/user.middleware");
const {authCaptain} = require("../middlewares/captain.middleware");
const {body, query} = require("express-validator")
router.post("/create",
authMiddleware.authUser,
body("pickup").isString().isLength({min: 3}).withMessage("Invalid pickup address"),
body("destination").isString().isLength({min: 3}).withMessage("Invalid destination address"),
body("vehicleType").isString().isIn(["car","auto","motorcycle"]).withMessage("Invalid Vehicle Type"),
rideController.createRide
)
router.get("/get-fare",
query("pickup").isString().isLength({min: 3}).withMessage("Invalid pickup address"),
query("destination").isString().isLength({min: 3}).withMessage("Invalid destination address"),
authMiddleware.authUser,
rideController.getFare
);
router.post("/confirm",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride Id"),
    rideController.confirmRide

)
router.get("/start-ride",
    authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp").isString().isLength({min: 6, max:6}).withMessage("Invalid OTP"),
    rideController.startRide
)
router.post("/end-ride",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.endRide
)

module.exports = router