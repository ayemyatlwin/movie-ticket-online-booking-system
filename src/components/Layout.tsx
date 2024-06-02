"use client";

import React from "react";
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
      <div
        style={{ backgroundColor: "#f5f5f5", height: "90vh", overflow: "auto" }}
      >
        {children}
      </div>
    </div>
  );
}
