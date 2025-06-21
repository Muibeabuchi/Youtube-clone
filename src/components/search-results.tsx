// import { useSearchParams } from "@tanstack/react-router"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {
//   getSearchResults,
//   type SearchResultItem,
//   type VideoResult,
//   type ChannelResult,
//   type PlaylistResult,
// } from "@/data/searchResultsData";
import { CheckCircle, Info, Menu, ChevronDown, Bell } from "lucide-react";
import { Link, useSearch } from "@tanstack/react-router";
import { ChannelResult, VideoResult } from "@/types/search/video-result";

export type SearchResultItem = VideoResult | ChannelResult;

function VideoResultCard({
  result,
  videoId,
  channelId,
}: {
  result: VideoResult;
  videoId: string;
  channelId: string;
}) {
  return (
    <div className="flex gap-4 mb-8 group">
      {/* Video Thumbnail */}
      <div className="relative flex-shrink-0">
        <Link to="/watch" search={{ v: videoId }}>
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={result.thumbnailUrl}
              alt={result.title}
              className="w-[360px] h-[202px] object-cover transition-all duration-200 group-hover:rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
              {result.duration}
            </div>
          </div>
        </Link>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0 pt-1">
        <Link to="/watch" search={{ v: videoId }}>
          <h3 className="text-xl font-normal text-white hover:text-blue-400 transition-colors line-clamp-2 mb-3 leading-6">
            {result.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <span>{result.views}</span>
          <span className="text-gray-600">•</span>
          <span>{result.uploadAge}</span>
          {/* {result.badges &&
            result.badges.map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700 border-0 px-2 py-0.5"
              >
                {badge}
              </Badge>
            ))} */}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Link to="/channel/$channelId" params={{ channelId }}>
            <img
              src={result.channelAvatar}
              alt={result.channelName}
              className="w-6 h-6 rounded-full hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link
            to="/channel/$channelId"
            params={{ channelId }}
            className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
          >
            {result.channelName}
          </Link>
          {result.verified && <CheckCircle className="w-4 h-4 text-gray-500" />}
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 leading-5 pr-4">
          {result.description}
        </p>
      </div>
    </div>
  );
}

function ChannelResultCard({
  result,
  channelId,
}: {
  result: ChannelResult;
  channelId: string;
}) {
  return (
    <div className="flex gap-6 mb-8 group">
      {/* Channel Avatar */}
      <div className="flex-shrink-0">
        <Link to="/channel/$channelId" params={{ channelId }}>
          <img
            src={result.channelAvatar}
            alt={result.channelName}
            className="w-[120px] h-[120px] rounded-full object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Channel Info */}
      <div className="flex-1 min-w-0 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/channel/$channelId" params={{ channelId }}>
            <h3 className="text-xl font-normal text-white hover:text-blue-400 transition-colors">
              {result.channelName}
            </h3>
          </Link>
          {result.verified && <CheckCircle className="w-5 h-5 text-gray-500" />}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <span className="font-medium">{result.channelHandle}</span>
          <span className="text-gray-600">•</span>
          <span>{result.subscriberCount}</span>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 mb-6 leading-5 max-w-2xl">
          {result.description}
        </p>

        <div>
          {result.subscribed ? (
            <Button
              variant="secondary"
              size="sm"
              className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 border-0"
            >
              <Bell className="w-4 h-4" />
              Subscribed
              <ChevronDown className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              Subscribe
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// function PlaylistResultCard({ result }: { result: PlaylistResult }) {
//   return (
//     <div className="flex gap-4 mb-8 group">
//       {/* Playlist Thumbnail */}
//       <div className="relative flex-shrink-0">
//         <Link href={`/playlist?list=${result.id}`}>
//           <div className="relative overflow-hidden rounded-xl">
//             <img
//               src={result.thumbnailUrl || "/placeholder.svg"}
//               alt={result.title}
//               className="w-[360px] h-[202px] object-cover transition-all duration-200 group-hover:rounded-lg"
//             />
//             <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
//               {result.videoCount} videos
//             </div>
//             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//               <div className="bg-black/80 text-white px-3 py-1 rounded text-sm font-medium">
//                 View playlist
//               </div>
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Playlist Info */}
//       <div className="flex-1 min-w-0 pt-1">
//         <Link href={`/playlist?list=${result.id}`}>
//           <h3 className="text-xl font-normal text-white hover:text-blue-400 transition-colors line-clamp-2 mb-3 leading-6">
//             {result.title}
//           </h3>
//         </Link>

//         <div className="flex items-center gap-3 mb-4">
//           <Link
//             href={`/channel/${result.channelHandle.replace("@", "")}`}
//             className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
//           >
//             {result.channelName}
//           </Link>
//           <span className="text-gray-600 text-sm">•</span>
//           <span className="text-sm text-gray-400">
//             {result.videoCount} videos
//           </span>
//         </div>

//         <p className="text-sm text-gray-400 line-clamp-2 leading-5 pr-4">
//           {result.description}
//         </p>
//       </div>
//     </div>
//   );
// }

function SearchResultCard({ result }: { result: SearchResultItem }) {
  switch (result.type) {
    case "video":
    //   return <VideoResultCard result={result} />;
    case "channel":
    //   return <ChannelResultCard result={result} />;
    // case "playlist":
    //   return <PlaylistResultCard result={result} />;
    default:
      return null;
  }
}

export function SearchResultsPage() {
  const searchParams = useSearch({
    from: "/results",
  });

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Results Header */}
        {/* <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Info className="w-4 h-4" />
              About these results
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-gray-500 rounded-full px-4 py-2">
              <Menu className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div> */}

        {/* Search Results */}
        <div className="space-y-0">
          {/* {results.map((result, index) => (
            <div
              key={result.id}
              className={
                index !== results.length - 1
                  ? "border-b border-gray-800/50 pb-6"
                  : ""
              }
            >
              <SearchResultCard result={result} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
