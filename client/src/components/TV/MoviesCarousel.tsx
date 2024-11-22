import Image from "next/image";

interface Props {
  title: string;
  movies: any[];
  isVertical: boolean;
}

function MoviesCarousel({ title, movies, isVertical }: Props) {
  return (
    <div className="z-40">
      <h2 className="text-xl font-bold px-4 py-2 text-white">{title}</h2>

      <div
        className={`flex space-x-4 overflow-scroll scrollbar-hide 
        ${isVertical ? "flex-col space-y-4" : "flex-row"} 
        p-4`}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`flex-none ${
              isVertical
                ? "w-full flex items-center space-x-4"
                : "w-[250px] hover:scale-105 transition-transform duration-300"
            }`}
          >
            <div className="relative h-[150px] min-w-[250px] cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title || movie.name}
                className="rounded-sm object-cover"
                fill
              />
            </div>

            {isVertical && (
              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold">
                  {movie.title || movie.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-white/60">
                  <span>{movie.vote_average.toFixed(1)} ⭐</span>
                  <span>•</span>
                  <span>
                    {movie.first_air_date?.split("-")[0] ||
                      movie.release_date?.split("-")[0]}
                  </span>
                </div>
                <p className="text-sm text-white/60 line-clamp-2 mt-1">
                  {movie.overview}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesCarousel;
