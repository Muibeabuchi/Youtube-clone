export interface ChannelSectionTypes {
  kind: string;
  etag: string;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails?: ContentDetails;
}

type channelSectionSnippetType =
  | "singleplaylist"
  | "allplaylists"
  | "channelsectiontypeundefined"
  | "multiplechannels"
  | "recentuploads";

export interface Snippet {
  type: string & channelSectionSnippetType;
  channelId: string;
  title?: string;
  position: number;
}

export interface ContentDetails {
  playlists?: string[];
  channels?: string[];
}
