import { videosQueryOptions } from "@/utils/videos";
import { createFileRoute } from "@tanstack/react-router";

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

type TabType = "home" | "videos" | "shorts" | "live" | "playlists" | "posts";

export const Route = createFileRoute("/channel/$channelId")({
  component: RouteComponent,
  async loader({ context, params }) {
    // grab the channelId from the Params
    const Id = params.channelId;
  },
});

function RouteComponent() {
  const { channelId } = Route.useParams();
  return <div>Hello "/$channelId"! === {channelId}</div>;
}
