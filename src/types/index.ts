export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelId: string;
  views: string;
  likes: string;
  uploadDate: string;
  duration: string;
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
