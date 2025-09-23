import React from "react";
import CountUp from "react-countup";
import "./StatsMap.css";
import worldMap from "../../../assets/img/mapa.webp";
import studentsImg from "../../../assets/img/genuine-school-students.webp"; // tu foto

function WorldSection() {
  return (
<section className="world">
  <div className="world-container">
    {/* Parte superior */}
<div className="top-card">
  <div className="top-content">
    <div className="text-box">
      <h2>De Estados Unidos para el mundo</h2>
      <p>
        Nuestro colegio digital privado está constituido y registrado en
        Estados Unidos ante el{" "}
        <strong>Florida Department of Education</strong> con el código{" "}
        <strong>8822</strong>.
      </p>
      <div className="buttons">
        <a href="#" className="link">Conoce el nuestro aquí</a>
        <a href="#" className="btn">Registro legal</a>
      </div>
    </div>

    <div className="image-box">
      <img src={studentsImg} alt="Estudiantes Genuine" />
    </div>
  </div>
</div>

<div className="world-card">
  <div className="world-header">
  <h2 className="world-title">
  Somos <br /> del <span>mundo</span>
</h2>


    <div className="stats">
      <div className="stat orange">
        + <CountUp end={400} duration={2} /> <span>Estudiantes</span>
      </div>
      <div className="stat purple">
        <CountUp end={28} duration={2.5} /> <span>Staff</span>
      </div>
      <div className="stat dark-purple">
        <CountUp end={44} duration={3} /> <span>Profesores</span>
      </div>
    </div>
  </div>

  <div className="world-content">
    <div className="countries">
      <div className="block orange">
        Colombia, Ecuador, Perú, México, Panamá, Costa Rica, Chile,
        Argentina, Estados Unidos, Emiratos Árabes, Brasil,
        República Dominicana, Irlanda, Canadá, España, Portugal, China, Italia.
      </div>
      <div className="block purple">
        Estados Unidos, Colombia, Perú, Brasil, Chile, México, Venezuela.
      </div>
      <div className="block dark-purple">
        Colombia, Sudáfrica, Filipinas, Chile, México, Singapur.
      </div>
    </div>

    <div className="map">
      <img src={worldMap} alt="Mapa mundial" />
    </div>
  </div>
</div>

  </div>
</section>
  );
}

export default WorldSection;
