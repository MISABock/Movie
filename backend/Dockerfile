# Stage 1: Build mit Gradle + JDK 17
FROM gradle:8.0-jdk17 AS builder
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar -x test

# Stage 2: Runtime mit Eclipse Temurin JDK 17
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
COPY src/main/resources/movies.json movies.json

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
