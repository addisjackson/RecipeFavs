import React from "react";
import Modal from "../components/Modal";

export default function IngredientsModal({ ingredients, onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>Ingredients</h2>

      <ul>
        {ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
    </Modal>
  );
}
