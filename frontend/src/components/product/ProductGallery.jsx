import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/ProductGallery.css";

const ProductGallery = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="product-gallery-empty">
        <h3>Aucun produit trouvé</h3>
        <p>Essayez de modifier vos filtres ou votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="product-gallery">
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