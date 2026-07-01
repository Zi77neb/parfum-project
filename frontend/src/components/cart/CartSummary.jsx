import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/CartSummary.css";

const CartSummary = ({ items = [] }) => {
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-summary glass-gold noise-overlay">
      <h2 className="cart-summary__title">Votre Sélection</h2>
      <div className="cart-summary__divider"></div>

      <div className="cart-summary__row">
        <span className="summary-label">Nombre d'articles</span>
        <strong className="summary-value tabular-nums">{totalItems}</strong>
      </div>

      <div className="cart-summary__row total-row">
        <span className="summary-label main-total">Montant Total</span>
        <strong className="summary-value final-price text-gold-gradient">{total.toFixed(2)} DH</strong>
      </div>

      <button 
        className="luxury-cta shine-on-hover" 
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        <span className="luxury-cta__inner">
          Passer à la Caisse
        </span>
        <span className="luxury-cta__shine"></span>
      </button>
    </div>
  );
};

export default CartSummary;