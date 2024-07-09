import React from "react";
import { Button } from "@mui/material";
import Colors from "@/styles/Colors";

type CancelButtonProps = {
  onClick?: () => void;
  style?: React.CSSProperties;
  buttonText?: string;
};
export default function CancelButton({
  onClick,
  style,
  buttonText = "Cancel",
}: CancelButtonProps) {
  return (
    <Button
      onClick={onClick}
      type={"button"}
      style={style}
      sx={{
        minWidth: 180,
        color: Colors.mainBgColor,
        borderColor: Colors.mainBgColor,
        borderRadius: 2,
        "&:hover": {
          color: Colors.mainBgColor,
          borderColor: Colors.mainBgColor,
        },
      }}
      variant="outlined"
    >
      {buttonText}
    </Button>
  );
}
