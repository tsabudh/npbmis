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
import { useMutation } from "@tanstack/react-query";
import LoaderSpinner from "./LoaderSpinner";

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

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username || !password) {
      setErrorMessage("Please enter username and password");
      return;
    }
    loginUserFn({ payload: { username, password } });
  };

  const {
    mutate: loginUserFn,
    status,
    error,
    data,
  } = useMutation({
    mutationFn: ({ payload }) => loginUser(payload),
    onSuccess: (data) => {
      setJwtToken(data.token);
      setUser(data.user);
      setJwtToLocalStorage(data.token);
      setUserToLocalStorage(data.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (error.data.message) setErrorMessage(error.data.message);
      else setErrorMessage(error.message);
      console.error("Error logging in:", error);
    },
  });

  return (
    <div className={cx("login-container")}>
      <div className={cx("form-container")}>
        <form id="loginForm" className={cx("form")} ref={loginFormRef}>
          <div className={cx("header")}>
            <div className={cx("active")}>{t("login")}</div>
          </div>

          <div className={cx("input-group")}>
            <label htmlFor="username" className={cx("input-label")}>
              {t("username")}
            </label>
            <input
              className={cx("input-field")}
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={cx("input-group")}>
            <label htmlFor="password" className={cx("input-label")}>
              {t("password")}
            </label>
            <input
              className={cx("input-field")}
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={cx("show-password")}
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? <BsEyeFill /> : <BsEyeSlashFill />}
            </span>
          </div>
        </form>
        <div className={cx("action")}>
          <Button
            className="primary rounded"
            // onClick={handleSubmit}
            onClick={handleLogin}
            form="loginForm"
          >
            {t("login")}
          </Button>
          {isLoading && " Logging in ..."}
          <LoaderSpinner state={status} />
        </div>
        {errorMessage && (
          <div className={cx("error-message")}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
