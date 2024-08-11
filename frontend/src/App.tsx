import React from "react";
import {
  BrowserRouter as Router,
  Routes, Route, Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  // Ensure token exists and is valid (you can add additional validation if needed)
  if (!token || token === "null" || token === "undefined") {
    // Redirect to signin page if not authenticated
    return <Navigate to="/signin" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // Protected route for home page allowing access only if authenticated
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;