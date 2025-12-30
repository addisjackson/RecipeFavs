import React, { useState } from "react";
import Modal from "../components/Modal";
import IngredientsModal from "../components/IngredientsModal";
import InstructionsModal from "../components/InstructionsModal";
import EditFavoriteModal from "../components/EditFavoriteModal";
import RecipeImage from "../components/RecipeImage";
import { toggleFavorite } from "../api/api";

/* Extract similar recipes */
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

export default function FavoriteDetail({ recipe, onClose, onUpdate, onDeleteFavoriteEverywhere }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  if (!recipe) {
    return (
      <Modal onClose={onClose}>
        <p>Recipe data missing.</p>
      </Modal>
    );
  }

  const similarRecipes = extractSimilarRecipes(recipe.summary);

  async function handleUnfavorite() {
    await toggleFavorite(recipe);
    onUpdate();
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="recipe-detail-modal">

        <h1>{recipe.title}</h1>

        <div className="detail-actions">
          <button onClick={() => setShowEdit(true)}>✏️ Edit</button>
          <button onClick={onDeleteFavoriteEverywhere}>🗑️ Remove</button>
        </div>

        {/* ⭐ IMAGE WITH PROXY + FALLBACK */}
        <RecipeImage imageUrl={recipe.image} />

        <div
          className="full-summary"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />

        {/* Nutrition badges */}
        <div className="nutrition-badges">
          {recipe.calories && <span>🔥 {recipe.calories} cal</span>}
          {recipe.protein && <span>💪 {recipe.protein}g protein</span>}
          {recipe.fat && <span>🥓 {recipe.fat}g fat</span>}
          {recipe.pricePerServing && <span>💲 ${recipe.pricePerServing}</span>}
        </div>

        {/* Similar recipes */}
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

        {showEdit && (
          <EditFavoriteModal
            recipe={recipe}
            onClose={() => setShowEdit(false)}
            onSave={onUpdate}
          />
        )}
      </div>
    </Modal>
  );
}
