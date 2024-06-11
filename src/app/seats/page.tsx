"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedSeat } from "@/redux/slices/TicketSlice";
import ISeats from "@/types/Seats";
import data from "@/constants";
import { Box, Button, Stack, Typography } from "@mui/material";
import { RootState } from "@/redux/Store";
import styles from "./SeatListPage.module.css";

const SeatListPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { selectedSeat, selectedCinemaRoom } = useSelector(
    (state: RootState) => state.TicketSlice
  );

  const getSeatPrice = (rowName: string): number => {
    const seatPrice = data?.seat_price.find(
      (price) =>
        price.RowName === rowName && price.RoomId === selectedCinemaRoom?.RoomId
    );
    console.log("seatPrice", seatPrice);

    return seatPrice ? Number(seatPrice.SeatPrice) : 0;
  };

  const handleSeatClick = (seat: ISeats) => {
    if (selectedSeat.includes(seat)) {
      dispatch(
        setSelectedSeat(selectedSeat.filter((s) => s.SeatId !== seat.SeatId))
      );
    } else {
      dispatch(setSelectedSeat([...selectedSeat, seat]));
    }
  };

  const handleDoneClick = () => {
    router.push("./tickets");
  };

  const renderRow = (rowName: string) => {
    const seatsInRow = data.seat_lists.filter(
      (seat) => seat.RowName === rowName
    );
    return (
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        key={rowName}
        marginBottom={2}
      >
        {seatsInRow.map((seat) => (
          <Box
            key={seat.SeatId}
            onClick={() => handleSeatClick(seat)}
            className={`${styles.seat} ${
              selectedSeat.includes(seat) ? styles.selected : styles.unselected
            } ${
              seat.SeatType === "single" ? styles.singleSeat : styles.doubleSeat
            }`}
          >
            {seat.RowName}
            {seat.SeatNo}
          </Box>
        ))}
      </Stack>
    );
  };

  const rows = Array.from(new Set(data.seat_lists.map((seat) => seat.RowName)));

  return (
    <Box className={styles.container}>
      <Box className={styles.leftPane}>
        <Box className={styles.stageContainer}>
          <Box className={styles.stage}></Box>
          <Box className={styles.stageTriangle}></Box>
        </Box>

        {rows.map((rowName) => renderRow(rowName))}
      </Box>
      <Box className={styles.rightPane}>
        <Typography variant="h5">Selected Seats</Typography>
        <Box className={styles.selectedSeats}>
          {selectedSeat.map((seat) => (
            <Box key={seat.SeatId} className={styles.selectedSeatItem}>
              <Typography>
                {seat.RowName} {seat.SeatNo} - $ {getSeatPrice(seat.RowName)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            disabled={selectedSeat.length === 0 ? true : false}
            color="primary"
            onClick={() => dispatch(setSelectedSeat([]))}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            disabled={selectedSeat.length === 0 ? true : false}
            color="primary"
            onClick={handleDoneClick}
          >
            Proceed
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SeatListPage;
