import React from "react";
import UnifiedDetailModal from "./UnifiedDetailModal";
import { toggleFavorite } from "../api/api";

export default function RecipeDetailModal({ recipe, onClose, isFavorite }) {
  async function handleToggle() {
    await toggleFavorite(recipe.id);
  }

  return (
    <UnifiedDetailModal
      recipe={recipe}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggle}
      onClose={onClose}
    />
  );
}
