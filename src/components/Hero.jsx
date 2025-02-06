import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { fetchUpcoming } from "@/lib/fetch";

const HeroSection = () => {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getUpcomingMovies() {
      const upcomingMovies = await fetchUpcoming();
      setMovies(upcomingMovies);
      setSelectedMovie(upcomingMovies[0]); // Ensures it doesn't break if empty
    }

    getUpcomingMovies();
  }, []);

  return (
    <div
      className="h-screen relative bg-cover overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`,
      }}
    >
      <div className="absolute w-[40%] bottom-40 left-20 space-y-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-5xl font-semibold"
        >
          {selectedMovie.title}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-md"
        >
          {selectedMovie.overview}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button>
            <Play className="size-4" />
            Watch Trailer
          </Button>
        </motion.div>
      </div>

      <div className="w-[45%] flex items-end absolute bottom-10 right-0 gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
        {movies.map((movie) => (
          <img
            className={`w-48 hover:w-52 rounded-md posters cursor-pointer ${
              selectedMovie.id == movie.id && "w-52 shadow-lg"
            }`}
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
