import { Outlet } from "react-router";
import Navbar from "../navigation/Navbar";
import FeedbackToast from "../feedback/FeedbackToast";

function AppLayout() {
  return (
    <div className="app">
      <Navbar />

      <div className="app-content">
        <Outlet />
      </div>

      <FeedbackToast />
    </div>
  );
}

export default AppLayout;
