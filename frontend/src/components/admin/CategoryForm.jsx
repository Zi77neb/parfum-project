// CategoryForm.jsx
import React, { useState, useEffect } from "react";
import "../../styles/components/CategoryForm.css";

const API_URL = "http://localhost:8080/api/categories";

const CategoryForm = ({
  category = null,
  onSuccess = () => {},
  onCancel = () => {},
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        category ? `${API_URL}/${category.id}` : API_URL,
        {
          method: category ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur");
      }

      const data = await response.json();

      setForm({
        name: "",
        description: "",
      });

      onSuccess(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <form className="category-form auth-form-panel" onSubmit={handleSubmit}>
        <h3 className="auth-heading">{category ? "Modifier" : "Créer"} une catégorie</h3>
        <p className="auth-subheading">Gestion éditoriale du catalogue de parfums</p>

        <div className="form-field">
          <label className="auth-label">Nom de la catégorie</label>
          <input
            className="auth-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Épices & Boisés, Collection Privée..."
            required
          />
        </div>

        <div className="form-field">
          <label className="auth-label">Description ou Note Olfactive</label>
          <textarea
            className="auth-input"
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Décrivez l'univers olfactif de cette catégorie..."
          />
        </div>

        <div className="category-form__actions">
          {category && (
            <button type="button" className="btn-outline-gold" onClick={onCancel}>
              Annuler
            </button>
          )}
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Enregistrement..." : category ? "Enregistrer les modifications" : "Créer la catégorie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;