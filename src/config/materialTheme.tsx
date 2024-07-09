import { createTheme } from "@mui/material/styles";
import Colors from "@/styles/Colors";

const fontSize = "15px";
const theme = createTheme({
  palette: {
    primary: {
      main: Colors.textColor,
    },
    secondary: {
      main: Colors.lightColor,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 14,
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: fontSize,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          button: {
            color: "#ffd700",
            border: "1px solid #ffd700",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: `0px `,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          verticalAlign: "baseline",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => {
          return {
            fontSize: fontSize,
          };
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& label": {
            fontSize: fontSize,
          },
        },
        input: {
          fontSize: fontSize,
        },
        listbox: {
          fontSize: fontSize,
        },
      },
    },
  },
});
export default theme;
