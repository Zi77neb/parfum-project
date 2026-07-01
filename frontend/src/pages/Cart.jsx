import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import "../styles/pages/Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setItems(cart);
  };

  const saveCart = (cart) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
    setItems(cart);
  };

  const increaseQuantity = (productId, variantId) => {
    const cart = [...items];
    const item = cart.find(
      (p) => p.productId === productId && p.variantId === variantId
    );

    if (!item) return;

    if (item.quantity < item.stock) {
      item.quantity += 1;
    }

    saveCart(cart);
  };

  const decreaseQuantity = (productId, variantId) => {
    const cart = [...items];
    const item = cart.find(
      (p) => p.productId === productId && p.variantId === variantId
    );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
      saveCart(
        cart.filter(
          (p) => !(p.productId === productId && p.variantId === variantId)
        )
      );
      return;
    }

    saveCart(cart);
  };

  const removeItem = (productId, variantId) => {
    const cart = items.filter(
      (p) => !(p.productId === productId && p.variantId === variantId)
    );
    saveCart(cart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setItems([]);
  };

  return (
    <div className="cart-page marble-bg noise-overlay">
      <div className="cart-page__header">
        <span className="luxury-section-label">Votre Sélection Private</span>
        <h1 className="section-title">Votre Flaconnier</h1>
        <div className="gold-divider-center"></div>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty surface-panel noise-overlay">
          <span className="luxury-section-label">Épure</span>
          <h2 className="font-display">Votre sillage est encore vierge</h2>
          <p className="footer-brand-text">
            Vous n'avez pas encore ajouté de fragrances à votre collection personnelle. Explorez nos ateliers olfactifs pour trouver votre signature.
          </p>
          <Link to="/products" className="luxury-cta shine-on-hover cart-empty__button-link">
            <span className="luxury-cta__inner">Découvrir les Créations</span>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-column">
            <div className="cart-items-list">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.variantId}`}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <button className="btn-secondary-flat cart-clear-button" onClick={clearCart}>
              Vider la sélection
            </button>
          </div>

          <div className="cart-summary-sidebar-wrap">
            <CartSummary items={items} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;