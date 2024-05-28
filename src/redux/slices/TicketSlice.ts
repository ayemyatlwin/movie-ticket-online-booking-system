import IMovies from "@/types/Movies";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TicketSliceState {
  selectedMovie: IMovies | null;
}

const initialState: TicketSliceState = {
  selectedMovie: null,
};
const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IMovies | null>) => {
      state.selectedMovie = action.payload;
    },

    resetData: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const {
  setSelectedMovie,

  resetData,
} = TicketSlice.actions;
export default TicketSlice.reducer;
