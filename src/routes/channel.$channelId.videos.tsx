import { VideoCard } from "@/components/video-card";
import {
  formatYouTubeViewCount,
  getYouTubePublishedDate,
  parseYouTubeDuration,
} from "@/lib/utils";
import { singleChannelQueryOptions } from "@/utils/channel";
import { fetchChannelsUploadedVideosPlaylistItemOptions } from "@/utils/playlist-items";
import { channelPlaylistVideoOptions } from "@/utils/videos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/channel/$channelId/videos")({
  async loader({ context, params }) {
    // grab the channelId from the Params
    const channelId = params.channelId;
    const channelInfo = await context.queryClient.ensureQueryData(
      singleChannelQueryOptions(channelId)
    );

    const channelVideoPlaylistId =
      channelInfo.items?.[0].contentDetails.relatedPlaylists.uploads;

    const videoIds = await context.queryClient.ensureQueryData(
      fetchChannelsUploadedVideosPlaylistItemOptions(channelVideoPlaylistId)
    );
    const videoIdsString = videoIds.join(",");

    await context.queryClient.ensureQueryData(
      channelPlaylistVideoOptions(videoIdsString, params.channelId)
    );
    return { videoIdsString };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { channelId } = Route.useParams();
  const { videoIdsString } = Route.useLoaderData();
  const { data: channelVideos } = useSuspenseQuery(
    channelPlaylistVideoOptions(videoIdsString, channelId)
  );
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {channelVideos.items.map((video) => {
          const videoInfo = {
            id: video.id,
            views: formatYouTubeViewCount(Number(video.statistics.viewCount)),
            likes: video.statistics.likeCount || "0",
            uploadDate: getYouTubePublishedDate(video.snippet.publishedAt),
            title: video.snippet.localized.title,
            description: video.snippet.description,
            thumbnail:
              video.snippet.thumbnails?.maxres?.url ||
              video.snippet.thumbnails?.high?.url,
            channelId: video.snippet.channelId,
          };
          return <VideoCard key={video.id} video={videoInfo} />;
        })}
      </div>
    </div>
  );

  //   return <div>Hello "/channel/$channelId/videos"!</div>;
}
