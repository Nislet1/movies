import { useEffect, useState } from "react";
import Header from "../components/Header";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);

  async function fetchMovies() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US"
    );
    const data = await response.json();
    setMovies(data.results);
    setSelectedMovie(data.results[0]);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div
      className="w-screen h-screen relative bg-cover overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`,
      }}
    >
      <Header />

      <div className="absolute w-[40%] bottom-40 left-20 space-y-4">
        <h1 className="text-white text-6xl font-semibold">
          {selectedMovie.title}
        </h1>
        <p className="text-white text-xl">{selectedMovie.overview}</p>
        <div className="btns">
          <button className="rounded-md bg-yellow-400 px-10 py-4 font-semibold">
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="w-[45%] flex items-end absolute bottom-10 right-0 gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
        {movies.map((movie) => (
          <img
            className={`w-48 hover:w-52 rounded-md posters cursor-pointer ${selectedMovie.id == movie.id && 'w-52'}`}
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
