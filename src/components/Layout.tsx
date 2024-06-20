"use client";

import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

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
            background:
              " linear-gradient(to bottom,#E5EEF6  0%, #A7C5E1  100%)",
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
