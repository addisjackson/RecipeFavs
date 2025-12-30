import React from "react";

export default function InstructionsModal({ instructions, onClose }) {
  // Normalize instructions into safe strings
  const safeSteps = (instructions || [])
    .filter(Boolean) // remove null / undefined
    .map(item => {
      if (typeof item === "string") return item.trim();

      if (typeof item === "object") {
        if (item.step) return item.step.trim();
        if (item.description) return item.description.trim();
      }

      return "";
    })
    .filter(Boolean);

  // Fun icons for steps
  const icons = ["🥚", "🍅", "🧈", "🥕", "🧄", "🌶️", "🍋", "🥬", "🍽️"];

  return (
    <div className="instructions-modal fade-in">
      <h2>Instructions</h2>

      <ol className="instructions-list">
        {safeSteps.map((text, idx) => (
          <li key={idx} className="instruction-item slide-up">
            <span className="instruction-icon">
              {icons[idx % icons.length]}
            </span>
            <span className="instruction-text">{text}</span>
          </li>
        ))}
      </ol>

      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
