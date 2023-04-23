import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../../utils/constants";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <Stack
      p={2}
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        background: "#000",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
    </Stack>
  );
}
