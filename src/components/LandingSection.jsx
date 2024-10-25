import React from "react";
import classnames from "classnames/bind";
import styles from "./LandingSection.module.scss";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

function LandingSection() {
  const navigate = useNavigate();
  return (
    <section className={cx("landing-section")}>
      <header className={cx("header")}>
        <h2>PROJECT BANK INFORMATION MANAGEMENT SYSTEM</h2>
      </header>
      <main className={cx("main")}>
        <p>
          Welcome to the Project Bank Information Management System. This system
          is designed to help you manage your projects and keep track of your
          project information. Please login to access the system.
        </p>
        <div className={cx("activities")}>
          <Button
            className={"gray"}
            onClick={() => navigate("/dashboard/projects")}
          >
            Projects
          </Button>
          <Button
            className={"gray"}
            onClick={() => navigate("/dashboard/users")}
          >
            Users
          </Button>
        </div>
      </main>
    </section>
  );
}

export default LandingSection;
