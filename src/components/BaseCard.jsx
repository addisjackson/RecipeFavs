import React from "react";

export default function BaseCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onOpenEdit,
  onDelete
}) {
  return (
    <div className="base-card">

      {/* IMAGE */}
      <div className="card-image-wrapper" onClick={onOpenDetail}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-image"
        />
      </div>

      {/* TITLE + HEART */}
      <div className="card-header">
        <h3 className="card-title" onClick={onOpenDetail}>
          {recipe.title}
        </h3>

        <button
          className="favorite-btn"
          onClick={onToggleFavorite}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* META INFO */}
      <div className="card-meta">
        <span>⏱ {recipe.readyInMinutes} min</span>
        <span>🔥 {recipe.nutrition?.calories || 0} cal</span>
        <span>💪 {recipe.nutrition?.protein || 0}g</span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="card-actions">
  <button className="card-btn" onClick={onOpenDetail}>🔍 Details</button>
  <button className="card-btn" onClick={onOpenEdit}>✏️ Edit</button>
  <button className="card-btn" onClick={onDelete}>🗑️ Delete</button>
</div>

    </div>
  );
}
