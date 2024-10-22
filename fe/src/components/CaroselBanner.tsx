import { getDiscoverMovies } from "@/api/getMovies";
import HeroCarousel from "./Carousel";

interface Props {
  id?: string;
  keywords?: string;
}

const CaroselBanner = async ({ id, keywords }: Props) => {
  const movies = await getDiscoverMovies(id, keywords);

  return <HeroCarousel movies={movies} />;
};

export default CaroselBanner;
