import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/Login.css";

const API_URL = "http://localhost:8080/api/auth/login";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Connexion impossible.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      navigate("/admin");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login auth-shell marble-bg noise-overlay">
      <div className="admin-login__card auth-form-panel">
        
        {/* Ornement typographique de la Maison au lieu de l'émoji */}
        <div className="admin-login__griffe font-display">MP</div>

        <h1 className="auth-heading font-display">Espace Privé</h1>

        <p className="auth-subheading">
          Identifiez-vous pour administrer les collections et flaconniers.
        </p>

        <form
          className="admin-login__form"
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label className="auth-label">Clé d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="auth-input"
              placeholder="Ex: directoire_olfactif"
              required
            />
          </div>

          <div className="form-field">
            <label className="auth-label">Empreinte de sécurité</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Chiffrement..." : "Authentification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;