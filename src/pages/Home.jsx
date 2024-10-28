import { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieCarousel from "../components/MovieCarousel";
import { Play } from 'lucide-react'

function Home() {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [TVseries, setTVseries] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);

  async function fetchUpcoming() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US"
    );
    const data = await response.json();
    setMovies(data.results);
    setSelectedMovie(data.results[0]);
  }

  async function fetchPopular() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US"
    );
    const data = await response.json();
    setPopular(data.results);
  }

  async function fetchTrending() {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US"
    );
    const data = await response.json();
    setTrending(data.results);
  }

  async function fetchTopRated() {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US"
    );
    const data = await response.json();
    setTopRated(data.results);
  }

  async function fetchTVseries() {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=72a814220967e9899c058deb9f37ed4a&language=en-US"
    );
    const data = await response.json();
    setTVseries(data.results);
  }

  useEffect(() => {
    fetchUpcoming();
    fetchPopular();
    fetchTrending();
    fetchTopRated();
    fetchTVseries();
  }, []);

  return (
    <div>
      <div
        className="h-screen relative bg-cover overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`,
        }}
      >
        <Header />

        <div className="absolute w-[40%] bottom-40 left-20 space-y-4">
          <h1 className="text-white text-5xl font-semibold">
            {selectedMovie.title}
          </h1>
          <div className="text-white">1h 30min / rating / release date / production company</div>
          <p className="text-white text-md">{selectedMovie.overview}</p>
          <div className="btns">
          <button className='h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-primary text-primary-foreground shadow hover:bg-primary/90'>
              <Play className='size-4'/>
              Watch Trailer
            </button>
          </div>
        </div>

        <div className="w-[45%] flex items-end absolute bottom-10 right-0 gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
          {movies.map((movie) => (
            <img
              className={`w-48 hover:w-52 rounded-md posters cursor-pointer ${
                selectedMovie.id == movie.id &&
                "w-52 shadow-lg"
              }`}
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>
      <div className="p-20 overflow-hidden space-y-4">
        <MovieCarousel title='Popular' movies={popular} />
        <MovieCarousel title='Trending' movies={trending} />
        <MovieCarousel title='Top Rated' movies={topRated} />

      </div>
    </div>
  );
}

export default Home;
