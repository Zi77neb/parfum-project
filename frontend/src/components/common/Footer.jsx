import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer footer-shell">
      {/* Éléments de structure et d'ambiance ultra-luxe */}
      <div className="site-footer__seam"></div>
      <div className="site-footer__grid"></div>
      <div className="site-footer__mesh"></div>
      <div className="site-footer__fade"></div>

      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <h3 className="site-footer__brand-title">Maison des Parfums</h3>
          <div className="site-footer__ornament"></div>
          <p className="site-footer__text">
            Créateur de fragrances rares et d'émotions olfactives intemporelles. Chaque flacon raconte une histoire d'excellence et de haute haute parfumerie.
          </p>
        </div>

        <div className="site-footer__nav-group">
          <h4 className="site-footer__title">Navigation</h4>
          <div className="site-footer__links">
            <Link to="/" className="site-footer__link">Accueil</Link>
            <Link to="/products" className="site-footer__link">Collections</Link>
            <Link to="/cart" className="site-footer__link">Votre Panier</Link>
            <Link to="/admin/login" className="site-footer__link">Portail Privé</Link>
          </div>
        </div>

        <div className="site-footer__nav-group">
          <h4 className="site-footer__title">Contact & Service Client</h4>
          <p className="site-footer__text italic-note">
            Une question sur une fragrance ? Nos conseillers VIP vous répondent de façon personnalisée.
          </p>
          <a href="mailto:concierge@maisonparfums.com" className="site-footer__cta">
            Contacter le Concierge →
          </a>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="site-footer__bar-inner">
          <p>© {new Date().getFullYear()} Maison des Parfums. Tous droits réservés.</p>
          <p className="site-footer__bar-tagline">Haute Parfumerie Française</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;