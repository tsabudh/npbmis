import React, { useContext, useEffect, useRef, useState } from "react";
import classnames from "classnames/bind";
import NepaliDate from "nepali-date";
import { IoLogOutOutline } from "react-icons/io5";

import { IoAddSharp } from "react-icons/io5";

import styles from "./NavbarDash.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import LanguagePicker from "./LanguagePicker";
import IconUser from "./vectors/IconUser";
import LocaleContext from "../context/LocaleContext";
import { useTranslation } from "react-i18next";
import Dropdown from "./Dropdown";
import LinkItem from "./LinkItem";
import { deleteJwtFromLocalStorage } from "../utils/localStorageUtils";
import AuthContext from "../context/AuthContext";

const cx = classnames.bind(styles);

function NavbarDash({ toggleSidebar }) {
  const navigate = useNavigate();
  const { t } = useTranslation("navBar");

  const [isOpen, setIsOpen] = useState(false);
  const userRef = useRef(null);
  const { locale } = useContext(LocaleContext);
  const { setJwtToken } = useContext(AuthContext);

  const todayNepali = new NepaliDate(); // Get today's Nepali date
  const dateFormat = locale === "ne" ? "yyyy-mm-dd" : "YYYY-MM-DD";
  const formattedNepaliDate = todayNepali.format(dateFormat);

  const handleLogout = () => {
    console.log("hi");
    setJwtToken(null);
    deleteJwtFromLocalStorage();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userRef]);

  return (
    <section className={cx("section-navbar")}>
      <div className={cx("brand")}>
        <NavLink to="/">LOGO</NavLink>
      </div>
      <div className={cx("date")}>
        <span>{formattedNepaliDate}</span>
      </div>
      <div className={cx("lang")}>
        <LanguagePicker />
      </div>
      
      <nav className={cx("navbar_menu")}>
        <ul>
          <li>
            <Button
              onClick={() => {
                navigate("/dashboard/projects/add");
              }}
              className={"primary small-padding small-font rounded"}
            >
              <IoAddSharp />
              {t("addProject")}
            </Button>
          </li>
          <li>
            <div className={cx("user")} ref={userRef}>
              <IconUser
                className={cx("user-icon")}
                onClick={() => setIsOpen((_) => !isOpen)}
              />

              <div className={cx("dropdown", isOpen ? "open" : "")}>
                <ul className={cx("list")}>
                  <li className={cx("list-item")}>
                    <LinkItem className={"rounded"} to="/dashboard/settings">
                      Settings
                    </LinkItem>
                  </li>
                  <li className={cx("list-item")}>
                    <div onClick={handleLogout}>
                      <LinkItem className={"rounded"} to="#">
                        <div className={cx("nowrap")}>
                          <span>Logout</span> <IoLogOutOutline />
                        </div>
                      </LinkItem>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavbarDash;
