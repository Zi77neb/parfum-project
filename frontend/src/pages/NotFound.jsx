import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found section-dark noise-overlay">
      <div className="not-found__card glass-dark">
        {/* Numéro géant ornemental en arrière-plan avec effet stroke */}
        <span className="not-found__code text-stroke-gold">
          404
        </span>

        <span className="luxury-section-label">Note Volatile</span>
        <h1 className="font-display">Sillage Égaré</h1>

        <p className="footer-brand-text">
          La fragrance ou l'atelier que vous tentez de rejoindre n'est plus répertorié ou s'est temporairement évaporé.
        </p>

        <Link
          to="/"
          className="luxury-cta shine-on-hover not-found__button"
        >
          <span className="luxury-cta__inner">Retourner à la Maison</span>
          <span className="luxury-cta__shine"></span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;