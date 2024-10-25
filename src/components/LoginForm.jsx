import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

import styles from "./LoginForm.module.scss";
import AuthContext from "../context/AuthContext";

import Button from "./Button";
import loginUser from "../apis/loginUser";
import refreshToken from "../apis/refreshToken";
import {
  setJwtToLocalStorage,
  setUserToLocalStorage,
} from "../utils/localStorageUtils";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const LoginForm = () => {
  const { t } = useTranslation("login");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const loginFormRef = useRef(null);

  const navigate = useNavigate();

  const { jwtToken, setJwtToken, user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function asyncWrapper() {
      try {
        if (jwtToken && user?.role) {
          let response = await refreshToken(jwtToken, user.role);
          if (response.status == "success") {
            setJwtToken(response.token);
            setJwtToLocalStorage(response.token);
            setUser(response.user);
            setUserToLocalStorage(response.user);
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    asyncWrapper();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);
    let form = loginFormRef.current;
    let loginDetails = {};
    let formData = new FormData(form);
    formData.forEach((value, key) => (loginDetails[key] = value));

    setIsLoading(true);
    loginDetails.username = loginDetails.username.toLocaleLowerCase();

    let response = await loginUser(loginDetails);
    if (response) setIsLoading(false);

    if (response.status == "success") {
      setIsLoading(false);
      setJwtToken(response.token);
      setUser(response.user);
      setJwtToLocalStorage(response.token);
      setUserToLocalStorage(response.user);

      navigate("/dashboard");
    } else if (response.status == "failure") {
      if (response.message) {
        setErrorMessage(response.message);
      } else if (response.errors) {
        setErrorMessage(response.errors[0].msg);
      }
    } else {
      setErrorMessage("Something went wrong on our side.😞");
    }

    return;
  }

  return (
    <div className={cx("login-container")}>
      <div className={`${styles["form-container"]}`}>
        <form id="loginForm" className={cx("form")} ref={loginFormRef}>
          <div className={cx("header")}>
            <div className={cx("active")}>{t("login")}</div>
          </div>

          <div className={styles["input-group"]}>
            <label htmlFor="username" className={styles["input-label"]}>
              {t("username")}
            </label>
            <input
              className={styles["input-field"]}
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="password" className={styles["input-label"]}>
              {t("password")}
            </label>
            <input
              className={styles["input-field"]}
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles["show-password"]}
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? <BsEyeFill /> : <BsEyeSlashFill />}
            </span>
          </div>
        </form>
        <div className={styles["action"]}>
          <Button
            className="primary rounded"
            onClick={handleSubmit}
            form="loginForm"
          >
            {t("login")}
          </Button>
          {isLoading && "Loading..."}
        </div>
        {errorMessage && (
          <div className={styles["error-message"]}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
