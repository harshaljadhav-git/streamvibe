import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Flame, Clock } from "lucide-react";
import VideoCard from "@/components/ui/video-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video } from "@shared/schema";

export default function Home() {
  const [, navigate] = useLocation();
  
  const { data: popularVideos, isLoading: isLoadingPopular } = useQuery<Video[]>({
    queryKey: ["/api/videos/popular"],
  });

  const { data: latestVideos, isLoading: isLoadingLatest } = useQuery<Video[]>({
    queryKey: ["/api/videos/latest"],
  });

  const handleVideoClick = (videoId: number) => {
    // Open video in new tab
    window.open(`/video/${videoId}`, "_blank");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Popular This Week Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
          <Flame className="text-accent mr-3 h-8 w-8" />
          Popular This Week
        </h2>
        
        {isLoadingPopular ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularVideos?.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Latest Videos Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-4 sm:mb-0 flex items-center">
            <Clock className="text-secondary mr-3 h-8 w-8" />
            Latest Videos
          </h2>
          <button
            onClick={() => navigate("/videos")}
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All →
          </button>
        </div>

        {isLoadingLatest ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestVideos?.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
