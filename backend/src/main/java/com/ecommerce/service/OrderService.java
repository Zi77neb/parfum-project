package com.ecommerce.service;

import java.util.List;

import com.ecommerce.dto.order.CheckoutRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.dto.order.UpdateOrderStatusRequest;

public interface OrderService {

    OrderResponse checkout(CheckoutRequest request);

    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(Long id);

    List<OrderResponse> getOrdersByCustomer(Long customerId);

    OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request);
}
