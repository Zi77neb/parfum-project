import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import OrderTable from "../../components/admin/OrderTable";
import Loader from "../../components/common/Loader";
import "../../styles/pages/admin/Orders.css";

const API_URL = "http://localhost:8080/api/orders";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Impossible de charger le registre des commandes.");
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  const handleStatusChange = async (id, status) => {
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
        throw new Error("Impossible de modifier le statut de réservation.");
      }

      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-layout admin-shell admin-motion">
      <Sidebar />

      <div className="admin-content admin-page">
        {/* En-tête de page officiel issu de l'Admin Shell */}
        <div className="admin-page-head">
          <div>
            <span className="admin-eyebrow">Réservations & Facturation</span>
            <h1 className="admin-title">REGISTRE DES COMMANDES</h1>
            <p className="admin-subtitle">
              Consultez les requêtes de flaconnage privées, validez les transactions et traitez les expéditions.
            </p>
          </div>
        </div>

        <div className="admin-table-container admin-panel">
          {loading ? (
            <div className="admin-page-loader-wrap">
              <Loader text="Ouverture du registre logistique..." />
            </div>
          ) : (
            <OrderTable
              orders={orders}
              onView={handleView}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;