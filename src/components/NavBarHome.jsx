import React from "react";

import styles from "./NavBarHome.module.scss";
import classnames from "classnames/bind";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import changeLanguage from "../hooks/useLanguage";
import LanguagePicker from "./LanguagePicker";
const cx = classnames.bind(styles);

function NavBarHome() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const notInLoginPage = location.pathname != "/login";

  return (
    <section className={cx("navbar")}>
      <div className={cx("brand")}>
        <NavLink to="/">NPBMIS</NavLink>
      </div>

      <nav className={cx("navbar_menu")}>
        <ul>
          <li>
            <div className="lang">
              <LanguagePicker />
            </div>
          </li>
          {notInLoginPage ? (
            <li>
              <Button
                className="primary rounded"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </li>
          ) : null}
        </ul>
      </nav>
    </section>
  );
}

export default NavBarHome;
