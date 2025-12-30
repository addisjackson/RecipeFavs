import React, { useState } from "react";
import Modal from "./Modal";
import { DISH_TYPES, CUISINES, DIETS } from "./RecipeOptions";

export default function EditRecipeModal({ recipe, onClose, onSave }) {
  const [form, setForm] = useState({
    title: recipe.title || "",
    summary: recipe.summary || "",
    image: recipe.image || "",
    readyInMinutes: recipe.readyInMinutes || 0,
    servings: recipe.servings || 1,
    dishType: recipe.dishType?.[0] || "",
    cuisine: recipe.cuisine?.[0] || "",
    diet: recipe.diets?.[0] || "",
    ingredients: recipe.ingredients
      ?.map(i => i.original)
      .join("\n") || "",
    instructions:
      recipe.analyzedInstructions?.[0]?.steps
        ?.map(s => s.step)
        .join("\n") || ""
  });

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  function handleSubmit() {
    const payload = {
      ...recipe,
      ...form,
      ingredients: form.ingredients
        .split("\n")
        .map(i => i.trim())
        .filter(Boolean),
      instructions: form.instructions
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean)
    };

    onSave(payload);
  }

  return (
    <Modal onClose={onClose}>
      <div className="modal-content add-edit-modal">

        <h2 className="modal-title">Edit Recipe</h2>

        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => update("title", e.target.value)}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={form.image}
          onChange={e => update("image", e.target.value)}
        />

        <label>Summary (HTML allowed)</label>
        <textarea
          rows={4}
          value={form.summary}
          onChange={e => update("summary", e.target.value)}
        />

        <label>Ready In Minutes</label>
        <input
          type="number"
          value={form.readyInMinutes}
          onChange={e => update("readyInMinutes", e.target.value)}
        />

        <label>Servings</label>
        <input
          type="number"
          value={form.servings}
          onChange={e => update("servings", e.target.value)}
        />

        <label>Dish Type</label>
        <select
          value={form.dishType}
          onChange={e => update("dishType", e.target.value)}
        >
          <option value="">Select Dish Type</option>
          {DISH_TYPES.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label>Cuisine</label>
        <select
          value={form.cuisine}
          onChange={e => update("cuisine", e.target.value)}
        >
          <option value="">Select Cuisine</option>
          {CUISINES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label>Diet</label>
        <select
          value={form.diet}
          onChange={e => update("diet", e.target.value)}
        >
          <option value="">Select Diet</option>
          {DIETS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label>Ingredients (one per line)</label>
        <textarea
          rows={6}
          value={form.ingredients}
          onChange={e => update("ingredients", e.target.value)}
        />

        <label>Instructions (one step per line)</label>
        <textarea
          rows={6}
          value={form.instructions}
          onChange={e => update("instructions", e.target.value)}
        />

        <div className="modal-actions">
          <button className="modal-save" onClick={handleSubmit}>
            💾 Save
          </button>
          <button className="modal-cancel" onClick={onClose}>
            ❌ Cancel
          </button>
        </div>

      </div>
    </Modal>
  );
}
