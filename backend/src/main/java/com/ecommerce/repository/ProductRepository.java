package com.ecommerce.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ecommerce.entity.Product;
import com.ecommerce.enums.Sex;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findBySex(Sex sex);

    List<Product> findByCreatedAtAfter(LocalDateTime date);

    long countByVariantsStockLessThanEqual(Integer stock);

    @Override
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    List<Product> findTop10ByOrderByCreatedAtDesc();

    Optional<Product> findById(Long id);
}