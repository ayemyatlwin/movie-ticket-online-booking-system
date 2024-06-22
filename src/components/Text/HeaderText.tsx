import Colors from "@/styles/Colors";
import { Typography } from "@mui/material";
import React from "react";

type Props = {
  text?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

function HeaderText({ text, onClick, style }: Props) {
  return (
    <div style={{ cursor: "pointer" }} onClick={() => onClick && onClick()}>
      <Typography
        style={{
          textTransform: "uppercase",
          fontWeight: "bold",
          color: Colors.textColor,
          fontSize: "24px",
          letterSpacing: "1px",
          ...style,
        }}
      >
        {text}
      </Typography>
    </div>
  );
}

export default HeaderText;
