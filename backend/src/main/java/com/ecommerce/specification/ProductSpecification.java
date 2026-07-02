package com.ecommerce.specification;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.ecommerce.dto.product.ProductFilterRequest;
import com.ecommerce.entity.Product;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;

public class ProductSpecification {

    public static Specification<Product> withFilters(ProductFilterRequest filter) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (filter.getCategoryId() != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(root.get("category").get("id"), filter.getCategoryId())
                );
            }

            if (filter.getSex() != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(root.get("sex"), filter.getSex())
                );
            }

            if (filter.getSearch() != null && !filter.getSearch().isBlank()) {
                String search = "%" + filter.getSearch().toLowerCase() + "%";

                Join<Object, Object> category = root.join("category");

                Predicate namePredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        search
                );

                Predicate descriptionPredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("description")),
                        search
                );

                Predicate categoryPredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(category.get("name")),
                        search
                );

                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.or(
                                namePredicate,
                                descriptionPredicate,
                                categoryPredicate
                        )
                );
            }

            if (filter.getMinPrice() != null || filter.getMaxPrice() != null) {
                query.distinct(true);

                if (filter.getMinPrice() != null) {
                    Subquery<BigDecimal> minPriceSubquery = query.subquery(BigDecimal.class);
                    Root<Product> minPriceRoot = minPriceSubquery.from(Product.class);
                    Join<Object, Object> minVariantsJoin = minPriceRoot.join("variants");

                    minPriceSubquery.select(criteriaBuilder.min(minVariantsJoin.get("price")))
                            .where(criteriaBuilder.equal(minPriceRoot.get("id"), root.get("id")));

                    predicate = criteriaBuilder.and(
                            predicate,
                            criteriaBuilder.greaterThanOrEqualTo(minPriceSubquery, filter.getMinPrice())
                    );
                }

                if (filter.getMaxPrice() != null) {
                    Subquery<BigDecimal> maxPriceSubquery = query.subquery(BigDecimal.class);
                    Root<Product> maxPriceRoot = maxPriceSubquery.from(Product.class);
                    Join<Object, Object> maxVariantsJoin = maxPriceRoot.join("variants");

                    maxPriceSubquery.select(criteriaBuilder.max(maxVariantsJoin.get("price")))
                            .where(criteriaBuilder.equal(maxPriceRoot.get("id"), root.get("id")));

                    predicate = criteriaBuilder.and(
                            predicate,
                            criteriaBuilder.lessThanOrEqualTo(maxPriceSubquery, filter.getMaxPrice())
                    );
                }
            }

            if (Boolean.TRUE.equals(filter.getNewest())) {
                query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
            }

            return predicate;
        };
    }
}