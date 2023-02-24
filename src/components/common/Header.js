import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';
/*
Link는 컴포넌트를 이용한 페이지 이동을 해준다
하지만 url개념이 아니라 path의 개념이다
NavLink는  LInk에다가 special version으로  특정 링크에 스타일을 적용해서 넣어줄수 있다
activeStyle, activeClassName속성을 이용해서 스타일을 적용해주는것
리액트 웹의 현재 url과 to가 가르키는 링크가 일치하면 활성화 되면서 적용되고, 그렇지 않으면 비활성화 되는 식의 적용방식
*/
function Header(props) {
	const menu = useRef(null);
	const active = { color: '#1d66be' };
	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<h1>
						<Link exact to='/'>
							Obj
						</Link>
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
								CONTACT US
							</NavLink>
						</li>
					</ul>
					<FontAwesomeIcon
						icon={faBars}
						onClick={() => {
							menu.current.setToggle();
						}}
					/>
				</div>
			</header>

			{/* setToggle함수 받음 */}
			<Menu ref={menu} />
		</>
	);
}

export default Header;
