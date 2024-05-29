"use client";
import data from "@/constants";
import {
  setSelectedCinemaRoom,
  setSelectedShowDate,
  setSelectedShowTime,
} from "@/redux/slices/TicketSlice";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";
import IShowSchedule from "@/types/ShowSchedule";
import IShowDates from "@/types/ShowDates";
import { Box, Button, Stack, Typography } from "@mui/material";
import BDialog from "@/components/Dialog";

const CinemaListPage = () => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState<IShowDates[]>([]);
  const [availableTimes, setAvailableTimes] = useState<IShowSchedule[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    selectedMovie,
    selectedCinemaRoom,
    selectedShowDate,
    selectedShowTime,
  } = useSelector((state: RootState) => state.TicketSlice);
  console.log("selectedCinemaRoom", selectedCinemaRoom);

  const getShowDate = useCallback(
    (c: any, m: any, r: any) => {
      let s: IShowDates[] = [];
      s = data.movie_show_date
        .filter((v) => v.CinemaId == c && v.MovieId == m && v.RoomId == r)
        .map((v) => v);

      console.log("DATES", s);

      return s;
    },
    [data]
  );

  const getShowTimes = useCallback((d: IShowDates) => {
    let times: IShowSchedule[] = [];
    times = data.movie_show_schedule
      .filter((v) => v.ShowDateId == d.ShowDateId)
      .map((v) => v);

    console.log("TIMES", times);

    return times;
  }, []);

  return (
    // <div>
    //   <h1>Cinema List</h1>
    //   {data.cinema_list.map((b, i) => {
    //     return (
    //       <p key={i}>
    //         {b.CinemaName}
    //         {data.cinema_room.map((v, i) => {
    //           return v.CinemaId == b.CinemaId ? (
    //             <button
    //               key={i}
    // onClick={() => {
    //   setShowDate(true);
    //   dispatch(setSelectedCinemaRoom(v));
    //   const dates = getShowDate(
    //     v.CinemaId,
    //     selectedMovie?.MovieId,
    //     v.RoomId
    //   );
    //   setAvailableDates(dates);
    // }}
    //             >
    //               {v.RoomName}
    //             </button>
    //           ) : null;
    //         })}
    //       </p>
    //     );
    //   })}
    //   {showDate ? (
    //     <div>
    //       <h1>Choose Date:</h1>
    //       {availableDates.map((d, k) => {
    //         const date = data.movie_show_schedule.find(
    //           (v) => v.ShowDateId == d.ShowDateId
    //         );
    //         return date ? (
    //           <p
    //             key={k}
    //             onClick={() => {
    //               setShowTime(true);
    //               dispatch(setSelectedShowDate(date));
    // const times = getShowTimes(d);
    // setAvailableTimes(times);
    //             }}
    //           >
    //             {date.ShowDate}
    //           </p>
    //         ) : null;
    //       })}
    //     </div>
    //   ) : null}
    //   {showDate && showTime ? (
    //     <div>
    //       <h1>Choose Time:</h1>
    //       {availableTimes.map((t, k) => (
    //         <p
    //           key={k}
    //           onClick={() => {
    //             dispatch(setSelectedShowTime(t));
    //             router.push("/seats");
    //           }}
    //         >
    //           {t.ShowTime}
    //         </p>
    //       ))}
    //     </div>
    //   ) : null}
    // </div>
    <>
      <Stack height="100%" width="100%" alignItems="center" p={2}>
        <Typography
          variant="h5"
          textAlign="center"
          my={2}
          color={"#045494"}
          fontWeight={"bold"}
        >
          Choose C Here
        </Typography>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          {data.cinema_list.map((c, i) => {
            return (
              <Box
                key={i}
                sx={{
                  width: "100%",
                  maxWidth: 600,
                  mb: 2,
                  display: "flex",
                  gap: 2,
                }}
              >
                <Typography variant="h6" mt={1} color={"#045494"}>
                  {c.CinemaName} -
                </Typography>
                <Stack direction="row" spacing={2} mt={1}>
                  {data.cinema_room.map((r, idx) => {
                    return r.CinemaId == c.CinemaId ? (
                      <Button
                        key={idx}
                        variant="contained"
                        sx={{
                          bgcolor: "#5b92c8",
                          "&:hover": {
                            bgcolor: "primary.dark",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          setShowDate(true);
                          dispatch(setSelectedCinemaRoom(r));
                          const dates = getShowDate(
                            r.CinemaId,
                            selectedMovie?.MovieId,
                            r.RoomId
                          );
                          setAvailableDates(dates);
                        }}
                      >
                        {r.RoomName}
                      </Button>
                    ) : null;
                  })}
                </Stack>
              </Box>
            );
          })}
        </Stack>
        <BDialog
          open={showDate}
          availableDates={availableDates}
          handleOnClose={() => setShowDate(false)}
        />
      </Stack>
    </>
  );
};

export default CinemaListPage;
