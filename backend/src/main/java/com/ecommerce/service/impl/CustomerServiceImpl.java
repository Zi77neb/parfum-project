package com.ecommerce.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecommerce.dto.customer.CustomerRequest;
import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.entity.Customer;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.mapper.CustomerMapper;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        this.customerMapper = new CustomerMapper();
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerResponse getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Client introuvable avec l'id : " + id));

        return customerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse createCustomer(CustomerRequest request) {
        throw new UnsupportedOperationException(
                "Les clients sont créés automatiquement lors de la validation d'une commande");
    }

    @Override
    public CustomerResponse updateCustomer(Long id, CustomerRequest request) {
        throw new UnsupportedOperationException(
                "La modification manuelle des clients n'est pas autorisée");
    }

    @Override
    public void deleteCustomer(Long id) {
        throw new UnsupportedOperationException(
                "La suppression des clients n'est pas autorisée");
    }
}