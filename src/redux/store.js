/*
 * @Author: Leo
 * @Date: 2022-09-29 21:01:41
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 21:06:16
 * @FilePath: \coding-challenge-frontend\src\redux\store.js
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './locationSlice'

export const store = configureStore({
  reducer: {
    location: locationSlice
  },
})