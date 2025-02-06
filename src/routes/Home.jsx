import { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieCarousel from "../components/MovieCarousel";
import HeroSection from "@/components/Hero";
import { fetchPopular, fetchTopRated, fetchTrending, fetchTVseries } from "@/lib/fetch";

function Home() {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [TVseries, setTVseries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [popularData, trendingData, topRatedData, TVseriesData] = await Promise.all([
        fetchPopular(),
        fetchTrending(),
        fetchTopRated(),
        fetchTVseries(),
      ]);

      setPopular(popularData);
      setTrending(trendingData);
      setTopRated(topRatedData);
      setTVseries(TVseriesData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection/>
      <div className="container mx-auto overflow-hidden space-y-4 py-20">
        <MovieCarousel title='Popular' movies={popular} />
        <MovieCarousel title='Trending' movies={trending} />
        <MovieCarousel title='Top Rated' movies={topRated} />
        <MovieCarousel title='TV Series' movies={TVseries} />
      </div>
    </div>
  );
}

export default Home;
