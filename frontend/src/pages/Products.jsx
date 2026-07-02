import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import ProductFilter from "../components/product/ProductFilter";
import SearchBar from "../components/common/SearchBar";
import Pagination from "../components/common/Pagination";
import Loader from "../components/common/Loader";
import "../styles/pages/Products.css";

const API_URL = "http://localhost:8080/api/products";

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryIdParam = params.get("categoryId");

    return {
      search: "",
      categoryId: categoryIdParam ? Number(categoryIdParam) : null,
      sex: null,
      minPrice: null,
      maxPrice: null,
      newest: false,
    };
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryIdParam = params.get("categoryId");
    const nextCategoryId = categoryIdParam ? Number(categoryIdParam) : null;

    setFilters((prev) => {
      if (prev.categoryId === nextCategoryId) {
        return prev;
      }

      return {
        ...prev,
        categoryId: nextCategoryId,
      };
    });
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, filters.categoryId, filters.sex, filters.search, filters.minPrice, filters.maxPrice, filters.newest]);

  const buildQuery = () => {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("size", 12);

    if (filters.search) params.append("search", filters.search);
    if (filters.categoryId) params.append("categoryId", filters.categoryId);
    if (filters.sex) params.append("sex", filters.sex);
    if (filters.minPrice !== null && filters.minPrice !== "") {
      params.append("minPrice", filters.minPrice);
    }
    if (filters.maxPrice !== null && filters.maxPrice !== "") {
      params.append("maxPrice", filters.maxPrice);
    }
    if (filters.newest) params.append("newest", true);

    return params.toString();
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}?${buildQuery()}`
      );

      if (!res.ok) {
        throw new Error(
          "Impossible de charger les pièces de la collection."
        );
      }

      const data = await res.json();

      setProducts(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setPage(0);

    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const handleFilterChange = (newFilters) => {
    setPage(0);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setPage(0);

    setFilters({
      search: "",
      categoryId: null,
      sex: null,
      minPrice: null,
      maxPrice: null,
      newest: false,
    });
  };

  return (
    <div className="products-page marble-bg noise-overlay">
      <div className="products-page__header">
        <span className="luxury-section-label animate-fade-in-up">Les Ateliers</span>
        <h1 className="section-title">Nos Collections Privées</h1>
        <div className="gold-divider-center"></div>

        <div className="products-page__search-wrap">
          <SearchBar
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="products-layout">
        <aside className="products-layout__sidebar">
          <ProductFilter
            filters={filters}
            onChange={handleFilterChange}
            onReset={resetFilters}
          />
        </aside>

        <section className="products-layout__content">
          {loading ? (
            <div className="products-page-loader-wrap">
              <Loader text="Assemblage de la collection..." />
            </div>
          ) : (
            <>
              <ProductGallery products={products} />

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;