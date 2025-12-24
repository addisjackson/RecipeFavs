import React from "react";


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
  clearAllFilters,

  cuisines,
  dishTypes,
  diets
}) {
  return (
    <div className="navbar-controls">

      {/* SEARCH */}
      <input
        className="nav-search"
        placeholder="Search..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      {/* SORT DROPDOWN */}
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="none">Not Sorting</option>
        <option value="title">Title</option>
        <option value="time">Preparation Time</option>
        <option value="health">Health Score</option>
        <option value="likes">Likes</option>
        <option value="calories">Calories</option>
        <option value="fat">Fat</option>
        <option value="protein">Protein</option>
        <option value="vitamins">Daily Vitamins %</option>
      </select>

      {/* ASC / DESC only when sorting */}
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
            ASC
          </label>

          <label>
            <input
              type="radio"
              name="sortDir"
              value="desc"
              checked={sortDir === "desc"}
              onChange={() => setSortDir("desc")}
            />
            DESC
          </label>
        </div>
      )}

      {/* DISH TYPE DROPDOWN */}
      <select value={dishType} onChange={e => setDishType(e.target.value)}>
        <option value="">Dish Type</option>
        {dishTypes.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* CUISINE DROPDOWN */}
      <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
        <option value="">Cuisine</option>
        {cuisines.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* DIET DROPDOWN */}
      <select value={diet} onChange={e => setDiet(e.target.value)}>
        <option value="">Diet</option>
        {diets.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* CLEAR BUTTON — only when ANY filter is active */}
      {hasActiveFilters && (
        <button className="clear-sort" onClick={clearAllFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}
