import { configureStore } from '@reduxjs/toolkit';
import TemperatureTypeSlice from 'redux/slices/temperatureType';

export const store = configureStore({
	reducer: {
		temperatureType: TemperatureTypeSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
