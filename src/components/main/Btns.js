import { useEffect, useRef, useCallback } from 'react';
import Anim from '../../asset/anime';
// 스크롤에 대한 기능으로 따로 떼어놓은 것
function Btns({ setScrolled, setPos }) {
	const num = useRef(4);
	const pos = useRef([]);
	const btnRef = useRef(null);
	const speed = useRef(500);

	//세로 위치값 갱신 함수(useCallback으로 메모이제이션)
	const getPos = useCallback(() => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setPos(pos.current);
	}, [setPos]);

	//버튼 활성화함수(useCallback으로 메모이제이션)
	const activation = useCallback(() => {
		const btns = btnRef.current.children;
		const scroll = window.scrollY;
		const base = -window.innerHeight / 2;
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	}, [setScrolled]);

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
	}, [getPos, activation]); //getpos,activation을 그냥 의존성 배열에 등록하면 무한루프에 빠지지만 해당 함수를 usecallback으로 메모이제이션 처리해서 반복호출되지 않아서 무한루프 문제 해결

	return (
		//동적으로 li를 생성시 현재 생성되는 li의 순번이 0일때만 on클래스 추가(삼항연산자)
		<ul className='scroll_navi' ref={btnRef}>
			{/* num의 갯수대로 빈 배열을 임의로 만들면서 반복처리 비어있지만 4개의 빈배열 생성*/}
			{Array(num.current)
				//['','','','']이 됨
				.fill() //배열.fill =>배열에 값을 채우는 메서드
				//현재 반복도는 순번이 0번째면 해당 li에 on클래스를 추가
				.map((_, idx) => (
					//처음 0인덱스에 on붙이기만 하면 이후 활성화함수에 해당 on을 활성화된곳으로 이동시키기때문에 0인덱스에 온클래스를 붙이기만 하면 된다
					//className={isOn}   {/*on을 붙여주는 작업 */}
					//***아직 만들어지지않은 동적으로 만들 li들을 만들어가면서 반복돌면서 on클래스 붙였다 떼기/스크롤 반영=>li를 반복을 돌면서 가상으로 만든다.
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
