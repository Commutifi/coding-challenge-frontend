/*
 * @Author: Leo
 * @Date: 2022-09-29 21:03:23
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 21:31:27
 * @FilePath: \coding-challenge-frontend\src\redux\locationSlice.js
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lat: '',
    lon: ''
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
        state.lat = action.payload.lat;
        state.lon = action.payload.lon;
    },
  },
});

export const { changeLocation } = locationSlice.actions

export default locationSlice.reducer