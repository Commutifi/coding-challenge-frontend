/*
 * @Author: Leo
 * @Date: 2022-09-29 21:03:23
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-02 15:55:12
 * @FilePath: \coding-challenge-frontend\src\redux\locationSlice.js
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lat: '',
    lon: '',
    isLocal: true
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
        state.lat = action.payload.lat;
        state.lon = action.payload.lon;
    },
    setIsLocal: (state, action) => {
      state.isLocal = action.payload.isLocal;
    }
  },
});

export const { changeLocation, setIsLocal } = locationSlice.actions

export default locationSlice.reducer