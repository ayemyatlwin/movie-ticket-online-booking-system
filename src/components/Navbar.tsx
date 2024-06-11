import * as React from "react";
import { Stack } from "@mui/material";
import { resetData } from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <Stack
      width={"100%"}
      height={"10vh"}
      bgcolor={"#a7c5e1"}
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <p
        style={{
          fontWeight: "bold",
          color: "#045494",
          fontSize: "22px",
          cursor: "pointer",
        }}
        onClick={() => {
          resetData();
          router.push("/");
        }}
      >
        Get Tickets Here
      </p>
    </Stack>
  );
};

export default Navbar;
