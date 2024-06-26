"use client";
import {
  setSelectedCinemaName,
  setSelectedCinemaRoom,
  setSelectedShowDate,
  setSelectedShowTime,
} from "@/redux/slices/TicketSlice";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
import IShowDates from "@/types/ShowDates";
import { Box, Button, Stack, Typography } from "@mui/material";
import styles from "./CinemaListPage.module.css";
import { getList } from "@/API";
import useSWR from "swr";
import ICinemaName from "@/types/CinemaName";
import ICinemaRoom from "@/types/CinemaRoom";
import { ScheduleDialog, HeaderText } from "@/components";
import Colors from "@/styles/Colors";

const fetchCinemaList = async () => {
  const response = await getList();
  return response.data.Tbl_CinemaList;
};
const fetchCinemaRoomList = async () => {
  const response = await getList();
  return response.data.Tbl_CinemaRoom;
};

const fetchMovieShowDateList = async () => {
  const response = await getList();
  return response.data.Tbl_MovieShowDate;
};

const CinemaListPage = () => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState<IShowDates[]>([]);
  const dispatch = useDispatch();
  const { data: cinemaList } = useSWR<ICinemaName[]>(
    "cinemaList",
    fetchCinemaList
  );
  const { data: cinemaRoomList } = useSWR<ICinemaRoom[]>(
    "cinemaRoom",
    fetchCinemaRoomList
  );
  const { data: movieShowDateList } = useSWR<IShowDates[]>(
    "movieShowDates",
    fetchMovieShowDateList
  );
  const { selectedMovie } = useSelector(
    (state: RootState) => state.TicketSlice
  );

  const getShowDate = useCallback(
    (cinemaId: number, roomId: number) => {
      let s: IShowDates[] = [];
      if (movieShowDateList) {
        s = movieShowDateList
          ?.filter(
            (v) =>
              v.CinemaId == cinemaId &&
              v.RoomId == roomId &&
              v.MovieId == selectedMovie?.MovieId
          )
          .map((date) => date);
      }
      return s;
    },
    [movieShowDateList]
  );

  const getRoomIdListOfSelectedMovie = movieShowDateList
    ?.filter((v) => v.MovieId == selectedMovie?.MovieId)
    .map((v) => v.RoomId);

  const getCinemaIdListOfSelectedMovie = movieShowDateList
    ?.filter((v) => v.MovieId == selectedMovie?.MovieId)
    .map((v) => v.CinemaId);

  return (
    <Stack className={styles.container}>
      <HeaderText text={`Choose Cinema for ${selectedMovie?.MovieTitle}`} />
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems="center"
      >
        {cinemaList?.map((cinema: ICinemaName, index: number) => {
          return getCinemaIdListOfSelectedMovie?.includes(cinema.CinemaId) ? (
            <Box key={index} className={styles.cinemaCard}>
              <Box className={styles.cinemaHeader}>
                <Typography variant="h6" color={"primary"}>
                  {cinema.CinemaName}
                </Typography>
              </Box>
              <Box className={styles.buttonGroup}>
                {cinemaRoomList?.map((r, idx) => {
                  return r?.CinemaId == cinema?.CinemaId &&
                    getRoomIdListOfSelectedMovie?.includes(r.RoomId) ? (
                    <Button
                      onClick={() => {
                        setShowDate(true);
                        dispatch(setSelectedCinemaName(cinema));
                        dispatch(setSelectedCinemaRoom(r));
                        dispatch(setSelectedShowDate(null));
                        dispatch(setSelectedShowTime(null));
                        if (selectedMovie) {
                          const dates = getShowDate(r.CinemaId, r.RoomId);
                          setAvailableDates(dates);
                        }
                      }}
                      variant="outlined"
                      sx={{
                        color: Colors.textColor,
                        minWidth: 150,
                        borderColor: Colors.textColor,
                        textTransform: "uppercase",
                        borderRadius: 2,
                        "&:hover": {
                          color: Colors.textColor,
                          borderColor: Colors.navbarBgColor,
                        },
                      }}
                    >
                      {r.RoomName}
                    </Button>
                  ) : null;
                })}
              </Box>
            </Box>
          ) : null;
        })}
      </Stack>
      <ScheduleDialog
        open={showDate}
        availableDates={availableDates}
        handleOnClose={() => setShowDate(false)}
      />
    </Stack>
  );
};

export default CinemaListPage;
