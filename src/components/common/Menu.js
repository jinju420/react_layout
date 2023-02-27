import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: '#fddd7d' };
	useImperativeHandle(ref, () => {
		return { setToggle: () => setOpen(!Open) };
	});
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1180) setOpen(false);
		});
	}, []);
	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: -270, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
					exit={{ x: -270, opacity: 0 }}
					onClick={() => {
						setOpen(false);
					}}
				>
					<div className='icons'>
						<h1>
							<Link to='/'>GRANHAND.</Link>
						</h1>

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
					</div>

					<ul id='gnbMo'>
						<li>
							<NavLink to='/brand' activeStyle={active}>
								Brand
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/mypage' activeStyle={active}>
								Mypage
							</NavLink>
						</li>
						<li>
							<NavLink to='/notice' activeStyle={active}>
								Notice
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								Contact
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
