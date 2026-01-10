import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userData, setUserData] = useState({});
   const submitHandler = (e)=>{
      e.preventDefault();
      setUserData({
        email:email,
        password:password
      })
      console.log(userData);
      setEmail('');
      setPassword('')
   }


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <form onSubmit={(e)=>{
          submitHandler(e)
      }}>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
         type="email"
         value={email}
         onChange={(e)=>{
            setEmail(e.target.value)
         }}
         placeholder="email@example.com"
        className="bg-[#eeeeee] mb-7 rounded-lg border placeholder:text-base w-full px-4 py-2"
          />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
         type="password"
          placeholder="password"
         className="bg-[#eeeeee] mb-7 rounded-lg border placeholder:text-base w-full px-4 py-2"
         value={password}
         onChange={(e)=>{
            setPassword(e.target.value)
         }}
        />
        <button className="bg-[#111] font-semibold flex justify-center w-full  text-white text-lg rounded-lg px-4 py-2 mb-3">
          Login
        </button>
        
      </form>
      <p className="text-center">New here?
        <Link to="/signup" className="text-blue-600"> Create new Account</Link></p>
    </div>
    <div>
      <Link to="/captain-login"
      className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
      >Sign in as Captain</Link>

    </div>

    </div>

    
  );
};

export default UserLogin;
