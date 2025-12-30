import React from "react";
import { DISH_TYPES, CUISINES, DIETS } from "./RecipeOptions";

export default function NavbarControls({
  filter,
  setFilter,

  sort,
  setSort,
  sortDir,
  setSortDir,

  dishType,
  setDishType,

  cuisine,
  setCuisine,

  diet,
  setDiet,

  hasActiveFilters,
  clearAllFilters
}) {
  return (
    <div className="navbar-controls">

      {/* ⭐ ROW 1 — SEARCH + SORT */}
      <div className="nav-row row-top">

        {/* SEARCH */}
        <input
          className="nav-search"
          placeholder="🔍 Search recipes..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        {/* SORT LABEL */}
        <div className="sort-label">
          <span className="sort-icon">🧭</span>
          <span>Sort by</span>
        </div>

        {/* SORT DROPDOWN */}
        <select
          className="nav-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="none">None</option>
          <option value="title">Title</option>
          <option value="time">Prep Time</option>
          <option value="health">Health Score</option>
          <option value="likes">Likes</option>
          <option value="calories">Calories</option>
          <option value="fat">Fat</option>
          <option value="protein">Protein</option>
          <option value="vitamins">Vitamins %</option>
        </select>

        {/* ASC / DESC */}
        {sort !== "none" && (
          <div className="sort-direction">
            <label>
              <input
                type="radio"
                name="sortDir"
                value="asc"
                checked={sortDir === "asc"}
                onChange={() => setSortDir("asc")}
              />
              ⬆️
            </label>

            <label>
              <input
                type="radio"
                name="sortDir"
                value="desc"
                checked={sortDir === "desc"}
                onChange={() => setSortDir("desc")}
              />
              ⬇️
            </label>
          </div>
        )}

      </div>

      {/* ⭐ ROW 2 — FILTERS */}
      <div className="nav-row row-filters">

        {/* DISH TYPE */}
        <select
          className="nav-select"
          value={dishType}
          onChange={e => setDishType(e.target.value)}
        >
          <option value="">Dish Type</option>
          {DISH_TYPES.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* CUISINE */}
        <select
          className="nav-select"
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
        >
          <option value="">Cuisine</option>
          {CUISINES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* DIET */}
        <select
          className="nav-select"
          value={diet}
          onChange={e => setDiet(e.target.value)}
        >
          <option value="">Diet</option>
          {DIETS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

      </div>

      {/* ⭐ ROW 3 — FILTERS ACTIVE + CLEAR */}
      <div className="nav-row row-bottom">
        {hasActiveFilters && (
          <div className="filters-active-badge">
            🔥 Filters Active
          </div>
        )}

        {hasActiveFilters && (
          <button className="clear-sort" onClick={clearAllFilters}>
            ❌ Clear
          </button>
        )}
      </div>

    </div>
  );
}
