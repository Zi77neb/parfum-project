package com.ecommerce.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.dto.order.CheckoutRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.dto.order.UpdateOrderStatusRequest;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductVariant;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.mapper.OrderMapper;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.ProductVariantRepository;
import com.ecommerce.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CustomerRepository customerRepository;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository orderRepository,
                            ProductRepository productRepository,
                            ProductVariantRepository productVariantRepository,
                            CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
        this.customerRepository = customerRepository;
        this.orderMapper = new OrderMapper();
    }

    @Override
    @Transactional
    public OrderResponse checkout(CheckoutRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Le panier est vide");
        }

        Customer customer = customerRepository.findByEmail(request.getEmail())
                .map(existingCustomer -> updateCustomerDetails(existingCustomer, request))
                .orElseGet(() -> createCustomerFromCheckout(request));

        Order order = new Order();
        order.setCustomer(customer);
        order.setStatus(OrderStatus.EN_ATTENTE);
        order.setTotalPrice(BigDecimal.ZERO);

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CheckoutRequest.CheckoutItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable"));

            ProductVariant variant = productVariantRepository.findById(itemRequest.getVariantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Taille introuvable"));

            if (!variant.getProduct().getId().equals(product.getId())) {
                throw new BadRequestException("Taille invalide pour ce produit");
            }

            if (itemRequest.getQuantity() == null || itemRequest.getQuantity() <= 0) {
                throw new BadRequestException(
                        "Quantité invalide pour le produit " + product.getName()
                );
            }

            if (variant.getStock() < itemRequest.getQuantity()) {
                throw new BadRequestException(
                        "Stock insuffisant pour le produit "
                                + product.getName()
                                + " - "
                                + variant.getSize()
                );
            }

            variant.setStock(
                    variant.getStock() - itemRequest.getQuantity()
            );

            productVariantRepository.save(variant);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setSize(variant.getSize());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(variant.getPrice());

            orderItem.setSubtotal(
                    variant.getPrice()
                            .multiply(BigDecimal.valueOf(itemRequest.getQuantity()))
            );

            items.add(orderItem);
            total = total.add(orderItem.getSubtotal());
        }

        order.setItems(items);
        order.setTotalPrice(total);

        order = orderRepository.save(order);

        return orderMapper.toResponse(order);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc()
                .stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Commande introuvable avec l'id : " + id
                        )
                );

        return orderMapper.toResponse(order);
    }

    @Override
    public List<OrderResponse> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerIdOrderByOrderDateDesc(customerId)
                .stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

  @Override
@Transactional
public OrderResponse updateOrderStatus(Long id,
                                       UpdateOrderStatusRequest request) {

    Order order = orderRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Commande introuvable avec l'id : " + id
                    )
            );

    OrderStatus ancienStatut = order.getStatus();
    OrderStatus nouveauStatut = request.getStatus();

    // Rien à faire si le statut est identique
    if (ancienStatut == nouveauStatut) {
        return orderMapper.toResponse(order);
    }

    // Une commande livrée ne peut plus être modifiée
    if (ancienStatut == OrderStatus.LIVREE) {
        throw new BadRequestException(
                "Une commande livrée ne peut plus être modifiée."
        );
    }

    // Une commande déjà annulée ne peut plus changer
    if (ancienStatut == OrderStatus.ANNULEE) {
        throw new BadRequestException(
                "Cette commande est déjà annulée."
        );
    }

    // Remettre le stock uniquement lors de l'annulation
    if (nouveauStatut == OrderStatus.ANNULEE) {

        for (OrderItem item : order.getItems()) {

            ProductVariant variant = productVariantRepository
                    .findByProductIdAndSize(
                            item.getProduct().getId(),
                            item.getSize()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Variant introuvable pour le produit : "
                                            + item.getProduct().getName()
                            ));

            variant.setStock(
                    variant.getStock() + item.getQuantity()
            );

            productVariantRepository.save(variant);
        }
    }

    order.setStatus(nouveauStatut);

    order = orderRepository.save(order);

    return orderMapper.toResponse(order);
}

    private Customer createCustomerFromCheckout(
            CheckoutRequest request
    ) {
        Customer customer = new Customer();
        return updateCustomerDetails(customer, request);
    }

    private Customer updateCustomerDetails(
            Customer customer,
            CheckoutRequest request
    ) {
        BeanUtils.copyProperties(
                request,
                customer,
                "id",
                "createdAt",
                "orders",
                "items"
        );

        return customerRepository.save(customer);
    }
}