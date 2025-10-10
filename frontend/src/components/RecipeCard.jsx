import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card shadow-sm h-100">
      {/* Recipe image */}
      {recipe.image && (
        <img
          src={recipe.image}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        {/* Recipe title */}
        <h5 className="card-title fw-bold">{recipe.title}</h5>

        {/* Ingredients */}
        {recipe.ingredients && (
          <ul className="list-unstyled small text-muted">
            {recipe.ingredients.slice(0, 5).map((ing, i) => (
              <li key={i}>• {ing}</li>
            ))}
          </ul>
        )}

        {/* View more / link */}
        {recipe.sourceUrl && (
          <a
            href={recipe.sourceUrl}
            className="btn btn-outline-primary btn-sm mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Full Recipe
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
