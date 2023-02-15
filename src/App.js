import { Route, Switch } from 'react-router-dom';
//common
import Header from './component/common/Header';
import Footer from './component/common/Footer';
// import Modal from './component/common/Modal';

//main
import Visual from './component/main/Visual';
import Banner from './component/main/Banner';
import List from './component/main/List';
import Content from './component/main/Content';

//sub
import Brand from './component/sub/Brand';
import ContactUs from './component/sub/ContactUs';
import Gallery from './component/sub/Gallery';
import Mypage from './component/sub/Mypage';
import Notice from './component/sub/Notice';

import './scss/style.scss';
import Youtube from './component/sub/Youtube';
// switch는 좀 더 자세하게 적은 exact내용을 채택하고 예외로 그렇지 않은 내용을 처리
function App() {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Header type={'main'} />
					<Visual />
					<List />
					<Banner />
					<Content />
				</Route>

				<Route path='/'>
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='/brand'>
				<Brand />
			</Route>

			<Route path='/gallery'>
				<Gallery />
			</Route>

			<Route path='/youtube'>
				<Youtube />
			</Route>

			<Route path='/mypage'>
				<Mypage />
			</Route>

			<Route path='/notice'>
				<Notice />
			</Route>

			<Route path='/contact'>
				<ContactUs />
			</Route>

			<Footer />
		</>
	);
}

export default App;
