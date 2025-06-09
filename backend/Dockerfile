# Stage 1: Build
FROM gradle:8.0-jdk17 AS builder
WORKDIR /app

COPY . .

RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar -x test

# Stage 2: Runtime
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
COPY src/main/resources/movies.json movies.json

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
