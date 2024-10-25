  import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarDash from "../components/NavbarDash";
import Sidebar from "../components/SideBar";

import classNames from "classnames/bind";
import styles from "./DashboardPage.module.scss";

const cx = classNames.bind(styles);
function DashboardPage() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  return (
    <div className={cx("dashboard-page")}>
      <NavbarDash />
      <div className={cx("window")}>
        <Sidebar
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />
        <div className={cx("outlet")}>

        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
