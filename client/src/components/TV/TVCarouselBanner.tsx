"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { TVShow } from "../../../type";
import Image from "next/image";
import { getImagePath } from "@/api/getImagePath";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

interface Props {
  shows: TVShow[];
}

const TVCarouselBanner = ({ shows }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          className="bg-black/40 hover:bg-black/60 p-3 rounded-full transition-all duration-300 shadow-lg"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="bg-black/40 hover:bg-black/60 p-3 rounded-full transition-all duration-300 shadow-lg"
          onClick={scrollNext}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Carousel Content */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex">
          {shows?.map((show) => (
            <div
              key={show.id}
              className="flex-full min-w-0 relative flex-[0_0_100%]"
            >
              <Image
                src={getImagePath(show.backdrop_path, true)}
                alt={show.name}
                width={1920}
                height={500}
                className="object-cover h-[650px]"
              />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 space-y-4 text-white bg-gradient-to-t from-black/90 to-transparent">
                <h2 className="text-4xl font-extrabold max-w-xl drop-shadow-lg">
                  {show.name}
                </h2>
                <div className="flex items-center space-x-4">
                  <p className="text-sm bg-red-700 px-3 py-1 rounded-md font-semibold">
                    ⭐ {show.vote_average.toFixed(1)}
                  </p>
                  <p className="text-sm font-light">
                    📅 {new Date(show.first_air_date).getFullYear()}
                  </p>
                </div>
                <p className="max-w-xl text-sm line-clamp-3 leading-relaxed">
                  {show.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVCarouselBanner;
