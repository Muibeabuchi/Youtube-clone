import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { Videos, ChannelCard } from "../../components";

import { fetchFromApi } from "../../api/fetchRapid";
import { useQuery } from "react-query";

export default function ChannelDetail() {
  const { id } = useParams();

  const {
    isLoading: channeldeatialLoading,
    data: channeldetail,
    error,
  } = useQuery(["channeldetail", id], () =>
    fetchFromApi(`channels?part=snippet&id=${id}`)
  );
  const { isLoading: channelvideosLoading, data: channelvideos } = useQuery(
    ["channelvideo", id],
    () => fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
  );

  // console.log(channeldetail?.items[0]);
  // console.log(channelvideos);
  return (
    <Box sx={{ minHeight: "95vh" }}>
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,45,0.9668242296918768) 35%, rgba(0,212,255,1) 100%)",
            height: "300px",
            zIndex: 10,
          }}
        />
        <ChannelCard
          channelDetail={channeldetail?.items[0]}
          marginTop="-110px"
        />
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={channelvideos} />
      </Box>
    </Box>
  );
}
