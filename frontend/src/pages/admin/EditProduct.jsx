
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import ProductForm from "../../components/admin/ProductForm";
import Loader from "../../components/common/Loader";
import "../../styles/pages/admin/EditProduct.css";

const API_URL = "http://localhost:8080/api/products";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);

      if (!res.ok) {
        throw new Error("Produit introuvable.");
      }

      const data = await res.json();

      setProduct({
        ...data,
        categoryId: data.categoryId || "",
      });
    } catch (err) {
      alert(err.message);
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigate("/admin/products");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content admin-page">
        <h1>Modifier le produit</h1>

        <div className="admin-card">
          {product && (
            <ProductForm
              product={product}
              onSuccess={handleSuccess}
              onCancel={() => navigate("/admin/products")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

