import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import "../styles/pages/ProductDetails.css";

const API_URL = "http://localhost:8080/api/products";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
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
      setProduct(data);

      const firstAvailable =
        data.variants?.find((v) => v.stock > 0) || data.variants?.[0];

      setSelectedVariant(firstAvailable);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!selectedVariant) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find(
      (item) =>
        item.productId === product.id && item.variantId === selectedVariant.id
    );

    if (existing) {
      if (existing.quantity < selectedVariant.stock) {
        existing.quantity += 1;
      }
    } else {
      cart.push({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
        quantity: 1,
        stock: selectedVariant.stock,
        imageUrls: product.imageUrls,
        primaryImageUrl: product.imageUrls?.[0] || null,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("La fragrance a rejoint votre sélection.");
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="product-detail-error section-dark">
        <h2 className="font-display">Création Introuvable</h2>
      </div>
    );
  }

  const image = product.imageUrls?.[0] || "https://via.placeholder.com/450x550?text=Fragrance";

  return (
    <div className="product-detail marble-bg noise-overlay">
      <div className="product-detail__card surface-panel">
        
        {/* Écrin Média avec effet Zoom Lookbook */}
        <div className="product-detail__media card-image-zoom">
          <img
            src={image.startsWith("/uploads") ? `http://localhost:8080${image}` : image}
            alt={product.name}
            className="product-detail__image card-image-zoom__target"
          />
        </div>

        {/* Panneau d'Information Éditorial */}
        <div className="product-detail__content">
          <div className="product-detail__badges">
            <span className="editorial-pill editorial-pill--gold">
              {product.categoryName}
            </span>
            <span className="editorial-pill">
              Sillage {product.sex}
            </span>
          </div>

          <span className="luxury-section-label">Haute Fragrance</span>
          <h1 className="font-display">{product.name}</h1>
          <div className="gold-divider-subtle"></div>

          <p className="product-detail__description footer-brand-text">
            {product.description || "Une architecture olfactive d'exception, assemblée à la main à partir d'essences de haute parfumerie hautement concentrées."}
          </p>

          <h3 className="variant-select-title label-gold">Contenance & Flaconnage</h3>

          <div className="product-detail__variants">
            {product.variants?.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={variant.stock <= 0}
                  className={`option-card ${isSelected ? "option-card--active" : ""}`}
                >
                  <div className="option-card__icon font-sans">ml</div>
                  <span className="variant-size-text font-sans">{variant.size}</span>
                </button>
              );
            })}
          </div>

          {selectedVariant && (
            <div className="product-detail__info-pricing luxury-motion">
              <div className="product-detail__price-wrap">
                <span className="label-gold">Valeur</span>
                <div className="product-detail__price text-gold-gradient tabular-nums">
                  {selectedVariant.price} DH
                </div>
              </div>

              <div className="product-detail__stock-wrap">
                <span className={`editorial-pill ${selectedVariant.stock > 0 ? "editorial-pill--available" : "editorial-pill--unavailable"}`}>
                  {selectedVariant.stock > 0 ? `En Atelier (${selectedVariant.stock} flacons)` : "Édition épuisée"}
                </span>
              </div>

              <button
                className="luxury-cta shine-on-hover product-detail__button"
                onClick={addToCart}
                disabled={selectedVariant.stock <= 0}
              >
                <span className="luxury-cta__inner">Ajouter au Flaconnier</span>
                <span className="luxury-cta__shine"></span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;