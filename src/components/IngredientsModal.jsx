import React from "react";

export default function IngredientsModal({ ingredients, onClose }) {
  // Normalize ingredients into safe strings
  const safeIngredients = (ingredients || [])
    .filter(Boolean) // remove null / undefined
    .map(item => {
      if (typeof item === "string") return item.trim();

      if (typeof item === "object") {
        // Spoonacular format
        if (item.original) return item.original;

        // Your normalized format
        if (item.amount && item.unit && item.name) {
          return `${item.amount} ${item.unit} ${item.name}`;
        }

        if (item.name) return item.name;
      }

      return "";
    })
    .filter(Boolean);

  // Fun icons for ingredients
  const icons = ["🥚", "🧈", "🍅", "🥕", "🧄", "🌶️", "🍋", "🥬", "🧀", "🥛"];

  return (
    <div className="ingredients-modal fade-in">
      <h2>Ingredients</h2>

      <ul className="ingredients-list">
        {safeIngredients.map((text, idx) => (
          <li key={idx} className="ingredient-item slide-up">
            <span className="ingredient-icon">
              {icons[idx % icons.length]}
            </span>
            <span className="ingredient-text">{text}</span>
          </li>
        ))}
      </ul>

      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
