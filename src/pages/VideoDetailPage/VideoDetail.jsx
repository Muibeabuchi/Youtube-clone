import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useQuery } from "react-query";
import { fetchFromApi } from "../../api/fetchRapid";
import { Videos } from "../../components/index";
import { demoChannelTitle } from "../../utils/constants";

export default function VideoDetail() {
  const { id } = useParams();
  const {
    data: videodetail,
    isLoading,
    error,
  } = useQuery(["videodetail", id], () =>
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
  );
  const { data: relatedVideos, isLoading: isLoadingRelatedvideos } = useQuery(
    ["relatedvideos", id],
    () => fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type='video`)
  );

  if (!videodetail) return "Loading...";
  // console.log(videodetail?.snippet);

  // const {
  //   snippet: { title, channelId },
  //   statistics: { viewCount, likeCount },
  // } = videodetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" fontWeight="bold" color="#fff" p={2}>
              {videodetail?.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="spaceBetween"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videodetail?.snippet?.channelId}`}>
                <Typography variant={{ sm: "subtitle", md: "h6" }} color="#fff">
                  {videodetail?.snippet?.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(
                    videodetail?.statistics?.viewCount
                  ).toLocaleString()}{" "}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(
                    videodetail?.statistics?.likeCount
                  ).toLocaleString()}{" "}
                  Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box py={{ md: 1, xs: 5 }} px={2}>
          <Videos videos={relatedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}
