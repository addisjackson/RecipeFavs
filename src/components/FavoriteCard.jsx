import React, { useState } from "react";
import BaseCard from "./BaseCard";
import UnifiedDetailModal from "./UnifiedDetailModal";
import RecipeImage from "./RecipeImage";
import { toggleFavorite, deleteFavorite } from "../api/api";
import { useToast } from "./ToastContext";

export default function FavoriteCard({
  recipe,
  favorites,
  setFavorites,
  onRemove
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [isFav, setIsFav] = useState(true);
  const [removing, setRemoving] = useState(false);

  const { showToast } = useToast();

  /* --------------------------------------------------
     FAVORITE TOGGLE (Optimistic + Fade-Out)
  -------------------------------------------------- */
  async function handleToggleFavorite() {
    const currentlyFav = isFav;

    // ⭐ 1. Instant UI update
    setIsFav(!currentlyFav);

    if (currentlyFav) {
      // Removing from favorites
      showToast("Removed from favorites", "error");

      // Fade-out animation
      setRemoving(true);
      setTimeout(() => onRemove(recipe.id), 250);

      // Optimistic global update
      setFavorites(prev => prev.filter(f => f.id !== recipe.id));
    } else {
      // Re-adding (rare case)
      showToast("Added to favorites", "success");
      setFavorites(prev => [...prev, recipe]);
    }

    // ⭐ 2. Backend update
    try {
      await toggleFavorite(recipe.id);
    } catch (err) {
      // Rollback on failure
      setIsFav(currentlyFav);

      if (currentlyFav) {
        setFavorites(prev => [...prev, recipe]);
      } else {
        setFavorites(prev => prev.filter(f => f.id !== recipe.id));
      }

      showToast("Error updating favorites", "error");
    }
  }

  /* --------------------------------------------------
     DELETE BUTTON (Remove Everywhere)
  -------------------------------------------------- */
  async function handleDelete() {
    setRemoving(true);

    setTimeout(() => {
      onRemove(recipe.id);
    }, 250);

    await deleteFavorite(recipe.id);
  }

  return (
    <>
      <div className={`fade-card ${removing ? "removing" : ""}`}>
        <BaseCard
          recipe={recipe}
          isFavorite={isFav}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
          onOpenDetail={() => setShowDetail(true)}
        />
      </div>

      {showDetail && (
        <UnifiedDetailModal
          recipe={recipe}
          isFavorite={isFav}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
