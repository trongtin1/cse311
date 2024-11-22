import TVCarouselBanner from "@/components/TV/TVCarouselBanner";
import TVShowContainer from "@/components/TV/TVShowContainer";
import { getTVShows, getTopRatedTv } from "@/api/getTvShows";

export default async function TVShowsPage() {
  const popularTvShows = await getTVShows();
  const topRatedTvShows = await getTopRatedTv();

  return (
    <div>
      {/* Bỏ slice(0, 5) để hiển thị tất cả shows */}
      <TVCarouselBanner shows={popularTvShows} />
      <div className="flex flex-col space-y-2">
        <TVShowContainer shows={popularTvShows} title="Popular Shows" />
        <TVShowContainer shows={topRatedTvShows} title="Top Rated Shows" />
      </div>
    </div>
  );
}
