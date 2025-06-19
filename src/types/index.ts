export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelId: string;
  views: string;
  likes: string;
  uploadDate: string;
  duration?: string;
  channelName?: string;
  channelImageUrl?: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  verified: boolean;
}

export interface Comment {
  id: string;
  videoId: string;
  userName: string;
  userAvatar: string;
  text: string;
  likes: string;
  timestamp: string;
  replies?: Comment[];
}

// ================ACTUAL TYPES =================  //
export interface VideosType {
  kind: string;
  etag: string;
  items: Item[];
  nextPageToken: string;
  pageInfo: PageInfo;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  status: Status;
  statistics: Statistics;
  recordingDetails: RecordingDetails;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage?: string;
}

export interface Thumbnails {
  default: VideoImageUrl;
  medium: VideoImageUrl;
  high: VideoImageUrl;
  standard: VideoImageUrl;
  maxres: VideoImageUrl;
}

export interface VideoImageUrl {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: ContentRating;
  projection: string;
}

export interface ContentRating {}

export interface Status {
  uploadStatus: string;
  privacyStatus: string;
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
}

export interface Statistics {
  viewCount: string;
  likeCount?: string;
  favoriteCount: string;
  commentCount: string;
}

export interface RecordingDetails {}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
