import { Navigate, Route, Routes } from "react-router";

import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Loading application...</p>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Sidebar />

              <div className="main-content">
                <Header title="D  evOps Task Manager" />

                <div className="page-content">
                  <div className="user-bar">
                    <span>Welcome, {user?.name || "User"}</span>

                    <button className="secondary-button" onClick={logout}>
                      Logout
                    </button>
                  </div>

                  <Routes>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/tasks" element={<Tasks />} />

                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
