import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import apiService from "../../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 inicializar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔐 Attempting login...");
      const data = await apiService.login({ email, password });
      
      console.log("✅ Login successful, token received:", !!data.access_token);
      localStorage.setItem("token", data.access_token);
      
      // Redirigir al dashboard o a la página principal
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/img/logo-genuine-full.webp"
          alt="Logo Genuine"
          className="join-log"
        />
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
