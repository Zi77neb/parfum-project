package com.ecommerce.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.product.ProductFilterRequest;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.ProductSummaryResponse;
import com.ecommerce.dto.product.ProductVariantRequest;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductImage;
import com.ecommerce.entity.ProductVariant;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.service.ProductService;
import com.ecommerce.specification.ProductSpecification;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = new ProductMapper();
    }

    @Override
    public Page<ProductResponse> getProducts(ProductFilterRequest filter) {
        Specification<Product> spec = ProductSpecification.withFilters(filter);
        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize());

        return productRepository.findAll(spec, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Produit introuvable avec l'id : " + id
                        ));

        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Catégorie introuvable"));

        Product product = productMapper.toEntity(request, category);

        if (request.getVariants() != null) {
            for (ProductVariantRequest variantRequest : request.getVariants()) {
                ProductVariant variant = new ProductVariant();
                variant.setSize(variantRequest.getSize());
                variant.setPrice(variantRequest.getPrice());
                variant.setStock(variantRequest.getStock());
                product.addVariant(variant);
            }
        }

        if (request.getImageUrls() != null) {
            List<ProductImage> images = request.getImageUrls()
                    .stream()
                    .map(url -> {
                        ProductImage image = new ProductImage();
                        image.setImageUrl(url);
                        image.setPrimary(false);
                        image.setProduct(product);
                        return image;
                    })
                    .collect(Collectors.toList());

            if (!images.isEmpty()) {
                images.get(0).setPrimary(true);
            }

            product.setImages(images);
        }

        Product savedProduct = productRepository.save(product);

        return productMapper.toResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Produit introuvable avec l'id : " + id
                        ));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Catégorie introuvable"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setSex(request.getSex());
        product.setCategory(category);

        product.getVariants().clear();

        if (request.getVariants() != null) {
            for (ProductVariantRequest variantRequest : request.getVariants()) {
                ProductVariant variant = new ProductVariant();
                variant.setSize(variantRequest.getSize());
                variant.setPrice(variantRequest.getPrice());
                variant.setStock(variantRequest.getStock());
                product.addVariant(variant);
            }
        }

        if (request.getImageUrls() != null) {
            product.getImages().clear();

            List<ProductImage> images = request.getImageUrls()
                    .stream()
                    .map(url -> {
                        ProductImage image = new ProductImage();
                        image.setImageUrl(url);
                        image.setPrimary(false);
                        image.setProduct(product);
                        return image;
                    })
                    .collect(Collectors.toList());

            if (!images.isEmpty()) {
                images.get(0).setPrimary(true);
            }

            product.setImages(images);
        }

        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Produit introuvable avec l'id : " + id
                        ));

        productRepository.delete(product);
    }

    @Override
    public List<ProductSummaryResponse> getLatestProducts() {
        return productRepository.findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(productMapper::toSummary)
                .collect(Collectors.toList());
    }
}