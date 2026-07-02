import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/ProductCarousel.css";

const ProductCarousel = ({ products = [], title = "Nouveautés Flacons" }) => {
  const trackRef = useRef(null);

  const scrollByAmount = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const firstItem = track.querySelector(".product-carousel__item");
    if (!firstItem) return;

    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = 32;
    const amount = itemWidth + gap;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };
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

      <div className="product-carousel__track-wrapper">
        <button
          type="button"
          className="product-carousel__arrow product-carousel__arrow--left"
          onClick={() => scrollByAmount("prev")}
          aria-label="Produits précédents"
        >
          ←
        </button>

        <div className="product-carousel__track scrollbar-hide" ref={trackRef}>
          {products.map((product) => (
            <div
              key={product.id}
              className="product-carousel__item showroom-card--lookbook"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="product-carousel__arrow product-carousel__arrow--right"
          onClick={() => scrollByAmount("next")}
          aria-label="Produits suivants"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;