import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames/bind";

import styles from "./CustomSelect.module.scss";

const cx = classnames.bind(styles);

const CustomSelect = ({ options, defaultLabel, onChangeFunction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultLabel);
  const dropdownRef = useRef(null);

  // Toggle the dropdown when the button is clicked
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption((prevOption) => option);
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    onChangeFunction(selectedOption?.value);
  }, [selectedOption]);

  return (
    <div className={cx("custom-select")} ref={dropdownRef}>
      <button className={cx("select-button")} onClick={toggleDropdown}>
        {selectedOption?.name} <span className={cx("arrow")}>▼</span>
      </button>

      {isOpen && (
        <div className={cx("dropdown-content")}>
          {options.map((option, index) => (
            <div
              key={index}
              className={cx("dropdown-item")}
              onClick={() => handleOptionSelect(option)}
            >
              {option?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
