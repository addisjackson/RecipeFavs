import React, { useState, useEffect } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { getFavorites } from "../api/api";

export default function FavoritesList({
  filter,
  sort,
  sortDir,
  dishType,
  cuisine,
  diet
}) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites once on mount
  useEffect(() => {
    async function load() {
      const data = await getFavorites();
      setFavorites(data);
    }
    load();
  }, []);

  // Remove a favorite from UI instantly
  function removeFavorite(id) {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }

  // ⭐ Prevent duplicate keys
  const uniqueFavorites = Array.from(
    new Map(favorites.map(f => [f.id, f])).values()
  );

  // Sorting
  const sorted = [...uniqueFavorites].sort((a, b) => {
    if (sort === "none") return 0;

    let result = 0;
    if (sort === "title") result = a.title.localeCompare(b.title);
    if (sort === "time") result = a.readyInMinutes - b.readyInMinutes;
    if (sort === "health") result = b.healthScore - a.healthScore;
    if (sort === "likes") result = a.aggregateLikes - b.aggregateLikes;
    if (sort === "calories") result = a.calories - b.calories;
    if (sort === "fat") result = a.fat - b.fat;
    if (sort === "protein") result = a.protein - b.protein;
    if (sort === "vitamins") result = a.vitamins - b.vitamins;

    return sortDir === "asc" ? result : -result;
  });

  // Filtering
  const filtered = sorted
    .filter(f => (f.title || "").toLowerCase().includes(filter.toLowerCase()))
    .filter(f => (dishType ? f.dishTypes?.includes(dishType) : true))
    .filter(f => (cuisine ? f.cuisines?.includes(cuisine) : true))
    .filter(f => (diet ? f.diets?.includes(diet) : true));

  return (
    <div className="recipes-grid">
      {filtered.map(f => (
        <FavoriteCard
          key={f.id}
          recipe={f}
          favorites={favorites}
          setFavorites={setFavorites}
          onRemove={removeFavorite}
        />
      ))}
    </div>
  );
}
