import React from "react";
import "../../styles/components/SearchBar.css";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Rechercher un produit...",
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="search-bar__input"
      />
    </div>
  );
};

export default SearchBar;
