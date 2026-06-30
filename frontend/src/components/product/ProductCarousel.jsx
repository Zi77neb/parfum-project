import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/ProductCarousel.css";

const ProductCarousel = ({ products = [], title = "Nouveautes" }) => {
  if (!products.length) {
    return (
      <div className="product-carousel">
        <h2>{title}</h2>
        <p>Aucun produit.</p>
      </div>
    );
  }

  return (
    <div className="product-carousel">
      <h2>{title}</h2>

      <div className="product-carousel__track">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-carousel__item"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
