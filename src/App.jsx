import { useContext, useState } from "react";
import styles from "./App.module.scss";
import LocaleContext from "./context/LocaleContext";

import { Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/LoginPage";
import "./config/i18n";
import PageStruct from "./pages/PageStruct";
import DashboardPage from "./pages/DashboardPage";
import ProjectRegistration from "./components/ProjectRegistration";
import AuthContext from "./context/AuthContext";
import { getUserFromLocalStorage } from "./utils/localStorageUtils";
import ProjectsOverview from "./components/ProjectsOverview";
import LandingSection from "./components/LandingSection";
import StaffsOverview from "./components/StaffsOverview";
import i18n from "./config/i18n";
import UserSettings from "./components/UserSettings";
import StaffRegistration from "./components/StaffRegistration";

function App() {
  const [locale, setLocale] = useState("en");
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(getUserFromLocalStorage());
  const queryClient = new QueryClient();

  // i18n.changeLanguage(locale);
  return (
    <AuthContext.Provider
      value={{
        jwtToken,
        setJwtToken,
        user,
        setUser,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <Routes>
            <Route element={<PageStruct />}>
              <Route index element={<LandingSection />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path="projects">
                <Route index element={<ProjectsOverview />} />
                <Route path="add" element={<ProjectRegistration />} />
              </Route>
              <Route path="users">
                <Route index element={<StaffsOverview />} />
              </Route>
              <Route path="office" element={<Outlet />}>
                <Route path="staffs">
                  <Route index element={<StaffsOverview />} />
                  <Route path="add" element={<StaffRegistration />} />
                </Route>
              </Route>
              <Route path="settings" element={<Outlet />}>
                <Route index element={<UserSettings />} />
              </Route>
            </Route>
          </Routes>
        </LocaleContext.Provider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
