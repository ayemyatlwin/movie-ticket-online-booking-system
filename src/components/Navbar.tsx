import * as React from "react";
import { AppBar, Toolbar } from "@mui/material";
import HeaderText from "./Text/HeaderText";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#a7c5e1", height: "10vh", boxShadow: 4 }}
    >
      <Toolbar>
        <HeaderText text="Get Tickets Here" />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
