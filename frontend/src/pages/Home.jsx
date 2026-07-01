import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/product/ProductCarousel";
import Loader from "../components/common/Loader";
import "../styles/pages/Home.css";

const API_URL = "http://localhost:8080/api";

// Petit hook : ajoute "is-visible" aux éléments .reveal quand ils entrent dans le viewport
const useScrollReveal = (deps = []) => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
};

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/products/latest`),
        fetch(`${API_URL}/categories`),
      ]);

      const products = await productsRes.json();
      const categories = await categoriesRes.json();

      setLatestProducts(products);
      setCategories(categories);
    } catch (err) {
      console.error(err);
      alert("Impossible de charger les données de l'Atelier.");
    } finally {
      setLoading(false);
    }
  };

  // Réactive l'observer une fois les données (et donc les sections) montées
  useScrollReveal([loading, categories.length, latestProducts.length]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page dot-grid noise-overlay">
      {/* Section Cinématographique d'Élite */}
      <section className="hero-section hero-bg-image" ref={heroRef}>
        <div className="hero-linear-shield hero-radial-shield hero-vignette"></div>

        {/* Poussière dorée en suspension — respiration ambiante du Hero */}
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`hero-particle hero-particle--${(i % 7) + 1}`} />
          ))}
        </div>

        <div className="hero-section__content hero-copy-block">
          <span className="luxury-section-label hero-reveal hero-reveal--1">
            Haute Parfumerie
          </span>
          <h1 className="hero-headline hero-reveal hero-reveal--2">
            L'Éveil des <em>Essences Rares</em>
          </h1>

          <p className="hero-lead hero-reveal hero-reveal--3">
            Découvrez des sillages d'exception conçus au cœur de nos ateliers,
            où chaque note raconte une émotion intemporelle.
          </p>

          <Link
            to="/products"
            className="luxury-cta shine-on-hover hero-section__cta hero-reveal hero-reveal--4"
          >
            <span className="luxury-cta__inner">Explorer les Collections</span>
            <span className="luxury-cta__shine"></span>
          </Link>
        </div>

        {/* Repère de scroll — invite discrète à poursuivre le sillage */}
        <div className="hero-scroll-cue hero-reveal hero-reveal--5" aria-hidden="true">
          <span className="hero-scroll-cue__line"></span>
          <span className="hero-scroll-cue__label">Continuer le sillage</span>
        </div>
      </section>

      {/* Fil doré — la "sillage" qui relie les sections */}
      <div className="sillage-thread" aria-hidden="true">
        <span className="sillage-thread__glow"></span>
      </div>

      {/* Section Collections & Filtres Lookbook */}
      <section className="content-section categories-showroom">
        <span className="luxury-section-label reveal">Atelier</span>
        <h2 className="section-title reveal">Nos Univers Olfactifs</h2>
        <div className="gold-divider reveal"></div>

        {categories.length === 0 ? (
          <p className="footer-empty reveal">
            Nos collections privées se renouvellent actuellement.
          </p>
        ) : (
          <div className="category-pills fleet-filter-pills">
            {categories.map((category, i) => (
              <Link
                key={category.id}
                className="category-pills__link fleet-filter-pill--gold reveal"
                style={{ "--stagger": i }}
                to={`/products?categoryId=${category.id}`}
              >
                <div className="category-card">
                  <span className="category-card__eyebrow">Collection</span>
                  <h3 className="category-card__title">{category.name}</h3>
                  <span className="category-card__cta">Découvrir →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Fil doré secondaire */}
      <div className="sillage-thread sillage-thread--muted" aria-hidden="true">
        <span className="sillage-thread__glow"></span>
      </div>

      {/* Section Nouveautés */}
      <section className="content-section latest-showroom-band surface-muted-band">
        <div className="reveal">
          <ProductCarousel title="Dernières Créations" products={latestProducts} />
        </div>
      </section>
    </div>
  );
};

export default Home;