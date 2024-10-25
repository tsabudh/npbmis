import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import { SlArrowDown } from "react-icons/sl";

import styles from "./SidebarItem.module.scss";
import AuthContext from "../context/AuthContext";
const cx = classNames.bind(styles);

function SidebarItem({ item, id, expanded, handleExpand, locale }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState();
  const { userRole } = useContext(AuthContext);

  const handleNavigate = (e) => {
    if (item.identity == "menu") {
      handleExpand(expanded);
    }
    navigate(item.path);
  };

  useEffect(() => {
    if (location.pathname == item.path) {
      setActive(true);
    } else if (item.children && location.pathname.includes(item.title)) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  if (item.children) {
    return (
      <div className={cx("sidebar-item", { open: expanded == id })}>
        {/* <div className={open ? "sidebar-item open" : "sidebar-item"}> */}
        <div
          className={`${cx("sidebar-title")} 
                       `}
          onClick={() => handleExpand(id)}
        >
          <span className={cx({ active: active })}>
            {/* ITEM ICON  */}

            {locale === "ne" ? item["nepali-title"] : item.title}
          </span>
          <div className={cx("toggle-btn")}>
            <SlArrowDown />
          </div>
        </div>
        <div className={cx("sidebar-content")}>
          {item.children.map((child, index) => {
            if (userRole == "customer" && item.adminOnly) return null;

            return (
              <SidebarItem
                key={index}
                item={child}
                handleExpand={handleExpand}
                locale={locale}
                // setActive={setActive}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    if (userRole == "customer" && item.adminOnly) return null;
    return (
      <div onClick={handleNavigate} className={`${cx("sidebar-item")} `}>
        {item.icon && <i className={item.icon}></i>}
        <div
          className={`${
            item.identity === "menu" ? cx("sidebar-title") : cx("plain")
          }`}
        >
          <span className={active ? styles.active : ""}>
            {locale === "ne" ? item["nepali-title"] : item.title}
          </span>
        </div>
      </div>
    );
  }
}
export default SidebarItem;
