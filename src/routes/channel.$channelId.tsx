import { videosQueryOptions } from "@/utils/videos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/channel/$channelId")({
  component: RouteComponent,
  async loader({ context, params }) {
    // grab the channelId from the Params
    const Id = params.channelId;
  },
});

function RouteComponent() {
  return <div>Hello "/$channelId"!</div>;
}
