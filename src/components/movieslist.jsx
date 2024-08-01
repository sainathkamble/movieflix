import "../global.css";
import Modal from "react-modal";
import { useEffect, useState , useCallback } from "react";
import { ModalCompo } from "./Modal.jsx";

Modal.setAppElement("#root");

export const MoviesList = () => {

const [movies, setMovies] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [selectedMovie, setSelectedMovie] = useState(null);


//fetch movies default movies
  const getMovies = async (page) => {
    try{
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fb60f70ab8f6a810a3873a54902d5f85&page=${page}`,
        { headers: { "Content-type": "application/json", }, method: "GET",}
      );
      const data = await response.json();
      setMovies(data.results);
    }catch(error){
      console.error(error.message);
    }finally{
      setLoading(true);
    }
  }

  useEffect( () => {
    getMovies(page);
  }, [page]);

 //infinite scrolling / track scrollbar
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

//add scroll event listener on mount and remove on unmount to prevent memory leakage
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

//modal opening / closing 
  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="h-full w-full bg-slate-950 rounded-lg p-4 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {movies.map((movie) => {
        return (
          <div className="h-auto w-full bg-slate-800 border rounded-lg" key={movie.id}>

            <img className="h-auto w-auto rounded-t-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title} onClick={() => openModal(movie)}
            /> 

            <div className="h-auto w-full">
              <p className="h-auto w-auto m-2 font-semibold text-2xl text-white">{movie.title}</p>
              <p className="h-auto w-auto m-2 text-white">Rating: {movie.vote_average}</p>
            </div>
          </div>
        );
      })}
      {loading ? <p className="h-auto w-full text-xl text-white flex justify-center items-center">Loading...</p> : <p></p>}

      <ModalCompo selectedMovie={selectedMovie} closeModal={closeModal} />

    </div>
  );
}