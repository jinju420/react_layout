import { useCallback, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { memo } from 'react';
import { useEffect, useState } from 'react';

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
		const scrollPos = parseInt(window.scrollY);
		setScrolled(scrollPos);
		if (scrollPos > 0) hd.current.classList.add('on');
		else hd.current.classList.remove('on');
	}, []);

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
		</>
	);
}

export default memo(Header);
