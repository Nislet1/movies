export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

async function fetchPopular() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
}

async function fetchTrending() {
  const response = await fetch(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
}

async function fetchTopRated() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
}

async function fetchTVseries() {
  const response = await fetch(
    `${BASE_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

async function fetchUpcoming() {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
}

export {
  fetchPopular,
  fetchTrending,
  fetchTopRated,
  fetchTVseries,
  fetchUpcoming,
};
