import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-movie"
              element={
                <ProtectedRoute>
                  <AddMovie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-movie/:id"
              element={
                <ProtectedRoute>
                  <EditMovie />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1F2937",
                color: "#F3F4F6",
                border: "1px solid #8B5CF6",
              },
              success: {
                iconTheme: {
                  primary: "#8B5CF6",
                  secondary: "#F3F4F6",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#F3F4F6",
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
