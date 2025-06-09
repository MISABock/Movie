package com.movieApp.controller;

import com.movieApp.model.WatchListEntry;
import com.movieApp.service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin(origins = "*")
public class WatchlistController {

    @Autowired
    private WatchListService service;

    // Alle Filme des Nutzers holen
    @GetMapping("/{username}")
    public List<WatchListEntry> getWatchlist(@PathVariable String username) {
        System.out.println("📥 Hole Watchlist für Benutzer: " + username);
        return service.getListForUser(username);
    }

    // Film zur Watchlist hinzufügen
    @PostMapping
    public WatchListEntry addToWatchlist(@RequestBody WatchListEntry entry) {
        System.out.println("📥 Neuer Film für Watchlist:");
        System.out.println("   ➤ Benutzername: " + entry.getUsername());
        System.out.println("   ➤ Titel: " + entry.getTitle());
        System.out.println("   ➤ IMDb-ID: " + entry.getImdbID());

        if (entry.getUsername() == null || entry.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username darf nicht leer sein!");
        }

        service.addToWatchlist(entry);
        return entry;
    }

    // Film aus der Watchlist entfernen
    @DeleteMapping("/{username}/{imdbID}")
    public void removeFromWatchlist(@PathVariable String username, @PathVariable String imdbID) {
        System.out.println("🗑 Entferne aus Watchlist: " + imdbID + " für " + username);
        service.removeFromWatchlist(username, imdbID);
    }
}
