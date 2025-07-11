import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/ui/video-card";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video } from "@shared/schema";

interface VideosResponse {
  videos: Video[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function Videos() {
  const [, navigate] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("latest");

  const { data, isLoading } = useQuery<VideosResponse>({
    queryKey: ["/api/videos", { page: currentPage, filter: currentFilter }],
    queryFn: async () => {
      const response = await fetch(`/api/videos?page=${currentPage}&filter=${currentFilter}`);
      return response.json();
    },
  });

  const handleVideoClick = (videoId: number) => {
    // Open video in new tab
    window.open(`/video/${videoId}`, "_blank");
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filterButtons = [
    { key: "latest", label: "Latest" },
    { key: "popular", label: "Popular" },
    { key: "most-viewed", label: "Most Viewed" },
    { key: "favorite", label: "Favorite" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">
          All Videos
        </h1>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((filter) => (
            <Button
              key={filter.key}
              variant={currentFilter === filter.key ? "default" : "outline"}
              onClick={() => handleFilterChange(filter.key)}
              className="transition-colors"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {data?.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video.id)}
              />
            ))}
          </div>

          {data?.pagination && data.pagination.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {!isLoading && (!data?.videos || data.videos.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-foreground mb-2">
            No videos found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filter or check back later for new content.
          </p>
        </div>
      )}
    </main>
  );
}
