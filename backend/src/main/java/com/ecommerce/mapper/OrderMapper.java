package com.ecommerce.mapper;

import java.util.stream.Collectors;

import com.ecommerce.dto.order.OrderItemResponse;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;

public class OrderMapper {

    public OrderResponse toResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setId(order.getId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalPrice(order.getTotalPrice());
        response.setStatus(order.getStatus());

        Customer customer = order.getCustomer();

        if (customer != null) {
            response.setCustomerName(
                    customer.getFirstName() + " " + customer.getLastName()
            );
            response.setCustomerEmail(customer.getEmail());
            response.setCustomerPhone(customer.getPhone());
            response.setCustomerAddress(customer.getAddress());
            response.setCustomerCity(customer.getCity());
        }

        response.setItems(
                order.getItems()
                        .stream()
                        .map(this::toItemResponse)
                        .collect(Collectors.toList())
        );

        return response;
    }

    public OrderItemResponse toItemResponse(OrderItem item) {

        OrderItemResponse response = new OrderItemResponse();

        response.setId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setSize(item.getSize());
        response.setQuantity(item.getQuantity());
        response.setUnitPrice(item.getUnitPrice());
        response.setSubtotal(item.getSubtotal());

        return response;
    }
}