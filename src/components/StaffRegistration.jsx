import React, { useCallback, useContext, useState } from "react";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import AuthContext from "../context/AuthContext";
import styles from "./StaffRegistration.module.scss";

import IconCheckmark from "../components/vectors/IconCheckmark";
import Button from "./Button";
import addUser from "../apis/addUser";

const cx = classNames.bind(styles);

function StaffRegistration() {
  const { jwtToken } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [staffRole, setStaffRole] = useState("");

  const [errorMessages, setErrorMessages] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(firstName) || validator.isEmpty(lastName)) {
      setErrorMessages("First name and last name cannot be empty.");
      return;
    } else if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      setErrorMessages(
        "First name and last name should only contain alphabets."
      );
      return;
    } else if (!validator.isEmail(email)) {
      setErrorMessages("Please enter a valid email address.");
      return;
    } else if (validator.isEmpty(username)) {
      setErrorMessages("Username cannot be empty.");
      return;
    } else if (validator.isEmpty(password)) {
      setErrorMessages("Password cannot be empty.");
      return;
    } else if (validator.isEmpty(staffRole)) {
      setErrorMessages("Please select a role for the staff.");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      username,
      role: staffRole,
    };

    submitForm({ payload, jwtToken });
  };

  const {
    mutate: submitForm,
    status,
    error,
    data,
  } = useMutation({
    mutationFn: ({ payload, jwtToken }) => addUser(payload, jwtToken),
    onSuccess: (data) => {
      // Handle success (optional)
      setSuccessMessage("User successfully created.");
      setErrorMessages("");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setStaffRole("");
    },
    onError: (error) => {
      // Handle error (optional)
      setSuccessMessage("");
      setErrorMessages(error.message);
      console.error("Error changing password:", error);
    },
  });

  return (
    <section className={cx("staff-registration")}>
      <header className={cx("header")}>
        <h3>Add a new staff</h3>
      </header>
      <form
        id="staff-registration-form"
        onSubmit={handleFormSubmit}
        className={cx("form")}
      >
        <div className={cx("text-fields")}>
          <div className={cx("input-field")}>
            <label htmlFor="firstName" className={cx("label")}>
              First Name
            </label>

            <input
              type="text"
              id="firstName"
              name="firstName"
              className={cx("input")}
              placeholder="Sabudh"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className={cx("input-field")}>
            <label htmlFor="lastName" className={cx("label")}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={cx("input")}
              placeholder="Thapa"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>

          <div className={cx("input-field")}>
            <label htmlFor="email" className={cx("label")}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={cx("input")}
              placeholder="tsabudh@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>
        <div className={cx("text-fields")}>
          <div className={cx("input-field")}>
            <label htmlFor="username" className={cx("label")}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={cx("input")}
              placeholder="Eg: tsabudh"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className={cx("input-field")}>
            <label htmlFor="password" className={cx("label")}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={cx("input")}
              placeholder="6 - 12 characters"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className={cx("radio-fields")}>
          <div className={cx("input-group")}>
            <fieldset>
              <legend className={cx("label")}>Assign a role.</legend>
              <div className={cx("flex-row")}>
                <div className={cx("wrapper")}>
                  <input
                    id="radio-data-entry"
                    name="role"
                    type="radio"
                    value={"DATA_ENTRY"}
                    data-value="DATA_ENTRY"
                    aria-label="DATA_ENTRY"
                    tabIndex={0}
                    onChange={(e) => setStaffRole(e.target.value)}
                  />
                  <label
                    htmlFor="radio-data-entry"
                    className={cx("custom-radio")}
                    tabIndex={0}
                  >
                    <span>Data Entry</span>
                    <span className={cx("checkmark")}>
                      <IconCheckmark />
                    </span>
                  </label>
                </div>
                <div className={cx("wrapper")}>
                  <input
                    id="radioApprover"
                    name="role"
                    type="radio"
                    value={"DATA_APPROVER"}
                    data-value="DATA_APPROVER"
                    aria-label="DATA_APPROVER"
                    aria-checked={true}
                    onChange={(e) => setStaffRole(e.target.value)}
                  />

                  <label
                    htmlFor="radioApprover"
                    className={cx("custom-radio")}
                    tabIndex={0}
                  >
                    <span>Data Approver</span>
                    <span className={cx("checkmark")}>
                      <IconCheckmark />
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <footer className={cx("footer")}>
          <Button className={"small small-padding primary"}>
            Add new staff
          </Button>

          <section className={cx("message")}>
            <div className={cx("errors")}>{errorMessages}</div>
            <div className={cx("success")}>{successMessage}</div>
          </section>
        </footer>
      </form>
    </section>
  );
}

export default StaffRegistration;
