import React from 'react';
import RecipeCard from '../components/RecipeCard';

export default function RecipesList({
  recipes,
  favorites,
  filter,
  sort,
  sortDir,
  dishType,
  cuisine,
  diet
}) {
  const sorted = [...recipes].sort((a, b) => {
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
  .filter(r => (r.title || "").toLowerCase().includes(filter.toLowerCase()))
  .filter(r => (dishType ? r.dishTypes?.includes(dishType) : true))
  .filter(r => (cuisine ? r.cuisines?.includes(cuisine) : true))
  .filter(r => (diet ? r.diets?.includes(diet) : true));


  return (
    <div className="recipes-grid">
      {filtered.map(r => (
        <RecipeCard
          key={r.id}
          recipe={r}
          isFavorite={favorites.some(f => f.id === r.id)}
        />
      ))}
    </div>
  );
}
