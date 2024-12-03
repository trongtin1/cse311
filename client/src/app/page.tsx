"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation("home");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "rnand";
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError(t("home.Please_enter_a_search_term"));
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

      const results = response.data.results;
      if (results.length === 0) {
        setError(t("home.no_results_found")); // Hiển thị lỗi nếu không có kết quả
      }
      setMovies(results.slice(0, 10));
    } catch {
      setError(t("home.cannot_fetch_movies")); // Hiển thị lỗi nếu API bị lỗi
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewAllResults = () => {
    router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-0">
      <header className="text-center mt-0 mb-6">
        <h1 className="text-7xl font-bold m-0">{t("home.movie_website")}</h1>
      </header>

      <div className="w-full max-w-md relative">
        <form className="mb-2" onSubmit={handleSearch}>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("home.search_for_a_movie")}
              className="flex-grow px-4 py-3 rounded-l border border-gray-300 focus:outline-none"
            />
            <button type="submit" className="px-6 py-3 bg-red-500 text-white rounded-r">
              {t("home.Search")}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 mt-2 text-center">
            {error}
          </div>
        )}
        {movies.length > 0 && !error && (
          <div className="absolute w-full bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id} className="flex items-center p-3 hover:bg-gray-100">
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
                  <p className="text-sm text-gray-500">{new Date(movie.release_date).getFullYear()}</p>
                </div>
              </Link>
            ))}
            <button
              onClick={handleViewAllResults}
              className="w-full p-3 bg-red-500 text-white text-center rounded-b"
            >
              {t("home.View_all_results")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
