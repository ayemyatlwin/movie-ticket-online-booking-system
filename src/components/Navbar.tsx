import * as React from "react";
import { resetData } from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar } from "@mui/material";
import HeaderText from "./Text/HeaderText";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

 

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#a7c5e1", height: "10vh", boxShadow: 4 }}
    >
      <Toolbar>
        <HeaderText
          onClick={() => {
            dispatch(resetData());
            router.push("/");
          }}
          text="Get Tickets Here"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
