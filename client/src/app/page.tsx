"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
};

const Home: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a search term!");
      setMovies([]);
      return;
    }

    setError("");
    setIsSearching(true);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: HEADERS,
        params: {
          query: searchTerm,
          language: "en-US",
          include_adult: false,
        },
      });

      setMovies(response.data.results.slice(0, 10));
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  // Thêm hàm xử lý khi click vào "View all results"
  const handleViewAllResults = () => {
    router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-0"
      style={{ marginTop: "45px" }}
    >
      <header className="text-center mt-0 mb-6" style={{ marginTop: "-30px" }}>
        <h1 className="text-7xl font-bold m-0">Movie Website</h1>
        <p className="text-2xl text-red-500 m-0">
          Track your movies the smart way!
        </p>
      </header>

      <div className="w-full max-w-md relative">
        <form className="mb-2" onSubmit={handleSearch}>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a movie..."
              className="flex-grow px-4 py-3 rounded-l border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 text-white rounded-r hover:bg-red-600 focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Dropdown kết quả tìm kiếm */}
        {movies.length > 0 && (
          <div className="absolute w-full bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {movies.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="flex items-center p-3 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-16 relative flex-shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={48}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{movie.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </Link>
            ))}

            {/* Nút "View all results" */}
            <button
              onClick={handleViewAllResults}
              className="w-full p-3 text-center text-red-500 hover:bg-gray-100 transition-colors border-t"
            >
              View all results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
