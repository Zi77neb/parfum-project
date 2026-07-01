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
    <div className="admin-layout admin-shell admin-motion">
      <Sidebar />

      <div className="admin-content admin-page">
        {/* En-tête officiel de l'Admin Shell */}
        <div className="admin-page-head">
          <div>
            <span className="admin-eyebrow">Tableau de bord</span>
            <h1 className="admin-title">CONSOLE DE GESTION</h1>
            <p className="admin-subtitle">
              Aperçu analytique de l'activité, des transactions et de l'état des stocks de la Maison.
            </p>
          </div>
        </div>

        {/* Mosaïque principale des indicateurs de performance */}
        <div className="admin-stat-ribbon stats-grid">
          <div className="admin-stat stat-card">
            <span className="admin-stat-icon">📦</span>
            <h3 className="admin-stat-label">Fragrances Répertoriées</h3>
            <p className="admin-stat-value tabular-nums">{stats.productsCount}</p>
          </div>

          <div className="admin-stat stat-card">
            <span className="admin-stat-icon">👥</span>
            <h3 className="admin-stat-label">Clients Enregistrés</h3>
            <p className="admin-stat-value tabular-nums">{stats.customersCount}</p>
          </div>

          <div className="admin-stat stat-card">
            <span className="admin-stat-icon">🛒</span>
            <h3 className="admin-stat-label">Commandes Totales</h3>
            <p className="admin-stat-value tabular-nums">{stats.ordersCount}</p>
          </div>

          <div className="admin-stat stat-card">
            <span className="admin-stat-icon">⏳</span>
            <h3 className="admin-stat-label">Commandes en attente</h3>
            <p className="admin-stat-value tabular-nums">{stats.pendingOrdersCount}</p>
          </div>

          <div className="admin-stat stat-card danger-stat">
            <span className="admin-stat-icon">⚠️</span>
            <h3 className="admin-stat-label">Produits en rupture</h3>
            <p className="admin-stat-value tabular-nums">{stats.outOfStockProductsCount}</p>
          </div>
        </div>

        {/* Section Chiffre d'Affaires mise en majesté (.admin-highlight) */}
        <div className="admin-highlight noise-overlay">
          <div>
            <span className="admin-highlight-eyebrow label-gold">Indicateur Financier</span>
            <h3 className="font-display mt-2 text-white/50 tracking-wider text-xs uppercase">Volume des Transactions</h3>
            <p className="admin-highlight-value text-gold-gradient tabular-nums">
              {stats.revenue.toLocaleString()} DH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;