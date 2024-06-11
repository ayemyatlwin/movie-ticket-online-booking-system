"use client";
import data from "@/constants";
import {
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
import ScheduleDialog from "@/components/ScheduleDialog";

const CinemaListPage = () => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState<IShowDates[]>([]);
  const dispatch = useDispatch();
  const { selectedMovie } = useSelector(
    (state: RootState) => state.TicketSlice
  );

  const getShowDate = useCallback(
    (cinemaId: number, movieId: number, roomId: number) => {
      let s: IShowDates[] = [];
      s = data.movie_show_date
        .filter(
          (v) =>
            v.CinemaId == cinemaId && v.MovieId == movieId && v.RoomId == roomId
        )
        .map((date) => date);
      return s;
    },
    [data]
  );

  return (
    <Stack className={styles.container}>
      <Typography variant="h6" className={styles.title}>
        Choose Cinema for {selectedMovie?.MovieTitle}
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems="center"
      >
        {data.cinema_list.map((cinema, index) => {
          return (
            <Box key={index} className={styles.cinemaCard}>
              <Box className={styles.cinemaHeader}>
                <Typography variant="h6">{cinema.CinemaName}</Typography>
              </Box>
              <Box className={styles.buttonGroup}>
                {data.cinema_room.map((r, idx) => {
                  return r.CinemaId == cinema.CinemaId ? (
                    <Button
                      key={idx}
                      variant="contained"
                      className={styles.button}
                      onClick={() => {
                        setShowDate(true);
                        dispatch(setSelectedCinemaRoom(r));
                        dispatch(setSelectedShowDate(null));
                        dispatch(setSelectedShowTime(null));
                        if (selectedMovie) {
                          const dates = getShowDate(
                            r.CinemaId,
                            selectedMovie?.MovieId,
                            r.RoomId
                          );
                          setAvailableDates(dates);
                        }
                      }}
                    >
                      {r.RoomName}
                    </Button>
                  ) : null;
                })}
              </Box>
            </Box>
          );
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
