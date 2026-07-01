import React from "react";
import "../../styles/components/SearchBar.css";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Saisissez une note, une fragrance, un sillage...",
}) => {
  return (
    <div className="search-bar-luxury-container">
      <div className="search-bar__inner">
        <label className="label-gold search-bar-label">Recherche</label>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="field-input search-bar__input"
        />
        {/* Un petit trait d'ornement architectural fixe en arrière-plan */}
        <div className="search-bar__focus-line"></div>
      </div>
    </div>
  );
};

export default SearchBar;