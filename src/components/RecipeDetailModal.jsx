import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import IngredientsModal from "../components/IngredientsModal";
import InstructionsModal from "../components/InstructionsModal";
import { getRecipe, getFavorites, toggleFavorite } from "../api/api";

/* Extract similar recipes from summary HTML */
function extractSimilarRecipes(summaryHtml) {
  if (!summaryHtml) return [];

  const startIndex = summaryHtml.indexOf("Similar recipes include");
  if (startIndex === -1) return [];

  const snippet = summaryHtml.slice(startIndex);
  const linkRegex = /<a href="([^"]+)">([^<]+)<\/a>/g;

  const results = [];
  let match;

  while ((match = linkRegex.exec(snippet)) !== null) {
    results.push({
      url: match[1],
      title: match[2]
    });
  }

  return results;
}

export default function RecipeDetailModal({ id, onClose }) {
  const [recipe, setRecipe] = useState(null);
  const [fav, setFav] = useState(false);

  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getRecipe(id);
      const favorites = await getFavorites();

      setRecipe(data);
      setFav(favorites.some(f => f.id === data.id));
    }
    load();
  }, [id]);

  if (!recipe) return null;

  const similarRecipes = extractSimilarRecipes(recipe.summary);

  async function handleFavorite() {
    const result = await toggleFavorite(recipe);
    setFav(result.favorite);
  }

  return (
    <Modal onClose={onClose}>
      <div className="recipe-detail-modal">

        <h1>{recipe.title}</h1>

        <span
          style={{ cursor: "pointer", fontSize: "2rem" }}
          onClick={handleFavorite}
        >
          {fav ? "❤️" : "🤍"}
        </span>

        <img className="detail-image" src={recipe.image} alt={recipe.title} />

        <div
          className="full-summary"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />

        {/* NUTRITION BADGES */}
        <div className="nutrition-badges">
          {recipe.calories && <span>🔥 {recipe.calories} cal</span>}
          {recipe.protein && <span>💪 {recipe.protein}g protein</span>}
          {recipe.fat && <span>🥓 {recipe.fat}g fat</span>}
          {recipe.pricePerServing && <span>💲 ${recipe.pricePerServing}</span>}
        </div>

        {/* SIMILAR RECIPES + LIKES */}
        {similarRecipes.length > 0 && (
          <div className="similar-recipes">
            <h3>Similar Recipes</h3>
            <ul>
              {similarRecipes.map((r, idx) => (
                <li key={idx}>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.title}
                  </a>
                </li>
              ))}

              {/* LIKES AS BULLETS */}
              {recipe.aggregateLikes !== undefined && (
                <li>{recipe.aggregateLikes}</li>
              )}
            </ul>
          </div>
        )}

        <div className="detail-buttons">
          <button onClick={() => setShowIngredients(true)}>Ingredients</button>
          <button onClick={() => setShowInstructions(true)}>Instructions</button>
        </div>

        <p>
          <strong>Source:</strong>{" "}
          <a href={recipe.spoonacularSource} target="_blank" rel="noreferrer">
            {recipe.spoonacularSource}
          </a>
        </p>

        {showIngredients && (
          <IngredientsModal
            ingredients={recipe.ingredients}
            onClose={() => setShowIngredients(false)}
          />
        )}

        {showInstructions && (
          <InstructionsModal
            instructions={recipe.steps}
            onClose={() => setShowInstructions(false)}
          />
        )}
      </div>
    </Modal>
  );
}
