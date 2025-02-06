import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const MovieCarousel = ({ movies, title }) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [movies]);

  const scrollLeft = () => {
    const newX = x.get() + 400;
    controls.start({
      x: Math.min(newX, 0),
      transition: { type: "spring", stiffness: 200, damping: 30 }
    });
  };

  const scrollRight = () => {
    const newX = x.get() - 400;
    controls.start({
      x: Math.max(newX, -width),
      transition: { type: "spring", stiffness: 200, damping: 30 }
    });
  };

  return (
    <div className="relative w-full pb-4 md:pb-8">
      <div className="flex items-center justify-between mb-2 md:mb-4 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          {title}
        </h2>
        <div className="flex items-center gap-1 md:gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollLeft}
            className="hover:bg-gray-800/50"
          >
            <MoveLeft className="size-4 md:size-5 text-white" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={scrollRight}
            className="hover:bg-gray-800/50"
          >
            <MoveRight className="size-4 md:size-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden px-4 md:px-0">
        <motion.div
          ref={carouselRef}
          className="flex gap-2 md:gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          style={{ x }}
          animate={controls}
          dragElastic={0.1}
          dragTransition={{
            bounceStiffness: 300,
            bounceDamping: 30,
            power: 0.1
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {movies.map((movie, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="w-32 h-48 sm:w-36 sm:h-52 md:w-44 md:h-64 rounded-lg object-cover cursor-pointer select-none"
                onClick={() => {
                  if (movie.media_type === "tv") {
                    navigate(`/details/tv/${movie.id}`);
                  } else {
                    navigate(`/details/movie/${movie.id}`);
                  }
                }}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MovieCarousel;