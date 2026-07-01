import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/ProductGallery.css";

const ProductGallery = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="product-gallery-empty surface-panel noise-overlay">
        <span className="luxury-section-label">Épure Olfactive</span>
        <h3 className="font-display">Sillage Introuvable</h3>
        <p className="footer-brand-text">
          Aucune essence ne correspond à vos critères actuels. Nous vous invitons à modifier vos filtres ou à explorer une nouvelle collection.
        </p>
        <div className="gold-divider-subtle-center"></div>
      </div>
    );
  }

  return (
    <div className="product-gallery fleet-catalog-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGallery;