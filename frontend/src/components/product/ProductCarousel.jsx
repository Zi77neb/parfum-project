import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/ProductCarousel.css";

const ProductCarousel = ({ products = [], title = "Nouveautés Flacons" }) => {
  if (!products.length) {
    return (
      <div className="product-carousel product-carousel--empty text-center">
        <h2 className="section-title text-gold-gradient">{title}</h2>
        <div className="gold-divider"></div>
        <p className="footer-empty">Aucune essence exclusive n'est répertoriée dans cette collection pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="product-carousel luxury-motion">
      <div className="product-carousel__header">
        <span className="luxury-section-label">Sélection de l'Atelier</span>
        <h2 className="section-title">{title}</h2>
        <div className="gold-divider"></div>
      </div>

      {/* Le conteneur à défilement horizontal fluide de type showroom lookbook */}
      <div className="product-carousel__track scrollbar-hide">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-carousel__item showroom-card--lookbook"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;