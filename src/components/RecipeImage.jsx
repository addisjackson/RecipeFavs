import React, { useState } from "react";

export default function RecipeImage({ image, title }) {
  const [src, setSrc] = useState(image);

  function handleError() {
    setSrc("/assets/images/placeholder.jpg");
  }

  return (
    <img
      className="recipe-image"
      src={src}
      alt={title}
      onError={handleError}
    />
  );
}
