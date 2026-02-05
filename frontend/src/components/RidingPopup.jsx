import React from "react";

const RidingPopup = (props) => {
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">New Ride Available!</h3>
      <div className="flex justify-between items-center mt-4 p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full "
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt=""
          />
          <h2 className="text-base sm:text-lg font-medium">{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
        </div>
        <h5 className="font-semibold text-base sm:text-lg">2.2 Km</h5>
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
        <div className="mt-5 w-full flex items-center justify-between gap-2">
           <button
            className="mt-1 bg-gray-300 text-gray-700 font-semibold rounded-lg p-3 px-6 sm:px-10 text-sm sm:text-base"
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
          >
            Ignore
          </button>
          <button
            className="bg-green-600 text-white font-semibold rounded-lg p-3 px-6 sm:px-10 text-sm sm:text-base"
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
          >
            Accept
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default RidingPopup;