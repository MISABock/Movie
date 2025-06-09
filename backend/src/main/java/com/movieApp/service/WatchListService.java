package com.movieApp.service;

import com.movieApp.model.WatchListEntry;
import com.movieApp.repository.WatchListRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchListService {

    private final WatchListRepository repository;

    public WatchListService(WatchListRepository repository) {
        this.repository = repository;
    }

    public List<WatchListEntry> getListForUser(String username) {
        return repository.findByUsername(username);
    }

    @Transactional
    public void removeFromWatchlist(String username, String imdbID) {
    repository.deleteByUsernameAndImdbID(username, imdbID);
}

    public boolean addToWatchlist(WatchListEntry entry) {
        boolean exists = repository.existsByUsernameAndImdbID(entry.getUsername(), entry.getImdbID());
        if (!exists) {
            repository.save(entry);
            return true;
        }
        return false;
    }

    public void removeFromWatchlist(Long id) {
        repository.deleteById(id);
    }
}
