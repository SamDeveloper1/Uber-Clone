import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
       rideId: props.ride._id
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("captain-token")}`
      }
    });
    console.log(response.status);
    if(response.status===200){
      navigate("/captain-home")
    }
    
  }
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">
        Finish this Ride
      </h3>
      <div className="flex justify-between items-center mt-4 p-4 border-2 border-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full "
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt=""
          />
          <h2 className="text-base sm:text-lg font-medium capitalize">{props.ride?.user.fullName.firstName}</h2>
        </div>
        <h5 className="font-semibold text-base sm:text-lg">{props.ride?.duration}</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center ">
        <div className="w-full mt-3">
          <div className="flex items-center gap-3 sm:gap-5 p-3 border-b-2">
            <i className="text-xs sm:text-sm ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-sm sm:text-medium font-semibold">Pickup</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 p-3 border-b-2">
            <i className="text-xs sm:text-sm ri-square-fill"></i>
            <div>
              <h3 className="text-sm sm:text-medium font-semibold">Drop</h3>
              <p className="text-xs sm:text-sm text-gray-600 ">
                 {props.ride?.destination}

              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 p-3">
            <i className="text-base sm:text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-sm sm:text-medium font-semibold">₹{props.ride?.fare}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
          
            
            <button
              to="/captain-home"
              className="mt-5 w-full text-base sm:text-lg flex justify-center bg-green-600 text-white font-semibold rounded-lg p-3"
              onClick={endRide}
            >
              Finish Ride
            </button>
            
          
        </div>
      </div>
    </div>
  );
};

export default FinishRide;