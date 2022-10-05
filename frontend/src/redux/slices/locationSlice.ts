import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import Helper from '../../helper';

const initialState: ILocation = {
  location: null,
  suggestions: [],
  status: 'IDLE',
};

export const getLocations = createAsyncThunk(
  'getLocations',
  async (key: string) => {
    const stream_result = await fetch(
      `http://localhost:5000/api/getlocations/${key}`
    );
    const result = await stream_result.json();
    return result;
  }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state: ILocation, action: PayloadAction<TLocation>) => {
      state.location = action.payload;
      return state;
    },
    setSuggestions: (state: ILocation, action: PayloadAction<Array<any>>) => {
      state.suggestions = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocations.pending, (state: ILocation) => {
      state.status = 'PENDING';
      return state;
    });

    builder.addCase(
      getLocations.fulfilled,
      (state: ILocation, action: PayloadAction<any>) => {
        console.log(action.payload);
        if (action.payload.status.code !== 200) {
          state.status = 'ERROR';
          state.message = action.payload.status.message;
          return state;
        }
        state.status = 'IDLE';
        state.suggestions = Helper.filterLocations(action.payload.results);
        return state;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { setLocation, setSuggestions } = locationSlice.actions;

export default locationSlice.reducer;
