import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import * as Icons from "react-icons/lu";

import { IoMenuSharp } from "react-icons/io5";

import styles from "./Sidebar.module.scss";
import items from "../assets/data/sidebar.json";
import AuthContext from "../context/AuthContext";

import SidebarItem from "./SidebarItem";
import LocaleContext from "../context/LocaleContext";

const cx = classNames.bind(styles);

function Sidebar({
  sidebarIsOpen,
  setSidebarIsOpen,
  sidebarStatus,
  setSidebarStatus,
  toggleSidebar,
}) {
  const [expanded, setExpanded] = useState(null);
  const { userRole } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);

  const handleToggle = (newStatus) => {
    toggleSidebar(newStatus);
  };

  useEffect(() => {
    console.log("sidebarStatus", sidebarStatus);
  });

  const handleExpand = (id) => {
    if (id === expanded) {
      setExpanded("nothing");
    } else {
      setExpanded(id);
    }
  };

  return (
    <div
      className={cx("sidebar", {
        "sidebar--opened": sidebarStatus === "opened",
        "sidebar--closed": sidebarStatus === "closed",
        "sidebar--minimized": sidebarStatus === "minimized",
      })}
    >
      <div className={cx("header", sidebarStatus)}>
        <div className={cx("hamburger")} onClick={() => handleToggle()}>
          <IoMenuSharp />
        </div>
        {/* <figure className={cx("logo")}>
          <NavLink to="/">LOGO</NavLink>
        </figure> */}
      </div>

      {items.map((item, index) => {
        const IconComponent = Icons[item.icon];

        if (userRole !== "SUPER_ADMIN" && item.adminOnly) return null;
        return (
          <SidebarItem
            key={index}
            item={item}
            id={index}
            setExpanded={setExpanded}
            handleExpand={handleExpand}
            expanded={expanded}
            locale={locale}
            IconComponent={IconComponent}
            minimized={sidebarStatus === "minimized"}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
