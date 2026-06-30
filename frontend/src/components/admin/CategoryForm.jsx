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

      alert(
        category
          ? "Categorie modifiee avec succes."
          : "Categorie creee avec succes."
      );

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
    <form className="category-form" onSubmit={handleSubmit}>
      <h3>{category ? "Modifier" : "Ajouter"} une categorie</h3>

      <div className="form-field">
        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="category-form__actions">
        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : category ? "Modifier" : "Ajouter"}
        </button>

        {category && (
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;