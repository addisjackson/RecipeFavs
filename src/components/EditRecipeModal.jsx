import React, { useState } from "react";
import Modal from "../components/Modal";
import { updateRecipe } from "../api/api";

export default function EditRecipeModal({ recipe, onClose, onSave }) {
  const [form, setForm] = useState({
    title: recipe.title,
    summary: recipe.summary,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    await updateRecipe(recipe.id, form);
    onSave();
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <h2>Edit Recipe</h2>

      <label>Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <label>Image URL</label>
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
      />

      <label>Summary (HTML allowed)</label>
      <textarea
        name="summary"
        value={form.summary}
        onChange={handleChange}
        rows={6}
      />

      <label>Ready In Minutes</label>
      <input
        name="readyInMinutes"
        type="number"
        value={form.readyInMinutes}
        onChange={handleChange}
      />

      <label>Servings</label>
      <input
        name="servings"
        type="number"
        value={form.servings}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Save</button>
    </Modal>
  );
}
