import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import * as Icons from "react-icons/lu";

import { SlArrowDown } from "react-icons/sl";

import styles from "./SidebarItem.module.scss";
import AuthContext from "../context/AuthContext";
const cx = classNames.bind(styles);

function SidebarItem({
  item,
  id,
  expanded,
  handleExpand,
  locale,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState();
  const { userRole } = useContext(AuthContext);

  const IconComponent = Icons[item.icon];

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
      <div className={cx("sidebar-item", { open: expanded === id })}>
        <div
          className={cx("sidebar-title", { active: active })}
          onClick={() => handleExpand(id)}
        >
          {IconComponent ? <IconComponent /> : null}
          <span className={cx({ active: active })}>
            {locale === "ne" ? item["nepali-title"] : item.title}
          </span>
          <div className={cx("toggle-btn")}>
            <SlArrowDown />
          </div>
        </div>
        <div className={cx("sidebar-content")}>
          {item.children.map((child, index) => {
            if (item.adminOnly) return null;

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
    if (item.adminOnly) return null;
    return (
      <div onClick={handleNavigate} className={`${cx("sidebar-item")} `}>
        <div className={cx("sidebar-title", { active: active })}>
          {IconComponent ? <IconComponent /> : null}
          <span className={cx({ active: active })}>
            {locale === "ne" ? item["nepali-title"] : item.title}
          </span>
        </div>
      </div>
    );
  }
}
export default SidebarItem;
