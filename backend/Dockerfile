FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY build/libs/*.jar app.jar
COPY src/main/resources/movies.json movies.json

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
