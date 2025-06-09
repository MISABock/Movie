package com.movieApp.repository;

import com.movieApp.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByImdbID(String imdbID);
}
