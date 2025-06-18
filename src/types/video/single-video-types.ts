export interface SingleVideoType {
  kind: string;
  etag: string;
  items: SingleVideoItem[];
  pageInfo: PageInfo;
}

export interface SingleVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  status: Status;
  statistics: Statistics;
  player: Player;
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
  defaultLanguage: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

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
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface Player {
  embedHtml: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
