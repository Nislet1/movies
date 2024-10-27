import React, { useRef } from 'react';

const MovieCarousel = ({ movies, title }) => {
  const carouselRef = useRef(null);

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
          <button onClick={scrollLeft} className="p-2 px-3 border border-white hover:bg-white/10 rounded-full">
            <svg width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button onClick={scrollRight} className="p-2 px-3 border border-white hover:bg-white/10 rounded-full">
            <svg width="24" height="30" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                fill="currentColor"
              />
            </svg>
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
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
