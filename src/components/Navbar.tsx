import * as React from "react";
import { resetData } from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar } from "@mui/material";
import HeaderText from "./Text/HeaderText";
import { useDispatch } from "react-redux";
import { getList } from "@/API";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      const response = await getList();
      console.log("data", response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  const data = fetchData();
  console.log("data", data);

  return (
    <AppBar
      position="static"
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
