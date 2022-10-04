import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TemperatureTypeProps } from 'redux/types/temperature';

const initialState: TemperatureTypeProps = {
	type: 'F',
};

export const TemperatureTypeSlice = createSlice({
	name: 'temperatureType',
	initialState,
	reducers: {
		setTemperatureType: (state, action: PayloadAction<string>) => {
			state.type = action.payload;
		},
	},
});

export const { setTemperatureType } = TemperatureTypeSlice.actions;
export default TemperatureTypeSlice.reducer;
