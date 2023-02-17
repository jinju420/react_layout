import { useEffect, useRef } from 'react';
import Anim from '../../asset/anime';
// 스크롤에 대한 기능으로 따로 떼어놓은 것
function Btns({ setScrolled, setPos }) {
	const num = useRef(4);
	const pos = useRef([]);
	const btnRef = useRef(null);
	const speed = useRef(500);

	//세로 위치값 갱신 함수
	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		// console.log(pos.current);
		setPos(pos.current);
	};
	//버튼 활성화함수
	const activation = () => {
		const btns = btnRef.current.children;
		const scroll = window.scrollY;
		const base = -window.innerHeight / 2;
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		//부모컴포넌트로부터 전달받은 스크롤드 함수로 현재 내부적으로 만들어지고 있는 스크롤 거리값을 부모 스크롤드 스테이트에 옮겨담은
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};
	//외운다. 컴포넌트 마운트시 한번만 호출됨
	//보통 한번만 호출되는 useEffecct안쪽에는 이벤트 연결문이 들어감
	useEffect(() => {
		getPos();
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		//main에 btns가 있기때문에 메인페이지 벗어나면 사라짐
		//해당 컴포넌트가 언마운트시 실행
		//윈도우 전역객체에 연결된 이벤트함수 제거할때 사용
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);
	return (
		//가상돔이라서 복잡해짐
		//동적으로 li를 생성시 현재 생성되는 li의 순번이 0일때만 on클래스 추가(삼항연산자)
		<ul className='scroll_navi' ref={btnRef}>
			{Array(num.current)
				.fill()
				.map((_, idx) => (
					<li
						key={idx}
						className={idx === 0 ? 'on' : ''}
						onClick={() => {
							new Anim(window, {
								prop: 'scroll',
								value: pos.current[idx],
								duration: speed.current,
							});
						}}
					></li>
				))}
		</ul>
	);
}

export default Btns;
/*
  lis.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		new Anim(window, {
			prop: 'scroll',
			value: posArr[index],
			duration: 500,
			
		});
	
	});
});
을 리액트로 구현을 할 예정
1. li를 html과 달리 정적으로 (가상돔) 만들어야하고 li에 클릭이벤트를 붙여서 스크롤 이동을 시켜야한다
2. 첫번째 li에는 on클래스를 붙여야 하며
3. li를 반복돌면서 만들고 클릭이벤트도 걸어야하기 때문에 배열이 되어야한다
3을 위해서 num이라는 ref를 만들고, 배열을 만들기 위해서 Array(num.current).fill()을 한것. 여기서 fill은 배열을 빈값으로 채우는 용도
2를 위해서 	let isOn = '';			index === 0 && (isOn = 'on');
과 className={isOn} 을 해주어서 0인덱스에 on클래스를 부여한다
1을 위해서 eturn (
<li
    key={index}
    // className={isOn}
    onClick={() => {
        new Anim(window, {
            prop: 'scroll',
            value: pos.current[index],
            duration: speed.current,
        });
    }}
></li>
  */
