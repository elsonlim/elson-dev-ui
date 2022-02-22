import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/navbar/SignIn";
import AdminDashboard from "./components/admin/AdminDashboard";
import Welcome from "./components/welcome/Welcome";
import { routesMap } from "./components/navbar/NavBarMenu";

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
