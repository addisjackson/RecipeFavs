import React, { useState } from "react";
import Modal from "./Modal";
import IngredientsModal from "./IngredientsModal";
import InstructionsModal from "./InstructionsModal";
import EditFavoriteModal from "./EditFavoriteModal";
import RecipeImage from "./RecipeImage";

/* --------------------------------------------------
   FALLBACK EXTRACTORS
-------------------------------------------------- */

function extractSimilarRecipes(summaryHtml) {
  if (!summaryHtml) return [];
  const linkRegex = /<a\s+href="([^"]+)">([^<]+)<\/a>/gi;
  const results = [];
  let match;
  while ((match = linkRegex.exec(summaryHtml)) !== null) {
    results.push({ title: match[2], url: match[1] });
  }
  return results;
}

function extractNutrition(summaryHtml) {
  if (!summaryHtml) return {};
  const text = summaryHtml.replace(/<[^>]+>/g, " ");

  return {
    calories: text.match(/(\d+)\s*calories/i)?.[1] || "",
    protein: text.match(/(\d+)\s*g\s*protein/i)?.[1] || "",
    fat: text.match(/(\d+)\s*g\s*fat/i)?.[1] || "",
    pricePerServing: text.match(/\$([\d.]+)\s*per\s*serving/i)?.[1] || "",
    percentProtein: text.match(/(\d+)%\s*protein/i)?.[1] || "",
    percentFat: text.match(/(\d+)%\s*fat/i)?.[1] || "",
    percentCarbs: text.match(/(\d+)%\s*carb/i)?.[1] || "",
    vitaminPercent: text.match(/covers\s*(\d+)%\s*of\s*your\s*daily/i)?.[1] || ""
  };
}

function extractIngredients(summaryHtml) {
  if (!summaryHtml) return [];
  const text = summaryHtml.replace(/<[^>]+>/g, " ");
  const match = text.match(/ingredients? you will need[:\s]+([^\.]+)/i);
  if (!match) return [];
  return match[1].split(/,|\band\b/).map(i => i.trim()).filter(Boolean);
}

function extractInstructions(summaryHtml) {
  if (!summaryHtml) return [];
  const text = summaryHtml.replace(/<[^>]+>/g, " ");
  const match = text.match(/steps?[:\s]+(.+)/i);
  if (!match) return [];
  return match[1].split(/\.\s+/).map(s => s.trim()).filter(Boolean);
}

/* --------------------------------------------------
   UNIFIED DETAIL MODAL (VIEW + EDIT MODES)
-------------------------------------------------- */

export default function UnifiedDetailModal({
  recipe,
  isFavorite,
  onToggleFavorite,
  onClose
}) {
  const [mode, setMode] = useState("view"); // "view" | "edit"
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  /* ---------------------------------------------
     FALLBACK NUTRITION
  ---------------------------------------------- */
  const fallback = extractNutrition(recipe.summary);

  const nutrition = {
    calories: recipe.calories ?? fallback.calories,
    protein: recipe.protein ?? fallback.protein,
    fat: recipe.fat ?? fallback.fat,
    pricePerServing: recipe.pricePerServing ?? fallback.pricePerServing,
    percentProtein: recipe.percentProtein ?? fallback.percentProtein,
    percentFat: recipe.percentFat ?? fallback.percentFat,
    percentCarbs: recipe.percentCarbs ?? fallback.percentCarbs,
    vitaminPercent: recipe.vitaminPercent ?? fallback.vitaminPercent
  };

  /* ---------------------------------------------
     FALLBACK INGREDIENTS + INSTRUCTIONS
  ---------------------------------------------- */
  const ingredients =
    recipe.ingredients?.length > 0
      ? recipe.ingredients
      : extractIngredients(recipe.summary);

  const instructions =
    recipe.steps?.length > 0
      ? recipe.steps
      : extractInstructions(recipe.summary);

  const similarRecipes = extractSimilarRecipes(recipe.summary);

  /* --------------------------------------------------
     RENDER: EDIT MODE
  -------------------------------------------------- */
  if (mode === "edit") {
    return (
      <Modal onClose={() => setMode("view")}>
        <EditFavoriteModal
          recipe={recipe}
          onClose={() => setMode("view")}
          onSave={() => setMode("view")}
        />
      </Modal>
    );
  }

  /* --------------------------------------------------
     RENDER: VIEW MODE
  -------------------------------------------------- */
  return (
    <>
      <Modal onClose={onClose}>
        <div className="recipe-detail-modal">

          {/* HEADER */}
          <div className="detail-header">
            <h1>{recipe.title}</h1>

            <div className="detail-actions">
              <span className="favorite-heart" onClick={onToggleFavorite}>
                {isFavorite ? "❤️" : "🤍"}
              </span>

              {isFavorite && (
                <button className="edit-btn" onClick={() => setMode("edit")}>
                  ✏️ Edit
                </button>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <RecipeImage image={recipe.image} title={recipe.title} />

          {/* SUMMARY */}
          <div
            className="full-summary"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />

          {/* NUTRITION */}
          <div className="nutrition-section">
            <h3>Nutrition</h3>
            <ul>
              <li><strong>Calories:</strong> {nutrition.calories}</li>
              <li><strong>Protein:</strong> {nutrition.protein} g ({nutrition.percentProtein}%)</li>
              <li><strong>Fat:</strong> {nutrition.fat} g ({nutrition.percentFat}%)</li>
              <li><strong>Carbs %:</strong> {nutrition.percentCarbs}%</li>
              <li><strong>Vitamins:</strong> {nutrition.vitaminPercent}%</li>
              <li><strong>Price per Serving:</strong> ${nutrition.pricePerServing}</li>
            </ul>
          </div>

          {/* SIMILAR RECIPES */}
          {similarRecipes.length > 0 && (
            <div className="similar-recipes-section">
              <h3>Similar Recipes</h3>
              <ul>
                {similarRecipes.map((r, i) => (
                  <li key={i}>
                    <strong>{r.title}</strong>{" "}
                    <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BUTTONS */}
          <div className="detail-buttons">
            <button className="info-btn" onClick={() => setShowIngredients(true)}>Ingredients</button>
            <button className="info-btn" onClick={() => setShowInstructions(true)}>Instructions</button>
          </div>

        </div>
      </Modal>

      {/* INGREDIENTS POPUP */}
      {showIngredients && (
        <Modal onClose={() => setShowIngredients(false)}>
          <IngredientsModal
            ingredients={ingredients}
            onClose={() => setShowIngredients(false)}
          />
        </Modal>
      )}

      {/* INSTRUCTIONS POPUP */}
      {showInstructions && (
        <Modal onClose={() => setShowInstructions(false)}>
          <InstructionsModal
            instructions={instructions}
            onClose={() => setShowInstructions(false)}
          />
        </Modal>
      )}
    </>
  );
}
