FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY . /app
RUN chmod +x mvnw && ./mvnw -B package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/ecommerce-0.0.1-SNAPSHOT.jar"]
