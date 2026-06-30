import React from "react";
import "../../styles/components/OrderTable.css";

const OrderTable = ({
  orders = [],
  onView = () => {},
  onStatusChange = () => {},
}) => {
  const statuses = [
    "EN_ATTENTE",
    "CONFIRMEE",
    "EXPEDIEE",
    "LIVREE",
    "ANNULEE",
  ];

  return (
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
            <td colSpan="6">Aucune commande.</td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}</td>
              <td>{order.customerName}</td>
              <td>{order.totalPrice} DH</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => onView(order.id)}>
                  Voir details
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
