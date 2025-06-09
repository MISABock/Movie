package com.movieApp.controller;

import com.movieApp.model.User;
import com.movieApp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User login) {
        return userRepository.findByUsername(login.getUsername())
            .filter(u -> u.getPassword().equals(login.getPassword()))
            .map(u -> ResponseEntity.ok(u.getUsername()))  // ⬅️ Username wird zurückgegeben
            .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }
}
