export type SearchType = "channel" | "video";

export type ChannelType = {
  searchType: "channel";
  thumbnail: string;
  channelTitle: string;
  channelDescription: string;
  channelTagName: string;
  channelSubCount: string;
  channelId: string;
};

export type VideoType = {
  searchType: "video";
  publishedAt: string;
  channelId: string;
  videoTitle: string;
  videoDescription: string;
  videoThumbnail: string;
  channelTitle: string;
  channelThumbnail: string | undefined;
  videoViewCount: string;
  duration: string;
};

// export interface SearchResult {
//   type: "video" | "channel";
//   // | "playlist";
//   id: string;
// }

// export interface VideoResult extends SearchResult {
//   type: "video";
//   title: string;
//   thumbnailUrl: string;
//   duration: string;
//   channelName: string;
//   channelHandle: string;
//   channelAvatar: string;
//   views: string;
//   uploadAge: string;
//   description: string;
//   badges?: string[];
//   verified?: boolean;
// }

// export interface ChannelResult extends SearchResult {
//   type: "channel";
//   channelName: string;
//   channelHandle: string;
//   channelAvatar: string;
//   subscriberCount: string;
//   description: string;
//   verified?: boolean;
//   subscribed?: boolean;
// }
