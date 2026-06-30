import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/pages/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="order-success">
      <div className="order-success__container">
        <div className="order-success__icon">
          ✓
        </div>

        <h1>
          Commande enregistrée avec succès
        </h1>

        <p className="order-success__message">
          Merci pour votre commande. Nous
          avons bien reçu votre demande.
        </p>

        {order && (
          <div className="order-success__card">
            <div className="order-success__row">
              <span>Numéro de commande</span>
              <strong>#{order.id}</strong>
            </div>

            <div className="order-success__row">
              <span>Date</span>

              <strong>
                {new Date(
                  order.orderDate
                ).toLocaleString()}
              </strong>
            </div>

            <div className="order-success__row">
              <span>Statut</span>
              <strong>{order.status}</strong>
            </div>

            <div className="order-success__row">
              <span>Total</span>
              <strong>
                {order.totalPrice} DH
              </strong>
            </div>

            <h3>
              Produits commandés
            </h3>

            <div className="order-products">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="order-product"
                >
                  <h4>
                    {item.productName}
                  </h4>

                  <p>
                    Taille : {item.size}
                  </p>

                  <p>
                    Quantité :
                    {" "}
                    {item.quantity}
                  </p>

                  <p>
                    Sous-total :
                    {" "}
                    {item.subtotal} DH
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="order-success__actions">
          <Link
            to="/"
            className="order-success__button"
          >
            Retour à l'accueil
          </Link>

          <Link
            to="/products"
            className="order-success__button order-success__button--gold"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;