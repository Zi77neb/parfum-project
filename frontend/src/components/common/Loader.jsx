import React from "react";
import "../../styles/components/Loader.css";

const Loader = ({ text = "Éveil des essences..." }) => {
  return (
    <div className="loader luxury-motion">
      <div className="loader__ring-container">
        {/* L'anneau d'or rotatif asymétrique */}
        <div className="loader__spinner-luxury brushed-gold-animated"></div>
        {/* Le point d'ancrage central fixe d'orfèvrerie */}
        <div className="loader__core-dot"></div>
      </div>
      <p className="label-gold loader__text">{text}</p>
    </div>
  );
};

export default Loader;