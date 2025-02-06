import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';


const MovieCarousel = ({ movies, title }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{title}</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={scrollLeft}>
            <MoveLeft className='size-3' />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollRight}>
            <MoveRight className='size-3' />
          </Button>

        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex items-end space-x-3.5 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: 'smooth', padding: '1rem 0' }}
      >
        {movies.map((movie, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-52 rounded-xl border border-muted cursor-pointer"
            onClick={() => {
              if (movie.media_type === "tv") {
                navigate(`/details/tv/${movie.id}`);
              }else {
                navigate(`/details/movie/${movie.id}`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
