import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide.jsx";
import LiveTracking from "../components/Livetracking.jsx";

const CaptainRiding = () => {
  const location = useLocation();
  const {ride} = location.state;
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="h-screen w-full max-w-md relative overflow-hidden">
        <div className='absolute inset-0 w-full h-full'>
          <LiveTracking />
        </div>

        <div className="absolute p-4 md:p-6 top-0 left-0 right-0 flex justify-between items-center z-20 bg-gradient-to-b from-black/20 to-transparent">
          <img
            className="w-14 md:w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
          <Link
            to="/captain-home"
            className="w-10 h-10 bg-white flex justify-center items-center rounded-full shadow-lg"
          >
            <i className="text-lg ri-logout-box-r-line"></i>
          </Link>
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-yellow-300 flex items-center justify-between z-20 cursor-pointer" 
          onClick={()=> {
            setFinishRidePanel(true);
          }}
        >
          <h5 className="absolute -top-3 left-0 right-0 text-center">
            <i className="text-3xl text-gray-900 ri-arrow-up-wide-fill"></i>
          </h5>
          <h4 className="text-lg md:text-xl font-semibold pt-4">4 Km away</h4>
          <button className="bg-green-600 text-white font-semibold rounded-lg py-2.5 px-6 md:py-3 md:px-10 text-sm md:text-base whitespace-nowrap">
            Complete Ride
          </button>
        </div>

        <div
          ref={finishRidePanelRef}
          className="fixed z-30 bottom-0 left-0 right-0 w-full max-w-md mx-auto translate-y-full bg-white px-3 py-6 pt-12 rounded-t-2xl shadow-2xl"
        >
          <FinishRide
            ride={ride}
            setFinishRidePanel={setFinishRidePanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;