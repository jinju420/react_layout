import Header from '../common/Header';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import { useState } from 'react';

function Main(props) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);
	return (
		<main>
			<Header type={'main'} menu={props.menu} />
			<Visual />
			<News Scrolled={Scrolled} Pos={Pos[1]} />
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}
export default Main;
