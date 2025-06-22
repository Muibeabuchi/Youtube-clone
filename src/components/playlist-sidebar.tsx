// "use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { getPlaylistById, type PlaylistVideo } from "@/data/playlistData"
import {
  MoreHorizontal,
  Repeat,
  Shuffle,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react";

import type { Video } from "@/types";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { watchPlaylistOptions } from "@/utils/playlist-items";

interface PlaylistSidebarProps {
  playlistId: string;
  currentVideoId: string;
  //   onVideoSelect: (videoId: string) => void;
  playlistTitle: string;
  playlistChannelName: string;
  currentPosition: number;
  playlist: {
    videoTitle: string;
    channelName: string;
    publishedDate: string;
    videoThumbnail: string;
    videoId: string;
    video: Video;
  }[];
}

interface PlaylistVideoItemProps {
  video: Video;
  VideoId: string;
  index: number;
  isCurrentVideo: boolean;
  playlistId: string;
}

function PlaylistVideoItem({
  video,
  VideoId,
  isCurrentVideo,
  playlistId,
  index,
}: PlaylistVideoItemProps) {
  return (
    <Link
      to="/watch"
      search={{
        v: VideoId,
        list: playlistId,
      }}
      className={`flex gap-3 p-2 rounded cursor-pointer transition-colors ${
        isCurrentVideo ? "bg-gray-800/80" : "hover:bg-gray-800/40"
      }`}
    >
      {/* Video Number */}
      <div className="flex-shrink-0 w-6 flex items-start justify-center pt-1">
        <span
          className={`text-sm ${
            isCurrentVideo ? "text-white font-medium" : "text-gray-400"
          }`}
        >
          {index + 1}
        </span>
      </div>

      {/* Video Thumbnail */}
      <div className="relative flex-shrink-0">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="w-32 h-[72px] object-cover rounded"
        />
        {isCurrentVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-600 rounded-sm p-1">
              <Play className="w-3 h-3 text-white fill-white" />
            </div>
          </div>
        )}
        <div className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1 py-0.5 rounded font-medium">
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm line-clamp-2 mb-1 ${
            isCurrentVideo ? "text-white font-medium" : "text-gray-200"
          }`}
        >
          {video.title}
        </h4>
        <p className="text-xs text-gray-400">{video.channelName}</p>
      </div>
    </Link>
  );
}

export function PlaylistSidebar({
  playlistId,
  currentVideoId,
  //   onVideoSelect,
  playlistTitle,
  playlistChannelName,
  playlist,
}: PlaylistSidebarProps) {
  const { data: playlistData } = useSuspenseQuery(watchPlaylistOptions());
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentPosition = playlistData.videoData.items.findIndex(
    (item) => item.id === currentVideoId
  );

  const playlistVideos = playlistData.videoData;
  //   const playlist = getPlaylistById(playlistId)

  //   if (!playlistId) {
  //     return null;
  //   }

  //   const currentVideoIndex = playlist.videos.findIndex(
  //     (video) => video.id === currentVideoId
  //   );
  //   const currentPosition = currentVideoIndex >= 0 ? currentVideoIndex + 1 : 1;

  return (
    <div className="w-[400px] bg-gray-900/50 rounded-lg overflow-hidden">
      {/* Playlist Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-lg line-clamp-2 mb-1">
              {playlistData.playlist.items?.[0].snippet.title}
            </h3>
            <p className="text-gray-400 text-sm">{playlistChannelName}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white flex-shrink-0 ml-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            {currentPosition}/{playlistData.videoData.items.length}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white w-8 h-8"
            >
              <Repeat className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white w-8 h-8"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white w-8 h-8"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Playlist Videos */}
      {!isCollapsed && (
        <div className="max-h-[600px] overflow-y-auto">
          <div className="p-2 space-y-1">
            {/* {playlistVideos.map((video, index) => (
              <PlaylistVideoItem
                key={video.id}
                video={video.snippet}
                index={index}
                isCurrentVideo={video.id === currentVideoId}
                playlistId={playlistId}
                VideoId={video.id}
              />
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
}
