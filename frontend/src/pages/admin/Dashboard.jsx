import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import "../../styles/pages/admin/Dashboard.css";

const API_URL = "http://localhost:8080/api/admin/dashboard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Impossible de charger le dashboard.");
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <h1>Dashboard Administrateur</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-card__icon">📦</span>
            <h3>Produits</h3>
            <p>{stats.productsCount}</p>
          </div>

          <div className="stat-card">
            <span className="stat-card__icon">👥</span>
            <h3>Clients</h3>
            <p>{stats.customersCount}</p>
          </div>

          <div className="stat-card">
            <span className="stat-card__icon">🛒</span>
            <h3>Commandes</h3>
            <p>{stats.ordersCount}</p>
          </div>

          <div className="stat-card">
            <span className="stat-card__icon">⏳</span>
            <h3>Commandes en attente</h3>
            <p>{stats.pendingOrdersCount}</p>
          </div>

          <div className="stat-card">
            <span className="stat-card__icon">💰</span>
            <h3>Chiffre d'affaires</h3>
            <p>{stats.revenue} DH</p>
          </div>

          <div className="stat-card">
            <span className="stat-card__icon">⚠️</span>
            <h3>Produits en rupture</h3>
            <p>{stats.outOfStockProductsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

