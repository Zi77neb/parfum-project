package com.ecommerce.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.product.ProductFilterRequest;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.ProductSummaryResponse;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductController(ProductService productService,
                             ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
        this.productMapper = new ProductMapper();
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getProducts(
            ProductFilterRequest filter
    ) {
        return ResponseEntity.ok(
                productService.getProducts(filter)
        );
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ProductSummaryResponse>>
    getLatestProducts() {
        return ResponseEntity.ok(
                productService.getLatestProducts()
        );
    }

    @GetMapping("/out-of-stock")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ProductResponse>>
    getOutOfStockProducts() {

        List<ProductResponse> products =
                productRepository.findAll()
                        .stream()
                        .filter(product ->
                                product.getVariants()
                                        .stream()
                                        .anyMatch(v ->
                                                v.getStock() != null
                                                        && v.getStock() <= 0
                                        )
                        )
                        .map(productMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse>
    getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductResponse>
    createProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(
                productService.createProduct(request)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductResponse>
    updateProduct(@PathVariable Long id,
                  @RequestBody ProductRequest request) {
        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void>
    deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}