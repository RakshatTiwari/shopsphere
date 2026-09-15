import { Outlet } from "react-router";
import Navbar from "../navigation/Navbar";

function AppLayout() {
  return (
    <div className="app">
      <Navbar />

      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
