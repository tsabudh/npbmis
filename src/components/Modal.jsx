import React from "react";
import classnames from "classnames/bind";

import styles from "./Modal.module.scss";
import Button from "./Button";
import { IoMdCloseCircle } from "react-icons/io";

const cx = classnames.bind(styles);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  // Stop event propagation from modal to overlay
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={cx("modal-overlay")} onClick={onClose}>
      <div className={cx("modal-wrapper")}>
        <div className={cx("modal")} onClick={handleModalClick}>
          <div className={cx("modal-header")}>
            <div className={cx("close-button")}>
              <IoMdCloseCircle onClick={onClose} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
