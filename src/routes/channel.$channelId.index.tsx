import { singleChannelQueryOptions } from "@/utils/channel";
import { fetchChannelsUploadedVideosPlaylistItemOptions } from "@/utils/playlist-items";
import {
  channelPlaylistVideoOptions,
  singleVideoQueryOptions,
} from "@/utils/videos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/channel/$channelId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/channel/$channelId/"!</div>;
}
