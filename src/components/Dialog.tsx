"use client";
import React, { useCallback, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  DialogContent,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import data from "@/constants";
import IShowSchedule from "@/types/ShowSchedule";
import IShowDates from "@/types/ShowDates";
import {
  setSelectedShowDate,
  setSelectedShowTime,
} from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    position: "absolute",
  },
}));
interface Props {
  handleOnClose?: () => void;
  open?: boolean;
  title?: string;
  onSubmit?: () => void;
  style?: React.CSSProperties;
  contentWrapperStyle?: React.CSSProperties | null;
  availableDates: IShowDates[];
}
export default function BDialog({
  handleOnClose,
  open = false,
  style,
  contentWrapperStyle,
  availableDates,
}: Props) {
  const handleClose = () => {
    if (handleOnClose) handleOnClose();
  };
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    selectedMovie,
    selectedCinemaRoom,
    selectedShowDate,
    selectedShowTime,
  } = useSelector((state: RootState) => state.TicketSlice);
  const [availableTimes, setAvailableTimes] = useState<IShowSchedule[]>([]);

  const getShowTimes = useCallback((d: number | null) => {
    let times: IShowSchedule[] = [];
    times = data.movie_show_schedule
      .filter((v) => v.ShowDateId == d)
      .map((v) => v);

    console.log("TIMES", times);

    return times;
  }, []);

  const dateOptions = availableDates.map((v) => {
    const schedule = data.movie_show_schedule.find(
      (f) => f.ShowDateId === v.ShowDateId
    );

    return schedule ? schedule : null;
  });

  return (
    <React.Fragment>
      <BootstrapDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        scroll="paper"
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="scroll-dialog-title"
        style={style}
        PaperProps={{
          sx: {
            minWidth: 500,
            minHeight: 300,
            borderRadius: 3,
            p: 3,
            bgcolor: "background.paper",
          },
        }}
      >
        <div
          style={{
            ...contentWrapperStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            p={1}
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" align="center" color="primary">
              {
                data.cinema_list.find(
                  (f) => f.CinemaId === selectedCinemaRoom?.CinemaId
                )?.CinemaName
              }{" "}
              - Room {selectedCinemaRoom?.RoomNumber}
            </Typography>
          </Stack>
          <DialogContent
            dividers={true}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Typography variant="body1" gutterBottom>
              Choose Date and Time
            </Typography>
            <Stack spacing={2} mb={2} alignItems="center">
              <FormControl sx={{ width: "100%", maxWidth: 300 }}>
                <Autocomplete
                  options={dateOptions}
                  renderOption={(props, option) => (
                    <li {...props} key={option?.ShowId}>
                      {option?.ShowDate}
                    </li>
                  )}
                  value={selectedShowDate}
                  onChange={(_, item) => {
                    dispatch(setSelectedShowDate(item));
                    const times = getShowTimes(item?.ShowDateId || null);
                    setAvailableTimes(times);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Please choose date" />
                  )}
                  getOptionLabel={(option) => option?.ShowDate || ""}
                  sx={{ width: "100%" }}
                />
              </FormControl>
              <FormControl sx={{ width: "100%", maxWidth: 300 }}>
                <Autocomplete
                  options={availableTimes}
                  renderOption={(props, option) => (
                    <li {...props} key={option?.ShowId}>
                      {option?.ShowTime}
                    </li>
                  )}
                  value={selectedShowTime}
                  onChange={(_, item) => dispatch(setSelectedShowTime(item))}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Please choose time" />
                  )}
                  getOptionLabel={(option) => option?.ShowTime || ""}
                  sx={{ width: "100%" }}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
            mt={3}
          >
            <Button
              onClick={() => {
                console.log(
                  ` ${selectedMovie?.MovieTitle} ${selectedCinemaRoom?.RoomName} ${selectedShowDate?.ShowDate} ${selectedShowTime?.ShowTime}`
                );
                handleClose();
                router.push("./seats");
              }}
              variant="contained"
              sx={{
                bgcolor: "#5b92c8",
                minWidth: 180,
                "&:hover": {
                  bgcolor: "primary.dark",
                  color: "white",
                },
              }}
            >
              Done
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                setSelectedShowDate(null);
                setSelectedShowTime(null);
              }}
              sx={{
                bgcolor: "#5b92c8",
                minWidth: 180,
                "&:hover": {
                  bgcolor: "primary.dark",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
          </Stack>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}
