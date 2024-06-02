import * as React from "react";
import { Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack
      width={"100%"}
      height={"10vh"}
      bgcolor={"#a7c5e1"}
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        sx={{
          textTransform: "UpperCase",
          fontWeight: "bold",
          color: "#045494",
          fontSize: "22px",
        }}
      >
        Get Tickets here
      </Typography>
    </Stack>
  );
};

export default Navbar;
