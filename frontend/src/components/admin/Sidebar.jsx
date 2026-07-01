import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Produits", path: "/admin/products" },
    { label: "Ajouter un produit", path: "/admin/products/add" },
    { label: "Catégories", path: "/admin/categories" },
    { label: "Commandes", path: "/admin/orders" },
  ];

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-sidebar-title">Maison des Parfums</h2>

      <nav className="admin-sidebar-nav">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <div key={link.path} className="admin-sidebar-item">
              <Link
                to={link.path}
                className={isActive ? "admin-side-link is-active" : "admin-side-link"}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;