import VideoPlayer from "@/components/MOVIE/VideoPlayer";
import { getImagePath } from "@/api/getImagePath";
import { getTvDetails, getTvVideos, getPopularTv } from "@/api/getTvShows";
import { Metadata } from "next";
import Image from "next/image";
import TVShowContainer from "@/components/TV/TVShowContainer";

export const metadata: Metadata = {
  title: "Movie Studio Clone || TV Show Details page",
};

interface Props {
  params: {
    id: string;
  };
}

const TVShowDetails = async ({ params: { id } }: Props) => {
  const shows = await getTvVideos(id);
  const videos = shows.map((show: any) => ({
    id: show.id,
    iso_639_1: show.iso_639_1,
    iso_3166_1: show.iso_3166_1,
    key: show.key,
    name: show.name,
    official: show.official,
    published_at: show.published_at,
    site: show.site,
    size: show.size,
    type: show.type,
  }));
  const details: any = await getTvDetails(id);
  const popularShows = await getPopularTv();

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left Content */}
          <div className="flex-1">
            {/* Title */}
            <h1 className="text-6xl font-bold mb-6">{details.name}</h1>

            {/* Info Row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#2d2d2d] rounded-lg px-3 py-1 flex items-center gap-2">
                <span className="font-bold text-xl">
                  {Math.round(details.vote_average * 10) / 10}
                </span>

                <span>Score</span>
              </div>
              <span>{new Date(details.first_air_date).getFullYear()}</span>
              <span className="px-2 py-1 bg-[#2d2d2d] rounded">
                {details.episode_run_time[0] || "N/A"} min
              </span>
              <span className="px-2 py-1 bg-[#2d2d2d] rounded">Ultra HD</span>
              <span className="border border-gray-600 px-2 rounded">CC</span>
              <span className="text-red-500">
                {details.genres.map((g) => g.name).join(" | ")}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 italic mb-4">{details.tagline}</p>

            {/* Overview */}
            <p className="text-gray-300 text-lg mb-6">{details.overview}</p>

            {/* Additional Info */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <span className="text-gray-400">Creator</span>
                <p className="font-medium">
                  {details.created_by[0]?.name || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Seasons</span>
                <p className="font-medium">{details.number_of_seasons}</p>
              </div>
              <div>
                <span className="text-gray-400">Episodes</span>
                <p className="font-medium">{details.number_of_episodes}</p>
              </div>
              <div>
                <span className="text-gray-400">Status</span>
                <p className="font-medium">{details.status}</p>
              </div>
              <div>
                <span className="text-gray-400">Network</span>
                <p className="font-medium">{details.networks[0]?.name}</p>
              </div>
              <div>
                <span className="text-gray-400">Production</span>
                <p className="font-medium">
                  {details.production_companies[0]?.name}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200">
                + ADD YOUR LIST
              </button>
              <div className="flex items-center gap-2">
                <button className="bg-[#2d2d2d] p-2 rounded-full hover:bg-[#3d3d3d]">
                  👍 {details.vote_count} likes
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Poster */}
          <div className="w-[300px] h-[450px] relative flex-shrink-0">
            <Image
              src={getImagePath(details.poster_path)}
              alt={details.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-12">
          <VideoPlayer videos={videos} />
        </div>

        {/* Popular Shows */}
        <div className="py-8">
          <TVShowContainer
            shows={popularShows}
            title="Popular Shows"
            isVertical
          />
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
