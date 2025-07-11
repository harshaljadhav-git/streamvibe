import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Eye, Star, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const timeAgo = formatDistanceToNow(new Date(video.datePosted), { addSuffix: true });

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        {video.datePosted && 
          new Date(video.datePosted).getTime() > Date.now() - 48 * 60 * 60 * 1000 && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
            NEW
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {formatViews(video.views)} views
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {timeAgo}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{video.category}</Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-muted-foreground">
              {(4.0 + Math.random() * 1).toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
