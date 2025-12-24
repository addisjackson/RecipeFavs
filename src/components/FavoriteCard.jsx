import React, { useState } from "react";
import FavoriteDetailModal from "../components/FavoriteDetailModal";
import EditFavoriteModal from "../components/EditFavoriteModal";
import { toggleFavorite, deleteRecipe, updateRecipe } from "../api/api";

export default function FavoriteCard({ recipe, onToggle }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isFavorite = favorites.some(f => f.id === recipe.id);
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

 

  if (!recipe) return null;

  async function handleUnfavorite() {
    await toggleFavorite(recipe);
    onToggle();
  }

  async function handleDeleteFavorite() {
    await deleteRecipe(recipe);
    onToggle();
  }

  
  async function handleFavorite() {
    await toggleFavorite(recipe);
    onToggle();
    isFavorite = true
  }

  async function handleUpdateFavorite() {
    await updateRecipe(recipe);
    onToggle();
  }


  const [count, setCount] = useState(0);


  return (
    <div className="recipe-card">

      {/* IMAGE */}
      <img className="recipe-image" src={recipe.image} alt={recipe.title} />

      {/* TITLE */}
      <h2 className="recipe-title">{recipe.title}</h2>

      {/* META */}
      <div className="recipe-meta">
        <span>⏱ {recipe.readyInMinutes} min</span>
        <span>👍 {recipe.aggregateLikes}</span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="card-actions">
        
        <button onClick={() => setCount((count) => count + 1)}>❤️</button>
        <button onClick={() => setShowDetail(true)}>🔍</button>
        <button onClick={() => setShowEdit(true)}>✏️</button>
        <button onClick={handleDeleteFavorite}>🗑️</button>
      </div>

      {/* DETAIL MODAL */}
      {showDetail && (
        <FavoriteDetailModal
          recipe={recipe}
          onClose={() => setShowDetail(false)}
          onUpdate={onToggle}
        />
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <EditFavoriteModal
          recipe={recipe}
          onClose={() => setShowEdit(false)}
          onSave={onToggle}
        />
      )}
    </div>
  );
}
