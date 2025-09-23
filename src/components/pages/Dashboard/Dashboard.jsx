import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers } from "react-icons/fa"; // 👈 Iconos bonitos
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}
      <header className="dashboard-header">
        <img src="/img/logo-genuine-full.webp" alt="Logo" className="dashboard-logo" />
       
      </header>

       <h1 className="dashboard-title">Panel Principal</h1>
       {/* SUBTITULO */}
      <p className="dashboard-subtitle">Selecciona un módulo:</p>

      {/* GRID */}
      <div className="dashboard-grid">
        <Link to="/students" className="dashboard-card">
          <FaUserGraduate className="dashboard-icon" />
          <h3>Estudiantes</h3>
          <p>Gestión de estudiantes registrados</p>
        </Link>

        <Link to="/teachers" className="dashboard-card">
          <FaChalkboardTeacher className="dashboard-icon" />
          <h3>Profesores</h3>
          <p>Administrar docentes del colegio</p>
        </Link>

        <Link to="/staff" className="dashboard-card">
          <FaUsers className="dashboard-icon" />
          <h3>Comerciales & Marketing</h3>
          <p>Equipo administrativo y comercial</p>
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <p>© 2025 Genuine School — Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
