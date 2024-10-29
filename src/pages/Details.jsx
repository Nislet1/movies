import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Bg from "../components/Bg";
import { Play, Info, CircleUserRound } from "lucide-react";
import { format, parseISO  } from "date-fns";

function Details() {
  const { type, id } = useParams();

  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const dateStr = movie.release_date || "1970-01-01";
  const parsedDate = parseISO(dateStr);
  const formattedDate = format(parsedDate, "PP");

  useEffect(() => {
    if(type === 'movie'){
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error(error));

      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setCredits(data))
        .catch((error) => console.error(error));

      fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setImages(data))
        .catch((error) => console.error(error));

      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setVideos(data))
        .catch((error) => console.error(error));
    } else if(type === 'tv'){
      fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error(error));
  
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setCredits(data))
        .catch((error) => console.error(error));
  
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=72a814220967e9899c058deb9f37ed4a`
      )
        .then((response) => response.json())
        .then((data) => setImages(data))
        .catch((error) => console.error(error));
    }
      

  }, []);

  console.log(videos)



  return (
    <div className="">
      <div>
        <Bg />
      </div>
      <Header />
      <main className="container mx-auto space-y-6 px-2">
        <div className="w-full flex items-center flex-col lg:mb-16">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="h-[500px] w-full object-cover rounded-xl border border-muted hidden lg:block"
          />
          <div className="flex flex-col lg:flex-row lg:items-end lg:px-28 space-y-2 lg:space-x-6 lg:-mt-32">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="w-full lg:w-[300px] rounded-xl border border-muted"
            />
            <div className="space-y-3 lg:space-y-4">
              <p className="text-[36px] font-semibold text-white">
                {movie.title}
              </p>
              <div className="space-x-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground">{movie.overview}</p>
              {/* <a href={`https://www.youtube.com/watch?v=`+videos?.results?.[0]?.key}><button className="h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-primary text-primary-foreground shadow hover:bg-primary/90">
                <Play className="size-4" />
                Watch Trailer
              </button></a> */}
              
              <a href={`https://www.youtube.com/watch?v=`+videos?.results?.[Math.floor(Math.random() * (videos?.results?.length))]?.key} className="h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-primary text-primary-foreground shadow hover:bg-primary/90">
                <Play className="size-4" />
                Watch Trailer
              </a>

            </div>
          </div>
        </div>
        <h1 className="text-3xl text-white">Overview</h1>
        <div className="border-muted w-full space-y-5 bg-background text-white rounded border p-2 lg:p-6">
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            <div>
              <h1 className="font-medium lg:text-xl">Release Date</h1>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base">
                { formattedDate }
              </p>
            </div>
            <div>
              <h1 className="font-medium lg:text-xl">Status</h1>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base">
                {movie.status}
              </p>
            </div>
            <div>
              <h1 className="font-medium lg:text-xl">Language</h1>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base space-x-1">
                {movie.spoken_languages?.map((x) => (
                  <span key={x.id}>{x.name}</span>
                ))}
              </p>
            </div>
            <div>
              <h1 className="font-medium lg:text-xl">Production Companies</h1>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground md:text-base space-x-1">
                {movie.production_companies?.map((x) => (
                  <span className="underline hover:text-white" key={x.id}>
                    {x.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl text-white">Credits</h1>
        <div className="w-full bg-background text-white">
          <div className="grid grid-cols-2 gap-y-3 gap-x-3 md:grid-cols-3 lg:grid-cols-4">
            {credits.cast?.map((x) => (
              <div
                key={x.id}
                className="h-[300px] lg:h-[400px] bg-cover bg-center rounded-md border border-muted p-2 md:p-5 flex flex-col justify-end items-start"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(${
                    x.profile_path
                      ? `https://image.tmdb.org/t/p/original/${x.profile_path}`
                      : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                  })`,
                }}
              >
                <p className="font-medium text-xl">{x.name}</p>
                <p className="text-muted-foreground">{x.character}</p>
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-3xl text-white">Images</h1>
        <div className="w-full bg-background">
          <div className="grid md:grid-cols-2 gap-y-3 gap-x-3">
            {images.backdrops?.map((x, i) => (
              <div
                key={i}
                className="h-[400px] bg-cover bg-center rounded-md border border-muted p-2 md:p-5 flex flex-col justify-end items-start"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(https://image.tmdb.org/t/p/original/${x.file_path})`,
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* <h1 className="text-3xl text-white">Videos</h1>
        <div className="w-full bg-background">
          <div className="grid grid-cols-2 gap-y-3 gap-x-3">
            {videos.results?.map((video, i) => (
              <div
                key={i}
                className="h-[300px] lg:h-[400px] bg-cover bg-center rounded-md border border-muted flex flex-col justify-end items-start"
              >
                <iframe
                  className="w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name || `Video ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div> */}

      </main>
    </div>
  );
}

export default Details;
