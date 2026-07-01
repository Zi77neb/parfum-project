import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Checkout.css";

const API_URL = "http://localhost:8080/api/orders/checkout";

const Checkout = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        items: cart.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Impossible de passer la commande."
        );
      }

      localStorage.removeItem("cart");

      navigate("/order-success", {
        state: {
          order: data,
        },
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page marble-bg noise-overlay">
      <div className="checkout-card surface-panel">
        <div className="checkout-page__header">
          <span className="luxury-section-label">Adresse de Livraison</span>
          <h1 className="section-title">Finaliser l'Achat</h1>
          <div className="gold-divider-center"></div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-grid">
            <div className="form-field">
              <label className="label-gold">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="label-gold">Nom</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="label-gold">Adresse de messagerie</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="label-gold">Téléphone concierge</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div className="form-field checkout-full">
              <label className="label-gold">Adresse de livraison (Rue, N°)</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="label-gold">Ville</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="label-gold">Code postal</label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <div className="form-field checkout-full">
              <label className="label-gold">Pays</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="field-input"
              />
            </div>
          </div>

          <button
            className="luxury-cta shine-on-hover checkout-form__submit"
            type="submit"
            disabled={loading}
          >
            <span className="luxury-cta__inner">
              {loading ? "Chiffrement de la commande..." : "Confirmer & Réserver le Sillage"}
            </span>
            <span className="luxury-cta__shine"></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;