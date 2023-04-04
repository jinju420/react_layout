import Header from '../common/Header';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import { useState } from 'react';
import Cookie from './Cookie';

function Main(props) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);
	return (
		<main>
			{/* 특정 값을 직계자식이 아닌 자손 컴포넌트에 전달하기 위해 불필요하게 중간 컴포넌트에 props를 전달 : Prop drilling */}
			<Header type={'main'} menu={props.menu} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Cookie />
			{/* setScrolled state변경함수를 btns컴포넌트 전달 */}
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}
export default Main;
