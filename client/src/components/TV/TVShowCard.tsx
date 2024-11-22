"use client";
import Image from "next/image";
import { getImagePath } from "@/api/getImagePath";
import { useRouter } from "next/navigation";
import { TVShow } from "../../../type";

interface Props {
  show: TVShow;
}

const TVShowCard = ({ show }: Props) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/tv/${show.id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 dark:to-[#1A1C29]/80 z-10" />
      <div className="absolute z-20 bottom-5 left-5 text-white">
        <h3 className="font-bold">{show.name}</h3>
        <div className="flex items-center space-x-2 text-sm">
          <span>{new Date(show.first_air_date).getFullYear()}</span>
          <span>•</span>
          <span>{show.vote_average.toFixed(1)} ⭐</span>
        </div>
      </div>
      <Image
        src={getImagePath(show.backdrop_path || show.poster_path)}
        alt={show.name}
        width={1920}
        height={1080}
        className="w-fit lg:min-w-[400px] h-56 object-cover shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
      />
    </div>
  );
};

export default TVShowCard;
