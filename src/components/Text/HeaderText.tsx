import { Typography } from "@mui/material";
import React from "react";

type Props = {
  text?: string;
  onClick?: () => void;
};

function HeaderText({ text, onClick }: Props) {
  return (
    <div onClick={() => onClick && onClick()}>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#045494",
          fontSize: "24px",
          letterSpacing: "1.5px",
        }}
      >
        {text}
      </Typography>
    </div>
  );
}

export default HeaderText;
