import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Checkout.css";

const API_URL =
  "http://localhost:8080/api/orders/checkout";

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

  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

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
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Impossible de passer la commande."
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
    <div className="checkout-page">
      <div className="checkout-card">
        <h1>Validation de la commande</h1>

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <div className="checkout-grid">
            <div className="form-field">
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Téléphone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field checkout-full">
              <label>Adresse</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Ville</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Code postal</label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="form-field checkout-full">
              <label>Pays</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="checkout-form__submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Validation..."
              : "Confirmer la commande"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;