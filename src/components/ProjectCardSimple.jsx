import React from "react";
import classnames from "classnames/bind";
import styles from "./ProjectCardSimple.module.scss";

const cx = classnames.bind(styles);

function ProjectCardSimple({ name, nepaliName, status, description, sector }) {
  return (
    <div className={cx("project-card-simple")}>
      <header className={cx("header")}>
        <h3 className={cx("h3")}>{name}</h3>
        <h3 className={cx("h3")}>{nepaliName}</h3>
        <p>{description}</p>
      </header>
      <main className={cx("main")}>
        <p>
          <span className="field">Status: </span>
          <span className="value">{status}</span>
        </p>
        <p>
          <span className="field">Sector: </span>
          <span className="value">{sector}</span>
        </p>
      </main>
    </div>
  );
}

export default ProjectCardSimple;
