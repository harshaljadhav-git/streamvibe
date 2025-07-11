import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useEffect } from "react";
import VideoPlayer from "@/components/ui/video-player";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { Video } from "@shared/schema";

export default function VideoPlayerPage() {
  const [, params] = useRoute("/video/:id");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const videoId = parseInt(params?.id || "0");

  const { data: video, isLoading } = useQuery<Video>({
    queryKey: ["/api/videos", videoId],
    queryFn: async () => {
      const response = await fetch(`/api/videos/${videoId}`);
      if (!response.ok) {
        throw new Error("Video not found");
      }
      return response.json();
    },
    enabled: !!videoId,
  });

  const trackViewMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/videos/${videoId}/view`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to track view");
      }
    },
    onSuccess: () => {
      // Invalidate and refetch video data to update view count
      queryClient.invalidateQueries({ queryKey: ["/api/videos", videoId] });
    },
  });

  const handleViewTracked = () => {
    trackViewMutation.mutate();
  };

  useEffect(() => {
    if (video) {
      document.title = `${video.title} - StreamVibe`;
    }
  }, [video]);

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </main>
    );
  }

  if (!video) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Video Not Found
            </h1>
            <p className="text-muted-foreground">
              The video you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <VideoPlayer
          videoUrl={video.videoUrl}
          title={video.title}
          views={video.views}
          onViewTracked={handleViewTracked}
        />

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{video.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDistanceToNow(new Date(video.datePosted), { addSuffix: true })}
              </div>
            </div>

            {video.description && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            )}

            {video.tags && video.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
