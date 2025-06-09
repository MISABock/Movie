package com.movieApp.model;

import jakarta.persistence.*;

@Entity
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Integer year;
    private String status;   // z. B. "seen", "wishlist"
    private Integer rating;  // optional 1–5
    private String comment;  // optional

    // Konstruktoren
    public Film() {}

    public Film(String title, Integer year) {
        this.title = title;
        this.year = year;
    }

    // Getter & Setter
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public Integer getYear() { return year; }

    public void setYear(Integer year) { this.year = year; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Integer getRating() { return rating; }

    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }
}
