import { Route, Switch } from 'react-router-dom';
import { useRef } from 'react';
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
	const menu = useRef(null);
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
	useDispatch : 컴포넌트에서 reducer에 데이터변경 요청을 위히 action객체를 전달해주는 함수
*/
