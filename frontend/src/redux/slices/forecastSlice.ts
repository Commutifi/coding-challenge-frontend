import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import Helper from '../../helper';

const initialState: IForecastData = {
  data: [],
  history: [],
  status: 'IDLE',
  date: 0,
};

export const getForecastInfo = createAsyncThunk(
  'getForecastInfo',
  async ({
    location,
    lat,
    lon,
  }: {
    location: string;
    lat: number;
    lon: number;
  }) => {
    const stream_result = await fetch(
      `http://localhost:4004/api/getforecasts/${lat}/${lon}`
    );

    const result = await stream_result.json();
    return {
      ...result,
      location,
      status: stream_result.status,
      msg: stream_result.statusText,
    };
  }
);

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setDate: (state: IForecastData, action: PayloadAction<number>) => {
      state.date = action.payload;
      return state;
    },
    setData: (
      state: IForecastData,
      action: PayloadAction<Array<TForeastData>>
    ) => {
      state.data = action.payload;
      return state;
    },
    setHistory: (
      state: IForecastData,
      action: PayloadAction<Array<Array<TForeastData>>>
    ) => {
      state.history = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getForecastInfo.pending, (state: IForecastData) => {
      state.status = 'PENDING';
      return state;
    });

    builder.addCase(
      getForecastInfo.fulfilled,
      (state: IForecastData, action: PayloadAction<any>) => {
        if (action.payload.status !== 200) {
          state.status = 'ERROR';
          return state;
        }

        const data = Helper.addMoreInfo(
          action.payload.list,
          action.payload.location
        );
        state.history = [data, ...state.history].slice(0, 8);
        state.data = data;
        state.status = 'IDLE';
        return state;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { setDate, setData, setHistory } = forecastSlice.actions;

export default forecastSlice.reducer;
