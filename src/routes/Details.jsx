import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Bg from "../components/Bg";
import { Play, Star } from "lucide-react";
import { format, parseISO  } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_KEY, BASE_URL } from "@/lib/fetch";

function Details() {
  const { type, id } = useParams();

  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [images, setImages] = useState([]);
  const [trailer, setTrailer] = useState([]);


  const dateStr = movie.release_date || "1970-01-01";
  const parsedDate = parseISO(dateStr);
  const formattedDate = format(parsedDate, "PP");


  async function GetMovie() {
    const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`)
    const data= await res.json()
    setMovie(data)
  }

  async function GetCredits(){
    const res = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`)
    const data = await res.json()
    setCredits(data)
  }

  async function GetImages(){
    const res = await fetch(`${BASE_URL}/${type}/${id}/images?api_key=${API_KEY}`)
    const data = await res.json()
    setImages(data)
  }

  async function GetVideos(){
    const res = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`)
    const data = await res.json()
    setTrailer(data)
  }





  useEffect(() => {

      GetCredits()
      GetImages()
      GetMovie()
      GetVideos()
  
  }, []);


  console.log(movie)
  console.log(trailer)


  return (
    <div className="">
      <div>
        <Bg />
      </div>
      <Header />
      <main className="container mx-auto space-y-6 px-2 py-6">
        <div className="w-full flex items-start flex-col lg:mb-16">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="h-[500px] w-full object-cover rounded-xl border border-muted hidden lg:block"
          />
          <div className="flex flex-col lg:flex-row lg:items-end lg:px-24 space-y-2 lg:space-x-6 lg:-mt-32">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="w-full lg:w-[300px] rounded-xl border border-muted"
            />
            <div className="space-y-3 lg:space-y-4">
              <p className="text-[36px] font-semibold">
                {movie.title || movie.name}
              </p>
              <div className="space-x-2">
                {movie.genres?.map((genre) => (
                  <Badge variant="secondary" key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground">{movie.overview}</p>
              <div className="flex items-center gap-2">
                  <Button disabled={!trailer?.results?.[0]?.key} size='lg'>
                    <Link to={`https://www.youtube.com/watch?v=`+trailer?.results?.[0]?.key} target="_blank" className="flex items-center gap-2">
                      <Play className="size-4" />
                      Watch Trailer
                    </Link>
                  </Button>
              </div>


            </div>
          </div>
        </div>
        <h1 className="text-3xl">Overview</h1>
        <div className="border-muted w-full space-y-5 bg-background rounded border p-2 lg:p-6">
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
        <h1 className="text-3xl">Credits</h1>
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
        <h1 className="text-3xl">Images</h1>
        <div className="w-full bg-background">
          <div className="grid md:grid-cols-2 gap-y-3 gap-x-3">
            {images.backdrops?.map((x, i) => (
              <img key={i} src={`https://image.tmdb.org/t/p/original/${x.file_path}`} className="rounded-md border border-muted"/>
            ))}
          </div>
        </div>


      </main>
    </div>
  );
}

export default Details;
