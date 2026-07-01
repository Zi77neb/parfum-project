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
    <div className="admin-layout admin-shell admin-motion">
      <Sidebar />

      <div className="admin-content admin-page">
        {/* En-tête de page officiel issu de l'Admin Shell */}
        <div className="admin-page-head">
          <div>
            <span className="admin-eyebrow">Catalogue & Ateliers</span>
            <h1 className="admin-title">CRÉER UNE FRAGRANCE</h1>
            <p className="admin-subtitle">
              Enregistrez un nouveau flacon, définissez ses déclinaisons de volumes et ses notes olfactives.
            </p>
          </div>
        </div>

        <div className="admin-form-container">
          <ProductForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;