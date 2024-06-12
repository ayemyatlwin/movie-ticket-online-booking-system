import * as React from "react";
import { resetData } from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar } from "@mui/material";
import HeaderText from "./Text/HeaderText";

const Navbar = () => {
  const router = useRouter();
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#a7c5e1", height: "10vh", boxShadow: 4 }}
    >
      <Toolbar>
        <HeaderText
          onClick={() => {
            resetData();
            router.push("/");
          }}
          text="Get Tickets Here"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
