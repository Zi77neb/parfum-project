import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="site-nav">
      <div className="site-nav__brand">
        <Link to="/" className="site-nav__brand-link">
          E-Commerce
        </Link>
      </div>

      <div className="site-nav__links">
        <Link to="/">Accueil</Link>
        <Link to="/products">Produits</Link>

        <Link to="/cart" className="site-nav__cart">
          Panier
          {cartCount > 0 && (
            <span className="site-nav__cart-count">
              {cartCount}
            </span>
          )}
        </Link>

        {token ? (
          <>
            <Link to="/admin">Administration</Link>
            <button onClick={logout}>
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/admin/login">
            Connexion Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;