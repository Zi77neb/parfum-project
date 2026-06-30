import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import Sidebar from "../../components/admin/Sidebar";
import "../../styles/pages/admin/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/products");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content admin-page">
        <h1>Ajouter un produit</h1>
        <ProductForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default AddProduct;
