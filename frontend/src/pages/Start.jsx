import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=976&auto=format&fit=crop")] w-full pt-8  h-screen flex justify-between flex-col'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white py-4 px-4 pb-7'>
          <h2 className='text-[30px]'>Get Started with Uber</h2>
          <Link to="/login" className=' flex justify-center w-full bg-black text-white rounded-lg py-3 mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start