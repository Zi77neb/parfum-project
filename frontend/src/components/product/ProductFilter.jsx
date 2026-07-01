import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/categories";

const ProductFilter = ({
  filters,
  onChange,
  onReset,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (name, value) => {
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="product-filter fleet-filter-nav">
      <h3 className="fleet-filter-heading">Ajuster la Sélection</h3>
      <div className="gold-divider-subtle"></div>

      <div className="fleet-filter-group form-field">
        <label className="label-gold">Collection</label>
        <select
          className="fleet-filter-select input-luxury"
          value={filters.categoryId || ""}
          onChange={(e) =>
            handleChange(
              "categoryId",
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Toutes les collections</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="fleet-filter-group form-field">
        <label className="label-gold">Sillage</label>
        <select
          className="fleet-filter-select input-luxury"
          value={filters.sex || ""}
          onChange={(e) =>
            handleChange("sex", e.target.value || null)
          }
        >
          <option value="">Tous les sillages</option>
          <option value="HOMME">Homme</option>
          <option value="FEMME">Femme</option>
          <option value="ENFANT">Enfant</option>
        </select>
      </div>

      <div className="form-grid-two-columns">
        <div className="fleet-filter-group form-field">
          <label className="label-gold">Prix Min (DH)</label>
          <input
            className="fleet-filter-input input-luxury"
            type="number"
            value={filters.minPrice || ""}
            placeholder="0"
            onChange={(e) =>
              handleChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : null
              )
            }
          />
        </div>

        <div className="fleet-filter-group form-field">
          <label className="label-gold">Prix Max (DH)</label>
          <input
            className="fleet-filter-input input-luxury"
            type="number"
            value={filters.maxPrice || ""}
            placeholder="Max"
            onChange={(e) =>
              handleChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : null
              )
            }
          />
        </div>
      </div>

      <div className="product-filter__check-luxury">
        <label className="checkbox-container">
          <input
            type="checkbox"
            className="luxury-checkbox-native"
            checked={filters.newest || false}
            onChange={(e) =>
              handleChange("newest", e.target.checked)
            }
          />
          <span className="luxury-checkbox-custom"></span>
          <span className="checkbox-text">Nouveautés Olfactives</span>
        </label>
      </div>

      <button className="btn-secondary-flat" onClick={onReset}>
        Réinitialiser les filtres
      </button>
    </div>
  );
};

export default ProductFilter;