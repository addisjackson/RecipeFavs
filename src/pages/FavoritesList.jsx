import React from 'react';
import FavoriteCard from '../components/FavoriteCard';

export default function FavoritesList({
  favorites,
  filter,
  sort,
  sortDir,
  dishType,
  cuisine,
  diet
}) {
  const sorted = [...favorites].sort((a, b) => {
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

const filtered = sorted
  .filter(f => (f.title || "").toLowerCase().includes(filter.toLowerCase()))
  .filter(f => (dishType ? f.dishTypes?.includes(dishType) : true))
  .filter(f => (cuisine ? f.cuisines?.includes(cuisine) : true))
  .filter(f => (diet ? f.diets?.includes(diet) : true));


  return (
    <div className="recipes-grid">
      {filtered.map(f => (
        <FavoriteCard key={f.id} recipe={f} />
      ))}
    </div>
  );
}
