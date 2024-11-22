import CaroselBanner from "@/components/CaroselBanner";
import MovieContainer from "@/components/MovieContainer";

import Header from "@/components/Header";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/api/getMovies";

export default async function HomePage() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <div>
      {/* <Header /> */}
      <CaroselBanner />
      <div className="flex flex-col space-y-2">
        <MovieContainer movies={nowPlayingMovies} title="Now Playing" />
        <MovieContainer movies={upcomingMovies} title="Upcoming" />
        <MovieContainer movies={topRatedMovies} title="Top Rated" />
        <MovieContainer movies={popularMovies} title="Popular" />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
