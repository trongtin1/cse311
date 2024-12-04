"use client";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import Image from "next/image";
import { getImagePath } from "@/api/getImagePath";

interface MovieDetailsClientProps {
  details: any;
  videos: any[];
}

const MovieDetailsClient = ({ details, videos }: MovieDetailsClientProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Add ESC key handler
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    // Add event listener when popup is open
    if (isVideoOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isVideoOpen]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left - Poster */}
        <div className="w-[300px] h-[450px] relative flex-shrink-0">
          <Image
            src={getImagePath(details.poster_path)}
            alt={details.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Right - Details */}
        <div className="flex-1">
          {/* Title and Year */}
          <h1 className="text-5xl font-bold mb-4">
            {details.title} ({new Date(details.release_date).getFullYear()})
          </h1>

          {/* Movie Info Row */}
          <div className="flex items-center gap-3 text-gray-200 mb-6">
            <span className="bg-gray-800 px-2 py-1 rounded">
              {details.adult ? "R" : "PG"}
            </span>
            <span>{details.release_date}</span>
            <span>•</span>
            <span>{details.genres?.map((g: any) => g.name).join(", ")}</span>
            <span>•</span>
            <span>
              {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
            </span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 italic mb-6">{details.tagline}</p>

          {/* User Score and Actions */}
          <div className="flex items-center gap-6 mb-8">
            {/* Score Circle */}
            <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {Math.round(details.vote_average * 10)}%
              </span>
            </div>
            <span className="font-semibold">User Score</span>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <span>♡</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <span>★</span>
              </button>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center"
              >
                <span>▶</span>
              </button>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <p className="text-gray-200 leading-relaxed">{details.overview}</p>
          </div>

          {/* Crew */}
          <div className="grid grid-cols-3 gap-4">
            {details.credits?.crew?.slice(0, 3).map((person: any) => (
              <div key={person.id}>
                <h4 className="font-bold">{person.name}</h4>
                <p className="text-sm text-gray-400">{person.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Popup */}
      {isVideoOpen && videos.length > 0 && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              ✕ Close
            </button>
            <div className="bg-black rounded-lg overflow-hidden">
              <YouTube
                videoId={videos[0].key}
                opts={{
                  height: "500",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsClient;
