import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

import NavbarControls from "./components/NavbarControls";
import RecipesList from "./pages/RecipesList";
import FavoritesList from "./pages/FavoritesList";
import AddRecipeModal from "./components/AddRecipeModal";

import { getRecipes, getFavorites } from "./api/api";

export default function App() {
  const location = useLocation();

  // GLOBAL DATA
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // GLOBAL FILTER/SORT STATE
  const [filter, setFilter] = useState("");

  const [sort, setSort] = useState("none");
  const [sortDir, setSortDir] = useState("asc");

  const [dishType, setDishType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");

  // ADD RECIPE MODAL
  const [showAddModal, setShowAddModal] = useState(false);

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

  // PAGE-SPECIFIC CATEGORY OPTIONS
  const activeData =
    location.pathname === "/favorites" ? favorites : recipes;

  const cuisines = [...new Set(activeData.flatMap(r => r.cuisines || []))];
  const dishTypes = [...new Set(activeData.flatMap(r => r.dishTypes || []))];
  const diets = [...new Set(activeData.flatMap(r => r.diets || []))];

  const hasActiveFilters =
    sort !== "none" ||
    dishType !== "" ||
    cuisine !== "" ||
    diet !== "";

  function clearAllFilters() {
    setSort("none");
    setSortDir("asc");
    setDishType("");
    setCuisine("");
    setDiet("");
  }

  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="header">
        <h1>Welcome Eaters: Enjoy all things here are pasteurized</h1>

        <div className="header-actions">

          {/* Go to Favorites */}
          <Link to="/favorites" className="favorites-link">
            <span className="heart-icon">❤️</span>
            <span className="favorites-label">Go to Favorites</span>
          </Link>

          {/* Add Recipe */}
          <button
            className="add-recipe-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span className="add-icon">➕</span>
            <span>Add Recipe</span>
          </button>

        </div>
      </div>

      {/* ADD RECIPE MODAL */}
      {showAddModal && (
        <AddRecipeModal
          onClose={() => setShowAddModal(false)}
          onSave={async () => {
            setShowAddModal(false);
            const updated = await getRecipes();
            setRecipes(updated);
          }}
        />
      )}

      {/* GLOBAL NAVBAR CONTROLS */}
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
        cuisines={cuisines}
        dishTypes={dishTypes}
        diets={diets}
      />

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <RecipesList
              recipes={recipes}
              favorites={favorites}
              filter={filter}
              sort={sort}
              sortDir={sortDir}
              dishType={dishType}
              cuisine={cuisine}
              diet={diet}
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
            />
          }
        />
      </Routes>
    </div>
  );
}
