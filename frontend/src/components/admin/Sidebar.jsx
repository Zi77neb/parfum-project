import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Produits", path: "/admin/products" },
    { label: "Ajouter un produit", path: "/admin/products/add" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Commandes", path: "/admin/orders" },
  ];

  return (
    <aside className="admin-sidebar">
      <h2>Administration</h2>

      <nav>
        {links.map((link) => (
          <div key={link.path} className="admin-sidebar__item">
            <Link
              to={link.path}
              className={
                location.pathname === link.path
                  ? "admin-sidebar__link admin-sidebar__link--active"
                  : "admin-sidebar__link"
              }
            >
              {link.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;