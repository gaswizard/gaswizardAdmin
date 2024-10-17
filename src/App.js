import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";

import { UserManagement } from "./components/UserManagement";

import { TransactionHistory } from "./components/TransactionHistory";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { SignupUser } from "./components/SignupUser";
import { ReferralHistory } from "./components/ReferralHistory";
import { ManualEntry } from "./components/ManualEntry";

function App() {

  const { login } = useAuth();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      login();
    }
  }, [login]);

  return (
    <>
      {/* <BaseUrl /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
          />
          <Route
            path="/user-management"
            element={<ProtectedRoute component={<UserManagement />} />}
          />
           <Route
            path="/sign-up-user"
            element={<ProtectedRoute component={<SignupUser />} />}
          />
          <Route
            path="/transaction-history"
            element={<ProtectedRoute component={<TransactionHistory />} />}
          />
          <Route
            path="/referral-history"
            element={<ProtectedRoute component={<ReferralHistory />} />}
          />
                <Route
            path="/manual-entry-history"
            element={<ProtectedRoute component={<ManualEntry />} />}
          />
        </Routes>
      </Router>
      <ToastContainer
        limit={1}
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme={"dark"}
      />
    </>
  );
}
export default App;
