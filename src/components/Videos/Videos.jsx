import { Box, Stack, Typography } from "@mui/material";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

export default function Videos({ videos, isLoading, direction }) {
  // console.log(videos?.items);
  if (isLoading || videos?.length < 1)
    return <Typography sx={{ minHeight: "90vh" }}>Loading ...</Typography>;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      gap={2}
      justifyContent="start"
      marginX="auto"
      sx={{ minHeight: "90vh" }}
    >
      {videos?.items?.map((video, index) => {
        return (
          <Box key={index}>
            {video?.id?.videoId && <VideoCard video={video} />}
            {video?.id?.channelId && <ChannelCard channelDetail={video} />}
          </Box>
        );
      })}
    </Stack>
  );
}
