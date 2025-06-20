import { singleChannelQueryOptions } from "@/utils/channel";
import { channelSectionInfoOptions } from "@/utils/channel-sections";
import { fetchChannelsUploadedVideosPlaylistItemOptions } from "@/utils/playlist-items";
import { channelPlaylistVideoOptions } from "@/utils/videos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/channel/$channelId/")({
  loader: async ({ context, params }) => {
    // Prefetch the data for the Videos page
    const channelId = params.channelId;
    const channelInfo = await context.queryClient.ensureQueryData(
      singleChannelQueryOptions(channelId)
    );

    const channelVideoPlaylistId =
      channelInfo.items?.[0].contentDetails.relatedPlaylists.uploads;

    const videoIds = await context.queryClient.ensureQueryData(
      fetchChannelsUploadedVideosPlaylistItemOptions(channelVideoPlaylistId)
    );
    const videoIdsString = videoIds.map((v) => v.videoId).join(",");

    context.queryClient.prefetchQuery(
      channelPlaylistVideoOptions(videoIdsString, params.channelId)
    );

    const channelSectionInfo = await context.queryClient.ensureQueryData(
      channelSectionInfoOptions(params.channelId)
    );

    console.log({ channelSectionInfo });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/channel/$channelId/"!</div>;
}
