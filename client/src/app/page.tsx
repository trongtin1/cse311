"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
};

const Home: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const [movies, setMovies] = useState<any[]>([]); // Kết quả phim
  const [error, setError] = useState<string>(""); // Thông báo lỗi
  const [noResults, setNoResults] = useState<boolean>(false); // Trạng thái không tìm thấy kết quả

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a search term!");
      setNoResults(false);
      return;
    }

    setError("");
    setNoResults(false);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: HEADERS,
        params: {
          query: searchTerm,
          language: "en-US",
          include_adult: false,
        },
      });

      const results = response.data.results;

      // Nếu không có kết quả
      if (results.length === 0) {
        setNoResults(true);
      }

      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-0"
      style={{ marginTop: "45px" }}
    >
      <header className="text-center mt-0 mb-6" style={{ marginTop: "-30px" }}>
        <h1 className="text-7xl font-bold m-0">Movie Website</h1>
        <p className="text-2xl text-red-500 m-0">Track your movies the smart way!</p>
      </header>

      {/* Form tìm kiếm */}
      <form className="w-full max-w-md mb-4" onSubmit={handleSearch}>
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

      {/* Hiển thị thông báo lỗi */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Hiển thị thông báo không tìm thấy kết quả */}
      {noResults && <div className="text-gray-500 mb-4">No movies found!</div>}

      {/* Hiển thị danh sách phim */}
      {movies.length > 0 && (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white shadow rounded overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-500">
                  Release Date: {movie.release_date || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  {movie.overview || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
