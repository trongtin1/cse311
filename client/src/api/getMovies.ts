import axios from "axios";
import { SearchResults } from "../../type";

const BASE_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_KEY}`,
};
const DEFAULT_PARAMS = {
  include_adult: "false",
  include_video: "false",
  sort_by: "popularity.desc",
  language: "en-US",
  page: (Math.floor(Math.random() * 60) + 1).toString(),
};

// console.log(DEFAULT_PARAMS);

// Hàm lấy danh sách phim đang chiếu
export const getNowPlayingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy danh sách phim sắp chiếu
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy danh sách phim được đánh giá cao nhất
export const getTopRatedMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy danh sách phim phổ biến
export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm tìm kiếm phim dựa trên từ khóa và thể loại
export const getDiscoverMovies = async (id?: string, keywords?: string) => {
  const params: Record<string, string> = { ...DEFAULT_PARAMS };
  if (id) params.with_genres = id;
  if (keywords) params.with_keywords = keywords;

  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    headers: HEADERS,
    params,
  });
  return response.data.results;
};

// Hàm tìm kiếm phim theo từ khóa nhập vào
export const getSearchedMovies = async (term: string) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    headers: HEADERS,
    params: { ...DEFAULT_PARAMS, query: term },
  });
  return response.data.results;
};

// Hàm lấy video của phim dựa trên ID
export const getMovieVideos = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy chi tiết của phim dựa trên ID
export const getMovieDetails = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data;
};
// utils/fetchGenres.ts

export const fetchGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_KEY}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await response.json();
  return data; // Trả về dữ liệu genres
};
