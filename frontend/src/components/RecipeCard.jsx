
import React, { useState } from "react";
import axios from "axios";

const RecipeCard = ({ recipe }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/recipes/info/${id}`);
      setDetails(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch recipe details:", err);
      alert("Failed to fetch recipe details. Try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const renderInstructions = (d) => {
    if (!d) return null;

    
    if (d.analyzedInstructions && d.analyzedInstructions.length > 0) {
      return d.analyzedInstructions.map((inst, idx) => (
        <div key={idx} className="mb-3">
          <h6>{inst.name || `Section ${idx + 1}`}</h6>
          <ol>
            {inst.steps.map((s) => (
              <li key={s.number}>{s.step}</li>
            ))}
          </ol>
        </div>
      ));
    }

    
    if (d.instructions) {
      return <p>{d.instructions.replace(/<[^>]*>/g, "")}</p>;
    }

    return <p>No instructions available.</p>;
  };

  return (
    <>
      <div className="card shadow-sm h-100">
        {recipe.image && (
          <img
            src={recipe.image}
            className="card-img-top"
            alt={recipe.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{recipe.title}</h5>
          <p className="card-text text-muted mb-2">
            Used: {recipe.usedIngredientCount ?? recipe.usedIngredientCount} • Missed: {recipe.missedIngredientCount ?? recipe.missedIngredientCount}
          </p>

          <div className="mt-auto d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm flex-grow-1"
              onClick={() => fetchDetails(recipe.id)}
              disabled={loading}
            >
              {loading ? "Loading..." : "View Recipe"}
            </button>

            {/* Direct link */}
            {recipe.sourceUrl && (
              <a
                href={recipe.sourceUrl}
                className="btn btn-success btn-sm"
                target="_blank"
                rel="noreferrer"
              >
                Open Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Simple Modal */}
      {showModal && details && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "900px", width: "95%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content recipe-modal">
              <div className="modal-header">
                <h5 className="modal-title">{details.title}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {details.image && (
                  <img src={details.image} alt={details.title} className="img-fluid mb-3" />
                )}

                <p>
                  <strong>Ready in:</strong> {details.readyInMinutes ?? "N/A"} minutes •{" "}
                  <strong>Servings:</strong> {details.servings ?? "N/A"}
                </p>

                <h6>Instructions</h6>
                {renderInstructions(details)}

                {details.sourceUrl && (
                  <p>
                    <a href={details.sourceUrl} target="_blank" rel="noreferrer">
                      View original recipe page
                    </a>
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
