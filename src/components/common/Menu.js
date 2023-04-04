import { forwardRef, useState, useImperativeHandle, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const li = useRef(null);
	const [Open, setOpen] = useState(false);
	const active = { color: '#d88d51' };
	useImperativeHandle(ref, () => {
		return { setToggle: () => setOpen(true) };
	});
	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
		Open ? document.body.classList.add('on') : document.body.classList.remove('on');

		window.addEventListener('resize', () => window.innerWidth >= 1180 && setOpen(false));
		return () => window.removeEventListener('resize', () => window.innerWidth >= 1180 && setOpen(false));
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
					<h1
						onClick={() => {
							setOpen(false);
						}}
					>
						<Link to='/'>GRANHAND.</Link>
					</h1>

					<ul
						id='gnbMo'
						onClick={() => {
							setOpen(false);
						}}
					>
						<li ref={li}>
							<NavLink to='/brand' activeStyle={active}>
								Brand
							</NavLink>
						</li>
						<li ref={li}>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li ref={li}>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li ref={li}>
							<NavLink to='/mypage' activeStyle={active}>
								Mypage
							</NavLink>
						</li>
						<li ref={li}>
							<NavLink to='/notice' activeStyle={active}>
								Notice
							</NavLink>
						</li>
						<li ref={li}>
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
