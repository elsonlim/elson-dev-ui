import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
// import Dashboard from "./components/auth/Dashboard";
import Welcome from "./components/welcome/Welcome";

const NavBar: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
};

export default NavBar;
