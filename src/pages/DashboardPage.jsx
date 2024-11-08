import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarDash from "../components/NavbarDash";
import Sidebar from "../components/Sidebar";

import classNames from "classnames/bind";
import styles from "./DashboardPage.module.scss";
import AuthContext from "../context/AuthContext";

const cx = classNames.bind(styles);
function DashboardPage() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [sidebarStatus, setSidebarStatus] = useState("opened"); // closed, opened ,minimized
  const { jwtToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  });

  const toggleSidebar = (newStatus) => {
    if (
      newStatus === "closed" ||
      newStatus === "opened" ||
      newStatus === "minimized"
    ) {
      setSidebarStatus(newStatus);
    } else {
      setSidebarStatus((prev) => (prev === "opened" ? "minimized" : "opened"));
    }
  };

  // Guard against unauthenticated users
  if (!jwtToken) {
    return null;
  }

  return (
    <div className={cx("dashboard-page")}>
      <NavbarDash toggleSidebar={toggleSidebar} />
      <div className={cx("window")}>
        <Sidebar
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
          sidebarStatus={sidebarStatus}
          setSidebarStatus={setSidebarStatus}
          toggleSidebar={toggleSidebar}
        />
        <div className={cx("outlet")}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
