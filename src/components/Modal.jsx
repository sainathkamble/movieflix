import "../global.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const ModalCompo = (props) => {

 //modal template for movies 
    const {selectedMovie , closeModal} = props;

    return(
        <>
        {selectedMovie && (
            <Modal
              isOpen={!!selectedMovie}
              onRequestClose={closeModal}
              contentLabel="Movie Details"
              className="h-full w-full p-10"
            >
    
            <div className="h-full w-full bg-slate-800 border rounded-lg p-4 grid grid-cols-1 grid-rows-2 overflow-y-scroll
            sm:grid-cols-1 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1 2xl:grid-cols-2 2xl:grid-rows-1">
              
              <div className="h-full w-full flex just-fy-center items-center">
                <img
                  className="h-full w-2/3 rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
              </div>
    
              <div className="h-full w-full grid grid-cols-1 place-items-center">
                <p className="h-auto w-full m-4 font-semibold text-2xl text-white">{selectedMovie.title}</p>
                <p className="h-auto w-full m-4 text-white">
                  <span className="h-auto w-full">Overview :</span> {selectedMovie.overview}
                </p>
                <p className="h-auto w-full m-4 text-white">Rating: {selectedMovie.vote_average}</p>
                <p className="h-auto w-full m-4 text-white">Release Date: {selectedMovie.release_date}</p>
                <p className="h-auto w-full m-4 text-white">Popularity: {selectedMovie.popularity}</p>
    
                <div className="h-auto w-full flex justify-center items-center">
                  <button onClick={closeModal} className="h-auto w-1/2 m-4 text-white hover:bg-slate-700 rounded-xl text-2xl font-semibold">Close</button>
                </div>
              </div>
            </div>
            </Modal>
          )}
        </> 
    );
}