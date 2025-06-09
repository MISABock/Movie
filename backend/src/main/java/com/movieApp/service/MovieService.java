package com.movieApp.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movieApp.model.Movie;
import com.movieApp.repository.MovieRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @PostConstruct
    public void initDatabaseFromJson() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = getClass().getResourceAsStream("/movies.json");
            if (is == null) {
                System.err.println("movies.json nicht gefunden!");
                return;
            }

            List<Movie> moviesFromJson = mapper.readValue(is, new TypeReference<>() {});

            int added = 0;
            for (Movie movie : moviesFromJson) {
                if (!movieRepository.existsByImdbID(movie.getImdbID())) {
                    movieRepository.save(movie);
                    added++;
                }
            }
            System.out.println(added + " neue Filme gespeichert.");
        } catch (Exception e) {
            System.err.println("Fehler beim Einlesen von movies.json:");
            e.printStackTrace();
        }
    }
}
