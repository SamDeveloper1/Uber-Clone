import React, { useRef, useState, useEffect, use, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { UserDataContext } from "../context/UserContext";
import {SocketContext} from "../context/SocketContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/Livetracking";
const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions]=useState([]);

  const [destinationSuggestions, setDestinationSuggestions]=useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null);

  const [vehicleFound, setVehicleFound] = useState(false)
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  const [ride,setRide] = useState(null);
  useEffect(()=>{
    socket.emit("join",{userType: "user",userId: user._id})

  },[user]);
  socket.on("ride-confirmed",(ride)=>{
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  })
  socket.on("ride-started",ride=>{
    setWaitingForDriver(false);
    navigate("/riding", {state: {ride}});
  })
  const submitHandler = (e) => {
    e.preventdeault();
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: "24px",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);
  useGSAP(()=>{
    if(vehiclePanelOpen){
       gsap.to(vehiclePanelRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(vehiclePanelRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[vehiclePanelOpen]);
   useGSAP(()=>{
    if(confirmRidePanel){
       gsap.to(confirmRidePanelRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(confirmRidePanelRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[confirmRidePanel]);
  useGSAP(()=>{
    if(vehicleFound){
       gsap.to(vehicleFoundRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(vehicleFoundRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[vehicleFound])
    useGSAP(()=>{
    if(waitingForDriver){
       gsap.to(waitingForDriverRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(waitingForDriverRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[waitingForDriver]);
  
   const handlePickupChange = (e) => {
  setPickup(e.target.value);
};

  
  useEffect(() => {
  if (pickup.length < 3) return;

  const fetchPickupSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: pickup },
          headers: {
            Authorization: `bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );

      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  fetchPickupSuggestions();
}, [pickup]);
  const handleDestinationChange = (e) => {
  setDestination(e.target.value);
};

  
  useEffect(() => {
  if (destination.length < 3) return;

  const fetchDestinationSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: destination },
          headers: {
            Authorization: `bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );

      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  fetchDestinationSuggestions();
}, [destination]);

  
  async function findTrip(){
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{

      params: {pickup, destination},
      
      headers: {Authorization: `bearer ${localStorage.getItem("user-token")}`}}
    )
    
    setFare(response.data);


  }
  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      vehicleType,
      pickup,
      destination
    },{
      headers: {
        Authorization: `bearer ${localStorage.getItem("user-token")}`
      }
    })
  }





  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div>
        <LiveTracking/>
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[35%] bg-white relative top-0 w-full p-5">
          <h4
            ref={panelCloseRef}
            className="absolute right-6 top-6 text-2xl"
            onClick={() => {
              setPanelOpen(false);
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h4>
          <h4 className="text-2xl font-medium">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute top-[45%] w-1 h-16 bg-gray-900 left-10 rounded-full"></div>
            <input
              type="text"
              className="bg-[#eee] px-10 py-2 w-full rounded-lg mt-5 text-base"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Add a pick-up location"
            />
            <input
              type="text"
              className="bg-[#eee] px-10 py-2 w-full rounded-lg mt-3 text-base"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}

              placeholder="Enter your destination"
            />
          </form>
          <button
           onClick={findTrip}
           className='bg-black text-white mt-4   px-3 p-2 rounded-lg w-full'>
           Find Trip
          </button>

        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={activeField==="pickup"?pickupSuggestions:destinationSuggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setPanelOpen={setPanelOpen}
            />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed z-10 translate-y-full bottom-0 w-full bg-white px-3 py-10 pt-12 ">
        <VehiclePanel
            setVehicleType={setVehicleType}
            fare={fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      <div ref={confirmRidePanelRef} className="fixed z-10 translate-y-full bottom-0 w-full bg-white px-3 py-6 pt-12 ">
        <ConfirmRide
         createRide={createRide}
         fare={fare}
          pickup={pickup}
          destination={destination} 
          vehicleType={vehicleType}
        setVehicleFound={setVehicleFound}
         setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
      <div ref={vehicleFoundRef} className="fixed z-10 translate-y-full bottom-0 w-full bg-white px-3 py-6 pt-12 ">
        <LookingForDriver
           setVehicleFound={setVehicleFound}
          
           fare={fare} pickup={pickup} destination={destination} vehicleType={vehicleType}

         setConfirmRidePanel={setConfirmRidePanel}  />
      </div>
      <div ref={waitingForDriverRef}  className="fixed z-10  bottom-0 w-full bg-white px-3 py-6 pt-12 ">
        <WaitingForDriver
         ride={ride}
         setWaitingForDriver={setWaitingForDriver}/>
      </div>
       
    </div>
  );
};

export default Home;
