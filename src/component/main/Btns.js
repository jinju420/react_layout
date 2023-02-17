import { useEffect, useRef } from 'react';
import Anim from '../../asset/anime';
// 스크롤에 대한 기능으로 따로 떼어놓은 것
function Btns({ setScrolled, setPos }) {
	//가상 돔 메인 요소를 담을 참조객체가 필요함
	//값 담기위해서useRe사용/ usestate는 스크롤 할때마다 렌더링이 일어나기때문에
	const btnRef = useRef(null); //querSelector('main')과 같은 기능//current까지 꼭 써준다.
	//섹션별 세로 위치값을 담을 빈배열로 참조객체 만들어야함
	//usestates는 렌더링을 발생시키기 때문에 불필요한 렌더링을 발생시키지 않고 값을 담고 싶으면 useRef사용
	const pos = useRef([]);
	const num = useRef(4); //4라는 값을 보관용도li의 갯수section의갯수
	const speed = useRef(500);
	//가상 돔 요소의 세로 위치값을 참조객체로 만든 배열에 담을 함수 만든다
	//function pos(){}//선언형 함수

	//세로 위치값 갱신하는 함수
	//함수표현형
	const getPos = () => {
		pos.current = [];
		//가상돔으로 참조한 객체에 붙인다. document에 붙이면 안된다.
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const el of secs) pos.current.push(el.offsetTop);
		//offset값담기 변경은 btns에서
		setPos(pos.current);
	};

	//버튼 박스 활성화 함수
	const activation = () => {
		const btns = btnRef.current.children; //모든li들
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		const scroll = window.scrollY;
		const base = -window.innerHeight / 3; //3분의 1만큼
		setScrolled(scroll);

		//pos에 값이 담겨있으니까 pos로 반복문 돌림
		pos.current.forEach((el, idx) => {
			if (scroll >= el + base) {
				for (const el of btns) el.classList.remove('on');
				//각각의 section에 기능 추가하려고 transform/opacity등
				for (const el of secs) el.classList.remove('on');

				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};
	//컴포넌트가 마운트되면 한번만
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		//세로위치값 초기화해서 다시 넣는다
		getPos();
		//브라우저가 리사이즈했을 때 갱신
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		//윈도우는 최상위 전역 객체임=> 이벤트리스너가 윈도우네 남아있다면 예상치도 못한 곳에서 이벤트가 충돌할 가능성있다. 다른 컴포넌트에도 리사이즈, 스크롤이 실행된다면 문제가 안될 수 있지만 그렇지 않다면 원치않은 이벤트가 적용되거나 충돌 될 수 있다.
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);
	return (
		//가상돔이라서 복잡해짐
		<ul className='scroll_navi' ref={btnRef}>
			{/* num의 갯수대로 빈 배열을 임의로 만들면서 반복처리 비어있지만 4개의 빈배열 생성*/}
			{Array(num.current)
				//['','','','']이 됨
				.fill() //배열.fill =>배열에 값을 채우는 메서드
				.map((el, idx) => {
					//현재 반복도는 순번이 0번째면 해당 li에 on클래스를 추가
					let isOn = ''; //문자열넣을거라서 빈문자열
					idx === 0 && (isOn = 'on');
					//처음 0인덱스에 on붙이기만 하면 이후 활성화함수에 해당 on을 활성화된곳으로 이동시키기때문에 0인덱스에 온클래스를 붙이기만 하면 된다
					//className={isOn}   {/*on을 붙여주는 작업 */}
					//***아직 만들어지지않은 동적으로 만들 li들을 만들어가면서 반복돌면서 on클래스 붙였다 떼기/스크롤 반영=>li를 반복을 돌면서 가상으로 만든다.
					return (
						<li
							key={idx}
							className={isOn}
							onClick={() => {
								new Anim(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: speed.current,
								});
							}}
						></li>
					);
				})}
			{/* 
            onClick={() => {
                new Anim(window, {
                    prop: 'scroll',
                    value: pos.current[idx],
                    duration: speed.current,
                });
            }}
            을 li하나하니씩 붙여야하기 때문에 li반복문을 돌린다.
            <li className='on'></li>

            만들고 on붙였다 땠다
			<li></li>
			<li></li>
			<li></li>
			<li></li> */}
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
