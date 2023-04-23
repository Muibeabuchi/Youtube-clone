import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from "../../components";
import { useQuery } from "react-query";
import { fetchFromApi } from "../../api/fetchRapid";
import { useParams } from "react-router-dom";

export default function SearchFeed() {
  const { searchTerm } = useParams();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["searchTerm", searchTerm], () =>
    fetchFromApi(`search?part=snippet&q=${searchTerm}`, {
      enabled: false,
    })
  );
  // console.log(videos);

  return (
    <Box sx={{ flex: 2, height: "90vh", overflowY: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results For:{" "}
        <span style={{ color: "#fc1503" }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} isLoading={isLoading} />
    </Box>
  );
}
