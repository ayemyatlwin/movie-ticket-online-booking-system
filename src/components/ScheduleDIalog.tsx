"use client";
import React, { useCallback, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  DialogContent,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import IShowSchedule from "@/types/ShowSchedule";
import IShowDates from "@/types/ShowDates";
import {
  setSelectedShowDate,
  setSelectedShowTime,
} from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";
import moment from "moment";
import { getList } from "@/API";
import useSWR from "swr";
import Colors from "@/styles/Colors";
import { CancelButton, ProceedButton } from "./Button";

const fetchMovieScheduleList = async () => {
  const response = await getList();
  return response.data.Tbl_MovieSchedule;
};

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
export default function ScheduleDialog({
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

  const { data: movieScheduleList } = useSWR<IShowSchedule[]>(
    "MovieSchedule",
    fetchMovieScheduleList
  );

  const {
    selectedMovie,
    selectedCinemaRoom,
    selectedShowDate,
    selectedShowTime,
    selectedCinemaName,
  } = useSelector((state: RootState) => state.TicketSlice);
  const [availableTimes, setAvailableTimes] = useState<IShowSchedule[]>([]);

  const getShowTimes = useCallback(
    (chosenDateId: number | null) => {
      let times: IShowSchedule[] = [];
      if (movieScheduleList) {
        times = movieScheduleList
          ?.filter((schedule) => schedule.ShowDateId == chosenDateId)
          .map((time) => time);
      }
      return times;
    },
    [movieScheduleList]
  );

  const dateOptions = availableDates.map((availableDate) => {
    const schedule = movieScheduleList?.find(
      (date) => date.ShowDateId === availableDate.ShowDateId
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
            bgcolor: Colors.lightColor,
          },
        }}
      >
        <div
          style={{
            ...contentWrapperStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Stack justifyContent="center" p={1} alignItems="center" mb={2}>
            <Typography
              variant="h6"
              align="center"
              fontWeight={"bold"}
              color={Colors.mainBgColor}
            >
              Choose date and time for <br /> {selectedMovie?.MovieTitle},
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color={Colors.mainBgColor}
              fontWeight={"bold"}
            >
              in {selectedCinemaName?.CinemaName}{" "}
              {`( ${selectedCinemaRoom?.RoomName})`}
            </Typography>
          </Stack>
          <DialogContent
            dividers={true}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Stack spacing={2} alignItems="center">
              <FormControl sx={{ width: "100%", maxWidth: 300 }}>
                <Autocomplete
                  options={dateOptions}
                  renderOption={(props, option) => (
                    <li {...props} key={option?.ShowId}>
                      {moment(option?.ShowDateTime).format("DD/MM/YYYY")}
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
                  getOptionLabel={(option) =>
                    moment(option?.ShowDateTime).format("DD/MM/YYYY") || ""
                  }
                  sx={{ width: "100%" }}
                />
              </FormControl>
              <FormControl sx={{ width: "100%", maxWidth: 300 }}>
                <Autocomplete
                  options={availableTimes}
                  renderOption={(props, option) => (
                    <li {...props} key={option?.ShowId}>
                      {moment(option?.ShowDateTime).format("hh:mm A")}
                    </li>
                  )}
                  value={selectedShowTime}
                  onChange={(_, item) => dispatch(setSelectedShowTime(item))}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Please choose time" />
                  )}
                  getOptionLabel={(option) =>
                    moment(option?.ShowDateTime).format("hh:mm A") || ""
                  }
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
            <ProceedButton
              buttonText="Done"
              onClick={() => {
                handleClose();
                router.push("./seats");
              }}
              disabled={selectedShowTime && selectedShowDate ? false : true}
            />

            <CancelButton
              onClick={() => {
                handleClose();
                setSelectedShowDate(null);
                setSelectedShowTime(null);
              }}
            />
          </Stack>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}
