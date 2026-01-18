import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
        <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <div className='flex  justify-between'>
        <div className='flex w-1/4 relative'>
        <img className='h-11 absolute z-20 top-4 ' src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png" alt="" />
        <img className='h-28  absolute z-10 ' src="https://static.vecteezy.com/system/resources/previews/025/311/691/non_2x/white-suv-on-transparent-background-3d-rendering-illustration-free-png.png" alt="" />

        </div>
        
        <div className='w-3/4 text-end'>
            <h3 className='text-lg text-gray-600 font-medium capitalize'>{props.ride?.captain.fullName.firstName}</h3>
            <h3 className='text-xl font-bold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h3>
            <h3 className='text-lg text-gray-600 font-base'>White Suzuki S-Presso LXI</h3>
            <p className='text-sm text-gray-600 font-semibold'><i className="p-1 ri-star-fill"></i>4.9</p>
            <h3 className='text-lg font-semibold'>{props.ride?.otp}</h3>
        </div>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center ">
       
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Third Wave Coffee</h3>
              <p className="text-sm text-gray-600 ">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default WaitingForDriver