"use client";
import { RootState } from "@/redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, Paper, Divider } from "@mui/material";
import moment from "moment";
import { getList } from "@/API";
import useSWR from "swr";
import ICinemaName from "@/types/CinemaName";
import ISeatPrice from "@/types/SeatPrice";
import styles from "./TicketPage.module.css";

const fetchCinemaList = async () => {
  const response = await getList();
  return response.data.Tbl_CinemaList;
};

const fetchSeatPriceList = async () => {
  const response = await getList();
  return response.data.Tbl_SeatPrice;
};

const TicketPage = () => {
  const {
    selectedMovie,
    selectedCinemaRoom,
    selectedShowDate,
    selectedShowTime,
    selectedSeat,
  } = useSelector((state: RootState) => state.TicketSlice);
  const { data: seatPriceLists } = useSWR<ISeatPrice[]>(
    "seatPriceList",
    fetchSeatPriceList
  );

  const { data: cinemaList } = useSWR<ICinemaName[]>(
    "cinemaList",
    fetchCinemaList
  );

  const getSeatPrice = (rowName: string): number => {
    const seatPrice = seatPriceLists?.find(
      (price) =>
        price.RowName === rowName && price.RoomId === selectedCinemaRoom?.RoomId
    );
    return seatPrice ? Number(seatPrice.SeatPrice) : 0;
  };

  const totalVoucher = selectedSeat.reduce((total, seat) => {
    return total + getSeatPrice(seat.RowName);
  }, 0);

  return (
    <Box className={styles.boxContainer}>
      <Box className={styles.innerBox}>
        <Stack spacing={2}>
          <Typography className={styles.ticketNumber}>
            {Math.floor(Math.random() * 100000)}
          </Typography>
          <Typography className={styles.title}>Get Tickets Here</Typography>
          <Typography className={styles.subtitle}>Entrance Ticket</Typography>
          <Stack>
            <Typography className={styles.movieTitle}>
              {selectedMovie?.MovieTitle}
            </Typography>
            <Typography className={styles.cinemaDetails}>
              {
                cinemaList?.find(
                  (cinema) => cinema.CinemaId == selectedCinemaRoom?.CinemaId
                )?.CinemaName
              }{" "}
              - {selectedCinemaRoom?.RoomName}
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>
              {moment(selectedShowDate?.ShowDateTime).format("DD/MM/YYYY")}
            </Typography>
            <Typography>
              {moment(selectedShowTime?.ShowDateTime).format("hh:mm A")}
            </Typography>
          </Stack>
          <Paper elevation={2} style={{ padding: 16 }}>
            <Stack direction={"row"} width={"100%"} my={1}>
              <Stack width={"35%"}>
                <Typography fontWeight="bold">Seats</Typography>
              </Stack>

              <Stack
                width="65%"
                direction={"row"}
                justifyContent={"flex-end"}
                flexWrap={"wrap"}
              >
                {selectedSeat.map((v) => (
                  <Typography key={v.SeatId}>
                    {v.RowName}
                    {v.SeatNo}
                    {selectedSeat &&
                    selectedSeat[selectedSeat?.length - 1]?.SeatId == v.SeatId
                      ? ""
                      : ", "}
                  </Typography>
                ))}
              </Stack>
            </Stack>
            <Divider />
            <Box className={styles.totalBox}>
              <Typography variant="h6">Total : {totalVoucher} Kyats</Typography>
            </Box>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default TicketPage;
