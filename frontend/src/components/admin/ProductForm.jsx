import React, { useEffect, useState } from "react";
import "../../styles/components/ProductForm.css";

const API_URL = "http://localhost:8080/api";

const ProductForm = ({
  product = null,
  onSuccess = () => {},
  onCancel = () => {},
}) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    sex: "HOMME",
    categoryId: "",
    imageUrls: [],
    variants: [
      {
        size: "",
        price: "",
        stock: "",
      },
    ],
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();

    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        sex: product.sex || "HOMME",
        categoryId: product.categoryId || "",
        imageUrls: product.imageUrls || [],
        variants:
          product.variants?.length > 0
            ? product.variants.map((v) => ({
                size: v.size,
                price: v.price,
                stock: v.stock,
              }))
            : [
                {
                  size: "",
                  price: "",
                  stock: "",
                },
              ],
      });
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const variants = [...form.variants];
    variants[index][field] = value;

    setForm((prev) => ({
      ...prev,
      variants,
    }));
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          size: "",
          price: "",
          stock: "",
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (form.variants.length === 1) return;

    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const uploadImage = async () => {
    if (!imageFile) return form.imageUrls;

    const token = localStorage.getItem("token");
    const body = new FormData();
    body.append("file", imageFile);

    const res = await fetch(`${API_URL}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (!res.ok) {
      throw new Error("Erreur upload image");
    }

    const data = await res.json();
    return [data.url];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const imageUrls = await uploadImage();

      const payload = {
        ...form,
        categoryId: Number(form.categoryId),
        imageUrls,
        variants: form.variants.map((v) => ({
          size: v.size,
          price: Number(v.price),
          stock: Number(v.stock),
        })),
      };

      const res = await fetch(
        product ? `${API_URL}/products/${product.id}` : `${API_URL}/products`,
        {
          method: product ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erreur");
      }

      const data = await res.json();

      alert(
        product
          ? "Produit modifié avec succès."
          : "Produit ajouté avec succès."
      );

      onSuccess(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form admin-panel" onSubmit={handleSubmit}>
      <h2 className="admin-title">
        {product ? "MODIFIER" : "AJOUTER"} UN PARFUM
      </h2>

      <div className="form-field">
        <label className="label-gold">Nom de la fragrance</label>
        <input 
          className="input-luxury" 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-field">
        <label className="label-gold">Description & Notes Olfactives</label>
        <textarea 
          className="input-luxury" 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
        />
      </div>

      <div className="form-grid-two-columns">
        <div className="form-field">
          <label className="label-gold">Sexe</label>
          <select className="input-luxury" name="sex" value={form.sex} onChange={handleChange}>
            <option value="HOMME">HOMME</option>
            <option value="FEMME">FEMME</option>
            <option value="ENFANT">ENFANT</option>
          </select>
        </div>

        <div className="form-field">
          <label className="label-gold">Collection / Catégorie</label>
          <select className="input-luxury" name="categoryId" value={form.categoryId} onChange={handleChange} required>
            <option value="">Choisir une collection</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="gold-divider"></div>
      <h3 className="variant-section-title">Déclinaisons & Volumes</h3>

      {form.variants.map((variant, index) => (
        <div key={index} className="product-form__variant">
          <div className="form-field">
            <label className="label-gold">Contenance</label>
            <input
              className="input-luxury"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, "size", e.target.value)}
              placeholder="Ex: 100ml"
              required
            />
          </div>

          <div className="form-field">
            <label className="label-gold">Prix (€)</label>
            <input
              className="input-luxury"
              type="number"
              step="0.01"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, "price", e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="label-gold">Unités en Stock</label>
            <input
              className="input-luxury"
              type="number"
              value={variant.stock}
              onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
              required
            />
          </div>

          <button className="admin-action-btn--danger" type="button" onClick={() => removeVariant(index)}>
            Supprimer
          </button>
        </div>
      ))}

      <button className="btn-outline-gold btn-add-variant" type="button" onClick={addVariant}>
        + Ajouter un volume (Contenance)
      </button>

      <div className="gold-divider"></div>

      <div className="form-field">
        <label className="label-gold">Flacon (Image principale)</label>
        <input className="input-luxury file-input-luxury" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      </div>

      <div className="product-form__actions">
        {product && (
          <button className="btn-ghost" type="button" onClick={onCancel}>
            Annuler
          </button>
        )}
        
        <button className="btn-dark" disabled={loading}>
          {loading ? "Enregistrement..." : product ? "Enregistrer les modifications" : "Créer le produit"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;