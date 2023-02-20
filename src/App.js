import { Route, Switch } from 'react-router-dom';
//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Brand from './components/sub/Brand';
import ContactUs from './components/sub/ContactUs';
import Gallery from './components/sub/Gallery';
import Mypage from './components/sub/Mypage';
import Notice from './components/sub/Notice';
import Youtube from './components/sub/Youtube';
import About from './components/sub/About';

import './scss/style.scss';
// switch는 좀 더 자세하게 적은 exact내용을 채택하고 예외로 그렇지 않은 내용을 처리
function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
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

			<Route path='/contact' component={ContactUs} />

			<Footer />
		</>
	);
}

export default App;
