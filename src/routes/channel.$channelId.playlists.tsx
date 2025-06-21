import { formatYouTubeViewCount } from "@/lib/utils";
import { fetchChannelsVideosPlaylistOptions } from "@/utils/playlist";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/channel/$channelId/playlists")({
  async loader({ context, params }) {
    // grab the channelId from the Params
    const channelId = params.channelId;
    const channelInfo = await context.queryClient.ensureQueryData(
      fetchChannelsVideosPlaylistOptions(channelId)
    );

    return channelInfo;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { channelId } = Route.useParams();
  const { data: channelPlaylists } = useSuspenseQuery(
    fetchChannelsVideosPlaylistOptions(channelId)
  );

  if (channelPlaylists.length === 0) {
    return <div className="text-center pt-10">No Playlists</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* {playlist} */}
      {channelPlaylists.map((playlist) => (
        <>
          {/* <div dangerouslySetInnerHTML={{__html:playlist.player.embedHtml}} /> */}
          <Link
            key={playlist.id}
            to="/watch"
            search={{ v: playlist.FirstVideoId ?? "", list: playlist.id }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
              <img
                src={
                  playlist.snippet.thumbnails.maxres?.url ||
                  playlist.snippet.thumbnails.high?.url ||
                  playlist.snippet.thumbnails.medium?.url
                }
                alt={playlist.snippet.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatYouTubeViewCount(playlist.contentDetails.itemCount)}{" "}
                videos
              </div>
            </div>
            <h4 className="font-medium line-clamp-2 text-white group-hover:text-blue-400 transition-colors">
              {playlist.snippet.title}
            </h4>
            {/* <p className="text-sm text-gray-400 mt-1">
            {formatYouTubeViewCount(playlist.contentDetails.itemCount)} videos
          </p> */}
          </Link>
        </>
      ))}
    </div>
  );
}
