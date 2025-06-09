import requests
import json
import time

API_KEY = "77c4fd45"
MAX_REQUESTS = 1000
REQUEST_DELAY = 0.25  # Sekunden
search_terms = ["love", "war", "night", "day", "man", "woman", "life", "death", "dark", "light", "girl", "boy"]

all_movies = {}
requests_made = 0

print("🔍 Starte präzisere OMDb-Abfragen...")

for term in search_terms:
    for page in range(1, 11):  # max 10 Seiten pro Begriff (100 Filme)
        if requests_made >= MAX_REQUESTS:
            print("⛔ Tageslimit erreicht.")
            break

        url = f"https://www.omdbapi.com/?apikey={API_KEY}&s={term}&page={page}"
        print(f"[{requests_made+1}/{MAX_REQUESTS}] {url}")

        try:
            response = requests.get(url)
            data = response.json()
            requests_made += 1

            if data.get("Response") == "False":
                print(f"❌ Fehler: {data.get('Error')}")
                break

            for movie in data.get("Search", []):
                imdb_id = movie.get("imdbID")
                if imdb_id:
                    all_movies[imdb_id] = movie

        except Exception as e:
            print(f"🚨 Fehler: {e}")

        time.sleep(REQUEST_DELAY)

    if requests_made >= MAX_REQUESTS:
        break

# 🔽 Speichern
with open("movies.json", "w", encoding="utf-8") as f:
    json.dump(list(all_movies.values()), f, indent=2, ensure_ascii=False)

print(f"\n✅ Fertig! Gespeichert: {len(all_movies)} Filme in 'movies.json'")
