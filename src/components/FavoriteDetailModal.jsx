import React from "react";
import UnifiedDetailModal from "./UnifiedDetailModal";
import { toggleFavorite } from "../api/api";

export default function FavoriteDetailModal({ recipe, onClose }) {
  async function handleToggle() {
    await toggleFavorite(recipe.id);
  }

  return (
    <UnifiedDetailModal
      recipe={recipe}
      isFavorite={true}
      onToggleFavorite={handleToggle}
      onClose={onClose}
    />
  );
}
