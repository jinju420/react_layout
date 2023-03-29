import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Cookie() {
	const popup = useRef(null);
	const ck = useRef('input[type=checkbox]');
	const btnClose = useRef(null);
	const isCookie = document.cookie.indexOf('cookie=done');

	useEffect(() => {
		isCookie === -1 ? (popup.current.style.display = 'block') : (popup.current.style.display = 'none');
	}, [isCookie]);

	useEffect(() => {
		btnClose.current.addEventListener('click', (e) => {
			popup.current.style.display = 'none';
			let isChecked = ck.current.checked;
			if (isChecked) setCookie('cookie', 'done', 1);
		});
	}, []);

	const setCookie = (name, val, due) => {
		//쿠기 접근 : document.cookie
		//쿠키 형식 : name=value; path=/; expires=만료일
		const today = new Date();
		const date = today.getDate();
		today.setDate(date + due);
		const duedate = today.toGMTString();
		document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
	};

	return (
		<aside id='popup' ref={popup}>
			<div className='popCont'>
				<p>
					Make a day full of experience instead of failure with milk glass printed with Grandhand slogan! Grandhand is introducing
					a new scent and product for the first time in two years. Fragrance can not be seen, it can not be caught, it imprints on
					us a lot of memories and emotions, and it determines a lot in our lives.
					<br />
					<br />
					Sometimes you win, Sometimes you learn. New Renewal Oepn: GRANHAND Sogyeok
				</p>
			</div>
			<div className='wrap'>
				<input type='checkbox' id='ck' ref={ck} />
				<label htmlFor='ck'>오늘 하루 그만보기</label>
			</div>
			<Link to='/' className='close' ref={btnClose}>
				CLOSE
			</Link>
		</aside>
	);
}

export default Cookie;
