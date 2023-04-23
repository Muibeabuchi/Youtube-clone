import { Box, CardMedia, Typography, CardContent } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../../utils/constants";

export default function ChannelCard({ channelDetail, marginTop }) {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop: marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              mb: 2,
              border: "1px solid #e3e3e3",
              borderRadius: "50%",
              height: "180px",
              width: "180px",
            }}
          ></CardMedia>
          <Typography variant="h6">
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: "14px", ml: "5px", color: "gray" }} />
          </Typography>
          {channelDetail?.statistics?.suscriberCount && (
            <Typography>
              {parseInt(channelDetail?.statistics?.subscriberCount)} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
}
