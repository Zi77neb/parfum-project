package com.ecommerce.mapper;

import java.util.stream.Collectors;

import com.ecommerce.dto.order.OrderItemResponse;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;

public class OrderMapper {

    public OrderResponse toResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalPrice(order.getTotalPrice());
        response.setStatus(order.getStatus());
        response.setCustomerName(order.getCustomer() != null ? order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName() : null);
        response.setItems(order.getItems().stream().map(this::toItemResponse).collect(Collectors.toList()));
        return response;
    }

    public OrderItemResponse toItemResponse(OrderItem item) {
        OrderItemResponse response = new OrderItemResponse();
        response.setId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setQuantity(item.getQuantity());
        response.setUnitPrice(item.getUnitPrice());
        response.setSubtotal(item.getSubtotal());
        return response;
    }
}
