import React from "react";
import "../../styles/components/CartItem.css";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const image =
    item.imageUrls?.[0] ||
    item.primaryImageUrl ||
    "https://via.placeholder.com/100";

  return (
    <div className="cart-item">
      <img
        src={image.startsWith("http") ? image : `http://localhost:8080${image}`}
        alt={item.name}
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <h3>{item.name}</h3>
        <p>Taille : <strong>{item.size}</strong></p>
        <p>{item.price} DH</p>
        <p>Stock restant : {item.stock}</p>
      </div>

      <div className="cart-item__quantity">
        <button onClick={() => onDecrease(item.productId, item.variantId)}>-</button>
        <span className="cart-item__count">{item.quantity}</span>
        <button onClick={() => onIncrease(item.productId, item.variantId)}>+</button>
      </div>

      <div className="cart-item__total">
        <p>Total : {(item.price * item.quantity).toFixed(2)} DH</p>
        <button onClick={() => onRemove(item.productId, item.variantId)}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CartItem;
