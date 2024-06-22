import React from "react";
import { Button } from "@mui/material";
import Colors from "@/styles/Colors";

type ProceedButtonProps = {
  onClick?: () => void;
  style?: React.CSSProperties;
  buttonText: string;
  disabled?: boolean;
};
export default function ProceedButton({
  onClick,
  style,
  buttonText,
  disabled = false,
}: ProceedButtonProps) {
  return (
    <Button
      onClick={onClick}
      type={"button"}
      style={style}
      disabled={disabled}
      sx={{
        bgcolor: Colors.textColor,
        color: Colors.mainBgColor,
        minWidth: 180,
        borderRadius: 2,

        "&:hover": {
          bgcolor: Colors.textColor,
          color: Colors.mainBgColor,
        },
      }}
      variant="contained"
    >
      {buttonText}
    </Button>
  );
}
