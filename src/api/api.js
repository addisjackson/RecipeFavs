const API_BASE = "https://recipe-backend-rux1.onrender.com";

// ─────────────────────────────
// RECIPES
// ─────────────────────────────

export async function getRecipes(favorite = false) {
  const res = await fetch(`${API_BASE}/recipes${favorite ? "?favorite=true" : ""}`);
  return res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${API_BASE}/recipes/${id}`);
  return res.json();
}

export async function createRecipe(recipe) {
  const res = await fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
  return res.json();
}

// FIXED: updateRecipe takes ONE argument (the recipe object)
export async function updateRecipe(recipe) {
  const res = await fetch(`${API_BASE}/recipes/${recipe.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
  return res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_BASE}/recipes/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

// ─────────────────────────────
// FAVORITES
// ─────────────────────────────

export async function getFavorites() {
  const res = await fetch(`${API_BASE}/favorites`);
  return res.json();
}

export async function toggleFavorite(id) {
  const res = await fetch(`${API_BASE}/favorites/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  return res.json();
}

export async function deleteFavorite(id) {
  const res = await fetch(`${API_BASE}/favorites/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function updateFavorite(recipe) {
  const res = await fetch(`${API_BASE}/favorites/${recipe.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
  return res.json();
}

export async function deleteFavoriteEverywhere(id) {
  const res = await fetch(`${API_BASE}/favorites/delete/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete favorite everywhere");
  return res.json();
}
