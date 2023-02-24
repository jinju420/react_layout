import Header from '../common/Header';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import { useState, useRef } from 'react';

/*
	useRef사용 이유
	- 가상돔 요소를 참조해서 재활용할 때
	- 컴포넌트가 재랜더링 되더라도 특정 값을 유지할 때, 컴포넌트 리랜더링을 방지
	스크롤적용하려고 메인컴포넌트로 분리
	이벤트 적용한다=>useeffect필요(공식)

서로 독립적인 Btns 와 News컴포넌트 구조에서
	Btsn에서 만들어지는 scroll값을 형제 컴포넌트인 News에 전달하는 법
	순서1 - 부모컴포넌트에 전달될 값이 매개체로 담길 State생성
	순서2 - Btns에 state변경함수를 전달해서 Btns 내부적으로 만들어지는 값을 부모 State에 저장
	순서3 - 그렇게 저장된 State값을 다시 자식인 News컴포넌트에 전달
*/
function Main(props) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);
	return (
		<main>
			<Header type={'main'} menu={props.menu} />
			<Visual Scrolled={Scrolled} Pos={Pos[0]} />
			<News Scrolled={Scrolled} Pos={Pos[1]} />
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			{/* setScrolled state변경함수를 btns컴포넌트 전달 */}
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}
export default Main;
