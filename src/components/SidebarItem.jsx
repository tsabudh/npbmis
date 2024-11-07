import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import * as Icons from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import styles from "./SidebarItem.module.scss";
import AuthContext from "../context/AuthContext";

const cx = classNames.bind(styles);

function SidebarItem({ item, id, expanded, handleExpand, locale, minimized }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useContext(AuthContext);
  const [active, setActive] = useState(false);

  const IconComponent = Icons[item.icon];

  // Update active state based on the current path
  useEffect(() => {
    const isActive = location.pathname === item.path ||
      (item.children && location.pathname.includes(item.title));
    setActive(isActive);
  }, [location, item.path, item.children, item.title]);

  // Navigation handler for sidebar item clicks
  const handleNavigate = () => {
    if (item.identity === "menu") {
      handleExpand(expanded);
    }
    navigate(item.path);
  };

  // Render icon and title with locale support
  const renderIconAndTitle = () => (
    <>
      {IconComponent && <IconComponent />}
      {!minimized && (
        <span className={cx({ active })}>
          {locale === "ne" ? item["nepali-title"] : item.title}
        </span>
      )}
    </>
  );

  // Conditional rendering for items with children
  const renderExpandableItem = () => (
    <div className={cx("sidebar-item", { open: expanded === id })}>
      <div
        className={cx("sidebar-title", { active })}
        onClick={() => handleExpand(id)}
      >
        {renderIconAndTitle()}
        <div className={cx("toggle-btn")}>
          <SlArrowDown />
        </div>
      </div>
      <div className={cx("sidebar-content")}>
        {item.children.map((child, index) => (
          <SidebarItem
            key={index}
            item={child}
            handleExpand={handleExpand}
            locale={locale}
            minimized={minimized}
          />
        ))}
      </div>
    </div>
  );

  // Conditional rendering for non-expandable items
  const renderNonExpandableItem = () => (
    <div onClick={handleNavigate} className={cx("sidebar-item")}>
      <div className={cx("sidebar-title", { active })}>
        {renderIconAndTitle()}
      </div>
    </div>
  );

  // Main render logic
  if (item.adminOnly && userRole !== "admin") return null;
  
  return item.children
    ? minimized
      ? renderNonExpandableItem()
      : renderExpandableItem()
    : renderNonExpandableItem();
}

export default SidebarItem;
