package com.movieApp.repository;

import com.movieApp.model.WatchListEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WatchListRepository extends JpaRepository<WatchListEntry, Long> {

    // Alle Filme eines Nutzers
    List<WatchListEntry> findByUsername(String username);

    // Prüfen ob Film bereits in Liste
    boolean existsByUsernameAndImdbID(String username, String imdbID);

    // Eintrag aus Watchlist löschen
    void deleteByUsernameAndImdbID(String username, String imdbID);  // <- HIER
}
