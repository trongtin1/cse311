"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { GENRES, TV_GENRES } from "../../../type";
import { usePathname } from "next/navigation";

const SmartGenreDropdown = () => {
  const pathname = usePathname();
  const isTVShow = pathname?.includes("/tv-shows");

  // Chọn genres và base path dựa vào current route
  const genres = isTVShow ? TV_GENRES : GENRES;
  const basePath = isTVShow ? "/tv/genre" : "/genre";
  const labelText = isTVShow ? "TV Show Genres" : "Movie Genres";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium">
        Genres <ChevronDown className="ml-1" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] max-h-[70vh] overflow-y-auto">
        <DropdownMenuLabel>{labelText}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {genres.map((genre) => (
          <DropdownMenuItem key={genre.id}>
            <Link
              href={`${basePath}/${genre.id}?genre=${genre.name}`}
              className="w-full hover:text-red-500 transition-colors"
            >
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SmartGenreDropdown;
