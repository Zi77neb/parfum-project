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
    <div className="product-filter">
      <h3>Filtres</h3>

      <div className="form-field">
        <label>Categorie</label>
        <select
          value={filters.categoryId || ""}
          onChange={(e) =>
            handleChange(
              "categoryId",
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Toutes</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Sexe</label>
        <select
          value={filters.sex || ""}
          onChange={(e) =>
            handleChange("sex", e.target.value || null)
          }
        >
          <option value="">Tous</option>
          <option value="HOMME">Homme</option>
          <option value="FEMME">Femme</option>
          <option value="ENFANT">Enfant</option>
        </select>
      </div>

      <div className="form-field">
        <label>Prix minimum</label>
        <input
          type="number"
          value={filters.minPrice || ""}
          onChange={(e) =>
            handleChange(
              "minPrice",
              e.target.value ? Number(e.target.value) : null
            )
          }
        />
      </div>

      <div className="form-field">
        <label>Prix maximum</label>
        <input
          type="number"
          value={filters.maxPrice || ""}
          onChange={(e) =>
            handleChange(
              "maxPrice",
              e.target.value ? Number(e.target.value) : null
            )
          }
        />
      </div>

      <div className="product-filter__check">
        <label>
          <input
            type="checkbox"
            checked={filters.newest || false}
            onChange={(e) =>
              handleChange("newest", e.target.checked)
            }
          />{" "}
          Nouveautes
        </label>
      </div>

      <button onClick={onReset}>Reinitialiser</button>
    </div>
  );
};

export default ProductFilter;
