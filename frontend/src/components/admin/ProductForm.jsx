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
          ? "Produit modifie avec succes."
          : "Produit ajoute avec succes."
      );

      onSuccess(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{product ? "Modifier" : "Ajouter"} un produit</h2>

      <div className="form-field">
        <label>Nom</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-field">
        <label>Sexe</label>
        <select name="sex" value={form.sex} onChange={handleChange}>
          <option value="HOMME">HOMME</option>
          <option value="FEMME">FEMME</option>
          <option value="ENFANT">ENFANT</option>
        </select>
      </div>

      <div className="form-field">
        <label>Categorie</label>
        <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
          <option value="">Choisir</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <hr />
      <h3>Tailles</h3>

      {form.variants.map((variant, index) => (
        <div key={index} className="product-form__variant">
          <div className="form-field">
            <label>Taille</label>
            <input
              value={variant.size}
              onChange={(e) => handleVariantChange(index, "size", e.target.value)}
              placeholder="10ml"
              required
            />
          </div>

          <div className="form-field">
            <label>Prix</label>
            <input
              type="number"
              step="0.01"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, "price", e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Stock</label>
            <input
              type="number"
              value={variant.stock}
              onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
              required
            />
          </div>

          <button className="product-form__remove" type="button" onClick={() => removeVariant(index)}>
            Supprimer
          </button>
        </div>
      ))}

      <button className="product-form__add" type="button" onClick={addVariant}>
        Ajouter une taille
      </button>

      <hr />

      <div className="form-field">
        <label>Image</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      </div>

      <div className="product-form__actions">
        <button disabled={loading}>
          {loading ? "Enregistrement..." : product ? "Modifier" : "Ajouter"}
        </button>

        {product && (
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
