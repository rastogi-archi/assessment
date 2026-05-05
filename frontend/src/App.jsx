import { Route, Routes, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./layouts/Dashboard";
import Projects from "./layouts/Projects";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/projects"
          element={
            isAuthenticated ? <Projects /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
