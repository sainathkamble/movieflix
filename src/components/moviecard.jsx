import "../global.css";
import { useState } from "react";
import { ModalCompo } from "./Modal.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const MovieCard = (props) => {

  const { movies } = props;

//state for modal state  
  const [selectedMovie, setSelectedMovie] = useState(null);

// modal opening / closing 
  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="h-full w-full bg-gray-900 rounded-lg p-4 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {movies.map((movie) => {
        return (
          <div className="h-auto w-full bg-slate-800 border rounded-lg" key={movie.id}>

            <img className="h-auto w-auto rounded-t-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}  onClick={() => openModal(movie)}
            /> 

            <div className="h-auto w-full">
              <p className="h-auto w-auto m-2 font-semibold text-white text-xl">{movie.title}</p>
              <p className="h-auto w-auto m-2 font-semibold text-white">Rating: {movie.vote_average}</p>
            </div>
          </div>
         );
      })} 
      
      <ModalCompo selectedMovie={selectedMovie} closeModal={closeModal} />

    </div>
  );
}