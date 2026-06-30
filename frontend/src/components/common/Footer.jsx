import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <h3>E-Commerce</h3>
      <p>Projet de test du backend Spring Boot.</p>

      <div className="site-footer__links">
        <Link to="/">Accueil</Link>
        <Link to="/products">Produits</Link>
        <Link to="/cart">Panier</Link>
        <Link to="/admin/login">Administration</Link>
      </div>

      <p className="site-footer__copyright">
        Copyright {new Date().getFullYear()} E-Commerce
      </p>
    </footer>
  );
};

export default Footer;
