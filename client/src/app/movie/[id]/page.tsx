import MovieContainer from "@/components/MOVIE/MovieContainer";
import VideoPlayer from "@/components/MOVIE/VideoPlayer";
import { getImagePath } from "@/api/getImagePath";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/api/getMovies";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

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
    iso_639_1: movie.iso_639_1,
    iso_3166_1: movie.iso_3166_1,
    key: movie.key,
    name: movie.name,
    official: movie.official,
    published_at: movie.published_at,
    site: movie.site,
    size: movie.size,
    type: movie.type,
  }));
  const details: any = await getMovieDetails(id);
  const popoularMovies = await getPopularMovies();

  return (
    <div className="relative">
      <div className="flex gap-8 max-w-7xl mx-auto p-6">
        {/* Poster Image */}
        <div className="w-80 h-[450px] relative flex-shrink-0">
          <Image
            src={getImagePath(details?.poster_path)}
            alt={details?.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Movie Details */}
        <div className="space-y-6">
          {/* Title and Year */}
          <h1 className="text-4xl font-bold">
            {details?.original_title} (
            {new Date(details?.release_date).getFullYear()})
          </h1>

          {/* Movie Info Row */}
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <span className="bg-gray-800 px-2 py-0.5 rounded">PG</span>
            <span>{details?.release_date}</span>
            <span>•</span>
            <span>{details?.genres?.map((g: any) => g.name).join(", ")}</span>
            <span>•</span>
            <span>
              {Math.floor(details?.runtime / 60)}h {details?.runtime % 60}m
            </span>
          </div>

          {/* User Score */}
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {Math.round(details?.vote_average * 10)}%
                </span>
              </div>
            </div>
            <span className="font-semibold">User Score</span>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <span>♡</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <span>★</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <span>▶</span>
              </button>
            </div>
          </div>

          {/* Tagline */}
          <p className="italic text-gray-400">{details?.tagline}</p>

          {/* Overview */}
          <div>
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <p className="text-gray-200">{details?.overview}</p>
          </div>

          {/* Crew */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {details?.credits?.crew?.slice(0, 3).map((person: any) => (
              <div key={person.id}>
                <h4 className="font-bold">{person.name}</h4>
                <p className="text-sm text-gray-400">{person.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <VideoPlayer videos={videos} />
      </div>

      {/* Popular Movies Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MovieContainer
          movies={popoularMovies}
          title="Popular Movies"
          isVertical
        />
      </div>
    </div>
  );
};

export default MovieDetails;
