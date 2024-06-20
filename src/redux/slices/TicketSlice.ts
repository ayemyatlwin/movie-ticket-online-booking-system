import ICinemaName from "@/types/CinemaName";
import ICinemaRoom from "@/types/CinemaRoom";
import IMovies from "@/types/Movies";
import ISeats from "@/types/Seats";
import IShowSchedule from "@/types/ShowSchedule";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TicketSliceState {
  selectedMovie: IMovies | null;
  selectedCinemaName: ICinemaName | null;
  selectedCinemaRoom: ICinemaRoom | null;
  selectedShowTime: IShowSchedule | null;
  selectedShowDate: IShowSchedule | null;
  selectedSeat: ISeats[];
}

const initialState: TicketSliceState = {
  selectedMovie: null,
  selectedCinemaName: null,
  selectedCinemaRoom: null,
  selectedShowTime: null,
  selectedShowDate: null,
  selectedSeat: [],
};
const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IMovies | null>) => {
      state.selectedMovie = action.payload;
    },
    setSelectedCinemaName: (
      state,
      action: PayloadAction<ICinemaName | null>
    ) => {
      state.selectedCinemaName = action.payload;
    },
    setSelectedCinemaRoom: (
      state,
      action: PayloadAction<ICinemaRoom | null>
    ) => {
      state.selectedCinemaRoom = action.payload;
    },
    setSelectedShowTime: (
      state,
      action: PayloadAction<IShowSchedule | null>
    ) => {
      state.selectedShowTime = action.payload;
    },
    setSelectedShowDate: (
      state,
      action: PayloadAction<IShowSchedule | null>
    ) => {
      state.selectedShowDate = action.payload;
    },
    setSelectedSeat: (state, action: PayloadAction<ISeats[]>) => {
      state.selectedSeat = action.payload;
    },

    resetData: (state) => {
      state.selectedMovie = null;
      state.selectedCinemaName = null;
      state.selectedCinemaRoom = null;
      state.selectedShowTime = null;
      state.selectedShowDate = null;
      state.selectedSeat = [];
    },
  },
});

export const {
  setSelectedMovie,
  setSelectedCinemaName,
  setSelectedCinemaRoom,
  setSelectedShowDate,
  setSelectedShowTime,
  setSelectedSeat,
  resetData,
} = TicketSlice.actions;
export default TicketSlice.reducer;
