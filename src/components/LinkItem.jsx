import React from "react";
import classNames from "classnames/bind";

import styles from "./LinkItem.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function LinkItem(props) {
  const { to, className: classes, children, ...restOfProps } = props;

  const navigate = useNavigate();
  return (
    <div
      className={cx("link-item", classes?.split(" "))}
      {...restOfProps}
      onClick={() => navigate(to)}
    >
      {children}
    </div>
  );
}

export default LinkItem;
