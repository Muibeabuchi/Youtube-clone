import { VideoGrid } from "@/components/video-grid";
import { dummyVideos } from "@/data/youtube-data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

export default function Home() {
  return (
    <div className="w-full">
      <VideoGrid videos={dummyVideos.slice(0, 24)} />
    </div>
  );
}
