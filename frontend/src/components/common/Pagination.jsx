import React from "react";
import "../../styles/components/Pagination.css";

const Pagination = ({
  page = 0,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages).keys()];

  return (
    <div className="pagination-container">
      <button
        className="fleet-page-btn nav-arrow"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        aria-label="Page précédente"
      >
        ← Précédent
      </button>

      <div className="pagination-numeric-group">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={
              p === page
                ? "fleet-page-btn fleet-page-btn--active tabular-nums"
                : "fleet-page-btn tabular-nums"
            }
          >
            {p + 1}
          </button>
        ))}
      </div>

      <button
        className="fleet-page-btn nav-arrow"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        aria-label="Page suivante"
      >
        Suivant →
      </button>
    </div>
  );
};

export default Pagination;