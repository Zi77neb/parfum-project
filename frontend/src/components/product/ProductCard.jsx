import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/ProductCard.css";

const ProductCard = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);

  const image =
    product.primaryImageUrl ||
    product.imageUrls?.[0] ||
    "https://via.placeholder.com/350x450?text=Fragrance";

  const minPrice = product.minPrice ?? product.variants?.[0]?.price;
  const maxPrice = product.maxPrice ?? product.variants?.[0]?.price;
  const hasStock = product.variants?.some((v) => v.stock > 0) ?? false;

  const imageUrl = image.startsWith("/uploads")
    ? `http://localhost:8080${image}`
    : image;

  return (
    <>
      <div className="product-card showroom-card--catalog surface-card hover-lift">
        {/* Enveloppe de l'image pour l'effet de zoom cinétique */}
        <div className="product-card__media card-image-zoom" onClick={() => setShowDetails(true)}>
          <img
            src={imageUrl}
            alt={product.name}
            className="card-image-zoom__target"
          />
          
          {/* Badge de statut épuré */}
          <div className="showroom-badge-row">
            <span className={`showroom-badge ${hasStock ? "" : "showroom-badge--muted"}`}>
              {hasStock && <span className="showroom-badge-dot"></span>}
              {hasStock ? "Disponible" : "Épuisé"}
            </span>
          </div>
        </div>

        <div className="product-card__content">
          <span className="product-card__collection-label">{product.categoryName}</span>
          <h3 className="showroom-card__title" onClick={() => setShowDetails(true)}>
            {product.name}
          </h3>
          
          <p className="showroom-card__price">
            {minPrice === maxPrice
              ? `${minPrice} DH`
              : `${minPrice} - ${maxPrice} DH`}
          </p>

          <div className="product-card__actions">
            <button className="btn-secondary-flat" onClick={() => setShowDetails(true)}>
              Découvrir
            </button>

            <Link to={`/products/${product.id}`} className="product-card__action-link">
              <button className="btn-dark" disabled={!hasStock}>
                {hasStock ? "Choisir un volume" : "Indisponible"}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fenêtre de Détails Épurée — Style Galerie Privée */}
      {showDetails && (
        <div
          className="product-modal-backdrop vehicle-booking-sheet-backdrop"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="product-modal-content surface-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="product-modal__close hero-sheet-close"
              onClick={() => setShowDetails(false)}
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="product-modal__layout">
              <div className="product-modal__gallery">
                <img src={imageUrl} alt={product.name} className="product-modal__img" />
              </div>

              <div className="product-modal__details-panel">
                <span className="luxury-section-label">{product.categoryName}</span>
                <h2 className="product-modal__title font-display">{product.name}</h2>
                <div className="gold-divider-subtle"></div>

                <div className="product-modal__info-row">
                  <p className="product-modal__description">
                    {product.description || "Une création olfactive exclusive de notre maison, élaborée à partir d'essences rares sélectionnées avec le plus grand soin."}
                  </p>
                </div>

                <div className="product-modal__price-box">
                  <span className="label-gold">Sillage & Tarifs</span>
                  <p className="product-modal__price text-gold-gradient">
                    {minPrice === maxPrice
                      ? `${minPrice} DH`
                      : `${minPrice} - ${maxPrice} DH`}
                  </p>
                </div>

                <div className="product-modal__status-box">
                  <span className={`editorial-pill ${hasStock ? "editorial-pill--available" : "editorial-pill--unavailable"}`}>
                    {hasStock ? "Flacons disponibles en atelier" : "Édition temporairement épuisée"}
                  </span>
                </div>

                <Link to={`/products/${product.id}`} className="w-full">
                  <button
                    className="luxury-cta shine-on-hover"
                    disabled={!hasStock}
                    onClick={() => setShowDetails(false)}
                  >
                    <span className="luxury-cta__inner">Personnaliser le flacon</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;