import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "../../components";
import { useQuery } from "react-query";
import { fetchFromApi } from "../../api/fetchRapid";

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["selectedCategory", selectedCategory], () =>
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`, {
      enabled: false,
    })
  );
  // console.log(videos);

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 NerdkidChiki{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 2,
          height: "90vh",
          overflowY: "auto",
          ml: { xs: "15px", md: "10px" },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#fc1503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} isLoading={isLoading} />
      </Box>
    </Stack>
  );
}
