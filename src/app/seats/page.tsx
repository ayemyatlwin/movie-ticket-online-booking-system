"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedSeat } from "@/redux/slices/TicketSlice";
import ISeats from "@/types/Seats";
import data from "@/constants";
import { Box, Button, Typography, Stack } from "@mui/material";
import { RootState } from "@/redux/Store";

const SeatListPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedSeat } = useSelector((state: RootState) => state.TicketSlice);
  const [selectedSeats, setSelectedSeats] = useState<ISeats[]>([]);

  const handleSeatClick = (seat: ISeats) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s.SeatId !== seat.SeatId));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleDoneClick = () => {
    dispatch(setSelectedSeat(selectedSeats));
    console.log("selectedSeat REDUX ", selectedSeat);
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
              backgroundColor: selectedSeats.includes(seat)
                ? "#045494"
                : "#ccc",
              color: selectedSeats.includes(seat) ? "white" : "black",
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
      {/* Cinema Screen */}
      <Box position="relative" height={150} marginTop={2} marginBottom={4}>
        <Box
          position="absolute"
          top={0}
          left="33%"
          width={500}
          height={20}
          bgcolor="black"
        ></Box>
        <Box
          position="absolute"
          top={20}
          left="33%"
          width={0}
          height={0}
          borderLeft="250px solid transparent"
          borderRight="250px solid transparent"
          borderTop="150px solid gray"
        ></Box>
      </Box>

      {/* Seats */}
      {rows.map((rowName) => renderRow(rowName))}

      {/* Done Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleDoneClick}
        sx={{ marginTop: 2 }}
      >
        Done
      </Button>
    </Box>
  );
};

export default SeatListPage;
