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
  return fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
}

export async function updateRecipe(id, recipe) {
  return fetch(`${API_BASE}/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
}

export async function deleteRecipe(id) {
  return fetch(`${API_BASE}/recipes/${id}`, {
    method: "DELETE"
  });
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
  return fetch(`${API_BASE}/favorites/${id}`, {
    method: "DELETE"
  });
}

export async function updateFavorite(id, recipe) {
  return fetch(`${API_BASE}/favorites/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
}

export async function deleteFavoriteEverywhere(id) {
  const res = await fetch(`${API_BASE}/favorites/delete/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete favorite everywhere");
  return res.json();
}
