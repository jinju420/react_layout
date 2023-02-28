import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
	const playlistId = 'PLY0voYdGZtAipraMUx-_pnepD9KKaUDdm';
	const num = 8;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	return await axios.get(url);
};
//youtube api로 부터 비동기 데이터를 요청해서 반환하는 순수함수 형태 (DOM제어, 리액트 컴포넌트 관련 기능 없음)
