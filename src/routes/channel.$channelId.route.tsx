import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VideoCard } from "@/components/video-card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Users,
  Video,
  Eye,
  Share,
  Flag,
  Play,
  CheckCircle,
} from "lucide-react";
import { singleChannelQueryOptions } from "@/utils/channel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clampStringLength, formatYouTubeViewCount } from "@/lib/utils";

type TabType = "home" | "videos" | "playlists";

const tabs = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "playlists", label: "Playlists" },
] as const;

export const Route = createFileRoute("/channel/$channelId")({
  component: RouteComponent,
  async loader({ context, params }) {
    // grab the channelId from the Params
    const channelId = params.channelId;
    await context.queryClient.ensureQueryData(
      singleChannelQueryOptions(channelId)
    );
  },
});

function RouteComponent() {
  const { channelId } = Route.useParams();

  const { data } = useSuspenseQuery(singleChannelQueryOptions(channelId));
  const path = useLocation();
  const pathArray = path.pathname.split("/");
  const isNotLayoutPage = pathArray.length > 3;
  const tabUrl = (isNotLayoutPage ? pathArray[3] : "home") as TabType;
  // console.log({ pathArray, isNotLayoutPage, tabUrl });

  const channelInfo = data.items[0];

  const [activeTab, setActiveTab] = useState<TabType>(tabUrl);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showSubscribedDropdown, setShowSubscribedDropdown] = useState(false);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Tech Spurt
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInfoModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-400">
                <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white">T</span>
                </div>
                <span className="text-sm">tiktok.com/@techspurtvideo</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white">B</span>
                </div>
                <span className="text-sm text-blue-400">bsky.app/profile/techspurtvideo.bsky.social</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-700 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
                <span className="text-sm text-blue-400">amazon.co.uk/Chris-Barraclough/e/B005UGALE4</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="font-semibold mb-3">More info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>View email address</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>www.youtube.com/@TechSpurt</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Joined 1 May 2018</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>1.28M subscribers</span>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-gray-400" />
                  <span>2,187 videos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span>352,282,657 views</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4 flex gap-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Share className="w-4 h-4 mr-2" />
                Share channel
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Flag className="w-4 h-4 mr-2" />
                Report user
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Description Modal */}
      {/* <Dialog open={showDescriptionModal} onOpenChange={setShowDescriptionModal}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Tech Spurt
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDescriptionModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <div className="text-sm text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Expect in-depth tech reviews, comparisons, unboxings and hands-on features with fresh new UK
                  smartphones, laptops, wearables, apps and other new gadgets.
                </p>
                <p>
                  With over 15 years of experience reviewing technology, UK journalist Chris Barraclough has written for
                  Tech Radar and dozens of PC/smartphone publications, as well as editing Mobile Choice magazine. Like
                  Unbox Therapy, Supersaf, MKBHD and others, he also spent several years presenting tech-based YouTube
                  videos for the likes of Tech Radar and Recombu.
                </p>
                <p>
                  We don't just pull things out of boxes here. We dive deep into those smartphones, gaming machines,
                  smartwatches and other tech - Chris uses each device as it was intended for a proper real life review,
                  and doesn't just cover the shiny expensive stuff. You'll find budget kit as well, because we're not
                  all minted.
                </p>
                <p>Why not be a sport and give that subscribe button a jolly good poke too. Cheers!</p>
                <p>Email address provided for PR requests - we are NOT hiring editors, thumbnail artists etc!</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <h3 className="font-semibold mb-3">Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-400 hover:text-blue-300 text-sm">
                  TikTok shenanigans
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      {channelInfo.brandingSettings.image && (
        <div className="relative w-full h-32 sm:h-40 md:h-48  rounded-md px-20">
          <img
            src={channelInfo.brandingSettings.image?.bannerExternalUrl}
            alt={`${channelInfo.snippet.title} banner`}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 py-6  border-gray-800">
          <div className="flex items-start gap-6">
            <img
              src={
                channelInfo.snippet.thumbnails.high.url || "/placeholder.svg"
              }
              alt={channelInfo.snippet.title}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {channelInfo.snippet.title}
                </h1>
                <CheckCircle className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span>@{channelInfo.snippet.title}</span>
                <span>•</span>
                <span>
                  {formatYouTubeViewCount(
                    Number(channelInfo.statistics.subscriberCount)
                  )}{" "}
                  subscribers
                </span>
                <span>•</span>
                <span>
                  {formatYouTubeViewCount(
                    Number(channelInfo.statistics.videoCount)
                  )}{" "}
                  videos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-sm truncate">
                  {clampStringLength(channelInfo.snippet.description, 40)}
                </p>
                <button
                  onClick={() => setShowDescriptionModal(true)}
                  className="text-gray-400 hover:text-white text-sm font-medium"
                >
                  more
                </button>
              </div>
              <div className="flex items-center gap-4 mt-2">
                {/* <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  tiktok.com/@techspurtvideo
                </a> */}
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  and 2 more links
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-800">
          {tabs.map((tab) => {
            const indexPage = tab.id === "home";
            return (
              <Link
                key={tab.id}
                to={
                  indexPage
                    ? `/channel/$channelId`
                    : `/channel/$channelId/${tab.id}`
                }
                params={{
                  channelId,
                }}
              >
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-white text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <Outlet />
      </div>
    </div>
  );

  {
    /* return (
    // <div className="min-h-screen bg-[#0f0f0f] text-white">
    //   {/* Channel Banner */
  }
  //   <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
  //     <img
  //       src={channel.bannerUrl || "/placeholder.svg?height=256&width=1200"}
  //       alt={`${channel.channelName} banner`}
  //       className="w-full h-full object-cover"
  //     />
  //   </div>

  //   {/* Channel Info */}
  // <div className="max-w-7xl mx-auto px-6">
  //   <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 py-6 border-b border-gray-800">
  //     <div className="flex items-start gap-6">
  //       <img
  //         src={channel.profilePictureUrl || "/placeholder.svg"}
  //         alt={channel.channelName}
  //         className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover"
  //       />
  //       <div className="flex-1 min-w-0">
  //         <div className="flex items-center gap-2 mb-2">
  //           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
  //             {channel.channelName}
  //           </h1>
  //           <CheckCircle className="w-6 h-6 text-gray-400" />
  //         </div>
  //         <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
  //           <span>@TechSpurt</span>
  //           <span>•</span>
  //           <span>{channel.subscriberCount} subscribers</span>
  //           <span>•</span>
  //           <span>2.1K videos</span>
  //         </div>
  //         <div className="flex items-center gap-2">
  //           <p className="text-gray-400 text-sm">
  //             Expect in-depth tech reviews, comparisons, unboxings and
  //             hands-on features with fresh...
  //           </p>
  //           <button
  //             onClick={() => setShowDescriptionModal(true)}
  //             className="text-gray-400 hover:text-white text-sm font-medium"
  //           >
  //             more
  //           </button>
  //         </div>
  //         <div className="flex items-center gap-4 mt-2">
  //           <a
  //             href="#"
  //             className="text-blue-400 hover:text-blue-300 text-sm"
  //           >
  //             tiktok.com/@techspurtvideo
  //           </a>
  //           <button
  //             onClick={() => setShowInfoModal(true)}
  //             className="text-gray-400 hover:text-white text-sm"
  //           >
  //             and 2 more links
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  //     {/* Navigation Tabs */}
  //     <div className="flex gap-8 border-b border-gray-800">
  //       {tabs.map((tab) => (
  //         <button
  //           key={tab.id}
  //           onClick={() => setActiveTab(tab.id)}
  //           className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
  //             activeTab === tab.id
  //               ? "border-white text-white"
  //               : "border-transparent text-gray-400 hover:text-white"
  //           }`}
  //         >
  //           {tab.label}
  //         </button>
  //       ))}
  //     </div>

  //     {/* Tab Content */}
  //     {/* <div className="py-8">{renderTabContent()}</div> */}
  //   </div>

  //   {/* Channel Info Modal */}
  //   <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
  //     <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
  //       <DialogHeader>
  //         <DialogTitle className="flex items-center justify-between">
  //           Tech Spurt
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             onClick={() => setShowInfoModal(false)}
  //             className="text-gray-400 hover:text-white"
  //           >
  //             <X className="w-5 h-5" />
  //           </Button>
  //         </DialogTitle>
  //       </DialogHeader>
  //       <div className="space-y-4">
  //         <div className="space-y-3">
  //           <div className="flex items-center gap-3 text-blue-400">
  //             <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
  //               <span className="text-xs font-bold text-white">T</span>
  //             </div>
  //             <span className="text-sm">tiktok.com/@techspurtvideo</span>
  //           </div>
  //           <div className="flex items-center gap-3">
  //             <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
  //               <span className="text-xs font-bold text-white">B</span>
  //             </div>
  //             <span className="text-sm text-blue-400">
  //               bsky.app/profile/techspurtvideo.bsky.social
  //             </span>
  //           </div>
  //           <div className="flex items-center gap-3">
  //             <div className="w-6 h-6 bg-gray-700 rounded-sm flex items-center justify-center">
  //               <span className="text-xs font-bold text-white">A</span>
  //             </div>
  //             <span className="text-sm text-blue-400">
  //               amazon.co.uk/Chris-Barraclough/e/B005UGALE4
  //             </span>
  //           </div>
  //         </div>

  //         <div className="border-t border-gray-700 pt-4">
  //           <h3 className="font-semibold mb-3">More info</h3>
  //           <div className="space-y-3 text-sm">
  //             <div className="flex items-center gap-3">
  //               <Mail className="w-4 h-4 text-gray-400" />
  //               <span>View email address</span>
  //             </div>
  //             <div className="flex items-center gap-3">
  //               <Globe className="w-4 h-4 text-gray-400" />
  //               <span>www.youtube.com/@TechSpurt</span>
  //             </div>
  //             <div className="flex items-center gap-3">
  //               <MapPin className="w-4 h-4 text-gray-400" />
  //               <span>United Kingdom</span>
  //             </div>
  //             <div className="flex items-center gap-3">
  //               <Calendar className="w-4 h-4 text-gray-400" />
  //               <span>Joined 1 May 2018</span>
  //             </div>
  //             <div className="flex items-center gap-3">
  //               <Users className="w-4 h-4 text-gray-400" />
  //               <span>1.28M subscribers</span>
  //             </div>
  //             <div className="flex items-center gap-3">
  //               <Video className="w-4 h-4 text-gray-400" />
  //               <span>2,187 videos</span>
  //             </div>
  //             <div className="flex items-center gap-3">
  //               <Eye className="w-4 h-4 text-gray-400" />
  //               <span>352,282,657 views</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="border-t border-gray-700 pt-4 flex gap-4">
  //           <Button
  //             variant="ghost"
  //             size="sm"
  //             className="text-gray-300 hover:text-white"
  //           >
  //             <Share className="w-4 h-4 mr-2" />
  //             Share channel
  //           </Button>
  //           <Button
  //             variant="ghost"
  //             size="sm"
  //             className="text-gray-300 hover:text-white"
  //           >
  //             <Flag className="w-4 h-4 mr-2" />
  //             Report user
  //           </Button>
  //         </div>
  //       </div>
  //     </DialogContent>
  //   </Dialog>

  //   {/* Description Modal */}
  //   <Dialog
  //     open={showDescriptionModal}
  //     onOpenChange={setShowDescriptionModal}
  //   >
  //     <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
  //       <DialogHeader>
  //         <DialogTitle className="flex items-center justify-between">
  //           Tech Spurt
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             onClick={() => setShowDescriptionModal(false)}
  //             className="text-gray-400 hover:text-white"
  //           >
  //             <X className="w-5 h-5" />
  //           </Button>
  //         </DialogTitle>
  //       </DialogHeader>
  //       <div className="space-y-4">
  //         <div>
  //           <h3 className="font-semibold mb-3">Description</h3>
  //           <div className="text-sm text-gray-300 space-y-4 leading-relaxed">
  //             <p>
  //               Expect in-depth tech reviews, comparisons, unboxings and
  //               hands-on features with fresh new UK smartphones, laptops,
  //               wearables, apps and other new gadgets.
  //             </p>
  //             <p>
  //               With over 15 years of experience reviewing technology, UK
  //               journalist Chris Barraclough has written for Tech Radar and
  //               dozens of PC/smartphone publications, as well as editing
  //               Mobile Choice magazine. Like Unbox Therapy, Supersaf, MKBHD
  //               and others, he also spent several years presenting tech-based
  //               YouTube videos for the likes of Tech Radar and Recombu.
  //             </p>
  //             <p>
  //               We don't just pull things out of boxes here. We dive deep into
  //               those smartphones, gaming machines, smartwatches and other
  //               tech - Chris uses each device as it was intended for a proper
  //               real life review, and doesn't just cover the shiny expensive
  //               stuff. You'll find budget kit as well, because we're not all
  //               minted.
  //             </p>
  //             <p>
  //               Why not be a sport and give that subscribe button a jolly good
  //               poke too. Cheers!
  //             </p>
  //             <p>
  //               Email address provided for PR requests - we are NOT hiring
  //               editors, thumbnail artists etc!
  //             </p>
  //           </div>
  //         </div>
  //         <div className="border-t border-gray-700 pt-4">
  //           <h3 className="font-semibold mb-3">Links</h3>
  //           <div className="space-y-2">
  //             <a
  //               href="#"
  //               className="block text-blue-400 hover:text-blue-300 text-sm"
  //             >
  //               TikTok shenanigans
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // </div>

  // <p>Hello</p>
  // );
}
