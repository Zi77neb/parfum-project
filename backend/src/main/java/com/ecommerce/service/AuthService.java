package com.ecommerce.service;

import com.ecommerce.dto.auth.LoginRequest;
import com.ecommerce.dto.auth.LoginResponse;
import com.ecommerce.dto.auth.RegisterAdminRequest;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    LoginResponse registerAdmin(RegisterAdminRequest request);
}
