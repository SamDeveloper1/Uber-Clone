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
      <h3 className="font-semibold text-2xl mb-5">New Ride Available!</h3>
      <div className="flex justify-between items-center mt-4 p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="w-12 h-12 object-cover rounded-full "
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
        </div>
        <h5 className="font-semibold text-lg">2.2 Km</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center ">
        <div className="w-full mt-3">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-sm ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-medium font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-sm ri-square-fill"></i>
            <div>
              <h3 className="text-medium font-semibold">Third Wave Coffee</h3>
              <p className="text-sm text-gray-600 ">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-medium font-semibold">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className=" mt-5 w-full flex items-center justify-between">
           <button
            className="mt-1  bg-gray-300 text-gray-700 font-semibold rounded-lg p-3 px-10"
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
          >
            Ignore
          </button>
          <button
            className=" bg-green-600 text-white font-semibold rounded-lg p-3 px-10"
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
