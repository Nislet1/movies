import { MoveLeft, MoveRight } from 'lucide-react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBtn from './Button';

const MovieCarousel = ({ movies, title }) => {
  const carouselRef = useRef(null);
  const navitage = useNavigate();

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
    <div className="relative w-full">
      <div className="flex items-center justify-between text-white">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="flex items-center gap-3">
          <button onClick={scrollLeft} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-muted hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <MoveLeft className='size-3' />
          </button>
          <button onClick={scrollRight} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-muted hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <MoveRight className='size-3' />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex items-end space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: 'smooth', padding: '1rem 0' }}
      >
        {movies.map((movie, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-48 rounded-md posters hover:scale-110"
            onClick={() => navitage(`/details/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
