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
export const getTVShows = async () => {
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    headers: HEADERS,
    params: {
      ...DEFAULT_PARAMS,
      sort_by: "popularity.desc",
    },
  });
  return response.data.results;
};
// Hàm lấy danh sách TV đang chiếu
export const getNowPlayingTv = async () => {
  const response = await axios.get(`${BASE_URL}/tv/now_playing`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy danh sách TV sắp chiếu
export const getUpcomingTv = async () => {
  const response = await axios.get(`${BASE_URL}/tv/upcoming`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy danh sách TV được đánh giá cao nhất
export const getTopRatedTv = async () => {
  const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy danh sách TV phổ biến
export const getPopularTv = async () => {
  const response = await axios.get(`${BASE_URL}/tv/popular`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm tìm kiếm TV dựa trên từ khóa và thể loại
export const getDiscoverTv = async (id?: string, keywords?: string) => {
  const params: Record<string, string> = { ...DEFAULT_PARAMS };
  if (id) params.with_genres = id;
  if (keywords) params.with_keywords = keywords;

  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    headers: HEADERS,
    params,
  });
  return response.data.results;
};

// Hàm tìm kiếm TV theo từ khóa nhập vào
export const getSearchedTv = async (term: string) => {
  const response = await axios.get(`${BASE_URL}/search/tv`, {
    headers: HEADERS,
    params: { ...DEFAULT_PARAMS, query: term },
  });
  return response.data.results;
};

// Hàm lấy video của TV dựa trên ID
export const getTvVideos = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data.results;
};

// Hàm lấy chi tiết của TV dựa trên ID
export const getTvDetails = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}`, {
    headers: HEADERS,
    params: DEFAULT_PARAMS,
  });
  return response.data;
};

// Hàm lấy thể loại TV
export const fetchTvGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/tv/list?language=en";
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
  return data;
};
