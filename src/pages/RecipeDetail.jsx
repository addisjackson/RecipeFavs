import React, { useEffect, useState } from "react";
import { getRecipe, getFavorites, toggleFavorite } from "../api/api";
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getRecipe(title);
      const favorites = await getFavorites();
      setRecipe(data);
      setFav(favorites.some(f => f.title === data.title));
    }
    load();
  }, [title]);

  if (!recipe) return <p>Loading...</p>;

  async function handleFavorite() {
    const result = await toggleFavorite(recipe);
    setFav(result.favorite);
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>

      <span
        style={{ cursor: "pointer", fontSize: "2rem" }}
        onClick={handleFavorite}
      >
        {fav ? "❤️" : "🤍"}
      </span>

      <img className="detail-image"  src={recipe.image_url} alt={recipe.title} />

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {Object.values(recipe.instructions).map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
