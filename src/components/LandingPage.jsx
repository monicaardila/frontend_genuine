import React from "react";
import heroImg from "../assets/img/family-hero.jpg";
import "./LandingPage.css";
import About from "../components/sections/About/About";
import WorldSection from "../components/sections/StatsMap/StatsMap";
import JoinGenuine from "../components/sections/JoinGenuine/JoinGenuine";
import Sidebar from "./Sidebar";


function App() {
  return (
    <div id="Hero" className="container">
      {/* Hero principal */}
      <section className="hero">
        <img src={heroImg} alt="Familia estudiando" className="hero-background" />
        <div className="card">
          <div className="contenedor-educacion">
            <h2>
              Estás a punto de iniciar un viaje hacia el universo de la{" "}
              <span>educación digital</span>
            </h2>
          </div>

          <div className="card-footer">
          <img src="/img/logo-genuine-full.webp" alt="Logo Genuine" className="join-log" />
          </div> 
        </div>
        <p className="footer-text">studyatgenuine.com</p>
      </section>

      {/* About*/}
      <section  id="About" className="section">
        <About />
      </section>
      {/* WorldSection */}
      <section id="WorldSection" className="section">
        <WorldSection />
      </section>
      {/* JoinGenuine */}
      <section id="JoinGenuine" className="section">
        <JoinGenuine />
      </section>
      
      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default App;
