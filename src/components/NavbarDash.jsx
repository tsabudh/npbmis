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

const cx = classnames.bind(styles);

function NavbarDash() {
  const navigate = useNavigate();
  const { t } = useTranslation("navBar");

  const [isOpen, setIsOpen] = useState(false);
  const userRef = useRef(null);
  const { locale } = useContext(LocaleContext);

  const todayNepali = new NepaliDate(); // Get today's Nepali date
  const dateFormat = locale === "ne" ? "yyyy-mm-dd" : "YYYY-MM-DD";
  const formattedNepaliDate = todayNepali.format(dateFormat);

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
              <IconUser className={cx("user-icon")} onClick={() => setIsOpen((_) => !isOpen)} />

              <div className={cx("dropdown", isOpen ? "open" : "")}>
                <ul className={cx("list")}>
                  <li className={cx("list-item")}>settings</li>
                  <li className={cx("list-item")}>
                    Logout <IoLogOutOutline />
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
