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

  const increaseQuantity = (
    productId,
    variantId
  ) => {
    const cart = [...items];

    const item = cart.find(
      (p) =>
        p.productId === productId &&
        p.variantId === variantId
    );

    if (!item) return;

    if (item.quantity < item.stock) {
      item.quantity += 1;
    }

    saveCart(cart);
  };

  const decreaseQuantity = (
    productId,
    variantId
  ) => {
    const cart = [...items];

    const item = cart.find(
      (p) =>
        p.productId === productId &&
        p.variantId === variantId
    );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
      saveCart(
        cart.filter(
          (p) =>
            !(
              p.productId === productId &&
              p.variantId === variantId
            )
        )
      );

      return;
    }

    saveCart(cart);
  };

  const removeItem = (
    productId,
    variantId
  ) => {
    const cart = items.filter(
      (p) =>
        !(
          p.productId === productId &&
          p.variantId === variantId
        )
    );

    saveCart(cart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setItems([]);
  };

  return (
    <div className="cart-page">
      <h1>Mon Panier</h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h2>Votre panier est vide</h2>

          <Link
            to="/products"
            className="cart-empty__button"
          >
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.variantId}`}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}

            <button
              className="cart-clear-button"
              onClick={clearCart}
            >
              Vider le panier
            </button>
          </div>

          <div className="cart-summary-wrap">
            <CartSummary items={items} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;