import { Route, Switch } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

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
import './scss/style.scss';

function App() {
	const menu = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		//순서1 - dispatch로 액션객체를 리듀서에 전달 {type: 'YOUTUBE_START'}
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.FLICKR.start, Opt: { type: 'user', user: '195427004@N07' } });
	}, [dispatch]);

	return (
		// switch는 좀 더 자세하게 적은 exact내용을 채택하고 예외로 그렇지 않은 내용을 처리
		<>
			<Switch>
				{/* menu컴포넌트에서 전달된 참조객체를 다시 메인 전용 Header컴포넌트에 전달하기 위해 우선 Main 컴포넌트 props로 전달 */}
				<Route exact path='/' render={() => <Main menu={menu} />} />
				{/* menu컴포넌트에서 전달된 참조객체를 다시 Header컴포넌트에 props로 전달 */}
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
