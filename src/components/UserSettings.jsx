import React, { useCallback, useContext, useState } from "react";
import validator from "validator";
import classNames from "classnames/bind";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

import styles from "./UserSettings.module.scss";
import Button from "./Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthContext from "../context/AuthContext";
import changePassword from "../apis/changePassword";
import LoaderSpinner from "./LoaderSpinner";

const cx = classNames.bind(styles);

function UserSettings() {
  const [errorMessages, setErrorMessages] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { jwtToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setErrorMessages("");
    setSuccessMessage("");
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = [];

    if (validator.isEmpty(formData.password)) {
      errors.push("Password cannot be empty.");
    }
    if (
      !validator.isLength(formData.password, {
        minLength: 6,
        maxLength: 16,
      })
    ) {
      errors.push("Password must be at between 6 to 16 characters in length.");
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (errors.length == 0) {
      setErrorMessages("");
      return true;
    } else {
      setErrorMessages(
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      );
      return false;
    }
  }, [formData]);

  const {
    mutate: submitForm,
    status,
    error,
    data,
  } = useMutation({
    mutationFn: ({ payload, jwtToken }) => changePassword(payload, jwtToken),
    onSuccess: (data) => {
      // Handle success (optional)
      setSuccessMessage("Password successfully changed.");
      setErrorMessages("");
      setFormData({
        password: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      // Handle error (optional)
      setSuccessMessage("");
      setErrorMessages(error.message);
      console.error("Error changing password:", error);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let validated = validateForm();
    if (validated)
      submitForm({ payload: { newPassword: formData.password }, jwtToken });

    return;
  };

  return (
    <section className={cx("user-settings")}>
      <header className={cx("header")}>
        <h2 className={cx("h2")}> Settings</h2>
      </header>
      <main className={cx("main")}>
        <form id="project-registration-form" className={cx("form")}>
          <div className={cx("text-fields")}>
            <div className={cx("input-field")}>
              <label htmlFor="changePassword" className={cx("label")}>
                Change Password <span> </span>
                <HiOutlineQuestionMarkCircle title="Password must be at between 6 to 16 characters in length." />
              </label>

              <input
                type="password"
                id="password"
                name="password"
                className={cx("input")}
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={cx("input-field")}>
              <label htmlFor="confirmPassword" className={cx("label")}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={cx("input")}
                placeholder="Confirm New Password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
          </div>

          <footer className={cx("footer")}>
            <section className={cx("main")}>
              <Button className={"submit "} onClick={handleFormSubmit}>
                Save changes
              </Button>

              <LoaderSpinner state={status} />
            </section>

            <section className={cx("message")}>
              <div className={cx("errors")}>{errorMessages}</div>
              <div className={cx("success")}>{successMessage}</div>
            </section>
          </footer>
        </form>
      </main>
    </section>
  );
}

export default UserSettings;
