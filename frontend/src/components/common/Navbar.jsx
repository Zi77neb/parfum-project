import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    <nav className="site-header site-header--solid">
      <div className="site-nav__brand">
        <Link to="/" className="site-nav__brand-link font-display">
          Maison des Parfums
        </Link>
      </div>

      <div className="site-nav__links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Accueil
        </Link>
        <Link 
          to="/products" 
          className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}
        >
          Collections
        </Link>

        <Link 
          to="/cart" 
          className={`nav-link site-nav__cart ${location.pathname === "/cart" ? "active" : ""}`}
        >
          Panier
          {cartCount > 0 && (
            <span className="site-nav__cart-count editorial-pill editorial-pill--gold tabular-nums">
              {cartCount}
            </span>
          )}
        </Link>

        {token ? (
          <>
            <Link 
              to="/admin" 
              className={`nav-link ${location.pathname.startsWith("/admin") && location.pathname !== "/admin/login" ? "active" : ""}`}
            >
              Console
            </Link>
            <button className="header-btn-ghost logout-btn" onClick={logout}>
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/admin/login" className="header-btn-outline">
            Espace Privé
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;