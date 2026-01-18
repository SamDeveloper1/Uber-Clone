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
    
      <div className="h-screen relative flex flex-col justify-end">
        <div className="fixed p-6 top-0 flex justify-between items-center w-screen">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to="/captain-home"
            className="w-10 h-10  bg-white flex justify-center items-center rounded-full"
          >
            <i className="text-lg ri-logout-box-r-line"></i>
          </Link>
        </div>

        
        <div className=" p-6 bg-yellow-300 flex items-center justify-between relative" onClick={()=>{
          setFinishRidePanel(true);
        }}>
          <h5
            className="p-1 w-[90%] text-center absolute top-0 "
            onClick={() => {}}
          >
            <i className="mr-3 text-3xl text-black-900 ri-arrow-up-wide-fill"></i>
          </h5>
          <h4 className="text-xl font-semibold mt-5">4 Km away</h4>
          <button className="mt-5 bg-green-600 text-white font-semibold rounded-lg p-3 px-10">
            Complete Ride
          </button>
        </div>
        <div
          ref={finishRidePanelRef}
          className="fixed z-10  bottom-0 w-full translate-y-full bg-white px-3 py-6 pt-12 "
        >
          <FinishRide
          ride={ride}
           setFinishRidePanel={setFinishRidePanel}/>
        </div>
        <div className='h-screen fixed w-screen top-0 z-[-1]'>
          <LiveTracking />
        </div>
      </div>
    
  );
};

export default CaptainRiding;
