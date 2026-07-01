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
    if (!window.confirm("Supprimer ce produit définitivement ?")) {
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
    return <Loader text="Ouverture du registre des flacons..." />;
  }

  return (
    <div className="admin-layout admin-shell admin-motion">
      <Sidebar />

      <div className="admin-content admin-page">
        
        {/* En-tête de page officiel issu de l'Admin Shell */}
        <div className="admin-page-head">
          <div>
            <span className="admin-eyebrow">Catalogue Général</span>
            <h1 className="admin-title">REGISTRE DES FRAGRANCES</h1>
            <p className="admin-subtitle">
              Gestion de l'inventaire, modifications des fiches olfactives et suivi des déclinaisons de volumes.
            </p>
          </div>
          
          <div className="admin-page-head-action">
            <button
              className="btn-gold"
              onClick={() => navigate("/admin/products/add")}
            >
              + Ajouter une fragrance
            </button>
          </div>
        </div>

        {/* Panneau de tableau d'administration scrollable (.admin-panel) */}
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Flacon</th>
                <th>Nom de la Fragrance</th>
                <th>Collection</th>
                <th>Volumes</th>
                <th>Fourchette de Prix</th>
                <th>Stock Total</th>
                <th>Sillage</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const image = product.imageUrls?.[0];
                const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-mobile-card__thumb-wrap">
                        {image ? (
                          <img
                            src={`http://localhost:8080${image}`}
                            alt={product.name}
                            className="admin-table-vignette"
                          />
                        ) : (
                          <div className="admin-table-vignette-placeholder"></div>
                        )}
                      </div>
                    </td>
                    <td className="font-medium">{product.name}</td>
                    <td className="text-muted-column">{product.categoryName}</td>
                    <td className="text-muted-column text-xs">{product.variants?.map((v) => v.size).join(", ") || "-"}</td>
                    <td className="tabular-nums font-medium">
                      {product.variants?.length > 0
                        ? `${Math.min(...product.variants.map((v) => v.price))} - ${Math.max(...product.variants.map((v) => v.price))} DH`
                        : "-"}
                    </td>
                    <td className="tabular-nums">
                      <span className={totalStock === 0 ? "admin-status-badge--muted" : "font-medium"}>
                        {totalStock} u.
                      </span>
                    </td>
                    <td>
                      <span className="admin-status-badge">{product.sex}</span>
                    </td>
                    <td className="text-right">
                      <div className="admin-action-group">
                        <button 
                          className="admin-icon-btn"
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        >
                          Modifier
                        </button>
                        <button
                          className="admin-icon-btn danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan="8" className="admin-table-empty">
                    Aucun flacon n'est actuellement répertorié dans le catalogue.
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

export default Products;