import React from "react";
import "../../styles/components/Loader.css";

const Loader = ({ text = "Chargement..." }) => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;