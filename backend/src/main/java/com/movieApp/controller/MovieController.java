package com.movieApp.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movieApp.model.Movie;
import com.movieApp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }


    @PostMapping("/import")
    public String importMovies() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("movies.json").getInputStream();
            List<Movie> movies = mapper.readValue(inputStream, new TypeReference<List<Movie>>() {});
            movieRepository.saveAll(movies);
            return "Import erfolgreich! Gespeicherte Filme: " + movies.size();
        } catch (Exception e) {
            e.printStackTrace();
            return "Fehler beim Importieren: " + e.getMessage();
        }
    }
}
