package com.ecommerce.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Ecommerce API",
                version = "1.0.0",
                description = "Backend de la plateforme e-commerce",
                contact = @Contact(name = "Support", email = "support@ecommerce.com"),
                license = @License(name = "MIT")
        )
)
public class OpenApiConfig {
}
