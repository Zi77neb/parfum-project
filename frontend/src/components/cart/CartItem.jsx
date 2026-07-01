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
    "https://via.placeholder.com/150";

  return (
    <div className="cart-item surface-card editorial-card hover-lift">
      <div className="cart-item__media-wrap card-image-zoom">
        <img
          src={image.startsWith("http") ? image : `http://localhost:8080${image}`}
          alt={item.name}
          className="cart-item__image"
        />
      </div>

      <div className="cart-item__info">
        <span className="cart-item__brand-eyebrow">Haute Fragrance</span>
        <h3 className="cart-item__title">{item.name}</h3>
        <div className="cart-item__specs">
          <p className="cart-item__spec-text">Flacon : <span className="spec-highlight">{item.size}</span></p>
          {item.stock <= 5 && <p className="editorial-pill editorial-pill--gold text-[9px] mt-1 w-max">Série Limitée</p>}
        </div>
      </div>

      <div className="cart-item__quantity">
        <button 
          className="quantity-btn" 
          onClick={() => onDecrease(item.productId, item.variantId)}
          aria-label="Diminuer"
        >
          —
        </button>
        <span className="cart-item__count">{item.quantity}</span>
        <button 
          className="quantity-btn" 
          onClick={() => onIncrease(item.productId, item.variantId)}
          aria-label="Augmenter"
        >
          +
        </button>
      </div>

      <div className="cart-item__total">
        <p className="cart-item__price-total">{(item.price * item.quantity).toFixed(2)} DH</p>
        <button 
          className="cart-item__remove-link luxury-text-link" 
          onClick={() => onRemove(item.productId, item.variantId)}
        >
          <span className="luxury-text-link__line">Retirer</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;