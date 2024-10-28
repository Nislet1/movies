import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Bg from "../components/Bg";
import { MoveLeft, MoveRight } from "lucide-react";

function Search() {
  const { search } = useParams();
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(1);

  const navitage = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/search/multi?query=" +
        search +
        "&include_adult=false&api_key=72a814220967e9899c058deb9f37ed4a&language=en-US&page=" +
        count
    )
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, [count, search]);


  return (
    <div className="">
      <div>
        <Bg />
      </div>
      <Header />
      <main className="container mx-auto space-y-6 px-2">
        <div>
          <h1 className="mb-2 text-2xl font-medium text-white">
            Search results for
          </h1>
          <p className="text-xl text-muted-foreground">"{search}"</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
            className="flex items-center justify-center rounded-md transition-colors bg-white text-muted h-10 w-10"
          >
            <MoveLeft className="size-3" />
          </button>
          <p className="text-white">Current Page: <strong>{count}</strong> / {movies.total_pages}</p>
          <button
            onClick={() =>{
              if(movies.total_pages > count){
                setCount(count + 1)
              }
            } }
            className="flex items-center justify-center rounded-md transition-colors bg-white text-muted h-10 w-10"
          >
            <MoveRight className="size-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-3 md:grid-cols-3 lg:grid-cols-5">
          {movies.results?.map((movie) => (
            <div
              onClick={() => navitage(`/details/${movie.id}`)}
              key={movie.id}
              className="h-[300px] lg:h-[400px] bg-cover bg-center rounded-md border border-muted p-2 md:p-5 flex flex-col justify-end items-start"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(${
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                })`,
              }}
            >
              {/* https://image.tmdb.org/t/p/original/${movie.poster_path} */}
              <p className="font-medium text-xl text-white mb-2">
                {movie.name || movie.original_title || movie.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary-foreground text-secondary">
                  {movie.media_type == "tv" ? "TV Show" : "Movie"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Search;
