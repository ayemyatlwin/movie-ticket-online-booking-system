"use client";
import data from "@/constants";
import { RootState } from "@/redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, Paper, Divider } from "@mui/material";
import moment from "moment";

const TicketPage = () => {
  const {
    selectedMovie,
    selectedCinemaRoom,
    selectedShowDate,
    selectedShowTime,
    selectedSeat,
  } = useSelector((state: RootState) => state.TicketSlice);
  console.log("selectedSeat", selectedSeat);

  const getSeatPrice = (rowName: string): number => {
    const seatPrice = data?.seat_price.find(
      (price) =>
        price.RowName === rowName && price.RoomId === selectedCinemaRoom?.RoomId
    );
    console.log("seatPrice", seatPrice);

    return seatPrice ? Number(seatPrice.SeatPrice) : 0;
  };

  const totalVoucher = selectedSeat.reduce((total, seat) => {
    return total + getSeatPrice(seat.RowName);
  }, 0);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          padding: 3,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center">
            {selectedMovie?.MovieTitle}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            textAlign="center"
            color="textSecondary"
          >
            {data.cinema_list.map((v) =>
              v.CinemaId === selectedCinemaRoom?.CinemaId ? v.CinemaName : ""
            )}
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            {moment(selectedShowDate?.ShowDate, "YYYY-MM-DD").format(
              "DD/MM/YYYY"
            )}
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            {moment(selectedShowTime?.ShowTime, "HH:mm:ss").format("hh:mm A")}
          </Typography>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {selectedSeat.map((v) => (
                <Box
                  key={v.SeatId}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight="bold">
                    {v.RowName}
                    {v.SeatNo}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    ${getSeatPrice(v.RowName)}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6" fontWeight="bold">
                  Total : ${totalVoucher}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default TicketPage;
