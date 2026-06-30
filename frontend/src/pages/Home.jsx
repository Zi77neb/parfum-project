import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/product/ProductCarousel";
import Loader from "../components/common/Loader";
import "../styles/pages/Home.css";

const API_URL = "http://localhost:8080/api";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] =
        await Promise.all([
          fetch(`${API_URL}/products/latest`),
          fetch(`${API_URL}/categories`),
        ]);

      const products =
        await productsRes.json();

      const categories =
        await categoriesRes.json();

      setLatestProducts(products);
      setCategories(categories);
    } catch (err) {
      console.error(err);
      alert(
        "Impossible de charger les données."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-section__content">
          <h1>
            Découvrez notre collection
          </h1>

          <p>
            Des produits de qualité pour
            tous les goûts.
          </p>

          <Link
            to="/products"
            className="hero-section__cta"
          >
            Voir tous les produits
          </Link>
        </div>
      </section>

      <section className="content-section">
        <h2>Nos Catégories</h2>

        {categories.length === 0 ? (
          <p>Aucune catégorie.</p>
        ) : (
          <div className="category-pills">
            {categories.map((category) => (
              <Link
                key={category.id}
                className="category-pills__link"
                to={`/products?categoryId=${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="content-section">
        <ProductCarousel
          title="Nouveautés"
          products={latestProducts}
        />
      </section>
    </div>
  );
};

export default Home;