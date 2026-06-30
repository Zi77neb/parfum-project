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
    if (!window.confirm("Supprimer cette categorie ?")) {
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
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content admin-page">
        <h1>Gestion des categories</h1>

        <CategoryForm
          category={selectedCategory}
          onSuccess={() => {
            setSelectedCategory(null);
            fetchCategories();
          }}
          onCancel={() => setSelectedCategory(null)}
        />

        <hr />

        <h2>Liste des categories</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button onClick={() => setSelectedCategory(category)}>
                    Modifier
                  </button>

                  <button
                    className="admin-table__danger"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="4">Aucune categorie.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
