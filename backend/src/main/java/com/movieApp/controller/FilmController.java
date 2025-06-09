package com.movieApp.controller;

import com.movieApp.model.Film;
import com.movieApp.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/films")
@CrossOrigin(origins = "http://localhost:5173") // oder 3000 bei Create React App
public class FilmController {

    @Autowired
    private FilmRepository filmRepository;

    @GetMapping
    public List<Film> getAll() {
        return filmRepository.findAll();
    }

    @PostMapping
    public Film create(@RequestBody Film film) {
        return filmRepository.save(film);
    }
}
