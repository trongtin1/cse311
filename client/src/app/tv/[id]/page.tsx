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
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="py-10">
          {/* Title Section */}
          <h1 className="text-5xl font-bold mb-6">{details?.name}</h1>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-500 rounded-full p-2">
              <span className="font-bold">{details.vote_average}</span>
            </div>
            <span className="text-gray-300">
              {details.first_air_date?.split("-")[0]}
            </span>
            <span className="text-gray-300">
              {details.episode_run_time?.[0]} min
            </span>
            <span className="border border-white rounded px-2">CC</span>
            {details?.genres?.map((genre: any) => (
              <span key={genre.id} className="text-red-500">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Image and Description */}
            <div className="w-full lg:w-2/3">
              <div className="rounded-lg overflow-hidden mb-6">
                <Image
                  src={getImagePath(details?.backdrop_path)}
                  alt={details?.name}
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-lg leading-relaxed">{details?.overview}</p>
            </div>

            {/* Right: Additional Info */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="text-gray-400">Director</h3>
                  <p>{details?.created_by?.[0]?.name || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-gray-400">Status</h3>
                  <p
                    className={
                      details?.status === "Ended"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {details.status}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-gray-400">Production</h3>
                  <p>{details?.production_companies?.[0]?.name || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player and Popular Shows sections remain unchanged */}
        <VideoPlayer videos={videos} />
        <div className="mt-6">
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
