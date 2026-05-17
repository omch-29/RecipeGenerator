import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setRecipes, setLoading }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setRecipes([]); 

    try {
    
      const res = await axios.get(`api/recipes?ingredients=${query}`);
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="d-flex justify-content-center align-items-center gap-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        className="form-control w-50"
        placeholder="Enter ingredients or dish name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        <FaSearch className="me-1" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
