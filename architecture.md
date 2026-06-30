# Architecture du projet e-commerce

## 1. Ce qui a été fait

- Création d'une structure backend Java/Spring Boot à l'intérieur du dossier `backend/`.
- Création d'une structure frontend React à l'intérieur du dossier `frontend/`.
- Mise en place d'un service PostgreSQL dans `docker-compose.yml`.
- Création d'un `Dockerfile` pour le backend et d'un `Dockerfile` pour le frontend.
- Création du dossier `uploads/products/` pour stocker les images ou fichiers produits.
- Configuration d'un fichier `docker-compose.yml` pour lancer les trois services : `postgres`, `backend`, `frontend`.

## 2. Architecture complète du projet

```
ecommerce/
│
├── architecture.md
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── .gitignore
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── ecommerce/
│           │           ├── EcommerceApplication.java
│           │           ├── config/
│           │           │   ├── CorsConfig.java
│           │           │   ├── SwaggerConfig.java
│           │           │   └── OpenApiConfig.java
│           │           ├── security/
│           │           │   ├── SecurityConfig.java
│           │           │   ├── JwtService.java
│           │           │   ├── JwtAuthenticationFilter.java
│           │           │   ├── CustomUserDetailsService.java
│           │           │   ├── JwtAuthenticationEntryPoint.java
│           │           │   └── JwtAccessDeniedHandler.java
│           │           ├── entity/
│           │           │   ├── Product.java
│           │           │   ├── ProductImage.java
│           │           │   ├── Category.java
│           │           │   ├── Customer.java
│           │           │   ├── Order.java
│           │           │   ├── OrderItem.java
│           │           │   ├── User.java
│           │           │   └── Role.java
│           │           ├── enums/
│           │           │   ├── Sex.java
│           │           │   ├── OrderStatus.java
│           │           │   └── RoleName.java
│           │           ├── repository/
│           │           │   ├── ProductRepository.java
│           │           │   ├── ProductImageRepository.java
│           │           │   ├── CategoryRepository.java
│           │           │   ├── CustomerRepository.java
│           │           │   ├── OrderRepository.java
│           │           │   ├── OrderItemRepository.java
│           │           │   ├── UserRepository.java
│           │           │   └── RoleRepository.java
│           │           ├── dto/
│           │           │   ├── auth/
│           │           │   │   ├── LoginRequest.java
│           │           │   │   ├── LoginResponse.java
│           │           │   │   └── RegisterAdminRequest.java
│           │           │   ├── product/
│           │           │   │   ├── ProductRequest.java
│           │           │   │   ├── ProductResponse.java
│           │           │   │   ├── ProductSummaryResponse.java
│           │           │   │   └── ProductFilterRequest.java
│           │           │   ├── category/
│           │           │   │   ├── CategoryRequest.java
│           │           │   │   └── CategoryResponse.java
│           │           │   ├── order/
│           │           │   │   ├── CheckoutRequest.java
│           │           │   │   ├── OrderResponse.java
│           │           │   │   ├── OrderItemResponse.java
│           │           │   │   └── UpdateOrderStatusRequest.java
│           │           │   └── customer/
│           │           │       ├── CustomerRequest.java
│           │           │       └── CustomerResponse.java
│           │           ├── mapper/
│           │           │   ├── ProductMapper.java
│           │           │   ├── CategoryMapper.java
│           │           │   ├── CustomerMapper.java
│           │           │   └── OrderMapper.java
│           │           ├── service/
│           │           │   ├── ProductService.java
│           │           │   ├── CategoryService.java
│           │           │   ├── CustomerService.java
│           │           │   ├── OrderService.java
│           │           │   ├── AuthService.java
│           │           │   ├── StorageService.java
│           │           │   └── UserService.java
│           │           ├── service/impl/
│           │           │   ├── ProductServiceImpl.java
│           │           │   ├── CategoryServiceImpl.java
│           │           │   ├── CustomerServiceImpl.java
│           │           │   ├── OrderServiceImpl.java
│           │           │   ├── AuthServiceImpl.java
│           │           │   ├── StorageServiceImpl.java
│           │           │   └── UserServiceImpl.java
│           │           ├── controller/
│           │           │   ├── AuthController.java
│           │           │   ├── ProductController.java
│           │           │   ├── CategoryController.java
│           │           │   ├── OrderController.java
│           │           │   ├── AdminController.java
│           │           │   ├── CustomerController.java
│           │           │   └── UploadController.java
│           │           ├── exception/
│           │           │   ├── ResourceNotFoundException.java
│           │           │   ├── BadRequestException.java
│           │           │   ├── UnauthorizedException.java
│           │           │   └── GlobalExceptionHandler.java
│           │           ├── specification/
│           │           │   └── ProductSpecification.java
│           │           └── util/
│           │               ├── FileUtil.java
│           │               └── PaginationUtil.java
│           └── resources/
│               ├── application.yml
│               ├── application-dev.yml
│               ├── application-prod.yml
│               └── data.sql
├── frontend/
│   ├── Dockerfile
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Products.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── Cart.jsx
│       │   ├── Checkout.jsx
│       │   ├── OrderSuccess.jsx
│       │   ├── NotFound.jsx
│       │   └── admin/
│       │       ├── Login.jsx
│       │       ├── Dashboard.jsx
│       │       ├── Products.jsx
│       │       ├── AddProduct.jsx
│       │       ├── EditProduct.jsx
│       │       ├── Categories.jsx
│       │       ├── Orders.jsx
│       │       └── OrderDetails.jsx
│       ├── components/
│       │   ├── common/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── SearchBar.jsx
│       │   │   ├── Pagination.jsx
│       │   │   └── Loader.jsx
│       │   ├── product/
│       │   │   ├── ProductCard.jsx
│       │   │   ├── ProductGallery.jsx
│       │   │   ├── ProductFilter.jsx
│       │   │   └── ProductCarousel.jsx
│       │   ├── cart/
│       │   │   ├── CartItem.jsx
│       │   │   └── CartSummary.jsx
│       │   └── admin/
│       │       ├── Sidebar.jsx
│       │       ├── ProductForm.jsx
│       │       ├── CategoryForm.jsx
│       │       └── OrderTable.jsx
│       └── styles/
│           ├── global/
│           │   ├── reset.css
│           │   ├── variables.css
│           │   └── global.css
│           ├── pages/
│           │   ├── Home.css
│           │   ├── Products.css
│           │   ├── ProductDetails.css
│           │   ├── Cart.css
│           │   ├── Checkout.css
│           │   ├── OrderSuccess.css
│           │   ├── NotFound.css
│           │   └── admin/
│           │       ├── Login.css
│           │       ├── Dashboard.css
│           │       ├── Products.css
│           │       ├── AddProduct.css
│           │       ├── EditProduct.css
│           │       ├── Categories.css
│           │       ├── Orders.css
│           │       └── OrderDetails.css
│           └── components/
│               ├── Navbar.css
│               ├── Footer.css
│               ├── SearchBar.css
│               ├── ProductCard.css
│               ├── ProductGallery.css
│               ├── ProductFilter.css
│               ├── ProductCarousel.css
│               ├── CartItem.css
│               ├── CartSummary.css
│               ├── Sidebar.css
│               ├── ProductForm.css
│               ├── CategoryForm.css
│               └── OrderTable.css
└── uploads/
    └── products/
```

## 3. Description de l’architecture

- `backend/`
  - Contient un projet Maven Spring Boot.
  - `Dockerfile` pour construire et exécuter le backend.
  - `pom.xml` pour les dépendances Spring Boot et JPA.
  - `src/main/java/com/ecommerce` contient les packages principaux : configuration, sécurité, entités, repository, DTO, mappeurs, services, contrôleurs, exceptions, spécification et utilitaires.
  - `src/main/resources` contient les fichiers de configuration Spring et un fichier `data.sql` de données initiales.

- `frontend/`
  - Contient une application React.
  - `Dockerfile` pour construire et exécuter le frontend.
  - `src/pages` contient les pages utilisateurs et admin.
  - `src/components` contient les composants UI réutilisables.
  - `src/styles` contient les styles globaux et spécifiques aux pages/composants.

- `uploads/products/`
  - Dossier de stockage pour les images ou fichiers produits utilisés par le backend.

- `docker-compose.yml`
  - Définit trois services : `postgres`, `backend`, `frontend`.
  - Connecte le backend à la base de données PostgreSQL.
  - Permet de démarrer l’ensemble du projet en mode conteneur.

## 4. Remarques

- Cette structure est un squelette : les fichiers Java et React existent en tant que squelettes de composants et classes.
- Le backend n’a pas encore de logique métier complète — ce sont des classes et interfaces de base.
- Le frontend contient des composants React simples avec du contenu minimal.
