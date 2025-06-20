import { channelSectionInfoOptions } from "@/utils/channel-sections";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/channel/$channelId/")({
  loader: async ({ context, params }) => {
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
