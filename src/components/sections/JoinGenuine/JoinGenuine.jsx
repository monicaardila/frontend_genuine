import React from "react";
import "./JoinGenuine.css";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaLinkedin } from "react-icons/fa";

function JoinGenuine() {
  return (
    <section className="join-section">
      {/* Imagen como fondo */}
      <div className="join-background"></div>
      {/* Logo en la esquina */}
      <img src="/img/logo-genuine-full.webp" alt="Logo Genuine Full"  className="join-logo" />

      {/* Tarjeta dividida */}
      <div className="join-card">
  
  <div className="join-content">
    <h2>
      ¡Únete a <span>Genuine Digital School</span> hoy!
    </h2>
  </div>

  <div className="join-content-text">
    <p className="subtitle">
      Explora el increíble universo de la educación virtual junto a tu hijo
    </p>
    <p className="description">
      Síguenos en Redes Sociales y conoce nuestra gran comunidad digital
    </p>

    <div className="social-icons">
      <a href="https://facebook.com"><FaFacebook /></a>
      <a href="https://instagram.com"><FaInstagram /></a>
      <a href="https://tiktok.com"><FaTiktok /></a>
      <a href="https://youtube.com"><FaYoutube /></a>
      <a href="https://linkedin.com"><FaLinkedin /></a>
    </div>
  </div>
  <p className="website">studyatgenuine.com</p>
</div>

     
    </section>
  );
}

export default JoinGenuine;
