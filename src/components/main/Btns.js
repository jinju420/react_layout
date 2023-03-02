import { useEffect, useRef, useCallback } from 'react';
import Anim from '../../asset/anime';

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

	useEffect(() => {
		getPos();
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, [getPos, activation]);

	return (
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
