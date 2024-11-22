import Link from "next/link";
import { cn } from "@/api/utils";
import TVShowCard from "./TVShowCard";

interface Props {
  title?: string;
  shows: any[];
  isVertical?: boolean;
}

const TVShowContainer = ({ title, shows }: Props) => {
  return (
    <div>
      {title && (
        <div className="mx-10 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
          <h2 className="text-sm uppercase font-bold tracking-wider">
            {title}
          </h2>
          <Link
            href={{
              pathname: "/viewmore",
              query: { title: title, type: "tv" },
            }}
            className="bg-gray-800 text-xs text-white uppercase px-2 py-1 rounded-md border-indigo-600 font-semibold hover:bg-black duration-300"
          >
            View more
          </Link>
          <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
        </div>
      )}

      {/* Hiển thị danh sách TV shows dạng lưới */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-5 lg:px-10 py-5">
        {shows.map((show) => (
          <TVShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};
export default TVShowContainer;
