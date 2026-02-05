import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectedWrapper.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
import Riding from "./pages/Riding.jsx";
import CaptainRiding from "./pages/CaptainRiding.jsx";
import 'remixicon/fonts/remixicon.css'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/logout" element={<UserLogout />}></Route>
        <Route path="/riding" element={<Riding/>}></Route>
        <Route path="/captain-riding" element={<CaptainRiding/>}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>

        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        ></Route>
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        ></Route>
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
                <CaptainHome/>
            </CaptainProtectWrapper>
          }
        ></Route>
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
                <CaptainLogout/>
            </CaptainProtectWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
