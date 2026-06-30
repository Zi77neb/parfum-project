package com.ecommerce.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Order;
import com.ecommerce.entity.Product;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    public AdminController(ProductRepository productRepository,
                           OrderRepository orderRepository,
                           CustomerRepository customerRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        List<Order> orders = orderRepository.findAll();
        List<Product> products = productRepository.findAll();

        Map<String, Object> body = new HashMap<>();
        body.put("productsCount", products.size());
        body.put("ordersCount", orders.size());
        body.put("customersCount", customerRepository.count());
        body.put(
                "pendingOrdersCount",
                countOrdersByStatus(orders, OrderStatus.EN_ATTENTE)
        );
        body.put("revenue", calculateRevenue(orders));
        body.put(
                "outOfStockProductsCount",
                countOutOfStockProducts(products)
        );

        return ResponseEntity.ok(body);
    }

    private long countOrdersByStatus(
            List<Order> orders,
            OrderStatus status
    ) {
        return orders.stream()
                .filter(order -> order.getStatus() == status)
                .count();
    }

    private BigDecimal calculateRevenue(List<Order> orders) {
        return orders.stream()
                .filter(order -> order.getStatus() != OrderStatus.ANNULEE)
                .map(Order::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private long countOutOfStockProducts(
            List<Product> products
    ) {
        return products.stream()
                .filter(product ->
                        product.getVariants()
                                .stream()
                                .anyMatch(variant ->
                                        variant.getStock() != null
                                                && variant.getStock() <= 0
                                )
                )
                .count();
    }
}