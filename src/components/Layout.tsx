"use client";

import React from "react";
import { Box } from "@mui/material";
import Colors from "@/styles/Colors";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <Box
          sx={{
            background: Colors.mainBgColor,
            height: "100%",
            overflow: "auto",
            pt: 10,
            pb: 3,
          }}
        >
          {children}
        </Box>
      </div>
    </div>
  );
}
