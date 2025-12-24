import React from "react";
import Modal from "../components/Modal";

export default function InstructionsModal({ instructions, onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>Instructions</h2>

      <div className="instructions-list">
        {instructions.map((s, idx) => (
          <div
            key={s.number}
            className="instruction-step"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <strong>Step {s.number}:</strong> {s.step}
          </div>
        ))}
      </div>
    </Modal>
  );
}
