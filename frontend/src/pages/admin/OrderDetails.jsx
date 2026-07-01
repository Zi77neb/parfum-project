import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import "../../styles/pages/admin/OrderDetails.css";

const API_URL = "http://localhost:8080/api/orders";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Commande introuvable.");
      }

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      alert(err.message);
      navigate("/admin/orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Impossible de modifier le statut.");
      }

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <Loader text="Recherche du bordereau..." />;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="admin-layout admin-shell admin-motion">
      <Sidebar />

      <div className="admin-content admin-page">
        <div className="admin-page-head">
          <div>
            <span className="admin-eyebrow">Commandes & Réservations</span>
            <h1 className="admin-title tabular-nums">
              BORDEREAU #{order.id}
            </h1>
            <p className="admin-subtitle">
              Suivi logistique de l'expédition et gestion du statut de
              traitement de la commande.
            </p>
          </div>
        </div>

        {/* Informations générales */}
        <div className="order-card admin-panel">
          <div className="order-info-grid">
            <div className="admin-stat">
              <span className="label-gold">Client</span>
              <strong className="admin-stat-value">
                {order.customerName}
              </strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Date d'achat</span>
              <strong className="admin-stat-value tabular-nums">
                {new Date(order.orderDate).toLocaleString()}
              </strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Montant Total</span>
              <strong className="admin-stat-value text-gold-gradient">
                {order.totalPrice} DH
              </strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Statut</span>
              <span className="admin-status-badge">
                {order.status}
              </span>
            </div>
          </div>

          <div className="order-details__status">
            <div className="fleet-filter-group">
              <label className="label-gold">
                Mettre à jour le statut :
              </label>

              <select
                value={order.status}
                onChange={(e) => updateStatus(e.target.value)}
                className="fleet-filter-select input-luxury"
              >
                <option value="EN_ATTENTE">EN_ATTENTE</option>
                <option value="CONFIRMEE">CONFIRMEE</option>
                <option value="EXPEDIEE">EXPEDIEE</option>
                <option value="LIVREE">LIVREE</option>
                <option value="ANNULEE">ANNULEE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Informations de livraison */}
        <div className="order-card admin-panel">
          <h2 className="admin-section-subtitle font-display">
            Informations de livraison
          </h2>

          <div className="gold-divider-subtle"></div>

          <div className="order-info-grid">
            <div className="admin-stat">
              <span className="label-gold">Nom complet</span>
              <strong>{order.customerName}</strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Email</span>
              <strong>{order.customerEmail}</strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Téléphone</span>
              <strong>{order.customerPhone}</strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Adresse</span>
              <strong>{order.customerAddress}</strong>
            </div>

            <div className="admin-stat">
              <span className="label-gold">Ville</span>
              <strong>{order.customerCity}</strong>
            </div>
          </div>
        </div>

        {/* Produits commandés */}
        <div className="order-card admin-panel">
          <h2 className="admin-section-subtitle font-display">
            Fragrances Sélectionnées
          </h2>

          <div className="gold-divider-subtle"></div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Produit</th>
                <th>Nom de la Fragrance</th>
                <th>Volume</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th className="text-right">Sous-total</th>
              </tr>
            </thead>

            <tbody>
              {order.items?.map((item) => (
                <tr key={item.id}>
                  <td>#{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice} DH</td>
                  <td className="text-right">
                    {item.subtotal} DH
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-details__actions">
          <button
            className="btn-outline-gold order-details__back"
            onClick={() => navigate("/admin/orders")}
          >
            ← Retourner aux commandes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;