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
    <div className="cart-summary">
      <h2>Résumé du panier</h2>

      <div className="cart-summary__row">
        <span>Articles</span>
        <strong>{totalItems}</strong>
      </div>

      <div className="cart-summary__row">
        <span>Total</span>
        <strong>{total.toFixed(2)} DH</strong>
      </div>

      <button onClick={handleCheckout}>
        Passer la commande
      </button>
    </div>
  );
};

export default CartSummary;