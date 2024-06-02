"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedSeat } from "@/redux/slices/TicketSlice";
import ISeats from "@/types/Seats";
import data from "@/constants";
import { Box, Button, Stack } from "@mui/material";
import { RootState } from "@/redux/Store";

const SeatListPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSeatClick = (seat: ISeats) => {
    if (selectedSeat.includes(seat)) {
      setSelectedSeat(selectedSeat.filter((s) => s.SeatId !== seat.SeatId));
      dispatch(
        setSelectedSeat(selectedSeat.filter((s) => s.SeatId !== seat.SeatId))
      );
    } else {
      setSelectedSeat([...selectedSeat, seat]);
      dispatch(setSelectedSeat([...selectedSeat, seat]));
    }
  };
  const { selectedSeat } = useSelector((state: RootState) => state.TicketSlice);
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
            sx={{
              backgroundColor: selectedSeat.includes(seat) ? "#045494" : "#ccc",
              color: selectedSeat.includes(seat) ? "white" : "black",
              border: "1px solid #333",
              borderRadius: "5px",
              padding: 1,
              cursor: "pointer",
              textAlign: "center",
              minWidth: seat.SeatType == "single" ? "40px" : "80px",
            }}
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
    <Box textAlign="center">
      <Box position="relative" height={150} marginTop={1} marginBottom={1}>
        <Box
          position="absolute"
          top={0}
          left="35%"
          width={400}
          height={20}
          bgcolor="black"
        ></Box>
        <Box
          position="absolute"
          top={20}
          left="35%"
          width={0}
          height={0}
          borderLeft="200px solid transparent"
          borderRight="200px solid transparent"
          borderTop="100px solid #d3d3d3"
        ></Box>
      </Box>

      {rows.map((rowName) => renderRow(rowName))}

      <Button variant="contained" color="primary" onClick={handleDoneClick}>
        Done
      </Button>
    </Box>
  );
};

export default SeatListPage;
