import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달받고 첫번째 인수로 넣은 문자값으로 내부액션타입을 자동생성해 액션객체를 생성해주는 함수
export const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
	const playlistId = 'PLY0voYdGZtAipraMUx-_pnepD9KKaUDdm';
	const num = 8;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		//요청에 대한 로딩
		isLoading: false,
	},
	extraReducers: {
		//데이터 요청시작에 대한 데이터 상태처리 =>응답받기전
		[fetchYoutube.pending]: (state) => {
			//로딩중
			state.isLoading = true;
		},
		//데이터응답성공
		[fetchYoutube.fulfilled]: (state, action) => {
			//데이터가 받아져서 로딩이 끝났으니 false
			state.isLoading = false;
			state.data = action.payload;
		},
		//데이터 응답 실패
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
