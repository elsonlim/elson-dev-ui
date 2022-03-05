import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import SignIn from "./components/users/SignIn";
import AdminDashboard from "./components/users/Admin/AdminDashboard";
import { routesMap } from "./components/users/NavBar/NavBarMenu";

const Router: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path={routesMap.get("admin")?.route}
          element={<AdminDashboard />}
        />
      </Routes>
    </div>
  );
};

export default Router;
