import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
	const playlistId = 'PLY0voYdGZtAipraMUx-_pnepD9KKaUDdm';
	const num = 9;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	return await axios.get(url);
};

export const fetchFlickr = async (opt) => {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '8dfeab6f923483f4b3694e700652632a';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	const num = 20;
	let url = '';

	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	return await axios.get(url);
};
//youtube api로 부터 비동기 데이터를 요청해서 반환하는 순수함수 형태 (DOM제어, 리액트 컴포넌트 관련 기능 없음)
