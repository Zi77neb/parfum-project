import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import CategoryForm from "../../components/admin/CategoryForm";
import "../../styles/pages/admin/Categories.css";

const API_URL = "http://localhost:8080/api/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const deleteCategory = async (id) => {
    if (!window.confirm("Supprimer cette collection ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      fetchCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-layout admin-shell admin-motion">
      <Sidebar />

      <div className="admin-content admin-page">
        {/* En-tête de page officiel issu de l'Admin Shell */}
        <div className="admin-page-head">
          <div>
            <span className="admin-eyebrow">Ateliers & Structures</span>
            <h1 className="admin-title">GESTION DES COLLECTIONS</h1>
            <p className="admin-subtitle">
              Configurez et organisez les familles olfactives et les gammes de votre maison.
            </p>
          </div>
        </div>

        <div className="admin-form-container">
          <CategoryForm
            category={selectedCategory}
            onSuccess={() => {
              setSelectedCategory(null);
              fetchCategories();
            }}
            onCancel={() => setSelectedCategory(null)}
          />
        </div>

        <div className="gold-divider"></div>

        <h2 className="admin-section-subtitle font-display">Collections Répertoriées</h2>

        {/* Conteneur scrollable compact pour petits écrans */}
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom de la collection</th>
                <th>Description</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="tabular-nums">{category.id}</td>
                  <td className="font-medium">{category.name}</td>
                  <td className="text-muted-column">{category.description || "Aucune description enregistrée."}</td>
                  <td className="text-right">
                    <div className="admin-action-group">
                      <button 
                        className="admin-icon-btn" 
                        onClick={() => setSelectedCategory(category)}
                        title="Modifier"
                      >
                        Modifier
                      </button>

                      <button
                        className="admin-icon-btn danger"
                        onClick={() => deleteCategory(category.id)}
                        title="Supprimer"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="admin-table-empty">
                    Aucune collection n'est configurée en atelier.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;