import "../global.css";
import { useState , useEffect } from "react";
import { MovieCard } from "./moviecard.jsx";
import { MoviesList } from "./movieslist.jsx";
import { ApiKey } from "../constants.js";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  //fetch movies from query
  async function searchMovie(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
        setError("");
      } else {
        setError("An error occurred while fetching movies.");
        setMovies([]);
      }
    } catch (error) {
      setError("An error occurred while fetching movies.");
      setMovies([]);
    }
  }

  useEffect(() => {
    setMovies([]);
  },[])

//handle search input change and fetch movies accordingly  - debounce for performance
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      searchMovie(query);
    } else {
      setMovies([]);
      setError("");
    }
  }

  return (
    <div className="h-full w-full bg-gray-950">
      <div className="h-auto w-full p-4 bg-gray-950 grid grid-cols-1 grid-rows-2 place-items-center">
        <p className="h-auto w-auto text-white text-2xl">UniAcco Frontend Intenship Assignment</p>
        <input type="text" placeholder="Search"
          onChange={handleSearch} value={searchQuery}
          className="h-[8vh] w-1/2 p-4 rounded-full bg-slate-800 text-white" 
        />
      </div>
      {error && <p>{error}</p>}
      {searchQuery ? <MovieCard movies={movies} /> : <MoviesList />}
    </div>
  );
}