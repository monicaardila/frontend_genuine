// src/components/common/Sidebar.jsx
import React from "react";
import "./sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button>×</button>
        <img src="/img/logo-genuine-icon.webp" alt="Logo Genuine" />
        </div>
        <nav>
        <ul>
          <li><a href="#Hero">Inicio</a></li>
          <li><a href="#About">¿Quiénes somos?</a></li>
          <li><a href="#WorldSection">Somos Estadounidenses</a></li>
          <li><a href="#JoinGenuine">Únete a Genuine</a></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
