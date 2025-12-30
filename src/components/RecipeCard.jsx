import React, { useState } from "react";
import BaseCard from "./BaseCard";
import UnifiedDetailModal from "./UnifiedDetailModal";
import EditRecipeModal from "./EditRecipeModal";
import { toggleFavorite, deleteRecipe } from "../api/api";
import { useToast } from "./ToastContext";

export default function RecipeCard({ recipe, favorites, setFavorites }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { showToast } = useToast();

  const isInitiallyFav = favorites.some(f => f.id === recipe.id);
  const [isFav, setIsFav] = useState(isInitiallyFav);

  async function handleToggleFavorite() {
    const prev = isFav;
    setIsFav(!prev);

    if (!prev) {
      setFavorites(p => [...p, recipe]);
      showToast("Added to favorites", "success");
    } else {
      setFavorites(p => p.filter(f => f.id !== recipe.id));
      showToast("Removed from favorites", "error");
    }

    try {
      await toggleFavorite(recipe.id);
    } catch {
      setIsFav(prev);
      showToast("Error updating favorites", "error");
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this recipe?")) return;

    try {
      await deleteRecipe(recipe.id);
      setFavorites(prev => prev.filter(f => f.id !== recipe.id));
      showToast("Recipe deleted", "success");
      setShowDetail(false);
    } catch {
      showToast("Error deleting recipe", "error");
    }
  }

  return (
    <>
      <div className="recipe-card-wrapper">
        <BaseCard
          recipe={recipe}
          isFavorite={isFav}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetail={() => setShowDetail(true)}
          onOpenEdit={() => setShowEdit(true)}
          onDelete={handleDelete}
        />
      </div>

      {showDetail && (
        <UnifiedDetailModal
          recipe={recipe}
          isFavorite={isFav}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setShowDetail(false)}
          onOpenEdit={() => setShowEdit(true)}
          onDelete={handleDelete}
        />
      )}

      {showEdit && (
        <EditRecipeModal
          recipe={recipe}
          onClose={() => setShowEdit(false)}
          onSave={() => setShowEdit(false)}
        />
      )}
    </>
  );
}
