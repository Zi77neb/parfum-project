package com.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entity.ProductVariant;
public interface ProductVariantRepository
        extends JpaRepository<ProductVariant, Long> {

    List<ProductVariant> findByProductId(Long productId);

    List<ProductVariant> findByProductIdAndStockGreaterThan(
            Long productId,
            Integer stock
    );
    Optional<ProductVariant> findByProductIdAndSize(Long productId, String size);
}