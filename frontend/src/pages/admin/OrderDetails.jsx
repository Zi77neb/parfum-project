
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
    return <Loader />;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content admin-page">
        <h1>Commande #{order.id}</h1>

        <div className="order-card">
          <div className="order-info-grid">
            <div>
              <span>Client</span>
              <strong>{order.customerName}</strong>
            </div>

            <div>
              <span>Date</span>
              <strong>
                {new Date(order.orderDate).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Total</span>
              <strong>{order.totalPrice} DH</strong>
            </div>

            <div>
              <span>Statut</span>
              <strong>{order.status}</strong>
            </div>
          </div>

          <div className="order-details__status">
            <select
              value={order.status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="EN_ATTENTE">EN_ATTENTE</option>
              <option value="CONFIRMEE">CONFIRMEE</option>
              <option value="EXPEDIEE">EXPEDIEE</option>
              <option value="LIVREE">LIVREE</option>
              <option value="ANNULEE">ANNULEE</option>
            </select>
          </div>
        </div>

        <div className="order-card">
          <h2>Produits commandés</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Produit</th>
                <th>Produit</th>
                <th>Taille</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Sous-total</th>
              </tr>
            </thead>

            <tbody>
              {order.items?.map((item) => (
                <tr key={item.id}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice} DH</td>
                  <td>{item.subtotal} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="order-details__back"
          onClick={() => navigate("/admin/orders")}
        >
          Retour aux commandes
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

