import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import RecipeCard from "./components/RecipeCard";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container py-4">
      {/* Header */}
      <h1 className="text-center mb-4 fw-bold">🍳 AI Recipe Generator</h1>

      {/* Search Bar */}
      <SearchBar setRecipes={setRecipes} setLoading={setLoading} />

      {/* Loader */}
      {loading && <Loader />}

      {/* Recipe List */}
      <div className="row mt-4">
        {!loading && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="col-md-4 mb-4">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-muted mt-4">
              Try searching for ingredients or dishes!
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default App;
//Recipe Generator