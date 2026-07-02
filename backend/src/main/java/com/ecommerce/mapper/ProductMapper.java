package com.ecommerce.mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.ProductSummaryResponse;
import com.ecommerce.dto.product.ProductVariantResponse;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductImage;
import com.ecommerce.entity.ProductVariant;

public class ProductMapper {

    public Product toEntity(ProductRequest request, Category category) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setSex(request.getSex());
        product.setCategory(category);
        return product;
    }

    public ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setSex(product.getSex());
        response.setCreatedAt(product.getCreatedAt());
        response.setCategoryId(
                product.getCategory() != null
                        ? product.getCategory().getId()
                        : null
        );
        response.setCategoryName(
                product.getCategory() != null
                        ? product.getCategory().getName()
                        : null
        );
        response.setImageUrls(extractImageUrls(product.getImages()));
        response.setVariants(
                product.getVariants().stream()
                        .map(this::toVariantResponse)
                        .collect(Collectors.toList())
        );
        return response;
    }

    public ProductSummaryResponse toSummary(Product product) {
        ProductSummaryResponse response = new ProductSummaryResponse();
        response.setId(product.getId());
        response.setName(product.getName());

        BigDecimal minPrice = product.getVariants().stream()
                .map(ProductVariant::getPrice)
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        BigDecimal maxPrice = product.getVariants().stream()
                .map(ProductVariant::getPrice)
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        response.setMinPrice(minPrice);
        response.setMaxPrice(maxPrice);

        response.setCategoryName(
                product.getCategory() != null
                        ? product.getCategory().getName()
                        : null
        );

        response.setPrimaryImageUrl(getPrimaryImage(product));

        return response;
    }

    private ProductVariantResponse toVariantResponse(ProductVariant variant) {
        ProductVariantResponse response = new ProductVariantResponse();
        response.setId(variant.getId());
        response.setSize(variant.getSize());
        response.setPrice(variant.getPrice());
        response.setStock(variant.getStock());
        return response;
    }

    private List<String> extractImageUrls(List<ProductImage> images) {
        return images.stream()
                .map(ProductImage::getImageUrl)
                .collect(Collectors.toList());
    }

    private String getPrimaryImage(Product product) {
        return product.getImages().stream()
                .filter(ProductImage::isPrimary)
                .map(ProductImage::getImageUrl)
                .findFirst()
                .orElse(
                        product.getImages().isEmpty()
                                ? null
                                : product.getImages().get(0).getImageUrl()
                );
    }
}