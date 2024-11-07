import React from "react";
import classnames from "classnames/bind";
import styles from "./ProjectCardSimple.module.scss";

const cx = classnames.bind(styles);

function ProjectCardSimple({ name, nepaliName, status, description, sector }) {
  const displayStatus =
    status === "NEW_OR_UPCOMING"
      ? "New/Upcoming"
      : status === "ONGOING"
      ? "Ongoing"
      : "Unknown";
  const displaySector =
    sector === "SOCIAL_OR_SERVICE"
      ? "Social/Service"
      : sector === "INFRASTRUCTURE"
      ? "Infrastructure"
      : "Unknown";

  return (
    <div className={cx("project-card-simple")}>
      <header className={cx("header")}>
        <h3 className={cx("h3")}>{name}</h3>
        <h3 className={cx("h3")}>{nepaliName}</h3>
        <p>{description}</p>
      </header>
      <main className={cx("main")}>
        <p>
          <span className={cx("field")}>Status: </span>
          <span className={cx("value")}>{displayStatus}</span>
        </p>
        <p>
          <span className={cx("field")}>Sector: </span>
          <span className={cx("value")}>{displaySector}</span>
        </p>
      </main>
    </div>
  );
}

export default ProjectCardSimple;
