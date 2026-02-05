import React from 'react'
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {SocketContext} from "../context/SocketContext";
import LiveTracking from '../components/Livetracking';
const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext)

  const {ride} = location.state;
  socket.on("ride-ended",()=>{
    navigate("/home");
  })

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='h-screen w-full max-w-md bg-white'>
        <Link to="/home" className='w-10 h-10 fixed bg-white top-2 right-2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:ml-[192px] flex justify-center items-center rounded-full z-10'><i className="text-lg ri-home-5-line"></i></Link>

        <div className='h-1/2'>
          <LiveTracking/>
        </div>
        <div className='h-1/2 p-4'>
         <div className='flex justify-between'>
          <div className='flex w-1/4 relative'>
          <img className='h-10 absolute z-20 top-4 ' src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png" alt="" />
          <img className='h-26 absolute z-10 ' src="https://static.vecteezy.com/system/resources/previews/025/311/691/non_2x/white-suv-on-transparent-background-3d-rendering-illustration-free-png.png" alt="" />

          </div>
          
          <div className='w-3/4 text-end'>
              <h3 className='text-medium text-gray-600 font-medium captalize'>{ride?.captain.fullName.firstName}</h3>
              <h3 className='text-lg font-bold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h3>
              <h3 className='text-medium text-gray-600 font-base'>White Suzuki S-Presso LXI</h3>
              <p className='text-sm text-gray-600 font-semibold'><i className="p-1 ri-star-fill"></i>4.9</p>
          </div>
        </div>
        <div className="flex gap-1 flex-col justify-between items-center -mt-2 ">
         
          <div className="w-full mt-3">
            
            <div className="flex items-center gap-2 p-3 border-b-2 ">
              <i className="text-medium ri-square-fill"></i>
              <div>
                <h3 className="text-medium font-medium">Drop</h3>
                <p className="text-sm text-gray-600 ">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3">
              <i className="text-medium ri-currency-fill"></i>
              <div>
                <h3 className="text-medium font-medium">₹{ride?.fare}</h3>
                <p className="text-sm text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
          
        </div>
        <button className="mt-4 w-full bg-green-600 text-white font-semibold rounded-lg p-2">Make a payment</button>
        </div>
      </div>
    </div>
  )
}

export default Riding