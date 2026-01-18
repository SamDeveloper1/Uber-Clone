import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const ConfirmRidePopup = (props) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const submitHandler = async (e)=>{
      e.preventDefault();
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captain-token")}`
        }
      })
      if(response.status===200){
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding", {state: {ride: props.ride}});
      }
  }
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
      <h3 className="font-semibold text-2xl mb-5">Confirm this ride to Start</h3>
      <div className="flex justify-between items-center mt-4 p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="w-12 h-12 object-cover rounded-full "
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullName.firstName}</h2>
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
        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP' className="bg-[#eee] px-6 py-4 w-full rounded-lg mt-5 text-base font-mono" />
             <button 
          className="mt-5 w-full text-lg flex justify-center bg-green-600 text-white font-semibold rounded-lg p-3"
          
        >
          Confirm
        </button>
        <button
          className="mt-2 w-full text-lg bg-red-500 text-white font-semibold rounded-lg p-3"
          onClick={() => {
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
          }}
        >
          Cancel
        </button>

          </form>
          

        </div>
       
      </div>
    </div>
  )
}

export default ConfirmRidePopup