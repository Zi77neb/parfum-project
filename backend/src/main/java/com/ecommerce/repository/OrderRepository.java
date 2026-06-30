package com.ecommerce.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.entity.Order;
import com.ecommerce.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerIdOrderByOrderDateDesc(Long customerId);

    List<Order> findAllByOrderByOrderDateDesc();

    long countByStatus(OrderStatus status);

    @Query("select coalesce(sum(o.totalPrice), 0) from Order o where o.status <> :excludedStatus")
    BigDecimal sumRevenueExcludingStatus(@Param("excludedStatus") OrderStatus excludedStatus);
}
