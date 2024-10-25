import React, { useContext, useState } from "react";
import classNames from "classnames/bind";

import { IoMenuSharp } from "react-icons/io5";

import styles from "./Sidebar.module.scss";
import items from "../assets/data/sidebar.json";
import AuthContext from "../context/AuthContext";

import SidebarItem from "./SidebarItem";
import { NavLink } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";

const cx = classNames.bind(styles);

 function Sidebar({ sidebarIsOpen, setSidebarIsOpen }) {
  const [expanded, setExpanded] = useState(null);
  const { userRole } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);

  const handleToggle = () => {
    setSidebarIsOpen((prev) => !prev);
  };

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
        "sidebar--opened": sidebarIsOpen,
        "sidebar--closed": !sidebarIsOpen,
      })}
    >
      <div className={cx("header")}>
        <div className={cx("hamburger")} onClick={handleToggle}>
          <IoMenuSharp />
        </div>
        {/* <figure className={cx("logo")}>
          <NavLink to="/">LOGO</NavLink>
        </figure> */}
      </div>

      {items.map((item, index) => {
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
          />
        );
      })}
    </div>
  );
}

export default Sidebar;