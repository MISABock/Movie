# Stage 1: Build mit Gradle
FROM gradle:8.0-jdk17 AS builder
WORKDIR /app
COPY . .
RUN ./gradlew clean bootJar -x test

# Stage 2: Laufzeit-Image
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
COPY src/main/resources/movies.json movies.json

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
