import Header from '../common/Header';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import { useState } from 'react';
// import { useRef, useEffect } from 'react';

//스크롤적용하려고 메인컴포넌트로 분리
function Main() {
	//변경된 값은 메인이 가지고 있다.
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);
	return (
		<main>
			<Header type={'main'} />
			<Visual />
			<News Scrolled={Scrolled} currentPos={Pos[1]} />
			{/* news로 고정하기위해서 인덱스값 지정할것 */}
			<Pics />
			<Vids />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}
//  변경된 값받는다 pos/scrolled
export default Main;
