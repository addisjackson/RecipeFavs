import React from 'react';

export default function RecipeImage({ imageUrl }) {
  if (!imageUrl) {
    return (
      <img
        className="recipe-image"
        src="/assets/images/placeholder.jpg"
        alt="No image"
      />
    );
  }

  const fileName = imageUrl.split("/").pop();
  const localPath = `/assets/images/${fileName}`;

  return (
    <img
      className="recipe-image"
      src={imageUrl}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = localPath;
      }}
      alt="Recipe"
    />
  );
}
