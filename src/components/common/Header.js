import { useCallback, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useEffect, useState } from 'react';
/*
Link는 컴포넌트를 이용한 페이지 이동을 해준다
하지만 url개념이 아니라 path의 개념이다
NavLink는  LInk에다가 special version으로  특정 링크에 스타일을 적용해서 넣어줄수 있다
activeStyle, activeClassName속성을 이용해서 스타일을 적용해주는것
리액트 웹의 현재 url과 to가 가르키는 링크가 일치하면 활성화 되면서 적용되고, 그렇지 않으면 비활성화 되는 식의 적용방식
*/
function Header(props) {
	const [Icon, setIcon] = useState(true);
	const [Scrolled, setScrolled] = useState(0);
	const hd = useRef(null);
	const icon = useRef(null);
	const active = { color: '#1d66be' };
	useEffect(() => {
		window.addEventListener('resize', () => window.innerWidth >= 1180 && setIcon(false));
		return () => window.removeEventListener('resize', () => window.innerWidth >= 1180 && setIcon(false));
	}, [Icon]);

	const handleScroll = useCallback(() => {
		const scrollPos = window.scrollY;
		setScrolled(Scrolled);
		if (scrollPos > 0) hd.current.classList.add('on');
		else hd.current.classList.remove('on');
	}, [Scrolled]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<>
			<header className={props.type} ref={hd}>
				<div className='inner'>
					<h1>
						<Link to='/'>GRANHAND.</Link>
					</h1>
					<ul id='gnb'>
						<li>
							<NavLink to='/brand' activeStyle={active}>
								BRAND
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								GALLERY
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								YOUTUBE
							</NavLink>
						</li>
						<li>
							<NavLink to='/mypage' activeStyle={active}>
								MYPAGE
							</NavLink>
						</li>
						<li>
							<NavLink to='/notice' activeStyle={active}>
								NOTICE
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								CONTACT
							</NavLink>
						</li>
					</ul>
					<div
						ref={icon}
						onClick={() => {
							props.menu.current.setToggle();
						}}
						className='toggleMenu'
					>
						<span></span>
					</div>
				</div>
			</header>

			{/* setToggle함수 받음 */}
		</>
	);
}

export default memo(Header);
