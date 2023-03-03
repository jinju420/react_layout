import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
	name: 'menu',
	initialState: {
		opne: false, //첨엔 안보이게
	},
	reducers: {
		close: (state) => {
			state.open = false;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});

export const { close, toggle } = menuSlice.actions;
export default menuSlice.reducer;
