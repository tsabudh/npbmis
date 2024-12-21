import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import LocaleContext from "./context/LocaleContext";

import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/LoginPage";
import "./config/i18n";
import AuthContext from "./context/AuthContext";
import { getUserFromLocalStorage } from "./utils/localStorageUtils";
import LandingSection from "./components/LandingSection";
import LayoutPage from "./pages/LayoutPage";
import Board from "./components/Board";
import { ToastContainer } from "react-toastify";
import ProjectOverviewTab from "./components/ProjectOverviewTab";
import ProjectRequests from "./components/ProjectRequests";
import ProjectRequestDetail from "./components/ProjectRequestDetail";
import Account from "./components/Account";
import ProjectEdit from "./components/ProjectEditTab";
import ProjectRegisterTab from "./components/ProjectRegisterTab";
import ProjectEditTab from "./components/ProjectEditTab";
import ProjectEditDetails from "./components/ProjectEditDetails";
import ProjectDrafts from "./components/ProjectDrafts";
import Project from "./components/Project";
import ProjectDetails from "./components/ProjectDetails";
import OverviewPage from "./components/OverviewPage";

function App() {
  const [locale, setLocale] = useState("en");
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(getUserFromLocalStorage());
  const queryClient = new QueryClient();

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
          <ToastContainer />
          <Routes>
            <Route index element={<LandingSection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<LayoutPage />}>
              <Route index element={<OverviewPage/>} />
              <Route path="account" element={<Account />} />
              <Route path="notifications" element={<div>notifications</div>} />
              <Route path="projects" element={<Board />}>
                <Route index element={<ProjectOverviewTab />} />
                <Route path="one" element={<ProjectDetails />}>
                  <Route path=":projectId" element={<ProjectDetails />} />
                </Route>
                <Route path="register" element={<ProjectRegisterTab />} />
                <Route path="edit" element={<ProjectEditTab />}>
                  <Route path=":projectId" element={<ProjectEditDetails />} />
                </Route>
                <Route path="drafts" element={<ProjectDrafts />}>
                  <Route path=":projectId" element={<ProjectEditDetails />} />
                </Route>
                <Route path="requests" element={<ProjectRequests />}>
                  <Route path=":projectId" element={<ProjectRequestDetail />} />
                </Route>
                <Route path="*" element={<div>Not found</div>} />
              </Route>
            </Route>
          </Routes>
        </LocaleContext.Provider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
