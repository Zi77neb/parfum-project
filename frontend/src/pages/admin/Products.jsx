import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import "../../styles/pages/admin/Products.css";

const API_URL = "http://localhost:8080/api/products";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("Impossible de charger les produits.");
      }

      const data = await res.json();
      setProducts(data.content || []);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) {
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
        throw new Error("Impossible de supprimer le produit.");
      }

      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content admin-page">
        <h1>Gestion des produits</h1>

        <button
          className="admin-page__primary-action"
          onClick={() => navigate("/admin/products/add")}
        >
          Ajouter un produit
        </button>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Categorie</th>
              <th>Tailles</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Sexe</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const image = product.imageUrls?.[0];

              return (
                <tr key={product.id}>
                  <td>
                    {image && (
                      <img
                        src={`http://localhost:8080${image}`}
                        alt={product.name}
                        width="60"
                      />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.variants?.map((v) => v.size).join(", ")}</td>
                  <td>
                    {product.variants?.length > 0
                      ? `${Math.min(...product.variants.map((v) => v.price))} - ${Math.max(...product.variants.map((v) => v.price))} DH`
                      : "-"}
                  </td>
                  <td>{product.variants?.reduce((sum, v) => sum + v.stock, 0)}</td>
                  <td>{product.sex}</td>
                  <td>
                    <button onClick={() => navigate(`/admin/products/edit/${product.id}`)}>
                      Modifier
                    </button>
                    <button
                      className="admin-table__danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}

            {products.length === 0 && (
              <tr>
                <td colSpan="8">Aucun produit.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
