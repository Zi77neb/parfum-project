import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/ProductCard.css";

const ProductCard = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);

  const image =
    product.primaryImageUrl ||
    product.imageUrls?.[0] ||
    "https://via.placeholder.com/250x250?text=Produit";

  const minPrice = product.minPrice ?? product.variants?.[0]?.price;
  const maxPrice = product.maxPrice ?? product.variants?.[0]?.price;
  const hasStock = product.variants?.some((v) => v.stock > 0) ?? false;

  const imageUrl = image.startsWith("/uploads")
    ? `http://localhost:8080${image}`
    : image;

  return (
    <>
      <div className="product-card">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-card__image"
        />

        <h3>{product.name}</h3>
        <p>{product.categoryName}</p>

        <p>
          <strong>
            {minPrice === maxPrice
              ? `${minPrice} DH`
              : `${minPrice} - ${maxPrice} DH`}
          </strong>
        </p>

        <p
          className={
            hasStock
              ? "product-card__status product-card__status--available"
              : "product-card__status product-card__status--unavailable"
          }
        >
          {hasStock ? "Disponible" : "Rupture de stock"}
        </p>

        <div className="product-card__actions">
          <button onClick={() => setShowDetails(true)}>
            Détails
          </button>

          <Link to={`/products/${product.id}`}>
            <button disabled={!hasStock}>
              Choisir une taille
            </button>
          </Link>
        </div>
      </div>

      {showDetails && (
        <div
          className="product-modal"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="product-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="product-modal__close"
              onClick={() => setShowDetails(false)}
            >
              ✕
            </button>

            <img src={imageUrl} alt={product.name} />

            <h2>{product.name}</h2>

            <p>
              <strong>Catégorie :</strong>{" "}
              {product.categoryName}
            </p>

            <p>
              <strong>Description :</strong>{" "}
              {product.description || "Aucune description."}
            </p>

            <p>
              <strong>Prix :</strong>{" "}
              {minPrice === maxPrice
                ? `${minPrice} DH`
                : `${minPrice} - ${maxPrice} DH`}
            </p>

            <p>
              <strong>Disponibilité :</strong>{" "}
              {hasStock
                ? "En stock"
                : "Rupture de stock"}
            </p>

            <Link to={`/products/${product.id}`}>
              <button
                className="product-modal__button"
                disabled={!hasStock}
              >
                Choisir une taille
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;