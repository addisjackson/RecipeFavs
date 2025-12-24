import React, { useState } from "react";
import { toggleFavorite, deleteRecipe } from "../api/api";
import RecipeDetailModal from "./RecipeDetailModal";
import EditRecipeModal from "./EditRecipeModal";

function RecipeImage({ imageUrl }) {
  if (!imageUrl) {
    return (
      <img className="recipe-image" src="/assets/images/placeholder.jpg" alt="No image" />
    );
  }

  const fileName = imageUrl.split("/").pop();
  const localPath = `/assets/images/${fileName}`;

  return (
    <img
      className="recipe-image"
      src={imageUrl}
      onError={e => {
        e.target.onerror = null;
        e.target.src = localPath;
      }}
      alt="Recipe"
    />
  );
}

export default function RecipeCard({ recipe, favorites, onToggle }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // ⭐ FIXED — compute inside the component using props
  const isFavorite = favorites.some(f => f.id === recipe.id);

  async function handleFavorite() {
    await toggleFavorite(recipe.id);
    onToggle(); // reload favorites + recipes
  }

  async function handleDelete() {
    await deleteRecipe(recipe.id);
    onToggle();
  }

  return (
    <div className="recipe-card">
      <RecipeImage imageUrl={recipe.image} />

      <h2 className="recipe-title">{recipe.title}</h2>

      <p className="recipe-summary">
        {recipe.summary?.replace(/<[^>]+>/g, "").slice(0, 120)}...
      </p>

      <div className="recipe-meta">
        <span>⏱ {recipe.readyInMinutes} min</span>
        <span>💚 Health: {recipe.healthScore}</span>
        <span>👍 Likes: {recipe.aggregateLikes}</span>
      </div>

      <div className="recipe-tags">
        {recipe.cuisines?.length > 0 && (
          <p><strong>Cuisines:</strong> {recipe.cuisines.join(", ")}</p>
        )}
        {recipe.dishTypes?.length > 0 && (
          <p><strong>Dish Types:</strong> {recipe.dishTypes.join(", ")}</p>
        )}
        {recipe.diets?.length > 0 && (
          <p><strong>Diets:</strong> {recipe.diets.join(", ")}</p>
        )}
      </div>

      {/* ❤️ FAVORITE BUTTON */}
      <div>
        <span
          className="heart"
          onClick={handleFavorite}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            color: isFavorite ? "red" : "white",
            textShadow: "0 0 2px black"
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div>
        <button className="edit-btn" onClick={() => setShowEdit(true)}>✏️</button>
        <button className="delete-btn" onClick={handleDelete}>🗑️</button>
        <button className="details-btn" onClick={() => setShowDetail(true)}>🔍</button>
      </div>

      {/* MODALS */}
      {showDetail && (
        <RecipeDetailModal id={recipe.id} onClose={() => setShowDetail(false)} />
      )}

      {showEdit && (
        <EditRecipeModal
          recipe={recipe}
          onClose={() => setShowEdit(false)}
          onSave={onToggle}
        />
      )}
    </div>
  );
}
