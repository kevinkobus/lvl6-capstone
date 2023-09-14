import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./client/components/Navbar";
import Auth from "./client/components/Auth";
import Profile from "./client/components/Profile";
import Public from "./client/components/Public";
import { UserContext } from "./client/context/UserContext";
import ProtectedRoute from "./client/components/ProtectedRoute";

function App() {
  const { token, logout } = useContext(UserContext);
  return (
    <div className="App">
      {token && <Navbar logout={logout} token={token} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public"
          element={
            <ProtectedRoute token={token} redirtectTo="/">
              <Public />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/comments"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Comment />
            </ProtectedRoute>
          }
          /> */}
      </Routes>
    </div>
  );
}

export default App;
