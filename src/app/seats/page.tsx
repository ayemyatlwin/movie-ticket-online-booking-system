"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedSeat } from "@/redux/slices/TicketSlice";
import ISeats from "@/types/Seats";
import { RootState } from "@/redux/Store";
import styles from "./SeatListPage.module.css";
import { getList } from "@/API";
import ISeatPrice from "@/types/SeatPrice";
import useSWR from "swr";
import Image from "next/image";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Colors from "@/styles/Colors";
import { CancelButton, HeaderText, ProceedButton } from "@/components";

const fetchSeatList = async () => {
  const response = await getList();
  return response.data.Tbl_RoomSeat;
};

const fetchSeatPriceList = async () => {
  const response = await getList();
  return response.data.Tbl_SeatPrice;
};

const SeatListPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: seatLists } = useSWR<ISeats[]>("seatList", fetchSeatList);
  const { data: seatPriceLists } = useSWR<ISeatPrice[]>(
    "seatPriceList",
    fetchSeatPriceList
  );

  const { selectedSeat, selectedCinemaRoom } = useSelector(
    (state: RootState) => state.TicketSlice
  );

  const handleSeatClick = (seat: ISeats) => {
    if (selectedSeat.includes(seat)) {
      dispatch(
        setSelectedSeat(selectedSeat.filter((s) => s.SeatId !== seat.SeatId))
      );
    } else {
      dispatch(setSelectedSeat([...selectedSeat, seat]));
    }
  };
  const handleDelete = (seat: ISeats) => {
    if (selectedSeat.includes(seat)) {
      dispatch(
        setSelectedSeat(selectedSeat.filter((s) => s.SeatId !== seat.SeatId))
      );
    }
  };
  const handleOnClickClear = () => {
    dispatch(setSelectedSeat([]));
  };
  const handleOnClickProceed = () => {
    router.push("./tickets");
  };

  const groupedSeats = seatLists?.reduce((acc, seat) => {
    if (seat.RoomId === selectedCinemaRoom?.RoomId) {
      if (!acc[seat.RowName]) {
        acc[seat.RowName] = [];
      }
      acc[seat.RowName].push(seat);
    }
    return acc;
  }, {} as Record<string, ISeats[]>);

  const sortedRowNames = groupedSeats
    ? Object.keys(groupedSeats).sort((a, b) => a.localeCompare(b))
    : [];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <Stack
          style={{
            borderTop: `1px solid ${Colors.borderScreen}`,
            borderBottom: `1px solid ${Colors.borderScreen}`,
            padding: "5px",
            width: "300px",
            textAlign: "center",
          }}
        >
          <HeaderText text="Screen" />
        </Stack>
      </div>
      <div style={{ textAlign: "center" }}>
        <Image width={1000} height={60} alt="tv" src={"/images/tv.png"} />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Stack
          style={{
            borderTop: `1px solid ${Colors.borderScreen}`,
            borderBottom: `1px solid ${Colors.borderScreen}`,
            padding: "5px",
            width: "300px",
            textAlign: "center",
          }}
        >
          <HeaderText text="Silver Plus" />
        </Stack>
      </div>
      {sortedRowNames.map((rowName) => (
        <div key={rowName}>
          <div className={styles.row}>
            {groupedSeats &&
              groupedSeats[rowName].map((seat) => (
                <div
                  key={seat.SeatId}
                  className={styles.seat}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.SeatNo !== null ? (
                    <>
                      {seat.SeatType == "single" ? (
                        <Image
                          className={styles.seatImage}
                          width={30}
                          height={20}
                          alt="seat"
                          src={
                            selectedSeat.includes(seat)
                              ? "/images/chosen_seat.png"
                              : "/images/seat.png"
                          }
                        />
                      ) : (
                        <Image
                          className={styles.seatImage}
                          width={40}
                          height={20}
                          alt="seat"
                          src={
                            selectedSeat.includes(seat)
                              ? "/images/chosen_double_seat.png"
                              : "/images/double_seat.png"
                          }
                        />
                      )}

                      <div
                        className={
                          selectedSeat.includes(seat)
                            ? styles.selectedSeatText
                            : styles.seatText
                        }
                      >
                        {`${seat.RowName}${seat.SeatNo}`}
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptySeat}></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
      {selectedSeat.length > 0 ? (
        <>
          {" "}
          <div style={{ padding: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={"20%"} align="center">
                    <Typography fontWeight={"bold"} color={Colors.textColor}>
                      Selected Seats
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight={"bold"} color={Colors.textColor}>
                      Price
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={"bold"} color={Colors.textColor}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedSeat?.map((s) => {
                  return (
                    <TableRow key={s.SeatId}>
                      <TableCell
                        align="center"
                        sx={{ color: Colors.textColor }}
                      >
                        {s.RowName} {s.SeatNo}
                      </TableCell>
                      <TableCell align="right" sx={{ color: Colors.textColor }}>
                        {
                          seatPriceLists?.find(
                            (p) =>
                              p.RowName == s.RowName && p.RoomId == s.RoomId
                          )?.SeatPrice
                        }
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleDelete(s)}>
                          <Image
                            width={20}
                            height={20}
                            alt="delete"
                            src={"/icons/delete.png"}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align="center" sx={{ color: Colors.textColor }}>
                    TOTAL
                  </TableCell>
                  <TableCell align="right" sx={{ color: Colors.textColor }}>
                    {" "}
                    {selectedSeat.reduce((total, seat) => {
                      const seatPrice =
                        seatPriceLists?.find(
                          (p) =>
                            p.RowName === seat.RowName &&
                            p.RoomId == seat.RoomId
                        )?.SeatPrice || 0;
                      return total + Number(seatPrice);
                    }, 0)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-end"}
            px={4}
          >
            <CancelButton
              buttonText="Clear"
              onClick={() => handleOnClickClear()}
              style={{
                color: Colors.textColor,
                borderColor: Colors.textColor,
              }}
            />
            <ProceedButton
              buttonText="Proceed"
              onClick={() => handleOnClickProceed()}
            />
          </Stack>
        </>
      ) : null}
    </div>
  );
};

export default SeatListPage;
