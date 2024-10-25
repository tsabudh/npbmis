import React, { useContext, useEffect } from "react";
import LocaleContext from "../context/localeContext";
import changeLanguage from "../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import LoginFrom from "../components/LoginForm";
import AuthContext from "../context/AuthContext";
import refreshToken from "../apis/refreshToken";
const messages = {
  en: { hello: "Hello" },
  np: { hello: "nepalihello" },
};

function LoginPage() {
  const { t } = useTranslation("login");

  const { jwtToken } = useContext(AuthContext);

  useEffect(() => {
    async function asyncWrapper() {
      if (jwtToken) {
        console.log("Token found. Refreshing token.");
        let responseText = await refreshToken(jwtToken);
        console.log(responseText);
      }
    }
    asyncWrapper();
  }, []);

  return (
    <section>
      <LoginFrom />
    </section>
  );
}

export default LoginPage;
