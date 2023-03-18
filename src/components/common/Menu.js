import { forwardRef, useState, useImperativeHandle, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const Menu = forwardRef((props, ref) => {
	const li = useRef(null);
	const [Open, setOpen] = useState(false);
	const active = { color: '#fff' };
	useImperativeHandle(ref, () => {
		//부모의 토글버튼 클릭시 기존 Open state값이 계속 반전되야 하므로 !Open으로 설정
		return { setToggle: () => setOpen(true) };
		// return { setToggle: () => setOpen(!Open) };
	});
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1180) setOpen(false);
		});

		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');

		Open ? document.body.classList.add('on') : document.body.classList.remove('on');
	}, [Open]);
	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: -270, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
					exit={{ x: -270, opacity: 0 }}
				>
					{/* <div className='icons'>
						<ul className='brands'>
							<li>
								<FontAwesomeIcon icon={faFacebookF} />
							</li>
							<li>
								<FontAwesomeIcon icon={faTwitter} />
							</li>
							<li>
								<FontAwesomeIcon icon={faSquareInstagram} />
							</li>
						</ul>
					</div> */}

					<h1
						onClick={() => {
							setOpen(false);
						}}
					>
						<Link to='/'>GRANHAND.</Link>
					</h1>

					<ul id='gnbMo'>
						<li
							ref={li}
							onClick={() => {
								setOpen(false);
							}}
						>
							<NavLink to='/brand' activeStyle={active}>
								Brand
							</NavLink>
						</li>
						<li
							ref={li}
							onClick={() => {
								setOpen(false);
							}}
						>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li
							ref={li}
							onClick={() => {
								setOpen(false);
							}}
						>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li
							ref={li}
							onClick={() => {
								setOpen(false);
							}}
						>
							<NavLink to='/mypage' activeStyle={active}>
								Mypage
							</NavLink>
						</li>
						<li
							ref={li}
							onClick={() => {
								setOpen(false);
							}}
						>
							<NavLink to='/notice' activeStyle={active}>
								Notice
							</NavLink>
						</li>
						<li
							ref={li}
							onClick={() => {
								setOpen(false);
							}}
						>
							<NavLink to='/contact' activeStyle={active}>
								Contact
							</NavLink>
						</li>
					</ul>

					<span
						onClick={() => {
							setOpen(false);
						}}
					></span>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
