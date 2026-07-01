import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/pages/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="order-success marble-bg noise-overlay">
      <div className="order-success__container surface-panel">
        <div className="order-success__icon pulse-ring">
          ✓
        </div>

        <span className="luxury-section-label animate-fade-in-up">Confirmation</span>
        <h1 className="section-title">Commande Enregistrée</h1>
        <div className="gold-divider-center"></div>

        <p className="order-success__message footer-brand-text">
          Votre demande a été transmise à nos artisans parfumeurs. Un message récapitulatif contenant les détails de votre sillage privé vous a été envoyé.
        </p>

        {order && (
          <div className="order-success__card surface-block">
            <div className="order-success__row">
              <span className="label-gold">Numéro de pièce</span>
              <strong className="tabular-nums">#{order.id}</strong>
            </div>

            <div className="order-success__row">
              <span className="label-gold">Date de réservation</span>
              <strong className="tabular-nums">
                {new Date(order.orderDate).toLocaleString()}
              </strong>
            </div>

            <div className="order-success__row align-center">
              <span className="label-gold">Statut de l'Atelier</span>
              <span className="editorial-pill editorial-pill--gold">
                {order.status}
              </span>
            </div>

            <div className="order-success__row total-luxury-row">
              <span className="label-gold label-total">Montant de la Sélection</span>
              <strong className="text-gold-gradient total-value tabular-nums">
                {order.totalPrice} DH
              </strong>
            </div>

            <h3 className="order-products-title font-display">Flacons Réservés</h3>
            <div className="order-products-divider"></div>

            <div className="order-products">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="order-product surface-card"
                >
                  <div className="order-product__header">
                    <h4 className="font-display">{item.productName}</h4>
                    <span className="order-product__subtotal tabular-nums">
                      {item.subtotal} DH
                    </span>
                  </div>

                  <div className="order-product__specs">
                    <p className="spec-item">Volume : <strong>{item.size}</strong></p>
                    <div className="spec-dot-separator"></div>
                    <p className="spec-item">Quantité : <strong className="tabular-nums">{item.quantity}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="order-success__actions">
          <Link
            to="/"
            className="btn-dark order-success__button"
          >
            Retourner à la Maison
          </Link>

          <Link
            to="/products"
            className="btn-outline-gold order-success__button"
          >
            Continuer les Achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;