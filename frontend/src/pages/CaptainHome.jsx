import React, { useRef,useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidingPopup from "../components/RidingPopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import {SocketContext} from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios" 


const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);
  useEffect(()=>{
    socket.emit("join",{
      userId: captain._id,
      userType: "captain"
    })
  
    const updateLocation = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
          
          
          socket.emit("update-location-captain",{
            userId:captain._id,
            location:{
               ltd: position.coords.latitude,
               lng: position.coords.longitude
            }
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation,10000);
    updateLocation();

  },[]);
    socket.on("new-ride",(data)=>{
      setRide(data);
      setRidePopupPanel(true)

    })
    async function confirmRide(){
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
         rideId: ride._id,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captain-token")}`
        }

      })
    }

  
    useGSAP(()=>{
    if(ridePopupPanel){
       gsap.to(ridePopupRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(ridePopupRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[ridePopupPanel]);
   useGSAP(()=>{
    if(confirmRidePopupPanel){
       gsap.to(confirmRidePopupRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(confirmRidePopupRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[confirmRidePopupPanel]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="h-screen w-full max-w-md bg-white relative">
        <div className="fixed p-6 top-0 flex justify-between items-center w-full max-w-md z-10">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to="/captain-login"
            className="w-10 h-10 bg-white flex justify-center items-center rounded-full"
          >
            <i className="text-lg ri-logout-box-r-line"></i>
          </Link>
        </div>

        <div className="h-3/5">
          <img
            className="w-full h-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div className="h-2/5 p-6 bg-white border-white rounded-2xl">
          <CaptainDetails />
        </div>
        <div ref={ridePopupRef}  className="fixed z-10 bottom-0 w-full max-w-md translate-y-full bg-white px-3 py-6 pt-12 " >
          <RidingPopup
            ride={ride}
            confirmRide={confirmRide}
           setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
          
        </div>
        <div ref={confirmRidePopupRef}  className="fixed z-10 h-screen bottom-0 w-full max-w-md translate-y-full bg-white px-3 py-6 pt-12 " >
          <ConfirmRidePopup
           ride={ride}
           setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
          
        </div>

      </div>
    </div>
  );
};

export default CaptainHome;