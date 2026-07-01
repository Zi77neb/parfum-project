// OrderTable.jsx
import React from "react";
import "../../styles/components/OrderTable.css";

const OrderTable = ({
  orders = [],
  onView = () => {},
  onStatusChange = () => {},
}) => {
  const statuses = [
    { value: "EN_ATTENTE", label: "En attente" },
    { value: "CONFIRMEE", label: "Confirmée" },
    { value: "EXPEDIEE", label: "Expédiée" },
    { value: "LIVREE", label: "Livrée" },
    { value: "ANNULEE", label: "Annulée" },
  ];

  return (
    <div className="admin-shell">
      <div className="admin-panel">
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="admin-shell table tbody td">
                  Aucune commande enregistrée pour le moment.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id-cell">#{order.id}</td>
                  <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}</td>
                  <td className="order-customer-cell">{order.customerName}</td>
                  <td className="order-price-cell">{order.totalPrice} DH</td>
                  <td>
                    <select
                      className="admin-filter-select"
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="admin-action-group">
                      <button className="btn-outline-gold" onClick={() => onView(order.id)}>
                        Voir détails
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;