import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import NavbarControls from "./components/NavbarControls";
import RecipesList from "./pages/RecipesList";
import FavoritesList from "./pages/FavoritesList";

import AddRecipeModal from "./components/AddRecipeModal";
import EditRecipeModal from "./components/EditRecipeModal";

import {
  getRecipes,
  getFavorites,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from "./api/api";

import { CUISINES, DIETS, DISH_TYPES } from "./components/RecipeOptions";
import { useToast } from "./components/ToastContext";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // GLOBAL DATA
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // FILTERS + SORT
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("none");
  const [sortDir, setSortDir] = useState("asc");

  const [dishType, setDishType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");

  // MODALS
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // LOAD DATA
  useEffect(() => {
    async function load() {
      const r = await getRecipes();
      const f = await getFavorites();
      setRecipes(r);
      setFavorites(f);
    }
    load();
  }, []);

  // EDIT HANDLER
  function handleEdit(recipe) {
    setEditingRecipe(recipe);
    setShowEditModal(true);
  }

  // DELETE HANDLER
  async function handleDelete(id) {
    if (!window.confirm("Delete this recipe?")) return;

    const prevRecipes = recipes;
    const prevFavorites = favorites;

    setRecipes(prev => prev.filter(r => r.id !== id));
    setFavorites(prev => prev.filter(f => f.id !== id));

    try {
      await deleteRecipe(id);
      showToast("Recipe deleted", "success");
    } catch (err) {
      setRecipes(prevRecipes);
      setFavorites(prevFavorites);
      showToast("Error deleting recipe", "error");
    }
  }

  // ACTIVE DATA FOR FILTER OPTIONS
  const activeData =
    location.pathname === "/favorites" ? favorites : recipes;

  const cuisines = [...new Set(activeData.flatMap(r => r.cuisines || []))];
  const dishTypes = [...new Set(activeData.flatMap(r => r.dishTypes || []))];
  const diets = [...new Set(activeData.flatMap(r => r.diets || []))];

  const hasActiveFilters =
    sort !== "none" ||
    dishType !== "" ||
    cuisine !== "" ||
    diet !== "" ||
    filter.trim() !== "";

  function clearAllFilters() {
    setSort("none");
    setSortDir("asc");
    setDishType("");
    setCuisine("");
    setDiet("");
    setFilter("");
  }

  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="page-title">
        <h1>Welcome Eaters: Enjoy all things here are pasteurized</h1>

        <nav className="header-actions">

          <span className="nav-link" onClick={() => navigate("/recipes")}>
            <span className="home-icon">🏠</span> Home
          </span>

          <span className="nav-link" onClick={() => navigate("/favorites")}>
            <span className="heart-icon">❤️</span> Favorites
          </span>

          <span
            className="nav-link add-recipe-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span className="plus-icon">+</span> Add A Recipe
          </span>

        </nav>
      </div>

      {/* ADD RECIPE MODAL */}
      {showAddModal && (
        <AddRecipeModal
          onClose={() => setShowAddModal(false)}
          onSave={async (newRecipe) => {
            const tempId = Date.now();
            const optimistic = { ...newRecipe, id: tempId };

            setRecipes(prev => [...prev, optimistic]);
            setShowAddModal(false);

            try {
              const saved = await createRecipe(newRecipe);
              setRecipes(prev =>
                prev.map(r => (r.id === tempId ? saved : r))
              );
              showToast("Recipe added!", "success");
            } catch (err) {
              setRecipes(prev => prev.filter(r => r.id !== tempId));
              showToast("Error adding recipe", "error");
            }
          }}
        />
      )}

      {/* EDIT RECIPE MODAL */}
      {showEditModal && editingRecipe && (
        <EditRecipeModal
          recipe={editingRecipe}
          onClose={() => {
            setShowEditModal(false);
            setEditingRecipe(null);
          }}
          onSave={async (updatedRecipe) => {
            setRecipes(prev =>
              prev.map(r => (r.id === updatedRecipe.id ? updatedRecipe : r))
            );

            const saved = await updateRecipe(updatedRecipe);

            setRecipes(prev =>
              prev.map(r => (r.id === saved.id ? saved : r))
            );

            showToast("Recipe updated!", "success");

            setShowEditModal(false);
            setEditingRecipe(null);
          }}
        />
      )}

      {/* NAVBAR CONTROLS */}
      <NavbarControls
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        sortDir={sortDir}
        setSortDir={setSortDir}
        dishType={dishType}
        setDishType={setDishType}
        cuisine={cuisine}
        setCuisine={setCuisine}
        diet={diet}
        setDiet={setDiet}
        hasActiveFilters={hasActiveFilters}
        clearAllFilters={clearAllFilters}
        cuisines={CUISINES}
        dishTypes={DISH_TYPES}
        diets={DIETS}
      />

      {/* ROUTES */}
      <Routes>
        <Route
          path="/recipes"
          element={
            <RecipesList
              recipes={recipes}
              favorites={favorites}
              setFavorites={setFavorites}
              filter={filter}
              sort={sort}
              sortDir={sortDir}
              dishType={dishType}
              cuisine={cuisine}
              diet={diet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <FavoritesList
              favorites={favorites}
              filter={filter}
              sort={sort}
              sortDir={sortDir}
              dishType={dishType}
              cuisine={cuisine}
              diet={diet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />

        <Route
          path="/"
          element={
            <RecipesList
              recipes={recipes}
              favorites={favorites}
              setFavorites={setFavorites}
              filter={filter}
              sort={sort}
              sortDir={sortDir}
              dishType={dishType}
              cuisine={cuisine}
              diet={diet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        />
      </Routes>

      {/* FOOTER */}
      <div className="footer">
        <p>&copy; 2024 Recipe Favorites. All rights reserved.</p>
      </div>
    </div>
  );
}
