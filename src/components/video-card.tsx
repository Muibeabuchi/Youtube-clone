import { Link } from "@tanstack/react-router";
import type { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  layout?: "grid" | "horizontal";
  showChannel?: boolean;
}

export function VideoCard({
  video,
  layout = "grid",
  showChannel = true,
}: VideoCardProps) {
  if (layout === "horizontal") {
    return (
      <Link
        to="/watch"
        search={{
          v: video.channelId,
        }}
        className="flex gap-2"
      >
        <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden">
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            className="object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
          {showChannel && (
            <p className="text-xs text-muted-foreground mt-1">
              {video.channelName}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {video.views} views • {video.uploadDate}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/watch"
      search={{
        v: video.id,
      }}
      className="flex flex-col"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="object-cover"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        {video.channelImageUrl && (
          <Link
            to={`/channel/$channelId`}
            params={{
              channelId: video.channelId,
            }}
            className="flex-shrink-0"
          >
            <img
              src={video.channelImageUrl || "/placeholder.svg"}
              alt={video.channelName || "Channel"}
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>
        )}
        <div>
          <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
          {video.channelName && (
            <Link
              to={`/channel/$channelId`}
              params={{
                channelId: video.channelId,
              }}
              className="text-xs text-muted-foreground mt-1"
            >
              {video.channelName}
            </Link>
          )}
          <p className="text-xs text-muted-foreground">
            {video.views} views • {video.uploadDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
