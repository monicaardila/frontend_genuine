import React from "react";
import aboutImg from "../../../assets/img/about-banner.png";
import rocketImg from "../../../assets/img/cohete.png";
import eyeImg from "../../../assets/img/ojo.png";
import "./About.css";

function About() {
  return (
    <section className="about">
      {/* 🔥 Imagen tipo banner */}
      <div
        className="about-image"
        style={{ "--about-img": `url(${aboutImg})` }}
      ></div>

      <div className="content">
        <h2>
          Nuestra misión en el mundo y lo que soñamos <br />
          para tus hijos
        </h2>

        {/* Video solo móvil */}
        <div className="about-video">
          <div className="video-container">
            <iframe
              src="https://www.youtube-nocookie.com/embed/0IlUVfWThdo?controls=0"
              title="Manifiesto Genuine"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>


        <div className="cards">
          <div className="card-box">
            <img src={rocketImg} alt="Misión" className="icon" />
            <h3>Nuestra misión</h3>
            <p>
              Educar, empoderar y conectar a nuestros estudiantes mediante
              experiencias de aprendizaje remoto que trasciendan las fronteras
              geográficas e idiomáticas.
            </p>
          </div>

          <div className="card-box">
            <img src={eyeImg} alt="Visión" className="icon" />
            <h3>Nuestra visión</h3>
            <p>
              Visualizamos un mundo donde miles de jóvenes y niños usen sus
              habilidades para transformar sus comunidades y regiones por medio
              del emprendimiento, la tecnología y la innovación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
