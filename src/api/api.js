const API = "http://localhost:5000";

// ─────────────────────────────
// RECIPES
// ─────────────────────────────

export async function getRecipes(favorite = false) {
  const res = await fetch(`${API}/recipes${favorite ? "?favorite=true" : ""}`);
  return res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${API}/recipes/${id}`);
  return res.json();
}

export async function createRecipe(recipe) {
  return fetch(`${API}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
}

export async function updateRecipe(id, recipe) {
  return fetch(`${API}/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
}

export async function deleteRecipe(id) {
  return fetch(`${API}/recipes/${id}`, {
    method: "DELETE"
  });
}

// ─────────────────────────────
// FAVORITES
// ─────────────────────────────

export async function getFavorites() {
  const res = await fetch(`${API}/favorites`);
  return res.json();
}



export async function toggleFavorite(id) {
  const res = await fetch(`${API}/favorites/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  return res.json();
}



export async function deleteFavorite(id) {
  return fetch(`${API}/favorites/${id}`, {
    method: "DELETE"
  });
}

export async function updateFavorite(id, recipe) {
  return fetch(`${API}/favorites/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
}
