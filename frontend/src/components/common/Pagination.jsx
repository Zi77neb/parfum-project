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
    <div className="pagination">
      <button
        className="pagination__button"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        Precedent
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={
            p === page
              ? "pagination__button pagination__button--active"
              : "pagination__button"
          }
        >
          {p + 1}
        </button>
      ))}

      <button
        className="pagination__button"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
