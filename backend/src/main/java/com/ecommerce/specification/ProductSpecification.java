package com.ecommerce.specification;

import org.springframework.data.jpa.domain.Specification;

import com.ecommerce.dto.product.ProductFilterRequest;
import com.ecommerce.entity.Product;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;

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

            if (filter.getMinPrice() != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice())
                );
            }

            if (filter.getMaxPrice() != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice())
                );
            }

            if (Boolean.TRUE.equals(filter.getNewest())) {
                query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
            }

            return predicate;
        };
    }
}