import { Route, Switch } from 'react-router-dom';
import { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';
//main
import Main from './components/main/Main';

//sub
import Brand from './components/sub/Brand';
import Contact from './components/sub/Contact';
import Gallery from './components/sub/Gallery';
import Mypage from './components/sub/Mypage';
import Notice from './components/sub/Notice';
import Youtube from './components/sub/Youtube';
// import About from './components/sub/About';

import './scss/style.scss';
// switch는 좀 더 자세하게 적은 exact내용을 채택하고 예외로 그렇지 않은 내용을 처리
function App() {
	const dispatch = useDispatch();
	const menu = useRef(null);

	/*useEffect의 axios가 유튜브 데이터를 가져오면 dispatch로 데이터가 리듀서로 전달되고
	두번째 렌더링 사이클에서 해당 데이터로 유튜브 데이터 랜더링
	전역 데이터를 효율적으로 관리하기 위해서 해당 프로젝트에서 필요한 데이터는 모두 루트 컴포넌트인 App에서 데이터를 받아서
	dispatch로 리듀서에 전달하고 전역 store 에 저장
	장점 : 루트 컴포넌트에서 한눈에 해당 프로젝트에서 관리되는 전역 데이터들을 효율적으로 관리
	*/
	//fetchYoutube함수를 useCallback으로 메모이제이션 처리한뒤
	//useEffect에 의존성 배열에 등록후 호출
	const fetcchYoutube = useCallback(async () => {
		const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
		const playlistId = 'PLY0voYdGZtAipraMUx-_pnepD9KKaUDdm';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;
		const result = await axios.get(url);
		// setVids(json.data.items);
		dispatch({ type: 'SET_YOUTUBE', payload: result.data.items });
	}, [dispatch]);

	useEffect(() => {
		fetcchYoutube();
	}, [fetcchYoutube]);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			{/* 2depth줄때 */}
			{/* <Switch>
				<Route path='brand/about' component={About} />
				<Route path='/brand' component={Brand} />
			</Switch> */}
			{/* <Route path='brand/about' component={About} /> */}
			<Route path='/brand' component={Brand} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/mypage' component={Mypage} />
			<Route path='/notice' component={Notice} />
			<Route path='/contact' component={Contact} />

			<Footer />

			<Menu ref={menu} />
		</>
	);
}

export default App;
// npm i redux react-redux

/*
	--- redux ---
	store : 어떤 컴포넌트에서든 자유롭게 데이터를 가져다 쓸 수 있는 컴포넌트 외부의 독릭접인 전역 데이터 공간
	reducer : store의 데이터를 변경하는 변형자 (dispatch로 전달되는 action객체를 통해서만 store 데이터를 변경 가능)
	action : 컴포넌트에서 reducer에 데이터 변경 요청을 할때 쓰이는 특별한 객체
	--- react-redux ---
	useSelector : 컴포넌트에서 store 전역 데이터를 가져올때 쓰는 함수
	useDispatch : 컴포넌트에서 reducer에 데이터변경 요청을 위해 action객체를 전달해주는 함수
*/
