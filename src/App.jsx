import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/pages/Dashboard/Dashboard.jsx";
import Students from "./components/pages/Students/Students.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Pública */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protegida */}
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Ruta para estudiantes */}
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
