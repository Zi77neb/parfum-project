import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__card">
        <span className="not-found__code">
          404
        </span>

        <h1>Page introuvable</h1>

        <p>
          La page que vous recherchez
          n'existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="not-found__button"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;