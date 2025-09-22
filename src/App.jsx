import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/sections/Login/Login";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute.jsx";
import LandingPage from "./components/LandingPage.jsx";

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
              <h1>Inicio de sesión exitoso 🚀</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
