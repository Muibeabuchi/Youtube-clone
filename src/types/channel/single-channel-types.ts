export interface SingleChannelTypes {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  status: Status;
  brandingSettings: BrandingSettings;
  contentOwnerDetails: ContentOwnerDetails;
}

export interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

export interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface Status {
  privacyStatus: string;
  isLinked: boolean;
  longUploadsStatus: string;
  madeForKids: boolean;
}

export interface BrandingSettings {
  channel: Channel;
  image: Image;
}

export interface Channel {
  title: string;
  unsubscribedTrailer: string;
  country: string;
}

export interface Image {
  bannerExternalUrl?: string;
}

export interface ContentOwnerDetails {}
