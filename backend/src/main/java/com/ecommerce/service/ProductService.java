package com.ecommerce.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ecommerce.dto.product.ProductFilterRequest;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;

public interface ProductService {

    Page<ProductResponse> getProducts(ProductFilterRequest filter);

    ProductResponse getProductById(Long id);

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);

    List<ProductResponse> getLatestProducts();
}