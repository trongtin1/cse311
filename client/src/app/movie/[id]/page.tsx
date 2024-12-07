import MovieDetailsClient from "@/components/MOVIE/MovieDetailsClient";
import VideoPlayer from "@/components/MOVIE/VideoPlayer";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/api/getMovies";
import { Metadata } from "next";
import React from "react";
import MovieContainer from "@/components/MOVIE/MovieContainer";

export const metadata: Metadata = {
  title: "Movie Studio Clone || Movie Details page",
};

interface Props {
  params: {
    id: string;
  };
}

const MovieDetails = async ({ params: { id } }: Props) => {
  const movies = await getMovieVideos(id);
  const videos = movies.map((movie: any) => ({
    id: movie.id,
    key: movie.key,
  }));
  const details = await getMovieDetails(id);
  const popularMovies = await getPopularMovies();

  return (
    <div className="relative">
      <MovieDetailsClient details={details} videos={videos} />

      {/* Video Player Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <VideoPlayer videos={videos} />
      </div>

      {/* Popular Movies Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MovieContainer
          movies={popularMovies}
          title="Popular Movies"
          isVertical
        />
      </div>
    </div>
  );
};

export default MovieDetails;
