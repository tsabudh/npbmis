import React from "react";
import classNames from "classnames/bind";

import styles from "./Dropdown.module.scss";

const cx = classNames.bind(styles);

function Dropdown({ toggleFunction, isOpen }) {
  return (
    <div className={cx("dropdown", { open: isOpen })}>This is dropdown.</div>
  );
}

export default Dropdown;
