import { useState } from "react";
import Modal from "../components/Modal";
import { createRecipe } from "../api/api";

const CUISINE_OPTIONS = [
  "American", "Italian", "Mexican", "Chinese", "Indian", "French", "Mediterranean"
];

const DISH_TYPE_OPTIONS = [
  "main course", "side dish", "dessert", "appetizer", "salad", "breakfast", "soup"
];

const DIET_OPTIONS = [
  "gluten free", "ketogenic", "vegetarian", "vegan", "pescatarian", "paleo"
];

export default function AddRecipeModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    image: "",
    readyInMinutes: "",
    servings: "",
    cuisines: [],
    dishTypes: [],
    diets: [],
    ingredients: "",
    instructions: "",
    sourceUrl: "",
    calories: "",
    fat: "",
    protein: "",
    vitamins: "",
    similarRecipes: ""
  });

  function updateField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    const payload = {
      ...form,
      cuisines: form.cuisines ? [form.cuisines] : [],
      dishTypes: form.dishTypes ? [form.dishTypes] : [],
      diets: form.diets ? [form.diets] : [],
      ingredients: form.ingredients.split("\n"),
      instructions: form.instructions.split("\n"),
      similarRecipes: form.similarRecipes.split("\n")
    };

    await createRecipe(payload);
    onSave();
  }

  return (
    <Modal onClose={onClose}>
      <h2>Add New Recipe</h2>

      <div className="modal-form">

        <label>Title</label>
        <input
          value={form.title}
          onChange={e => updateField("title", e.target.value)}
        />

        <label>Summary (HTML allowed)</label>
        <textarea
          value={form.summary}
          onChange={e => updateField("summary", e.target.value)}
        />

        <label>Image URL</label>
        <input
          value={form.image}
          onChange={e => updateField("image", e.target.value)}
        />

        <label>Ready In Minutes</label>
        <input
          type="number"
          value={form.readyInMinutes}
          onChange={e => updateField("readyInMinutes", e.target.value)}
        />

        <label>Servings</label>
        <input
          type="number"
          value={form.servings}
          onChange={e => updateField("servings", e.target.value)}
        />

        {/* CUISINE */}
        <label>Cuisine</label>
        <select
          value={form.cuisines}
          onChange={e => updateField("cuisines", e.target.value)}
        >
          <option value="">Select Cuisine</option>
          {CUISINE_OPTIONS.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* DISH TYPE */}
        <label>Dish Type</label>
        <select
          value={form.dishTypes}
          onChange={e => updateField("dishTypes", e.target.value)}
        >
          <option value="">Select Dish Type</option>
          {DISH_TYPE_OPTIONS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* DIET */}
        <label>Diet</label>
        <select
          value={form.diets}
          onChange={e => updateField("diets", e.target.value)}
        >
          <option value="">Select Diet</option>
          {DIET_OPTIONS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label>Ingredients (one per line)</label>
        <textarea
          value={form.ingredients}
          onChange={e => updateField("ingredients", e.target.value)}
        />

        <label>Instructions (one step per line)</label>
        <textarea
          value={form.instructions}
          onChange={e => updateField("instructions", e.target.value)}
        />

        <label>Source URL</label>
        <input
          value={form.sourceUrl}
          onChange={e => updateField("sourceUrl", e.target.value)}
        />

        <label>Calories</label>
        <input
          type="number"
          value={form.calories}
          onChange={e => updateField("calories", e.target.value)}
        />

        <label>Fat</label>
        <input
          type="number"
          value={form.fat}
          onChange={e => updateField("fat", e.target.value)}
        />

        <label>Protein</label>
        <input
          type="number"
          value={form.protein}
          onChange={e => updateField("protein", e.target.value)}
        />

        <label>Vitamins %</label>
        <input
          type="number"
          value={form.vitamins}
          onChange={e => updateField("vitamins", e.target.value)}
        />

        <label>Similar Recipes (one per line)</label>
        <textarea
          value={form.similarRecipes}
          onChange={e => updateField("similarRecipes", e.target.value)}
        />

        <button className="save-btn" onClick={handleSubmit}>
          Save Recipe
        </button>
      </div>
    </Modal>
  );
}
