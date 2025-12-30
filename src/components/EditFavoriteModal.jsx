import React, { useState } from "react";
import { updateFavorite } from "../api/api";
import { useToast } from "./ToastContext";

export default function EditFavoriteModal({ recipe, onClose, onSave }) {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: recipe.title || "",
    image: recipe.image || "",
    summary: recipe.summary || "",
    ingredients: recipe.ingredients?.join("\n") || "",
    steps: Array.isArray(recipe.steps)
      ? recipe.steps.join("\n")
      : Object.values(recipe.steps || {}).join("\n")
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updated = {
      ...recipe,
      title: form.title.trim(),
      image: form.image.trim(),
      summary: form.summary.trim(),
      ingredients: form.ingredients
        .split("\n")
        .map(i => i.trim())
        .filter(Boolean),
      steps: form.steps
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean)
    };

    try {
      await updateFavorite(updated);
      showToast("Favorite updated!", "success");
      onSave(updated);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      showToast("Error updating favorite", "error");
    }
  }

  return (
    <div className="edit-modal">
      <h2>Edit Favorite</h2>

      <form onSubmit={handleSubmit} className="edit-form">

        {/* TITLE */}
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>

        {/* IMAGE URL */}
        <label>
          Image URL
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </label>

        {/* SUMMARY */}
        <label>
          Summary (HTML allowed)
          <textarea
            name="summary"
            rows={4}
            value={form.summary}
            onChange={handleChange}
          />
        </label>

        {/* INGREDIENTS */}
        <label>
          Ingredients (one per line)
          <textarea
            name="ingredients"
            rows={6}
            value={form.ingredients}
            onChange={handleChange}
          />
        </label>

        {/* STEPS */}
        <label>
          Steps (one per line)
          <textarea
            name="steps"
            rows={6}
            value={form.steps}
            onChange={handleChange}
          />
        </label>

        <div className="edit-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
