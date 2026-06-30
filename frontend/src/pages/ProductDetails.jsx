import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import "../styles/pages/ProductDetails.css";

const API_URL = "http://localhost:8080/api/products";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] =
    useState(null);
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
        data.variants?.find(
          (v) => v.stock > 0
        ) || data.variants?.[0];

      setSelectedVariant(firstAvailable);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!selectedVariant) return;

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existing = cart.find(
      (item) =>
        item.productId === product.id &&
        item.variantId === selectedVariant.id
    );

    if (existing) {
      if (
        existing.quantity <
        selectedVariant.stock
      ) {
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
        primaryImageUrl:
          product.imageUrls?.[0] || null,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Produit ajouté au panier.");
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <h2>Produit introuvable.</h2>
    );
  }

  const image =
    product.imageUrls?.[0] ||
    "https://via.placeholder.com/400";

  return (
    <div className="product-detail">
      <div className="product-detail__card">
        <div className="product-detail__media">
          <img
            src={
              image.startsWith("/uploads")
                ? `http://localhost:8080${image}`
                : image
            }
            alt={product.name}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__content">
          <div className="product-detail__badges">
            <span>
              {product.categoryName}
            </span>

            <span>{product.sex}</span>
          </div>

          <h1>{product.name}</h1>

          <p className="product-detail__description">
            {product.description}
          </p>

          <h3>
            Choisissez une taille
          </h3>

          <div className="product-detail__variants">
            {product.variants?.map(
              (variant) => (
                <button
                  key={variant.id}
                  onClick={() =>
                    setSelectedVariant(
                      variant
                    )
                  }
                  disabled={
                    variant.stock <= 0
                  }
                  className={
                    selectedVariant?.id ===
                    variant.id
                      ? "product-detail__variant product-detail__variant--active"
                      : "product-detail__variant"
                  }
                >
                  {variant.size}
                </button>
              )
            )}
          </div>

          {selectedVariant && (
            <div className="product-detail__info">
              <div className="product-detail__price">
                {selectedVariant.price} DH
              </div>

              <div className="product-detail__stock">
                {selectedVariant.stock >
                0
                  ? `En stock (${selectedVariant.stock})`
                  : "Rupture de stock"}
              </div>

              <button
                className="product-detail__button"
                onClick={addToCart}
                disabled={
                  selectedVariant.stock <= 0
                }
              >
                Ajouter au panier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;