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
      setSelectedMovie(upcomingMovies[0]);
    }

    getUpcomingMovies();
  }, []);

  return (
    <div
      className="relative h-[60vh] md:h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) -100%, rgba(0, 0, 0, 0.95) 100%), url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`,
      }}
    >
      {/* Content Container */}
      <div className="absolute w-full md:w-[40%] bottom-10 md:bottom-40 px-4 md:left-20 space-y-3 md:space-y-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-3xl md:text-5xl font-semibold line-clamp-2"
        >
          {selectedMovie.title}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-sm md:text-lg line-clamp-3 md:line-clamp-none"
        >
          {selectedMovie.overview}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" className="md:text-base">
            <Play className="size-3 md:size-4" />
            Watch Trailer
          </Button>
        </motion.div>
      </div>

      {/* Movie Carousel - Hidden on Mobile */}
      <div className="hidden md:flex w-full md:w-[45%] items-end absolute bottom-10 right-0 gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
        {movies.map((movie) => (
          <img
            className={`w-48 transition-all duration-300 hover:w-52 rounded-md cursor-pointer ${
              selectedMovie.id === movie.id ? "w-52 shadow-lg" : ""
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